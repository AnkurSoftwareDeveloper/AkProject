from django.contrib import admin
from django.urls import path,include
from .views import *

urlpatterns = [
    path('category/', Category_list),
    path('categoryDetails/<int:pk>/', Category_detail),
    
]
