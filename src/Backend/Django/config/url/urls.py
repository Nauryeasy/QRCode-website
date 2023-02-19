from django.urls import path
from . import views

urlpatterns = [
    path('', views.processing_url),
    path('add_review/', views.add_review),
    path('get_reviews/', views.get_reviews)
]
