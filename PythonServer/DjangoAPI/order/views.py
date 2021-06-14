from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import JsonResponse
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from .models import *
from .serializers import *
from rest_framework.parsers import JSONParser 
import json

@csrf_exempt
def checkout(request):
    if request.method=="POST":
        Orders_data = JSONParser().parse(request)
        serializer = OrderSerializer(data=Orders_data)
        if serializer.is_valid():
            serializer.save() 
            user = User.objects.get(pk=serializer.data['user_id'])
            update = OrderUpdate(user_id=user, order_id=serializer.data['order_id'], update_desc="The order has been placed")
            update.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@csrf_exempt
def myorder(request):
    if request.method=="POST":
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
                    updates.append({'text': item.update_desc, 'time': item.timestamp})
                    response = json.dumps(updates, default=str)
                return HttpResponse(response)
            else:
                return HttpResponse('{}')
        except Exception as e:
            return HttpResponse('{}')
