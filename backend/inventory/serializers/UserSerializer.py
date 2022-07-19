from rest_framework import serializers

from ..models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def to_representation(self, instance):
        user = User.objects.get(id=instance.id)
        return {
            'username': user.name,
        }
