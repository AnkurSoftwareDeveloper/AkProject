from rest_framework import serializers
from GroceryApp.models import ContactForm

class ContactFormSerializer(serializers.ModelSerializer):

   class Meta:
        model = ContactForm
        fields = ('fullname',
                  'email',
                  'contact',
                  'message')