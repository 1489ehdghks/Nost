from django.urls import path
from . import views

urlpatterns = [
    path("", views.Storys.as_view()),
]
