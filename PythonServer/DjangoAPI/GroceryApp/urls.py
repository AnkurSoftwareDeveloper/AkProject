from django.conf.urls import url 
from django.contrib import admin
from django.urls import path
from .views import ContactForm_list, ContactForm_detail,example_view
 
urlpatterns = [ 
    path('ContactForms/', ContactForm_list),
    path('ContactFormsDetails/<int:pk>/', ContactForm_detail),
    path('exampleview/', example_view)
]