from collections import OrderedDict

from django.contrib.auth.models import User
from rest_framework import serializers

from profiles.models import Profile, Experience, EmploymentType


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')


class EmploymentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmploymentType
        fields = 'type'


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = (
            'title',
            'employment_type',
            'company', 'location',
            'start_year', 'start_month',
            'end_year', 'end_month',
            'description',
        )
        employment_type = EmploymentTypeSerializer()


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('user', 'address', 'experiences')

    user = UserSerializer()
    experiences = ExperienceSerializer(many=True, source='experience_set')

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        formatted = dict()
        formatted.update(ret['user'])
        del ret['user']
        formatted.update(ret)
        return formatted
