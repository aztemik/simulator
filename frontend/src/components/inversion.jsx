import React, { useState } from 'react';


function Inversion() {


  // Estado para el valor ingresado
  const [valor, setValor] = useState('');

  // Función para manejar el cambio en el campo de entrada
  const handleChange = (event) => {
    setValor(event.target.value);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    // Verifica que el valor no esté vacío
    if (!valor) {
      alert('Por favor, ingresa un valor.');
      return;
    }

    // Datos que se enviarán en la solicitud POST
    const data = { valor: parseInt(valor, 10) };

    try {
      const response = await fetch('http://localhost:8000/api/create/valores/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Valor enviado exitosamente');
        setValor(''); // Limpia el campo de entrada
      } else {
        alert('Error al enviar el valor');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un problema con la solicitud.');
    }
  };

  return (
    <>
        <form onSubmit={handleSubmit}>
          <label>
            Valor:
            <input
              type="number"
              value={valor}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Enviar</button>
        </form>
    </>
  );
}

export default Inversion;
