from rest_framework import serializers
from contactForm.models import ContactForm

class ContactFormSerializer(serializers.ModelSerializer):

   class Meta:
        model = ContactForm
        fields = '__all__' 
         
        # fields ='_all_'