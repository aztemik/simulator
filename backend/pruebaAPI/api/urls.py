
from django.contrib import admin
from django.urls import path, include 
from django.http import HttpResponse 


def home(request):
    return HttpResponse("¡Bienvenido al backend! Usa /api/ para acceder a los endpoints")


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('valores.urls')),
    path('', home),  # <- Ruta para la URL raíz
]
