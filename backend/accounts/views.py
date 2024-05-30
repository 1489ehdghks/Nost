from django.shortcuts import render, get_object_or_404
from dj_rest_auth.views import UserDetailsView, LoginView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from books.serializers import BookSerializer
from .serializers import ProfileSerializer


# Create your views here.
class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if not user:
            return Response(
                {"message": "해당 유저는 존재하지 않습니다."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = ProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        user = request.user
        serializer = ProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        user = self.request.user

        try:
            refresh_token = request.data.get("refresh_token")
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            else:
                return Response(
                    {"message": "refresh_token이 제공되지 않았습니다."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            # 사용자 비활성화
            # user.is_active=False
            # user.save()
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
