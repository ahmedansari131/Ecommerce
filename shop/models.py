from django.db import models


# Create your models here.
class Product(models.Model):
    product_id = models.AutoField
    product_name = models.CharField(max_length=50)
    product_desc = models.CharField(max_length=500)
    category = models.CharField(max_length=50, default="")
    sub_category = models.CharField(max_length=50, default="")
    price = models.IntegerField(default=0)
    product_image = models.ImageField(upload_to="shop/images", default="")
    pub_date = models.DateField()

    def __Str__(self):
        return self.product_name