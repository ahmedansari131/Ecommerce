# Generated by Django 4.2.1 on 2023-07-27 18:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0005_remove_address_id_address_add_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='address',
            name='add_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
