from django.db import models

from inventory.models.Customers import Customers
from inventory.models.Employees import Employees

class Sales(models.Model):
    sale_id = models.BigAutoField(primary_key=True)
    sale_date = models.DateField()
    sale_details = models.TextField()
    customer = models.ForeignKey(Customers, models.DO_NOTHING)
    employee = models.ForeignKey(Employees, models.DO_NOTHING)

    objects = models.Manager()

    class Meta:
        managed = True
        db_table = 'sale'
