import '../../css/ventas.css'
import {useRealtimeData, UserCounts} from "../../utils/channel";

const Ventas = () => {
    const {data:data_vpc_format} = useRealtimeData('vpc_format');
    const {service1, service2} = UserCounts();
    const {data:months} = useRealtimeData('months');

    return (
        <>
        <div> 
            <h3>Ventas</h3>
            <table className='ventas-style-table'>
                <tbody>
                <tr>
                    <td>Usuarios con Plan mensual</td>
                    <td>{service1}</td>
                </tr>
                <tr>
                 <td>Usuarios con Plan gratuito</td>
                    <td>{service2}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <h3>Ventas tomando en cuenta una taza de conversión</h3>
        <table className="ventas-style-table">
            <thead>
            <tr id='ventas-style-tr'>
                <th>Taza de conversión</th>
                <th>Número de usuarios que pagan</th>
                {months.map(service => 
                    <th key={service.id_month}>{service.month}</th>
                )}
            </tr>
            </thead>
            <tbody>
                {data_vpc_format.map((row, index) => (
                    <tr key={index}>
                        <td>{row.porcent_users}</td>
                        <td>{row.amount_users}</td>
                        {/* <td>{row.total_mensual}</td> */}
                    </tr>
                ))}
            </tbody>

        </table>
        
        </>
    )
}


export default Ventas;
