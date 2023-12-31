from glob import glob
import os
import subprocess

from django_filters import rest_framework as filters
from django.shortcuts import get_object_or_404
import docker
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .tasks import ffmpeg, colmap, train, viewer, stop_container, render
from .lib import GoogleDriveAccess
from .models import Job, FileUpload
from .serializers import JobSerializer, FileUploadSerializer

gda = GoogleDriveAccess()

ORIGIN_VIDEO_DIR = "/mnt/origin"
IMAGE_DIR = "/mnt/data"


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all().order_by("created_at")
    serializer_class = JobSerializer

    @action(detail=True, methods=["get"])
    def download(self, request, pk=None):
        queryset = Job.objects.all()
        job = get_object_or_404(queryset, id=pk)
        folder_id = job.movies_url
        files = gda.get_files_list_in_a_folder(folder_id)
        os.makedirs(f"{ORIGIN_VIDEO_DIR}/{pk}", exist_ok=True)
        for count, file in enumerate(files):
            gda.download_file(file, f"{ORIGIN_VIDEO_DIR}/{pk}/{count}.MOV")
        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=["get"])
    def run_all(self, request, pk=None):
        queryset = Job.objects.all()
        job = get_object_or_404(queryset, id=pk)
        job.status = "2"
        job.save()
        ffmpeg.delay(pk, framerate=15, next_step=True)
        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=["get"])
    def ffmpeg(self, request, pk=None):
        ## TODO: framerateをrequestから受け取る
        # if request.data["framerate"]:
        #     framerate = request.data["framerate"]
        # else:
        #     framerate = 5
        framerate = 15
        queryset = Job.objects.all()
        job = get_object_or_404(queryset, id=pk)
        job.status = "2"
        job.save()
        ffmpeg.delay(pk, framerate=framerate)
        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=["get"])
    def colmap(self, request, pk=None):
        queryset = Job.objects.all()
        job = get_object_or_404(queryset, id=pk)
        job.status = "4"
        job.save()
        colmap.delay(pk)
        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=["get"])
    def train(self, request, pk=None):
        queryset = Job.objects.all()
        job = get_object_or_404(queryset, id=pk)
        job.status = "6"
        job.save()
        train.delay(pk)
        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=["get"])
    def viewer(self, request, pk=None):
        queryset = Job.objects.all()
        # selected_job = get_object_or_404(queryset, select_job=True)
        # selected_jobがある場合は、エラーを返す。
        # if selected_job:
        #     return Response(status=status.HTTP_400_BAD_REQUEST)
        job = get_object_or_404(queryset, id=pk)
        trained_path = job.trained_path
        if not trained_path:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        job.select_job = True
        job.save()
        viewer.delay(pk, trained_path)
        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=["get"])
    def stop_container(self, request, pk=None):
        job_type = request.query_params.get("job_type")
        client = docker.from_env()
        container = client.containers.get(f"{job_type}_{pk}")
        container.stop()
        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"])
    def render(self, request, pk=None):
        ns_command = request.data["command"]
        render.delay(pk, ns_command)
        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"])
    def dockerps(self, request):
        client = docker.from_env()
        containers = client.containers.list()
        nerf_containers = {}
        for container in containers:
            print(container.id, container.name)
            if "train" in container.name:
                print(f"train: {container.id}")
                nerf_containers["train"] = container.name
            elif "colmap" in container.name:
                print(f"colmap: {container.id}")
                nerf_containers["colmap"] = container.name
            elif "viewer" in container.name:
                print(f"viewer: {container.id}")
                nerf_containers["viewer"] = container.name
        return Response(status=status.HTTP_200_OK, data={"data": nerf_containers})


class FileUploadViewSet(viewsets.ModelViewSet):
    queryset = FileUpload.objects.all().order_by("created_at")
    serializer_class = FileUploadSerializer


class FileUploadFilter(filters.FilterSet):
    job = filters.NumberFilter(field_name="job", lookup_expr="exact")

    class Meta:
        model = FileUpload
        fields = ["job"]


class FileUploadList(generics.ListAPIView):
    queryset = FileUpload.objects.all()
    serializer_class = FileUploadSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = FileUploadFilter
