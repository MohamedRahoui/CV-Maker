from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from jsonfield import JSONField
from utils.models import BaseModel, year_choices, month_choices


class Profile(models.Model):
    """
    Profile Model
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.TextField(null=True, blank=True)
    title = models.CharField(max_length=255, null=True, blank=True)
    experience_duration = models.IntegerField(null=True, blank=True)
    functional_skills = JSONField(null=True, blank=True)
    technical_skills = JSONField(null=True, blank=True)
    focus_areas = JSONField(null=True, blank=True)

    def __str__(self):
        return self.user.email


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):  # pylint:disable=unused-argument
    """
    Create user profile
    """
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):  # pylint:disable=unused-argument
    """
    Save user profile
    """
    instance.profile.save()


class EmploymentType(BaseModel):
    type = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.type


class Experience(BaseModel):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, default=None)
    title = models.CharField(max_length=255, null=True, blank=True)
    job_title = models.CharField(max_length=255, null=True, blank=True)
    employment_type = models.ForeignKey(EmploymentType, on_delete=models.DO_NOTHING, null=True, blank=True)
    company = models.CharField(max_length=255, null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    start_year = models.IntegerField(choices=year_choices(), null=True, blank=True)
    start_month = models.IntegerField(choices=month_choices(), null=True, blank=True)
    end_year = models.IntegerField(choices=year_choices(), null=True, blank=True)
    end_month = models.IntegerField(choices=month_choices(), null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    environment = JSONField(null=True, blank=True)
    tasks = JSONField(null=True, blank=True)

    def __str__(self):
        return '{} | {}'.format(self.profile.user.email, self.title)


class Education(BaseModel):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, default=None)
    title = models.CharField(max_length=255, null=True, blank=True)
    year = models.IntegerField(choices=year_choices(), null=True, blank=True)
