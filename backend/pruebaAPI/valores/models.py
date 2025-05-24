from django.db import models

class ValorNumerico(models.Model):
    valor = models.FloatField()

    def __str__(self):
        return f'{self.valor}'
    
class VpcFormat(models.Model):
    id_vpc_format = models.AutoField(primary_key=True)
    porcent_users = models.FloatField()
    amount_users = models.FloatField()
    total_mensual = models.FloatField()

    class Meta:
        db_table = 'vpc_format'  # Nombre exacto de tu tabla en Supabase