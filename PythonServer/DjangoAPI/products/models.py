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
    category = models.ForeignKey(Category , on_delete=models.PROTECT)
    subCategory_name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.subCategory_name

class QuantityVariant(models.Model):
    variant_id = models.AutoField(primary_key=True)
    variant_name = models.CharField(max_length=25)
    
    def __str__(self):
        return self.variant_name

class ColorVariant(models.Model):
    color_id = models.AutoField(primary_key=True)
    color_name = models.CharField(max_length=25)
    color_code = models.CharField(max_length=25)
    
    def __str__(self):
        return self.color_name

class SizeVariant(models.Model):
    size_id = models.AutoField(primary_key=True)
    size_name = models.CharField(max_length=25)
    
    def __str__(self):
        return self.size_name


class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=50)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='static/products')
    price = models.FloatField(default=0)
    discount = models.FloatField(default=0)
    stock = models.IntegerField(default=100)
    quantity_type = models.ForeignKey(QuantityVariant , blank=True, null=True , on_delete=models.PROTECT)
    color_type = models.ForeignKey(ColorVariant , blank=True, null=True , on_delete=models.PROTECT)
    # size_type = models.ForeignKey(SizeVariant , blank=True, null=True , on_delete=models.PROTECT)
    
    class Meta:
        pass
        
    def __str__(self):
        return self.product_name
    
class ProductImages(models.Model):
    product = models.ForeignKey(Product , on_delete=models.PROTECT)
    image = models.ImageField(upload_to='static/products')        

    def __str__(self):
        return self.image
