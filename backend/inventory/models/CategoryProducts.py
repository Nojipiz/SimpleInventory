from django.db import models

"""
    This class is used to represent the CategoryProducts table in the database.
    
    Attributes:
        category_id (int): The primary key of the CategoryProducts table.
        category_name (str): The name of the category.
        category_description (str): The description of the category.
    

"""


class CategoryProducts(models.Model):
    category_id = models.BigAutoField(primary_key=True)
    category_name = models.CharField(max_length=45)
    category_description = models.CharField(max_length=45)

    class Meta:
        managed = True
        db_table = 'category_products'

    objects = models.Manager()
