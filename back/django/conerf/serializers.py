from rest_framework import serializers

from .models import Job, FileUpload


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [
            "id",
            "title",
            "description",
            "status",
            "created_at",
            "updated_at",
            "movies_url",
            "select_job",
            "thumbnail",
            "participants",
        ]


class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileUpload
        fields = ["id", "title", "file", "job", "created_at"]
