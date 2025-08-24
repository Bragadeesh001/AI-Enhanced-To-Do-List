from rest_framework.viewsets import ModelViewSet
from .models import UserTask
from .serializers import UserTaskSerializer


class UserTaskViewSet(ModelViewSet):
    queryset = UserTask.objects.all()  # type: ignore
    serializer_class = UserTaskSerializer
