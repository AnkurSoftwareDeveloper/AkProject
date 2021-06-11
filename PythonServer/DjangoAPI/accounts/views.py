from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserCreateSerializer
from rest_framework import response, permissions, status

# class RegisterView(APIView):
    
#     def post(self , request):
#         username = request.data['username']
#         password = request.data['password']
#         user = User(username=username)
#         user.set_password(password)
#         user.save()
#         refresh = RefreshToken.for_user(user)

#         return Response(
#             {
#                 "status":"success" ,
#                 'user_id' :user.id , 
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token)
#             })

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