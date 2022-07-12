from rest_framework import serializers

from .UserSerializer import UserSerializer
from ..models import User, Employees

"""
EmployeeSerializer is used to serialize and deserialize the Employee model.

    Attributes:
        serializer_class (class): The class used to serialize and deserialize the Employee model.
        permission_classes (class): The class used to authorize the Employee model.
        queryset (class): The class used to get the Employee model.
        
    Methods:
        create(self, validated_data): Creates a new Employee model.
        update(self, instance, validated_data): Updates an existing Employee model.
        partial_update(self, instance, validated_data): Updates an existing Employee model.
        destroy(self, instance): Deletes an existing Employee model.
        to_representation(self, instance): Converts the Employee model to a dictionary.
"""


class EmployeeSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Employees
        fields = ['employee_id', 'employee_name', 'employee_last_name', 'employee_phone',
                  'user']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_data = User.objects.create(**user_data)
        employee_instance = Employees.objects.create(employee_user=user_data,
                                                     **validated_data)
        return employee_instance

    def to_representation(self, instance):
        employee = Employees.objects.get(employee_id=instance.employee_id)
        user = User.objects.get(id=instance.employee_user_id)
        return {
            'id': employee.employee_id,
            'name': employee.employee_name,
            'surname': employee.employee_last_name,
            'phone': employee.employee_phone,
            'user': {
                'username': user.username,
                'email': user.email,
            }
        }
