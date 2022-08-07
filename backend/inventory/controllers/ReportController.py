from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action

from ..models import SaleDescriptions
from ..models.Sales import Sales

from ..serializers.SalesSerializer import SalesSerializer


class ReportController(viewsets.GenericViewSet):
    # permission_classes = (IsAuthenticated,)

    queryset = Sales.objects.all()

    @action(detail=False, methods=['get'], url_path='report-sales')
    def a_simple_def(self, request, pk=None):
        """
        Parameters for the report: in the url: ?start_date=2019-01-01&end_date=2019-01-31
        param1 -- start date of the report
        param2 -- end date of the report
        """
        params = {
            'start_date': request.query_params.get('start_date', None),
            'end_date': request.query_params.get('end_date', None)
        }
        print(params)
        if params['start_date'] is None or params['end_date'] is None:
            return Response({'error': 'start_date and end_date are required'})
        sales = self.queryset.filter(
            sale_date__range=[params['start_date'], params['end_date']]
        )

        total_sales = 0
        SaleDescriptions.objects.all().filter(sale_id=sales.sale_id).aggregate()
        serializer = SalesSerializer(sales, many=True)
        return Response(serializer.data)
