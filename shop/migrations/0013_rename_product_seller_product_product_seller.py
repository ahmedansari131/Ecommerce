# Generated by Django 4.2.1 on 2023-06-18 16:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0012_product_highlights_product_product_seller_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='product_Seller',
            new_name='product_seller',
        ),
    ]
