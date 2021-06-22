from rest_framework import serializers
from rest_framework.fields import ImageField
from .models import *

class PinCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PinCode
        fields = '__all__' 

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__' 

class OrderUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderUpdate
        fields = '__all__'


