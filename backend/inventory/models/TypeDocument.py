from django.db import models

"""
    This class is used to represent the type_document table in the database.
    
    Attributes:
        type_document_id (int): The primary key of the type_document table.
        type_document_name (str): The name of the document type.
        
"""


class TypeDocument(models.Model):
    type_document_id = models.IntegerField(primary_key=True)
    type_document_name = models.CharField(max_length=45)

    class Meta:
        managed = True
        db_table = 'type_document'

    objects = models.Manager()
