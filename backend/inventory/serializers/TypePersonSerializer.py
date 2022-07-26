from rest_framework import serializers

from ..models import TypePerson


class TypeCustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = TypePerson
        fields = ['type_person_id', 'type_person_name', 'type_person_description']

    def create(self, validated_data):
        type_person_instance = TypePerson.objects.create(**validated_data)
        return type_person_instance
