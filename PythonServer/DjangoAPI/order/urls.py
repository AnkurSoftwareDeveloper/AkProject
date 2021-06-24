from django.contrib import admin
from django.urls import path,include
from .views import *

urlpatterns = [
    path('pinCode/', PinCode_list),
    path('pinCodeDetails/<int:pk>/', PinCode_detail),
    path('address/', Address_list),
    path('addressbyuser/', AddressByUser),
    path('addressdetails/<int:pk>/', Address_detail),
    path('checkout/', checkout),
    path('myorder/', myorder),
    path('tracker/', tracker),
    path('trackall/', trackAll),
    path('orderupdate/', order_update),
    path('myorderdetail/<int:pk>/', myorder_detail),
]