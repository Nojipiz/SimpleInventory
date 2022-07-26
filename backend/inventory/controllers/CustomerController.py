from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from ..models import Customers
from ..serializers.CustomersSerializer import CustomerSerializer

class CustomerController(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Customers.objects.all()
