from rest_framework import serializers
from .models import ValorNumerico
from .models import VpcFormat

class ValorNumericoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ValorNumerico
        fields = ['valor']

class VpcFormatSerializer(serializers.ModelSerializer):
    class Meta:
        model = VpcFormat
        fields = ['id_vpc_format', 'porcent_users', 'amount_users', 'total_mensual']