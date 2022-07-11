from django.db import models

from ..models.User import User


class Employees(models.Model):
    employee_id = models.IntegerField(primary_key=True)
    employee_name = models.CharField(max_length=45)
    employee_last_name = models.CharField(max_length=45)
    employee_phone = models.CharField(max_length=10)
    employee_email = models.EmailField(max_length=100)
    employee_user_name = models.CharField(max_length=45)
    employee_password = models.CharField(max_length=45)
    employee_user = models.ForeignKey(User, related_name='user', on_delete=models.CASCADE,
                                      null=True, blank=True)

    class Meta:
        managed = True
        db_table = 'employees'

    objects = models.Manager()
