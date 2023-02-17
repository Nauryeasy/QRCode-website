from django.urls import path, include


urlpatterns = [
    path('url/', include("url.urls"))
]