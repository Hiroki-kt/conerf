from django.db import models


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
    movies_url = models.CharField(max_length=200)
    select_job = models.BooleanField(default=False)
