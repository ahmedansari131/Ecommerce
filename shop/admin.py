from django.contrib import admin
from .models import Product, Display_Product, CartItem, Address


# Register your models here.
admin.site.register(Product)
admin.site.register(Display_Product)
admin.site.register(CartItem)
admin.site.register(Address)