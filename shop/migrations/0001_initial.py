# Generated by Django 4.2.1 on 2023-07-27 17:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Display_Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(default='', max_length=50)),
                ('sub_category', models.CharField(default='', max_length=50)),
                ('category_desc', models.CharField(max_length=500)),
                ('product_image', models.ImageField(default='', upload_to='shop/images')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(max_length=500)),
                ('category', models.CharField(default='', max_length=50)),
                ('sub_category', models.CharField(default='', max_length=50)),
                ('item', models.CharField(blank=True, default='', max_length=100, null=True)),
                ('sub_item', models.CharField(blank=True, default='', max_length=100, null=True)),
                ('product_desc', models.CharField(blank=True, default='', max_length=500, null=True)),
                ('discounted_price', models.IntegerField(default=0)),
                ('og_price', models.IntegerField(default=0)),
                ('discount_percent', models.IntegerField(blank=True, default=0, null=True)),
                ('product_image', models.ImageField(default='', upload_to='shop/images')),
                ('highlights', models.CharField(blank=True, default='', max_length=1000, null=True)),
                ('product_expiry', models.CharField(blank=True, default='', max_length=100, null=True)),
                ('product_manufactured', models.CharField(blank=True, default='', max_length=100, null=True)),
                ('product_seller', models.CharField(blank=True, default='', max_length=100, null=True)),
                ('pub_date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='CartItem',
            fields=[
                ('added_product_id', models.IntegerField(blank=True, default=0, primary_key=True, serialize=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, null=True)),
                ('mobile', models.IntegerField(null=True)),
                ('pincode', models.IntegerField(null=True)),
                ('locality', models.CharField(max_length=20, null=True)),
                ('address', models.CharField(max_length=200, null=True)),
                ('city', models.CharField(max_length=20, null=True)),
                ('state', models.CharField(max_length=20, null=True)),
                ('username', models.ForeignKey(db_column='username_id', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
