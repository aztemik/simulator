class vpc:

    def __init__(
            self, 
            suscription_pricing,
            amount_target_users,
            iterations,
        ):
        self.suscription_pricing = suscription_pricing
        self.amount_target_users = amount_target_users
        self.iterations = iterations 


    def ventas(self):
        pago_usuario = []

        # Porciento y numero de usuarios que pagan
        for porciento in range(1, self.iterations + 1):
            calculo = (self.amount_target_users * porciento)/ 100
            pago_usuario.append({"Porciento": porciento, "Número": calculo})

        # Monto total mensual respecto al numero de usuarios que pagan
        cantidad_mensual = []
        for i in pago_usuario:
            total_mensual = i["Número"] * self.suscription_pricing
            cantidad_mensual.append(total_mensual)

        return pago_usuario, cantidad_mensual

# ejecutar programa
suscription_pricing = 50
amount_target_users = 10000
iterations = 50
ejecucion = vpc(suscription_pricing, amount_target_users, iterations)
pago_usuario, cantidad_mensual = ejecucion.ventas()

if len(pago_usuario) == len(cantidad_mensual):
    for i in range(len(pago_usuario)):  # Iteramos usando índices
        porcentaje = pago_usuario[i]["Porciento"]  # Accedemos al diccionario en la posición i
        numero = pago_usuario[i]["Número"]
        monto_mensual = cantidad_mensual[i]
        
        print(f'Porciento: {porcentaje} - Número: {numero} - Precio suscripcion: {suscription_pricing} - Cantidad mensual: {monto_mensual}')
