

# Create your models here.

# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class CategoryProducts(models.Model):
    category_id = models.IntegerField(primary_key=True)
    category_name = models.CharField(max_length=45)
    category_description = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'category_products'


class Customers(models.Model):
    customer_id = models.IntegerField(primary_key=True)
    type_person = models.ForeignKey('TypePerson', models.DO_NOTHING)
    type_document = models.ForeignKey('TypeDocument', models.DO_NOTHING)
    customer_name = models.CharField(max_length=45)
    customer_last_name = models.CharField(max_length=45)
    customer_phone = models.CharField(max_length=10)
    customer_email = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'customers'


class Employees(models.Model):
    employee_id = models.IntegerField(primary_key=True)
    employee_name = models.CharField(max_length=45)
    employee_last_name = models.CharField(max_length=45)
    employee_phone = models.CharField(max_length=10)
    employee_email = models.CharField(max_length=100)
    employee_user_name = models.CharField(max_length=45)
    employee_password = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'employees'


class Products(models.Model):
    product_id = models.IntegerField(primary_key=True)
    category = models.ForeignKey(CategoryProducts, models.DO_NOTHING)
    product_name = models.CharField(max_length=45)
    product_description = models.CharField(max_length=45)
    product_units = models.CharField(max_length=45)
    product_price = models.TextField()  # This field type is a guess.
    product_status = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'products'


class Sale(models.Model):
    sale_id = models.IntegerField(primary_key=True)
    employee = models.ForeignKey(Employees, models.DO_NOTHING)
    customer = models.ForeignKey(Customers, models.DO_NOTHING)
    sale_date = models.DateField()
    sale_details = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'sale'


class SaleDescription(models.Model):
    sale = models.OneToOneField(Sale, models.DO_NOTHING, primary_key=True)
    product = models.ForeignKey(Products, models.DO_NOTHING)
    description_id = models.IntegerField()
    tax = models.ForeignKey('Taxes', models.DO_NOTHING, blank=True, null=True)
    units = models.IntegerField()
    quantity = models.IntegerField()
    discount = models.TextField(blank=True, null=True)  # This field type is a guess.
    total = models.TextField()  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'sale_description'
        unique_together = (('sale', 'product', 'description_id'), ('sale', 'product', 'description_id'),)


class Taxes(models.Model):
    tax_id = models.IntegerField(primary_key=True)
    tax_name = models.CharField(max_length=45)
    tax_description = models.CharField(max_length=45)
    tax_value = models.DecimalField(max_digits=65535, decimal_places=65535)

    class Meta:
        managed = False
        db_table = 'taxes'


class TypeDocument(models.Model):
    type_document_id = models.IntegerField(primary_key=True)
    type_document_name = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'type_document'


class TypePerson(models.Model):
    type_person_id = models.IntegerField(primary_key=True)
    type_person_name = models.CharField(max_length=45)
    type_person_description = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'type_person'