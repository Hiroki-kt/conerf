# Generated by Django 4.2 on 2023-11-13 22:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('conerf', '0005_alter_job_thumbnail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='description',
            field=models.CharField(blank=True, default='', max_length=200),
        ),
    ]
