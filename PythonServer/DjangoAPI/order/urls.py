from django.contrib import admin
from django.urls import path,include
from .views import *

urlpatterns = [
    path('checkout/', checkout),
    path('myorder/', myorder),
    path('tracker/', tracker),
    path('trackall/', trackAll),
    path('orderupdate/', order_update),
    path('myorderdetail/<int:pk>/', myorder_detail),
]