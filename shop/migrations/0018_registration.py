# Generated by Django 4.2.1 on 2023-07-16 07:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0017_remove_cartitem_id_alter_cartitem_added_product_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='Registration',
            fields=[
                ('email', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=10)),
            ],
        ),
    ]
