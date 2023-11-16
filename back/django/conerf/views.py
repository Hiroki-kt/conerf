from glob import glob
import os
import subprocess

from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response

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
    def ffmpeg(self, request, pk=None):
        os.makedirs(f"{IMAGE_DIR}/{pk}", exist_ok=True)
        for file in glob(f"{ORIGIN_VIDEO_DIR}/{pk}/*.MOV"):
            file_count = os.path.basename(file).split(".")[0]
            output_file = f"{IMAGE_DIR}/{pk}/img_{file_count}_%04d.jpg"
            subprocess.call(
                f"ffmpeg -i {file} -vf framestep=1 -q:v 1 {output_file}",
                shell=True,
            )
        return Response(status=status.HTTP_200_OK)

class FileUploadViewSet(generics.GenericAPIView):
    queryset = FileUpload.objects.all().order_by("created_at")
    serializer_class = FileUploadSerializer
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        job_id = request.data["job_id"]
        job = get_object_or_404(Job, id=job_id)
        files = request.FILES.getlist("file")
        for file in files:
            FileUpload.objects.create(
                title=file.name, job=job, file=file
            )
        return Response(status=status.HTTP_201_CREATED)
