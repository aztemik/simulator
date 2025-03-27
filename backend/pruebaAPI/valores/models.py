from django.db import models

class ValorNumerico(models.Model):
    valor = models.FloatField()

    def __str__(self):
        return f'{self.valor}'