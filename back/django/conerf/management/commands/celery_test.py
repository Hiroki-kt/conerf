from django.core.management.base import BaseCommand

from conerf.tasks import ffmpeg, colmap, train, viwer


class Command(BaseCommand):
    help = "A test command that prints 'Hello World!'"

    def handle(self, *args, **options):
        print("==============Start================")
        # ffmpeg.delay(4)
        # colmap.delay(4)
        # train.delay("4-3")
        # viwer.delay("4-3", "2023-11-19_133834")
        # self.stdout.write(self.style.SUCCESS("Hello World!"))
        print("==============End================")
