# Generated by Django 3.0.4 on 2020-11-06 00:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0005_auto_20201106_0048'),
    ]

    operations = [
        migrations.RenameField(
            model_name='experience',
            old_name='end_date',
            new_name='end_year',
        ),
    ]
