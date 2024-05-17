from django.urls import path, include
# from .views import CustomUserDetailsView

urlpatterns = [
    path("", include("dj_rest_auth.urls")),
    path("", include("dj_rest_auth.registration.urls")),
    # path("user/", CustomUserDetailsView.as_view(), name="rest_user_details"),
]
