from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserTaskViewSet

router = DefaultRouter()
router.register('', UserTaskViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
