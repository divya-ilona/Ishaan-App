# Generated by Django 4.1.7 on 2023-03-06 21:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kalamkaari', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wordstoreadvance',
            name='audio_file',
            field=models.CharField(max_length=250),
        ),
        migrations.AlterField(
            model_name='wordstorebeginner',
            name='audio_file',
            field=models.CharField(max_length=250),
        ),
    ]
