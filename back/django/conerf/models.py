from datetime import datetime

from django.db import models


def upload_to(instance, filename):
    job_id = instance.job.id
    now = datetime.now()
    d = now.strftime('%Y%m%d%H%M%S')
    return 'uploads/{job_id}/{d}.mp4'.format(job_id=job_id, d=d)
# Create your models here.
class Job(models.Model):
    STATUS_CHOICES = [
        ("1", "Downloading"),
        ("2", "Running"),
        ("3", "Done"),
        ("4", "Failed"),
    ]

    title = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    status = models.CharField(
        choices=STATUS_CHOICES, max_length=2, default="downloading"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    movies_url = models.CharField(max_length=200, blank=True, default="")
    select_job = models.BooleanField(default=False)
    thumbnail = models.CharField(max_length=200, default="static/images/noimage.png")

class FileUpload(models.Model):
    title = models.CharField(max_length=100)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    file = models.FileField(upload_to=upload_to)
    created_at = models.DateTimeField(auto_now_add=True)
