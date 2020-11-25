import calendar
import json
import locale

from api.settings import LANGUAGE_CODE

from django.contrib.auth.models import User
from rest_framework import serializers

from profiles.models import Profile, Experience, EmploymentType, Education

locale.setlocale(locale.LC_ALL, LANGUAGE_CODE)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')


class EmploymentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmploymentType
        fields = 'type'


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ('id', 'title', 'year')


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = (
            'id', 'title', 'location',
            'start_year', 'start_month',
            'end_year', 'end_month',
            'description', 'environment',
            'company', 'job_title', 'tasks',
            'env_list', 'tasks_list', 'end_month_txt',
            'start_month_txt'
        )

    env_list = serializers.SerializerMethodField()
    tasks_list = serializers.SerializerMethodField()
    end_month_txt = serializers.SerializerMethodField()
    start_month_txt = serializers.SerializerMethodField()

    @staticmethod
    def get_env_list(obj):
        if not obj.environment:
            return []
        return json.loads(obj.environment).get('env')

    @staticmethod
    def get_tasks_list(obj):
        if not obj.tasks:
            return []
        return json.loads(obj.tasks).get('tasks')

    @staticmethod
    def get_start_month_txt(obj):
        if not obj.start_month:
            return ''
        return calendar.month_name[obj.start_month]

    @staticmethod
    def get_end_month_txt(obj):
        if not obj.end_month:
            return ''
        return calendar.month_name[obj.end_month]


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            'id', 'user',
            'address', 'title',
            'experience_duration',
            'functional_skills', 'technical_skills',
            'focus_areas'
        )

    user = UserSerializer()

    # Clean up this function
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        formatted = dict()
        formatted.update(ret['user'])
        del ret['user']
        formatted.update(ret)
        return formatted
