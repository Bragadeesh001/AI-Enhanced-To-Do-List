from rest_framework.serializers import ModelSerializer
from .models import UserTask


class UserTaskSerializer(ModelSerializer):
    class Meta:
        model = UserTask
        fields = '__all__'
