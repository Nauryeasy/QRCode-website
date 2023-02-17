from django.urls import path, include
from . import views


urlpatterns = [
    path('url/', views.processing_url)
]