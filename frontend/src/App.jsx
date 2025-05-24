import Products from './components/vpc/products';
import {Routes, Route, } from 'react-router-dom';
import Inversion from './components/inversion';
import Ventas from './components/vpc/ventas';
import { GeneralData } from './components/generalData';
import Compras from './components/vpc/compras';

export default function App() {
  return (

    <Routes>
      <Route path="/" element={<Products />} />
      <Route path='/inversion/' element={<Inversion />} /> 
      <Route path='/ventas/' element={<Ventas />} />
      <Route path='/generalData' element={<GeneralData />}></Route>
      <Route path='/compras' element={<Compras />} />
    </Routes>

  );
}