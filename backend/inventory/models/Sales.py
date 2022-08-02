from django.db import models

class Sales(models.Model):
    sale_id = models.BigAutoField(primary_key=True)
    sale_date = models.DateField()
    sale_details = models.TextField()
    customer_id = models.ForeignKey('Customers', models.DO_NOTHING)
    employee_id = models.ForeignKey('Employees', models.DO_NOTHING)

    objects = models.Manager()

    class Meta:
        managed = True
        db_table = 'sales'



