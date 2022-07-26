from django.db import models

"""
    This class is used to represent the type_person table in the database.
    
    Attributes:
        type_person_id (int): The primary key of the type_person table.
        type_person_name (str): The name of the person type.
        type_person_description (str): The description of the person type.
    

"""


class TypePerson(models.Model):
    type_person_id = models.IntegerField(primary_key=True)
    type_person_name = models.CharField(max_length=45)
    type_person_description = models.CharField(max_length=45)

    class Meta:
        managed = True
        db_table = 'type_person'

    objects = models.Manager()
