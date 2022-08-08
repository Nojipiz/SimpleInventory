from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from ..models.SaleDescriptions import SaleDescriptions
from ..serializers.SaleDescriptionSerializer import SaleDescriptionSerializer


class SaleDescriptionsController(viewsets.ModelViewSet):
    serializer_class = SaleDescriptionSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return SaleDescriptions.objects.all()
