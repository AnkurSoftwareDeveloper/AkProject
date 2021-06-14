from django.contrib import admin
from django.urls import path,include
from .views import *

urlpatterns = [
    path('checkout/', checkout),
    path('myorder/', myorder),
    path('tracker/', tracker)
]