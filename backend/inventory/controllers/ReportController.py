from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from inventory.models.Sales import Sales

from inventory.serializers.SalesSerializer import SalesSerializer

class ReportController(viewsets.ViewSet):
    #permission_classes = (IsAuthenticated,)

    @action(detail=False, methods=['get'])
    def a_simple_def(self, request, pk=None):
        data = request.query_params.get("id")
        queryset = Sales.objects.all()
        serializer = SalesSerializer(queryset, many=True)
        return Response(data)
