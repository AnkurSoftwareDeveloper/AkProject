from django.conf.urls import url 
from django.contrib import admin
from django.urls import path
from .views import ContactForm_list, ContactForm_detail
 
urlpatterns = [ 
    path('ContactForms/', ContactForm_list),
    path('ContactFormsDetails/<int:pk>/', ContactForm_detail)
]