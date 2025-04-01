import { useRealtimeData } from "../utils/channel";
import '../css/products.css'
import { GeneralData } from "./generalData";

const Products = () => {

    const {data:available_suscriptions} = useRealtimeData('available_suscriptions');
    const {data:suppliers} = useRealtimeData('suppliers');

    return (
        <>
            <h2><center> PLAN DE NEGOCIOS - SIMULADOR</center></h2>
            <br></br>
            <h3>Suscripciones disponibles</h3>
            {/* <div className="valor-inversion">
                {Array.isArray(inversiones) && inversiones.length > 0 ? (
                    inversiones.map((row, index) => (
                        <p key={index}>{row.valor}</p>
                    ))
                ) : (
                    <p>No hay inversiones disponibles</p>
                )}
            </div> */}

            <table className="suscriptions-style-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tipo de suscripción</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {available_suscriptions.map((row, index) => (
                        <tr key={index}>
                            <td>{row.idsuscription}</td>
                            <td>{row.suscription_type}</td>
                            <td>{row.description} </td>
                            <td>${row.pricing}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br></br>
            <h3>Proveedores</h3>
            <table className="suppliers-style-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Descripción</th>
                        <th>Unidad de medida</th>
                        <th>Costo unitario * 70,000</th>
                        <th>Descrip. Corta</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map((row, index) => (
                        <tr key={index}>
                            <td>{row.idsupplier}</td>
                            <td>{row.supplier_name}</td>
                            <td>{row.unidad_de_medida}</td>
                            <td>${row.costo_unitario}</td>
                            <td>{row.short_description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <div>
                <GeneralData />
            </div>
        </>    
    );
}

export default Products;