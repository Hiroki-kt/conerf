from celery import shared_task

@shared_task
def hello():
    print("Hello World!")

@shared_task
def ffmpeg():
    print("ffmpeg!")
