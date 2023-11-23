import os
import subprocess

from celery import shared_task
from django.shortcuts import get_object_or_404

from .models import Job, FileUpload
from .serializers import JobSerializer, FileUploadSerializer

ORIGIN_VIDEO_DIR = "/mnt/origin"
IMAGE_DIR = "/mnt/data"


@shared_task
def ffmpeg(job_id: int, framerate=5) -> None:
    files = FileUpload.objects.filter(job=job_id)
    serializer = FileUploadSerializer(files, many=True)
    # print(serializer.data)
    print(f"file num{len(serializer.data)}")
    os.makedirs(f"{IMAGE_DIR}/{job_id}", exist_ok=True)
    for file in serializer.data:
        file_path = file["file"]
        output_file = f"{IMAGE_DIR}/{job_id}/img_{file['id']}_%04d.jpg"
        subprocess.call(
            f"ffmpeg -i {file_path} -vf framestep={framerate} -q:v 1 {output_file}",
            shell=True,
        )
    queryset = Job.objects.all()
    job = get_object_or_404(queryset, id=job_id)
    job.status = "3"
    job.save()


@shared_task
def colmap(job_id: int) -> None:
    print("colmap")
    command = f"docker run --name=colmap_{job_id} --gpus all -u 1000 -v /home/hiro/wd/conerf:/workspace/ -v /home/hiro/.cache/:/home/user/.cache/ --rm -it --shm-size=12gb nerfstudio-89 ns-process-data images --data /workspace/data/{job_id} --output-dir /workspace/outputs/{job_id}"
    subprocess.call(command, shell=True)
    queryset = Job.objects.all()
    job = get_object_or_404(queryset, id=job_id)
    job.status = "5"
    job.save()


@shared_task
def train(job_id: str) -> None:
    print("train")
    command = f"docker run --name=train_{job_id} --gpus all -u 1000 -v /home/hiro/wd/conerf:/workspace/ -v /home/hiro/.cache/:/home/user/.cache/ -p 7007:7007 --rm -it --shm-size=12gb nerfstudio-89 ns-train nerfacto --data /workspace/outputs/{job_id}"
    subprocess.call(command, shell=True)
    queryset = Job.objects.all()
    job = get_object_or_404(queryset, id=job_id)
    job.status = "7"
    job.save()


@shared_task
def viwer(job_id: str, time_stamp: str) -> None:
    print("viwer")
    queryset = Job.objects.all()
    job = get_object_or_404(queryset, id=job_id)
    job.select_job = True
    job.save()
    command = f"docker run --name=viewer_{job_id} --gpus all -u 1000 -v /home/hiro/wd/conerf:/workspace/ -v /home/hiro/.cache/:/home/user/.cache/ -p 7007:7007 --rm -it --shm-size=12gb nerfstudio-89 ns-viewer --load-config /workspace/outputs/{job_id}/nerfacto/{time_stamp}/config.yml"
    subprocess.call(command, shell=True)


@shared_task
def delete_container(job_id: str, job_type: str) -> None:
    print("delete")
    stop_command = f"docker stop {job_type}_{job_id}"
    subprocess.call(stop_command, shell=True)
    if job_type == "viewer":
        queryset = Job.objects.all()
        job = get_object_or_404(queryset, id=job_id)
        job.select_job = False
        job.save()
