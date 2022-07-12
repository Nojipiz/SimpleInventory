from rest_framework import serializers

from .CategorySerializer import CategorySerializer
from ..models import Products, CategoryProducts


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Products
        fields = ['product_id', 'category', 'product_name', 'product_description', 'product_units',
                  'product_price', 'product_status']

    def create(self, validated_data):
        category_data = validated_data.pop('category')
        category_data = CategoryProducts.objects.create(**category_data)
        product_instance = Products.objects.create(category=category_data, **validated_data)
        return product_instance
