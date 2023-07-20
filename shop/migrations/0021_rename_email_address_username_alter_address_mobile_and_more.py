# Generated by Django 4.2.1 on 2023-07-20 16:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0020_address'),
    ]

    operations = [
        migrations.RenameField(
            model_name='address',
            old_name='email',
            new_name='username',
        ),
        migrations.AlterField(
            model_name='address',
            name='mobile',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='address',
            name='pincode',
            field=models.IntegerField(null=True),
        ),
    ]
