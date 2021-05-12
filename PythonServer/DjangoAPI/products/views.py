from django.shortcuts import render

from .serializers import *
from .models import *
# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework.permissions import IsAuthenticated

class DemoView(APIView):
    #permission_classes = [IsAuthenticated]
    def get(self ,request):
        print(request.user)
        return Response({'sucess' : "Hurray you are authenticated"})
    

class ProductView(APIView):
    
    def get(self,request):
        category = self.request.query_params.get('category')
        if category:
            queryset = Product.objects.filter(category__category_name =  category)
        else:
            queryset = Product.objects.all()
        serializer = ProductSerializer(queryset , many = True)
        return Response({'count' : len(serializer.data) ,'data' :serializer.data})


# from django.core import serializers
# from django.http import HttpResponse
# import json

# def test(request):
#     category = request.GET.get('category')
#     if category:
#         queryset = Product.objects.filter(category__category_name =  category) # id = 1, pk= 1
#     else:
#         queryset = Product.objects.all()
#     serializer = serializers.serialize('json', queryset) # aaawaz nhi aa rha?
#     print(serializer)
#     #return JsonResponse({'count' : len(serializer) ,'data' :serializer}, safe=True)
#     return HttpResponse(serializer, content_type='application/json')

#     product_name = reqest.POST.get('product_name') # json.loads(request.body)
#     data_to_store = Product(name=product_name, weight=1)
#     existing_db  =  querySet[0] #[obj1, obj2, obj3] = onj1
#     existing_obj.price = 3000
#     data_to_store.save()