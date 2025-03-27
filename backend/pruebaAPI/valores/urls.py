from django.urls import path, include
from .views import ValorNumericoViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'valores', ValorNumericoViewSet)

urlpatterns = [
    path('create/', include(router.urls)),
]