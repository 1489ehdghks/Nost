from django.shortcuts import render
from dj_rest_auth.views import UserDetailsView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your views here.


# class CustomUserDetailsView(UserDetailsView):
#     permission_classes = [IsAuthenticated]

#     def delete(self, request, *args, **kwargs):
#         user = self.request.user

#         try:
#             refresh_token = request.data["refresh_token"]
#             token = RefreshToken(refresh_token)
#             token.blacklist()
#         except Exception as e:
#             return Response(status=status.HTTP_400_BAD_REQUEST)

#         user.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
    
    
