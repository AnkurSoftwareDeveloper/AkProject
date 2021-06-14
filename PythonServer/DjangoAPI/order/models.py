from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import User

class Order(models.Model):
    user_id=models.ForeignKey(User , on_delete=models.PROTECT)
    order_id= models.AutoField(primary_key=True)
    itemsJson= models.CharField(max_length=5000)
    amount=models.IntegerField(default=0)
    name=models.CharField(max_length=50)
    email=models.CharField(max_length=100)
    address=models.CharField(max_length=150)
    city=models.CharField(max_length=50)
    state=models.CharField(max_length=50)
    zip_code=models.CharField(max_length=10)
    phone=models.CharField(max_length=15, default="")

class OrderUpdate(models.Model):
    user_id=models.ForeignKey(User , on_delete=models.PROTECT)
    update_id  = models.AutoField(primary_key=True)
    order_id = models.IntegerField(default="")
    update_desc = models.CharField(max_length=5000)
    timestamp = models.DateTimeField(default=now)

    def __str__(self):
        return self.update_desc[0:7] + "..."
