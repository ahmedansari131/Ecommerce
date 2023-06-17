from django.db import models


# Create your models here.
class Product(models.Model):
    product_id = models.AutoField
    product_name = models.CharField(max_length=500)
    category = models.CharField(max_length=50, default="")
    sub_category = models.CharField(max_length=50, default="")
    item = models.CharField(max_length=100, default="")
    sub_item = models.CharField(max_length=100, default="")
    product_desc = models.CharField(max_length=500)
    price = models.IntegerField(default=0)
    product_image = models.ImageField(upload_to="shop/images", default="")
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