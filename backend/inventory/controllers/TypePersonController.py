from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..models import TypePerson
from ..serializers.TypePersonSerializer import TypeCustomerSerializer


class TypePersonController(viewsets.ModelViewSet):
    serializer_class = TypeCustomerSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return TypePerson.objects.all()
