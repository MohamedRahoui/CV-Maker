"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls

from profiles.views import CustomAuthToken, ExperienceViewSet, EducationViewSet, ProfileViewSet

router = routers.SimpleRouter(trailing_slash=False)
router.register(r'profile', ProfileViewSet, basename='Profile')
router.register(r'experiences', ExperienceViewSet, basename='Experience')
router.register(r'education', EducationViewSet, basename='Education')

urlpatterns = [
    url(r'^api/docs/', include_docs_urls(title='CaMiPa API')),
    path('api/admin/', admin.site.urls),
    path('api/auth', CustomAuthToken.as_view(), name='api_token_auth'),
    url(r'^api/', include((router.urls, 'camipa'))),
]
