from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from ..models import Products
from ..serializers.ProductSerializer import ProductSerializer


class ProductController(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Products.objects.all()
