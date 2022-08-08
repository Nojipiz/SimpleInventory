from rest_framework import serializers

from inventory.models.Customers import Customers
from inventory.models.Employees import Employees
from ..models import Sales

class SalesSerializer(serializers.ModelSerializer):
    customer_id = serializers.IntegerField(source='customer.customer_id')
    employee_id = serializers.IntegerField(source='employee.employee_id')

    class Meta:
         model = Sales
         fields = ["sale_id", "sale_date", "sale_details", "customer_id", "employee_id"]
    
    def create(self, validated_data):
        customer = validated_data.pop('customer')
        employee = validated_data.pop('employee')
        try:
            customer_instance = Customers.objects.get(
                customer_id=customer["customer_id"]
            )
            employee_instance = Employees.objects.get(
                employee_id=employee["employee_id"]
            )
            sale_instance = Sales.objects.create(customer=customer_instance,employee=employee_instance, **validated_data)
            return sale_instance
        except Customers.DoesNotExist:
            raise serializers.ValidationError('Customer does not exist')
        except Employees.DoesNotExist:
            raise serializers.ValidationError('Employee does not exist')
