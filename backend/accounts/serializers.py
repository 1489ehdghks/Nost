from django.contrib.auth import get_user_model
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer, LoginSerializer

User = get_user_model()


class CustomRegisterSerializer(RegisterSerializer):
    nickname = serializers.CharField(required=True)

    def save(self, request):
        user = super().save(request)
        user.nickname = self.data.get("nickname")
        user.save()
        return user


class CustomUserDetailSerializer(UserDetailsSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "nickname",
        )
