from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser 
from rest_framework import status

from .models import ContactForm
from .serializers import ContactFormSerializer

@csrf_exempt
def ContactForm_list(request):
    if request.method == 'GET':
        ContactForms = ContactForm.objects.all()
        serializer = ContactFormSerializer(ContactForms, many=True)
        return JsonResponse(serializer.data, safe=False)
        # In order to serialize objects, we must set 'safe=False'

    elif request.method == 'POST':
        ContactForms_data = JSONParser().parse(request)
        serializer = ContactFormSerializer(data=ContactForms_data)
        if serializer.is_valid():
            serializer.save() 
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
