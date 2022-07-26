from django.db import models

"""
    This class is used to represent the Customers table in the database.
    It contains the following fields:
        customer_id: The primary key of the product.
        type_person: ForeignKey of the type person enum
        type_document: ForeignKey of the type document enum.
        customer_name: First name of the customer.
        customer_lastname: Last name of the customer.
        customer_phone: The phone number of the customer.
        customer_email: The email address of the customer 
"""

class Customers(models.Model):
    customer_id = models.IntegerField(primary_key=True)
    type_person = models.ForeignKey('TypePerson', models.DO_NOTHING)
    type_document = models.ForeignKey('TypeDocument', models.DO_NOTHING)
    customer_name = models.CharField(max_length=45)
    customer_last_name = models.CharField(max_length=45)
    customer_phone = models.CharField(max_length=10)
    customer_email = models.CharField(max_length=100)

    class Meta:
        managed = True
        db_table = 'customers'
