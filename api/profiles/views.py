import io
import json
import os

from django.http import HttpResponse
from docxtpl import DocxTemplate

from rest_framework import viewsets, generics, mixins
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.settings import BASE_DIR
from profiles.models import Experience, Education, Profile
from profiles.serializers import ProfileSerializer, ExperienceSerializer, EducationSerializer


class CustomAuthToken(ObtainAuthToken):
    permission_classes = ()

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': ProfileSerializer(user.profile).data
        })


class ProfileViewSet(viewsets.GenericViewSet, mixins.UpdateModelMixin):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Profile.objects.filter(
            user=self.request.user)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def generate_cv(self, request, *args, **kwargs):
        t = DocxTemplate(os.path.join(BASE_DIR, 'cv_templates/base.docx'))
        user = request.user
        profile = request.user.profile
        new_obj = io.BytesIO()
        context = {
            'full_name': '{} {}'.format(user.first_name, user.last_name),
            'title': profile.title,
            'experience_duration': profile.experience_duration,
            'technical_skills': json.loads(profile.technical_skills).get('skills'),
            'functional_skills': json.loads(profile.functional_skills).get('skills'),
            'focus_areas': json.loads(profile.focus_areas).get('areas'),
            'educations': Education.objects.filter(profile=profile).order_by('-id'),
            'experiences': ExperienceSerializer(Experience.objects.filter(profile=profile).order_by('-id'),
                                                many=True).data,
        }
        t.render(context)
        t.save(new_obj)
        return HttpResponse(new_obj.getvalue(), content_type='text/plain')


class ExperienceViewSet(viewsets.ModelViewSet):
    serializer_class = ExperienceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        profile = self.request.user.profile
        return Experience.objects.filter(
            profile=profile).order_by('-id')


class EducationViewSet(viewsets.ModelViewSet):
    serializer_class = EducationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(profile=self.request.user.profile)

    def get_queryset(self):
        profile = self.request.user.profile
        return Education.objects.filter(
            profile=profile).order_by('-id')
