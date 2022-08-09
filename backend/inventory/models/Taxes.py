from django.db import models

class Taxes(models.Model):
    tax_id = models.BigAutoField(primary_key=True) 
    tax_name = models.TextField()
    tax_description = models.TextField()
    tax_value = models.PositiveIntegerField()

    objects = models.Manager()

    class Meta:
        managed = True
        db_table = 'taxes'
