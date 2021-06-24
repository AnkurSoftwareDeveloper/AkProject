from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import JsonResponse
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from .models import *
from .serializers import *
from rest_framework.parsers import JSONParser 
import json
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

#  PinCode ////////////////////////////////////////////////////////////////////
@csrf_exempt
def PinCode_list(request):
    if request.method == 'GET':
        PinCodes = PinCode.objects.all()
        serializer = PinCodeSerializer(PinCodes, many=True)
        return JsonResponse(serializer.data, safe=False)
        # In order to serialize objects, we must set 'safe=False'

    elif request.method == 'POST':
        PinCodes_data = JSONParser().parse(request)
        serializer = PinCodeSerializer(data=PinCodes_data)
        if serializer.is_valid():
            serializer.save() 
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt 
def PinCode_detail(request, pk):
    try: 
        PinCodes = PinCode.objects.get(pk=pk) 
    except PinCode.DoesNotExist: 
        return HttpResponse(status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        serializer = PinCodeSerializer(PinCodes) 
        return JsonResponse(serializer.data) 
 
    elif request.method == 'PUT': 
        PinCode_data = JSONParser().parse(request) 
        serializer = PinCodeSerializer(PinCodes, data=PinCode_data) 
        if serializer.is_valid(): 
           serializer.save() 
           return JsonResponse(serializer.data) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        PinCodes.delete() 
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

#  Address ////////////////////////////////////////////////////////////////////
@csrf_exempt
def Address_list(request):
    if request.method == 'GET':
        Addresss = Address.objects.all()
        serializer = AddressSerializer(Addresss, many=True)
        return JsonResponse(serializer.data, safe=False)
        # In order to serialize objects, we must set 'safe=False'

    elif request.method == 'POST':
        Addresss_data = JSONParser().parse(request)
        serializer = AddressSerializer(data=Addresss_data)
        if serializer.is_valid():
            serializer.save() 
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt 
def Address_detail(request, pk):
    try: 
        Addresss = Address.objects.get(pk=pk) 
    except Address.DoesNotExist: 
        return HttpResponse(status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        serializer = AddressSerializer(Addresss) 
        return JsonResponse(serializer.data) 
 
    elif request.method == 'PUT': 
        Address_data = JSONParser().parse(request) 
        serializer = AddressSerializer(Addresss, data=Address_data) 
        if serializer.is_valid(): 
           serializer.save() 
           return JsonResponse(serializer.data) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        Addresss.delete() 
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

@csrf_exempt
def AddressByUser(request):
    if request.method=="POST":
        request = json.loads(request.body)
        user_id = request['user_id']
        try:
            address = Address.objects.filter(user_id=user_id)
            if len(address)>0:
                serializer = AddressSerializer(address, many=True)
                return JsonResponse(serializer.data, safe=False)
            else:
                return HttpResponse('{}')
        except Exception as e:
            return HttpResponse('{}')


#order////////////////////////////////////////////
@csrf_exempt
def checkout(request):
    if request.method=="POST":
        Orders_data = JSONParser().parse(request)
        serializer = OrderSerializer(data=Orders_data)
        if serializer.is_valid():
            serializer.save() 
            user = User.objects.get(pk=serializer.data['user_id'])
            update = OrderUpdate(user_id=user, order_id=serializer.data['order_id'], status="Your order has been placed")
            update.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@csrf_exempt
@api_view(['GET','POST'])
@permission_classes((IsAuthenticated, ))
def myorder(request):
    if request.method == 'GET':
        Orders = Order.objects.all().order_by('-order_id')
        serializer = OrderSerializer(Orders, many=True)
        return JsonResponse(serializer.data, safe=False)
        # In order to serialize objects, we must set 'safe=False'

    elif request.method=="POST":
        request = json.loads(request.body)
        user_id = request['user_id']
        try:
            order = Order.objects.filter(user_id=user_id)
            if len(order)>0:
                serializer = OrderSerializer(order, many=True)
                return JsonResponse(serializer.data, safe=False)
            else:
                return HttpResponse('{}')
        except Exception as e:
            return HttpResponse('{}')

@csrf_exempt 
def myorder_detail(request, pk):
    try: 
        Orders = Order.objects.get(pk=pk) 
    except Order.DoesNotExist: 
        return HttpResponse(status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        serializer = OrderSerializer(Orders) 
        return JsonResponse(serializer.data) 
 
    elif request.method == 'PUT': 
        Order_data = JSONParser().parse(request) 
        serializer = OrderSerializer(Orders, data=Order_data) 
        if serializer.is_valid(): 
           serializer.save() 
           return JsonResponse(serializer.data) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        Orders.delete() 
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

# ///////////////////////////////////////////////////////////////

@csrf_exempt
def tracker(request):
    if request.method=="POST":
        request = json.loads(request.body)
        orderId = request['orderId']
        user_id = request['user_id']
        try:
            order = Order.objects.filter(order_id=orderId, user_id=user_id)
            if len(order)>0:
                update = OrderUpdate.objects.filter(order_id=orderId)
                updates = []
                for item in update:
                    updates.append({'status': item.status, 'time': item.time})
                    response = json.dumps(updates, default=str)
                return HttpResponse(response)
            else:
                return HttpResponse('{}')
        except Exception as e:
            return HttpResponse('{}')

@csrf_exempt
def trackAll(request):
    if request.method=="POST":
        request = json.loads(request.body)
        user_id = request['user_id']
        try:
            order = Order.objects.filter(user_id=user_id)
            if len(order)>0:
                update = OrderUpdate.objects.filter(user_id=user_id).order_by('-update_id')
                updates = []
                for item in update:
                    updates.append({'order_id': item.order_id, 'status': item.status, 'time': item.time})
                    response = json.dumps(updates, default=str)
                return HttpResponse(response)
            else:
                return HttpResponse('{}')
        except Exception as e:
            return HttpResponse('{}')

# //////////////////////////////////////////////////
@csrf_exempt
def order_update(request):
    if request.method == 'GET':
        OrderUpdates = OrderUpdate.objects.all().order_by('-update_id')
        serializer = OrderUpdateSerializer(OrderUpdates, many=True)
        return JsonResponse(serializer.data, safe=False)
        # In order to serialize objects, we must set 'safe=False'

    elif request.method == 'POST':
        OrderUpdates_data = JSONParser().parse(request)
        serializer = OrderUpdateSerializer(data=OrderUpdates_data)
        if serializer.is_valid():
            serializer.save() 
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

