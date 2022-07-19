from rest_framework import serializers

from ..models import Products, CategoryProducts


class ProductSerializer(serializers.ModelSerializer):
    category_id = serializers.IntegerField(source='category.category_id')

    class Meta:
        model = Products
        fields = ['product_name', 'product_description',
                  'product_units',
                  'product_price', 'product_status', 'category_id']

    def create(self, validated_data):
        category = validated_data.pop('category')
        try:
            category_instance = CategoryProducts.objects.get(
                category_id=category['category_id']
            )
            product_instance = Products.objects.create(category=category_instance, **validated_data)
            return product_instance
        except CategoryProducts.DoesNotExist:
            raise serializers.ValidationError('Category does not exist')
