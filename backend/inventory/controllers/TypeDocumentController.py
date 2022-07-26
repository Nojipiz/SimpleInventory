from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..models import TypeDocument
from ..serializers.TypeDocumentSerializer import TypeDocumentSerializer


class TypeDocumentController(viewsets.ModelViewSet):
    serializer_class = TypeDocumentSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return TypeDocument.objects.all()
