from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AiIntegrationViewSet


router = DefaultRouter()
router.register('', AiIntegrationViewSet, basename='ai')

urlpatterns = [
    path('', include(router.urls)),
]


