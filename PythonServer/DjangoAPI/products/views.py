from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser 
from rest_framework import status

from .serializers import *
from .models import *

from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework.permissions import IsAuthenticated

#  Category ////////////////////////////////////////////////////////////////////
@csrf_exempt
def Category_list(request):
    if request.method == 'GET':
        Categorys = Category.objects.all()
        serializer = CategorySerializer(Categorys, many=True)
        return JsonResponse(serializer.data, safe=False)
        # In order to serialize objects, we must set 'safe=False'

    elif request.method == 'POST':
        Categorys_data = JSONParser().parse(request)
        serializer = CategorySerializer(data=Categorys_data)
        if serializer.is_valid():
            serializer.save() 
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt 
def Category_detail(request, pk):
    try: 
        Categorys = Category.objects.get(pk=pk) 
    except Category.DoesNotExist: 
        return HttpResponse(status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        serializer = CategorySerializer(Categorys) 
        return JsonResponse(serializer.data) 
 
    elif request.method == 'PUT': 
        Category_data = JSONParser().parse(request) 
        serializer = CategorySerializer(Categorys, data=Category_data) 
        if serializer.is_valid(): 
           serializer.save() 
           return JsonResponse(serializer.data) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        Categorys.delete() 
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

# Sub Category //////////////////////////////////////////////////////////////////////////
@csrf_exempt
def SubCategory_list(request):
    if request.method == 'GET':
        SubCategorys = SubCategory.objects.all()
        serializer = SubCategorySerializer(SubCategorys, many=True)
        return JsonResponse(serializer.data, safe=False)
        # In order to serialize objects, we must set 'safe=False'

    elif request.method == 'POST':
        SubCategorys_data = JSONParser().parse(request)
        serializer = SubCategorySerializer(data=SubCategorys_data)
        if serializer.is_valid():
            serializer.save() 
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt 
def SubCategory_detail(request, pk):
    try: 
        SubCategorys = SubCategory.objects.get(pk=pk) 
    except SubCategory.DoesNotExist: 
        return HttpResponse(status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        serializer = SubCategorySerializer(SubCategorys) 
        return JsonResponse(serializer.data) 
 
    elif request.method == 'PUT': 
        SubCategory_data = JSONParser().parse(request) 
        serializer = SubCategorySerializer(SubCategorys, data=SubCategory_data) 
        if serializer.is_valid(): 
           serializer.save() 
           return JsonResponse(serializer.data) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        SubCategorys.delete() 
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

# products ///////////////////////////////////////
@csrf_exempt
def Product_list(request):
    if request.method == 'GET':
        Products = Product.objects.all()
        serializer = ProductSerializer(Products, many=True)
        return JsonResponse(serializer.data, safe=False)
        # In order to serialize objects, we must set 'safe=False'

    elif request.method == 'POST':
        Products_data = JSONParser().parse(request)
        serializer = ProductSerializer(data=Products_data)
        if serializer.is_valid():
            serializer.save() 
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt 
def Product_detail(request, pk):
    try: 
        Products = Product.objects.get(pk=pk) 
    except Product.DoesNotExist: 
        return HttpResponse(status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        serializer = ProductSerializer(Products) 
        return JsonResponse(serializer.data) 
 
    elif request.method == 'PUT': 
        Product_data = JSONParser().parse(request) 
        serializer = ProductSerializer(Products, data=Product_data) 
        if serializer.is_valid(): 
           serializer.save() 
           return JsonResponse(serializer.data) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        Products.delete() 
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

