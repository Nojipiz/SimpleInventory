from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from ..models.models import SaleDescription
from ..serializers.SaleDescriptionSerializer import SaleDescriptionSerializer

class SaleDescriptionsController(viewsets.ModelViewSet):
    serializer_class = SaleDescriptionSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return SaleDescription.objects.all()
