from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..models.Sales import Sales
from ..serializers.SalesSerializer import SalesSerializer


class SalesController(viewsets.ModelViewSet):
    serializer_class = SalesSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        elements = Sales.objects.all()
        print(elements)
        return elements
