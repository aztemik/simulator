from django.urls import path, include
from .views import ValorNumericoViewSet
from rest_framework.routers import DefaultRouter
from .views import VpcCalculosView

router = DefaultRouter()
router.register(r'valores', ValorNumericoViewSet)


urlpatterns = [
    path('v1/', include(router.urls)),
    path('vpc/', VpcCalculosView.as_view(), name='vpc-calculations'),
]