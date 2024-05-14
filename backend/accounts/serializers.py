from django.contrib.auth import get_user_model
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer

User = get_user_model()


class CustomRegisterSerializer(RegisterSerializer):
    nickname = serializers.CharField(required=True)

    def save(self, request):
        user = super().save(request)
        user.nickname=self.data.get('nickname')
        user.save()
        return user