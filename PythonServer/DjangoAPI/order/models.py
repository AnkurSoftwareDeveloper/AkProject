from django.db import models
from datetime import datetime  
from django.contrib.auth.models import User

class PinCode(models.Model):
    pinCode_id = models.AutoField(primary_key=True)
    pin_code=models.CharField(max_length=10)

    def __str__(self):
        return self.pin_code

class Address(models.Model):
    user_id=models.ForeignKey(User , on_delete=models.PROTECT)
    address_id= models.AutoField(primary_key=True)
    name=models.CharField(max_length=50)
    address=models.CharField(max_length=500)
    city=models.CharField(max_length=50)
    state=models.CharField(max_length=50)
    pin_code=models.ForeignKey(PinCode , on_delete=models.PROTECT)
    phone=models.CharField(max_length=15)

def __str__(self):
        return self.address

class Order(models.Model):
    user_id=models.ForeignKey(User , on_delete=models.PROTECT)
    order_id= models.AutoField(primary_key=True)
    itemsJson= models.CharField(max_length=5000)
    itemsQuntJson= models.CharField(max_length=500)
    amount=models.IntegerField(default=0)
    address=models.ForeignKey(Address , on_delete=models.PROTECT)
    paymentStatus=models.CharField(max_length=100)

class OrderUpdate(models.Model):
    user_id=models.ForeignKey(User , on_delete=models.PROTECT)
    update_id  = models.AutoField(primary_key=True)
    order_id = models.IntegerField(default="")
    status = models.CharField(max_length=500)
    time = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return self.status[0:7] + "..."


