from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Sum, IntegerField
from django.db.models.functions import Cast
from itertools import chain

from ..models import SaleDescriptions
from ..models.Sales import Sales
from ..serializers.SaleDescriptionSerializer import SaleDescriptionSerializer

from ..serializers.SalesSerializer import SalesSerializer


class ReportController(viewsets.GenericViewSet):
    # permission_classes = (IsAuthenticated,)

    queryset = SaleDescriptions.objects.all()

    @action(detail=False, methods=['get'], url_path='report-sales', url_name='sales-by-date',
            )
    def report_sales(self, request, pk=None):
        """
        Parameters for the report: in the url: ?month=1&year=2020
        param1 -- month of the report
        param2 -- year of the report
        """
        params = {
            'month': request.query_params.get('month', None),
            'year': request.query_params.get('year', None)
        }
        if params['month'] is None or params['year'] is None:
            return Response({'error': 'month and year are required'}, status=400)

        sales = Sales.objects.filter(
            sale_date__month=params['month'],
            sale_date__year=params['year']
        )

        sale_details = SaleDescriptions.objects.filter(sale__in=sales)
        serializer_d = SaleDescriptionSerializer(sale_details, many=True)

        # Sum total of each sale
        total_sales = sale_details.aggregate(total=Sum(Cast('total', IntegerField())))

        serializer = SalesSerializer(sales, many=True)
        return Response({'sales': serializer.data, 'details': serializer_d.data,
                         'total_sales': total_sales},
                        status=200)
