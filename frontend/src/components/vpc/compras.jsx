import { useRealtimeData, useServicesData } from '../../utils/channel';
import '../../css/compras.css';

export const SummaryGeneralData = () => {

    const {data:general_data} = useRealtimeData('general_data');

    return (
        <>
        <h3>Datos generales</h3>
         <table className='summary-style-table'>
            
            <thead>
                <tr id='tr-style-table'>
                <td>Retención de usuarios</td>
                <td>Número de consultas mensuales</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>
                    {general_data.find(row => row.description === "Objetivo de usuarios en 1 año")?.amount || 'N/A'}
                </td>
                <td>
                    {general_data.find(row => row.description === "Número de consultas mensuales")?.amount || 'N/A'}
                </td>
                </tr>
            </tbody>
         </table>
            
        </>
    )
};


export const ProveedoresAndServices = () => {

    const {data:suppliers} = useRealtimeData('suppliers');
    const {services, suppliersWithServices} = useServicesData();

    // Mapa de servicios por proveedor (para rápido acceso)
    const servicesBySupplier = suppliersWithServices.reduce((acc, item) => {
        const supplierId = item.fk_supplier.idsupplier;
        if (!acc[supplierId]) acc[supplierId] = new Set();
        acc[supplierId].add(item.fk_applicable_service.id_applicable_services);
        return acc;
    }, {});

    return (
        <>
        <h3>Proveedores y servicios</h3>
        <table className='compras-style-table'>
            <thead>
                
                <tr>
                    {/* <th>Id</th> */}
                    <th>Proveedor</th>
                    <th>Unidad de medida</th>
                    {services.map(service =>
                        <th key={service.id_applicable_services}>{service.service_name}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {suppliers.map((row) => (
                    <tr key={row.idsupplier}>
                        {/* <td>{row.idsupplier}</td> */}
                        <td>{row.supplier_name}</td>
                        <td>{row.unidad_de_medida}</td>
                        {services.map(service => (
                            <td key={service.id_applicable_services}>
                                {servicesBySupplier[row.idsupplier]?.has(service.id_applicable_services) ? '✓' : ''}
                            </td>
                        ))}                        
                    </tr>
                ))}
                    
            </tbody>
        </table>
        </>
    )

}


export const Compras = () => {

   const {data:suppliers} = useRealtimeData('suppliers');
   const {data:data_vpc_format} = useRealtimeData('vpc_format');

   return (
      <>
      <h3>Compras</h3>
      <table className='compras-style-table'> 
        <tbody>
         <tr id='compras-style-tr'>
            <th>Taza de conversión</th>
            <th>Número de usuarios que pagan</th>
            <th>Total al mes</th>
            {suppliers.map((row, index) => (
               <th key={index}>{row.supplier_name}</th>
            ))}
         </tr>
         </tbody>
         <tbody>
            {data_vpc_format.map((row, index) => (
                <tr key={index}>
                    <td>{row.porcent_users}</td>
                    <td>{row.amount_users}</td>
                    <td>${row.total_mensual}</td>
                </tr>
            ))}
         </tbody>
      </table>
      </>
   )
}

const ViewCompras = () =>{

    return (
        <>
        
        <div>
            <h1><center>Welcome to Compras</center></h1>
        </div>
        <h2>Datos generales</h2>

        <SummaryGeneralData />
        
        </>
    )
}

export default ViewCompras;