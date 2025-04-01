import { useRealtimeData } from "../utils/channel";
import '../css/generalData.css'

export const GeneralData = () => {

    const {data:allData} = useRealtimeData('general_data')

    return(
        <>
        <h3>Datos generales</h3>
        <table className="generalData-style-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Descripción</th>
                    <th id="th-amount-id">Cantidad</th>
                </tr>
            </thead>
            <tbody>
                {allData.map((row, index) => (
                    <tr key={index}>
                        <td>{row.idgeneraldata}</td>
                        <td>{row.description}</td>
                        <td id="td-amount-id">{row.amount}</td>
                    </tr>
                ))}
                
            </tbody>
        </table>
        </>
    )

}