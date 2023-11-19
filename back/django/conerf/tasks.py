import os
import subprocess

from celery import shared_task

from .models import Job, FileUpload
from .serializers import JobSerializer, FileUploadSerializer

ORIGIN_VIDEO_DIR = "/mnt/origin"
IMAGE_DIR = "/mnt/data"

@shared_task
def hello():
    print("Hello World!")

@shared_task
def ffmpeg(job_id:int) -> None:
    files = FileUpload.objects.filter(job=job_id)
    serializer = FileUploadSerializer(files, many=True)
    # print(serializer.data)
    print(f'file num{len(serializer.data)}')
    os.makedirs(f"{IMAGE_DIR}/{job_id}", exist_ok=True)
    for file in serializer.data:
        file_path = file["file"]
        output_file = f"{IMAGE_DIR}/{job_id}/img_{file['id']}_%04d.jpg"
        subprocess.call(
            f"ffmpeg -i {file_path} -vf framestep=1 -q:v 1 {output_file}",
            shell=True,
        )
