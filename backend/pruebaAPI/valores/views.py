from rest_framework import viewsets
from .models import ValorNumerico
from .serealizers import ValorNumericoSerializer
from .models import VpcFormat
from .serealizers import VpcFormatSerializer

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

class ValorNumericoViewSet(viewsets.ModelViewSet):
    queryset = ValorNumerico.objects.all()
    serializer_class = ValorNumericoSerializer

def calcular_ventas(suscription_pricing, amount_target_users, iterations):
    pago_usuario = []
    for i in range(1, iterations + 1):
        amount_users = (i * amount_target_users) / 100
        pago_usuario.append({"Porciento": i, "Número": amount_users})
    
    cantidad_mensual = [i["Número"] * suscription_pricing for i in pago_usuario]
    return pago_usuario, cantidad_mensual


class VpcCalculosView(APIView):
    def get(self, request):
        registros = VpcFormat.objects.all()
        serializer = VpcFormatSerializer(registros, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        # Validar datos recibidos
        required_fields = ['suscription_pricing', 'amount_target_users', 'iterations']
        if not all(field in request.data for field in required_fields):
            return Response({'error': 'Faltan campos requeridos'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            subscription = float(request.data['suscription_pricing'])
            target_users = int(request.data['amount_target_users'])
            iterations = int(request.data['iterations'])
        except (ValueError, TypeError):
            return Response({'error': 'Tipos de datos inválidos'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Realizar cálculos
        usuarios_pago, montos_mensuales = calcular_ventas(
            subscription,
            target_users,
            iterations
        )
        
        # Guardar en base de datos
        resultados_guardados = []
        for i in range(len(usuarios_pago)):
            try:
                registro = VpcFormat.objects.create(
                    porcent_users=usuarios_pago[i]['Porciento'],
                    amount_users=usuarios_pago[i]['Número'],  # Asegurar que sea entero
                    total_mensual=montos_mensuales[i]
                )
                serializer = VpcFormatSerializer(registro)
                resultados_guardados.append(serializer.data)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(resultados_guardados, status=status.HTTP_201_CREATED)