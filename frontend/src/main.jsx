import React from 'react'; // Importa React para el uso de JSX
import ReactDOM from 'react-dom/client'; // Importa ReactDOM desde 'react-dom/client'
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
