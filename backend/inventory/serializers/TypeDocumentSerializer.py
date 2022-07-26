from rest_framework import serializers

from ..models import TypeDocument


class TypeDocumentSerializer(serializers.ModelSerializer):

    class Meta:
        model = TypeDocument
        fields = ['type_document_id', 'type_document_name']

    def create(self, validated_data):
        type_document_instance = TypeDocument.objects.create(**validated_data)
        return type_document_instance
