from rest_framework import serializers
from .models import ValorNumerico

class ValorNumericoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ValorNumerico
        fields = ['valor']