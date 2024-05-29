from django.urls import path, include
from .views import ProfileAPIView

urlpatterns = [
    path("", include("dj_rest_auth.urls")),
    path("", include("dj_rest_auth.registration.urls")),
    path("profile/", ProfileAPIView.as_view()),
]
