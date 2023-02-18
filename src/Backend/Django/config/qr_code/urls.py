from django.urls import path
from . import views

urlpatterns = [
    path('', views.processing_url)
]
