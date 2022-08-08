from rest_framework.serializers import models

class SaleDescriptions(models.Model):
    description_id = models.BigAutoField(primary_key=True)
    units = models.IntegerField()
    quantity = models.IntegerField()
    discount = models.FloatField()
    total = models.IntegerField()
    sale = models.ForeignKey('Sales', models.DO_NOTHING)
    product = models.ForeignKey('Products', models.DO_NOTHING)
    tax = models.ForeignKey('Taxes', models.DO_NOTHING)

    objects = models.Manager()

    class Meta:
        managed = True
        db_table = 'sale_description'
