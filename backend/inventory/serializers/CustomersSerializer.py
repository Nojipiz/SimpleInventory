from rest_framework import serializers

from ..models import Customers


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = ["customer_id", "type_person", "type_document", "customer_name", "customer_last_name",
                  "customer_phone", "customer_email"]

    def create(self, validated_data):
        customer_instance = Customers.objects.create(**validated_data)
        return customer_instance
