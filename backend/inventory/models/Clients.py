from django.db import models


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
