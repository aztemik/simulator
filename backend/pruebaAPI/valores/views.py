from rest_framework import viewsets
from .models import ValorNumerico
from .serealizers import ValorNumericoSerializer

class ValorNumericoViewSet(viewsets.ModelViewSet):
    queryset = ValorNumerico.objects.all()
    serializer_class = ValorNumericoSerializer
