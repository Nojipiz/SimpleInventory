from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
)

from ..models import Products, CategoryProducts
from ..serializers.ProductSerializer import ProductSerializer


class ProductController(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Products.objects.all()

    def update(self, request, *args, **kwargs):
        print(request.data['product_id'])
        product = Products.objects.get(product_id=request.data['product_id'])
        category = CategoryProducts.objects.get(category_id=request.data['category_id'])
        product.category = category
        product.product_name = request.data['product_name']
        product.product_description = request.data['product_description']
        product.product_price = request.data['product_price']
        product.product_units = request.data['product_units']
        product.product_status = request.data['product_status']
        product.save()
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=HTTP_200_OK)
