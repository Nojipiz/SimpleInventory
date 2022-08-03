from django.db import models

from ..models import Employees
from ..models.Products import Products
from ..models.Customers import Customers

class Sale(models.Model):
    sale_id = models.IntegerField(primary_key=True)
    employee = models.ForeignKey(Employees, models.DO_NOTHING)
    customer = models.ForeignKey(Customers, models.DO_NOTHING)
    sale_date = models.DateField()
    sale_details = models.CharField(max_length=45)

    class Meta:
        managed = True
        db_table = 'sale'


class Taxes(models.Model):
    tax_id = models.IntegerField(primary_key=True)
    tax_name = models.CharField(max_length=45)
    tax_description = models.CharField(max_length=45)
    tax_value = models.DecimalField(max_digits=999, decimal_places=999)

    class Meta:
        managed = True
        db_table = 'taxes'

class SaleDescription(models.Model):
    sale_id = models.OneToOneField(Sale, models.DO_NOTHING, primary_key=True)
    product_id = models.ForeignKey(Products, models.DO_NOTHING)
    description_id = models.IntegerField()
    tax_id = models.ForeignKey('Taxes', models.DO_NOTHING, blank=True, null=True)
    units = models.IntegerField()
    quantity = models.IntegerField()
    discount = models.TextField(blank=True, null=True)  # This field type is a guess.
    total = models.TextField()  # This field type is a guess.

    class Meta:
        managed = True
        db_table = 'sale_description'
        unique_together = \
            (('sale_id', 'product_id', 'description_id'), ('sale_id', 'product_id', 'description_id'),)

class TypeDocument(models.Model):
    type_document_id = models.IntegerField(primary_key=True)
    type_document_name = models.CharField(max_length=45)

    class Meta:
        managed = True
        db_table = 'type_document'


class TypePerson(models.Model):
    type_person_id = models.IntegerField(primary_key=True)
    type_person_name = models.CharField(max_length=45)
    type_person_description = models.CharField(max_length=45)

    class Meta:
        managed = True
        db_table = 'type_person'
