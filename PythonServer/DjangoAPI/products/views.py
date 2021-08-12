from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser 
from rest_framework import status

from .serializers import *
from .models import *
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.decorators import api_view, permission_classes
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
@api_view(['GET','POST'])
# @permission_classes((IsAuthenticated, ))
@csrf_exempt
def Product_list(request):
    if request.method == 'GET':
        Products = Product.objects.all()
        serializer = ProductSerializer(Products, many=True)
        return JsonResponse(serializer.data, safe=False)
        # In order to serialize objects, we must set 'safe=False'

    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save() 
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
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
        # Product_data = JSONParser().parse(request) 
        serializer = ProductSerializer(Products, data=request.data, context={'request': request}) 
        if serializer.is_valid(): 
           serializer.save() 
           return JsonResponse(serializer.data) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        Products.delete() 
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

# stock Alert ///////////////////////////////////////
@csrf_exempt
def StockAlert_list(request):
    if request.method == 'GET':
        StockAlerts = StockAlert.objects.all()
        serializer = StockAlertSerializer(StockAlerts, many=True)
        return JsonResponse(serializer.data, safe=False)
        # In order to serialize objects, we must set 'safe=False'

    elif request.method == 'POST':
        StockAlerts_data = JSONParser().parse(request)
        serializer = StockAlertSerializer(data=StockAlerts_data)
        if serializer.is_valid():
            serializer.save() 
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt 
def StockAlert_detail(request, pk):
    try: 
        StockAlerts = StockAlert.objects.get(pk=pk) 
    except StockAlert.DoesNotExist: 
        return HttpResponse(status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        serializer = StockAlertSerializer(StockAlerts) 
        return JsonResponse(serializer.data) 
 
    elif request.method == 'PUT': 
        StockAlert_data = JSONParser().parse(request) 
        serializer = StockAlertSerializer(StockAlerts, data=StockAlert_data) 
        if serializer.is_valid(): 
           serializer.save() 
           return JsonResponse(serializer.data) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        StockAlerts.delete() 
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

# search product//////////////////////////////////////////////////////////////
@api_view(['POST'])
@csrf_exempt 
def search(request):        
    if request.method == 'POST': # this will be GET now      
        search_products =  request.data.get('search') # do some research what it does 
        print(search_products)      
        try:
            search_result = Product.objects.filter(product_name__icontains=search_products) # filter returns a list so you might consider skip except part
        except: 
            return HttpResponse('{}') 
        serializer = ProductSerializer(search_result, many=True)
        return JsonResponse(serializer.data, safe=False)
    else:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)
