from django.db import models
from django.utils.text import slugify
# Create your models here.


class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.category_name

class SubCategory(models.Model):
    subCategory_id = models.AutoField(primary_key=True)
    category_id = models.ForeignKey(Category , on_delete=models.PROTECT)
    subCategory_name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.subCategory_name

class StockAlert(models.Model):
    stockalert_id = models.AutoField(primary_key=True)
    stockalert_name = models.CharField(max_length=25)
    
    def __str__(self):
        return self.stockalert_name

class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=50)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='./images', blank=True, null=True)
    quantity = models.CharField(max_length=25)
    price = models.FloatField(default=0)
    discount_price = models.FloatField(default=0)
    stockalert = models.ForeignKey(StockAlert, on_delete=models.CASCADE)
    
    class Meta:
        pass
        
    def __str__(self):
        return self.product_name
    
class ProductImages(models.Model):
    product = models.ForeignKey(Product , on_delete=models.PROTECT)
    image = models.ImageField(upload_to='./assets/images')        

    def __str__(self):
        return self.image
