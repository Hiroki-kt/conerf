from django.core.management.base import BaseCommand

from conerf.tasks import ffmpeg

class Command(BaseCommand):
    help = "A test command that prints 'Hello World!'"

    def handle(self, *args, **options):
        print("==============Start================")
        ffmpeg.delay(2)
        # self.stdout.write(self.style.SUCCESS("Hello World!"))
        print("==============End================")
