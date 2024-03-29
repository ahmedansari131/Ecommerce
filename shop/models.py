from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Product(models.Model):
    product_id = models.AutoField
    product_name = models.CharField(max_length=500)
    category = models.CharField(max_length=50, default="")
    sub_category = models.CharField(max_length=50, default="")
    item = models.CharField(max_length=100, default="", null=True, blank=True)
    sub_item = models.CharField(max_length=100, default="", null=True, blank=True)
    product_desc = models.CharField(max_length=500, default="", null=True, blank=True)
    discounted_price = models.IntegerField(default=0)
    og_price = models.IntegerField(default=0)
    discount_percent = models.IntegerField(default=0, null=True, blank=True)
    product_image = models.ImageField(upload_to="shop/images", default="")
    highlights = models.CharField(max_length=1000, default="", null= True, blank=True)
    product_expiry = models.CharField(max_length=100, default="", null= True, blank=True)
    product_manufactured = models.CharField(max_length=100, default="", null= True, blank=True)
    product_seller = models.CharField(max_length=100, default="", null=True, blank=True)
    pub_date = models.DateField()

    def __str__(self):
        return self.product_name
    
class Display_Product(models.Model):
    category = models.CharField(max_length=50, default="")
    sub_category = models.CharField(max_length=50, default="")
    category_desc = models.CharField(max_length=500)
    product_image = models.ImageField(upload_to="shop/images", default="")  

    def __str__(self):
        return self.sub_category
    

class CartItem(models.Model):
    added_product_id = models.IntegerField(primary_key=True,blank=True, default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Address(models.Model):
    add_id = models.AutoField(primary_key=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=True)
    mobile = models.IntegerField(null=True)
    pincode = models.IntegerField(null=True)
    locality = models.CharField(max_length=20, null=True)
    address = models.CharField(max_length=200, null=True)
    city = models.CharField(max_length=20, null=True)
    state = models.CharField(max_length=20, null=True)

    def __str__(self):
        return self.name



