from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from ..models import Employees
from ..serializers.EmployeeSerializer import EmployeeSerializer

"""
EmployeeController is a class that inherits from ModelViewSet.
It is used to handle the CRUD operations for the Employees model.

    * get_queryset: returns all the employees in the database
    * serializer_class: returns the EmployeeSerializer
    * permission_classes: returns the IsAuthenticated permission
    
"""


class EmployeeController(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Employees.objects.all()
