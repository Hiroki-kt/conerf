from django.urls import path, include
from rest_framework import routers

from .views import JobViewSet, FileUploadViewSet, FileUploadList

router = routers.DefaultRouter()
router.register("jobs", JobViewSet)
router.register("file_uploads", FileUploadViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("file_list", FileUploadList.as_view()),
]
