from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from inventory.models.Sales import Sales
from inventory.serializers.SalesSerializer import SalesSerializer

class SalesController(viewsets.ModelViewSet):
    serializer_class = SalesSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Sales.objects.all()
