from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from ..models import CategoryProducts
from ..serializers.CategorySerializer import CategorySerializer


class CategoryProductsController(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return CategoryProducts.objects.all()
