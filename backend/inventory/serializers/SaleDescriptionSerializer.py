from rest_framework import serializers

from ..models import SaleDescriptions

class SaleDescriptionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = SaleDescriptions
        fields = ["sale_id", "units", "quantity",
                "discount", "total", "product_id", "tax_id","description_id"]

    def create(self, validated_data):
        sale_instance = SaleDescriptions.objects.create(**validated_data)
        return sale_instance

