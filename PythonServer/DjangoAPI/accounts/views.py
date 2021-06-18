from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserCreateSerializer
from rest_framework import response, permissions, status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import exceptions

@api_view(['GET','POST'])
@csrf_exempt
def registration(request):
    serializer = UserCreateSerializer(data=request.data)
    if not serializer.is_valid():
        return response.Response(serializer.errors, status.HTTP_400_BAD_REQUEST)        
    user = serializer.save()
    refresh = RefreshToken.for_user(user)
    res = {
        "status":"success" ,
        'user_id' :user.id , 
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }
    return response.Response(res, status.HTTP_201_CREATED)

# User login////////////////////////////////////
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        credentials = {
            'username': '',
            'password': attrs.get("password")
        }
        user_obj = User.objects.filter(email=attrs.get("username")).first() or User.objects.filter(username=attrs.get("username")).first()
        if user_obj:
            credentials['username'] = user_obj.username
        ## This data variable will contain refresh and access tokens
        data = super().validate(credentials)
        ## You can add more User model's attributes like username,email etc. in the data dictionary like this.
        data['user_name'] = self.user.username
        return data


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# Admin login////////////////////////////////////
class AdminCustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        credentials = {
            'username': '',
            'password': attrs.get("password")
        }
        user_obj = User.objects.filter(email=attrs.get("username")).first() or User.objects.filter(username=attrs.get("username")).first()
        
        if user_obj:
            admin_login = user_obj.is_staff
            if admin_login!=True:
                raise exceptions.AuthenticationFailed("Invalid Login")
            credentials['username'] = user_obj.username
        ## This data variable will contain refresh and access tokens
        data = super().validate(credentials)
        ## You can add more User model's attributes like username,email etc. in the data dictionary like this.
        data['user_name'] = self.user.username
        return data


class AdminCustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = AdminCustomTokenObtainPairSerializer

# change password/////////////////////////////////////////////////////
