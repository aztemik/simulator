import Products from './components/products';
import {Routes, Route, } from 'react-router-dom';
import Inversion from './components/inversion';
import Ventas from './components/ventas';
import { GeneralData } from './components/generalData';

export default function App() {
  return (

    <Routes>
      <Route path="/" element={<Products />} />
      <Route path='/inversion/' element={<Inversion />} /> 
      <Route path='/ventas/' element={<Ventas />} />
      <Route path='/generalData' element={<GeneralData />}></Route>
    </Routes>

  );
}