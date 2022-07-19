from django.db import models
from .CategoryProducts import CategoryProducts

"""
    This class is used to represent the Products table in the database.
    It contains the following fields:
        product_id: The primary key of the product.
        category: The category of the product.
        product_name: The name of the product.
        product_description: The description of the product.
        product_units: The units of the product.
        product_price: The price of the product.
        product_status: The status of the product.
"""


class Products(models.Model):
    product_id = models.BigAutoField(primary_key=True)
    category = models.ForeignKey(CategoryProducts, models.DO_NOTHING)
    product_name = models.CharField(max_length=45)
    product_description = models.CharField(max_length=45)
    product_units = models.CharField(max_length=45)
    product_price = models.TextField()  # This field type is a guess.
    product_status = models.BooleanField()

    objects = models.Manager()

    class Meta:
        managed = True
        db_table = 'products'
