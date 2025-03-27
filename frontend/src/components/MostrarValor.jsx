import { useEffect, useState } from 'react'
import supabase from '../utils/supabase'
import { iniciarCanal } from '../utils/prueba'

const MostrarValor = () => {
  const [valor, setValor] = useState('Cargando...')

  // Paso 1: Obtener valor inicial al cargar
  useEffect(() => {
    const obtenerValorInicial = async () => {
      const { data } = await supabase
        .from('valores_valornumerico')
        .select('valor')
        .limit(1)
      
      if (data?.[0]?.valor) setValor(data[0].valor)
    }

    obtenerValorInicial()
  }, [])

  // Paso 2: Iniciar canal de cambios
  useEffect(() => {
    const channel = iniciarCanal((nuevoValor) => {
      setValor(nuevoValor)
    })

    // Limpiar al desmontar
    return () => channel.unsubscribe()
  }, [])

  return (
    <div>
      <h2>Valor actual: {valor}</h2>
    </div>
  )
}

export default MostrarValor;