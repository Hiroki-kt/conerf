from rest_framework import serializers

from .models import Job


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
        ]
