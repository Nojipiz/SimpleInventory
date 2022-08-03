from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from ..models import Taxes
from ..serializers.TaxSerializer import TaxSerializer

class TaxController(viewsets.ModelViewSet):
    serializer_class = TaxSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Taxes.objects.all()
