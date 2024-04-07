from django.urls import path
from . import views

urlpatterns = [
    # path("", views.generate_story_from_words, name="generate-story"),
    path("create-story/", views.GenerateStory.as_view(), name="create-story"),
    path("suggest-story/", views.SuggestStory.as_view(), name="suggest-story"),
]
