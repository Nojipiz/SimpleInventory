from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from ..models import Employees
from ..serializers.EmployeeSerializer import EmployeeSerializer

msg_user_not_found = {'message': 'Users not found!'}
msg_parameter_not_found = {'message': 'Parameters not found!'}


class EmployeeViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return Employees.objects.all()