# Generated by Django 3.2.2 on 2021-05-13 09:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('category_id', models.AutoField(primary_key=True, serialize=False)),
                ('category_name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='ColorVariant',
            fields=[
                ('color_id', models.AutoField(primary_key=True, serialize=False)),
                ('color_name', models.CharField(max_length=25)),
                ('color_code', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('product_id', models.AutoField(primary_key=True, serialize=False)),
                ('product_name', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('image', models.ImageField(upload_to='static/products')),
                ('price', models.FloatField(default=0)),
                ('discount', models.FloatField(default=0)),
                ('stock', models.IntegerField(default=100)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.category')),
                ('color_type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='products.colorvariant')),
            ],
        ),
        migrations.CreateModel(
            name='QuantityVariant',
            fields=[
                ('variant_id', models.AutoField(primary_key=True, serialize=False)),
                ('variant_name', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='SizeVariant',
            fields=[
                ('size_id', models.AutoField(primary_key=True, serialize=False)),
                ('size_name', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='SubCategory',
            fields=[
                ('subCategory_id', models.AutoField(primary_key=True, serialize=False)),
                ('subCategory_name', models.CharField(max_length=50)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='products.category')),
            ],
        ),
        migrations.CreateModel(
            name='ProductImages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='static/products')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='products.product')),
            ],
        ),
        migrations.AddField(
            model_name='product',
            name='quantity_type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='products.quantityvariant'),
        ),
    ]
