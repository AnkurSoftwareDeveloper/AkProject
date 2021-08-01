from django.db import models

# Create your models here.
class ContactForm(models.Model):
    contctformId= models.AutoField(primary_key=True)
    fullname= models.CharField(max_length=100)
    phone=models.CharField(max_length=15)
    email= models.EmailField()
    subject= models.CharField(max_length=50)
    message= models.CharField(max_length=200)

    def __str__(self):
        return self.fullname