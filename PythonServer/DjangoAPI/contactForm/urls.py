from django.contrib import admin
from django.urls import path,include
from .views import *

urlpatterns = [
    path('contactForm/', ContactForm_list),
    path('contactFormDetails/<int:pk>/', ContactForm_detail),
    
]