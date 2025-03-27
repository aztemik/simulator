import supabase from "./supabase"

// Función para iniciar el canal y escuchar cambios
export const iniciarCanal = (callback) => {
  const channel = supabase
    .channel('canal-simple')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',  // Solo escucha inserciones
        schema: 'public',
        table: 'valores_valornumerico'  // Tu tabla en Supabase
      },
      (payload) => {
        // Ejecuta el callback con el nuevo valor
        callback(payload.new.valor)  // Asume que tu columna se llama "valor"
      }
    )
    .subscribe()

  return channel
}