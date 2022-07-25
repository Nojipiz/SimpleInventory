from rest_framework import serializers

from ..models import CategoryProducts


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = CategoryProducts
        fields = ['category_name', 'category_description']

    def create(self, validated_data):
        category_instance = CategoryProducts.objects.create(**validated_data)
        return category_instance
