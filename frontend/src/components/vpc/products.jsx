import { useRealtimeData } from "../../utils/channel";
import '../../css/products.css'
import {ProveedoresAndServices, Compras, SummaryGeneralData} from "./compras";
import Ventas from "./ventas";

const Products = () => {

    const {data:available_suscriptions} = useRealtimeData('available_services');

    return (
        <>
        <div>
            <h2><center> PLAN DE NEGOCIOS - SIMULADOR</center></h2>
        </div>
            <br></br>
            <div>
                <SummaryGeneralData />
            </div>
            <br />
            <h3>Servicios disponibles para la venta</h3>            
            <table className="suscriptions-style-table">
                <thead>
                    <tr>
                        <th>Servicio</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {available_suscriptions.map((row, index) => (
                        <tr key={index}>
                            <td>{row.service_name}</td>
                            <td>{row.description} </td>
                            <td>${row.pricing}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br></br>
            <div>
                <ProveedoresAndServices />
            </div>
            <br />
            <div>
                <Ventas />
            </div>
            <br />
            <div> 
                <Compras />
            </div>
        </>    
    );
}

export default Products;