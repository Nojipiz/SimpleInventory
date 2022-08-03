from rest_framework import serializers
from inventory.models.models import Taxes

class TaxSerializer(serializers.ModelSerializer):

    class Meta:
        model = Taxes
        fields = ["tax_id", "tax_name", "tax_description", "tax_value"]

    def create(self, validated_data):
        tax_instance = Taxes.objects.create(**validated_data)
        return tax_instance
