from django.core.management.base import BaseCommand

from conerf.jobs import hello_world

class Command(BaseCommand):
    help = "A test command that prints 'Hello World!'"

    def handle(self, *args, **options):
        print("==============Start================")
        hello_world.apply_async(args=())
        self.stdout.write(self.style.SUCCESS("Hello World!"))
