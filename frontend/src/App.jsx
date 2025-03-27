import { useState } from 'react'
import MostrarValor from './components/MostrarValor'

export default function App() {
  const [valor, setValor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/api/create/valores/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ valor: parseFloat(valor) }),
      });

      if (!response.ok) throw new Error('Error al guardar');
      alert('Valor guardado exitosamente!');
      setValor('');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar el valor');
    }
  };

  return (
    <>
      <div className="App">
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
      <div>
        <MostrarValor />
      </div>
    </>
  );
}