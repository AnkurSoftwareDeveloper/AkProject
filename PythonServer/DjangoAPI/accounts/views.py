from django.http.response import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response 
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import ChangePasswordSerializer, UserCreateSerializer
from rest_framework import response, permissions, status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import exceptions
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.core.serializers import serialize

@csrf_exempt
def UserDetails(request):
    if request.method == 'GET':
        User = get_user_model()
        Users = User.objects.all()
        data = serialize("json", Users)
        return JsonResponse(data, safe=False)  # or JsonResponse({'data': data})

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
from rest_framework import status
from rest_framework.generics import UpdateAPIView
from rest_framework.authtoken.models import Token

class ChangePasswordView(UpdateAPIView):
    serializer_class = ChangePasswordSerializer

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        # if using drf authtoken, create a new token 
        # if hasattr(user, 'auth_token'):
        #     user.auth_token.delete()
        # token, created = Token.objects.get_or_create(user=user)
        # return new token
        response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }
        return Response(response)
        # return Response({'token': token.key}, status=status.HTTP_200_OK)

#send email//////////////////
from django.core.mail import get_connection
from django.core.mail.message import EmailMessage

def sending_email(request):
    connection = get_connection(use_tls=True, host='smtp.gmail.com', port=587,username='ankur555raj@gmail.com', password='ecdzpccngfmowcvl')
    EmailMessage('test', 'Hello', 'ankur555raj@gmail.com', ['kamal12345raj@gmail.com'], connection=connection).send()
    res = {
        "status":"success" ,
    }
    return HttpResponse('{}')

