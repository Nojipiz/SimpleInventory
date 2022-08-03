from rest_framework import serializers
from inventory.models.Sales import Sales

class SalesSerializer(serializers.ModelSerializer):

    class Meta:
         model = Sales
         fields = ["sale_id", "sale_date", "sale_details", 
                 "customer_id", "employee_id"]
    
    def create(self, validated_data):
        sale_instance = Sales.objects.create(**validated_data)
        return sale_instance
