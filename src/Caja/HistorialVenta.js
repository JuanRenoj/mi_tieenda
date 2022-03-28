import React,{useState,useEffect} from 'react'
import moment from 'moment';
import DataDetalle from '../Venta/DataDetalle';
import DataFactura from '../Venta/DataFactura';
import '../css/estado.css';


function HistorialVenta(props) {
    const [factura, setFactura] = useState([]);
    const [detalle, setDetalle] = useState([]);
    const [fecha, setfecha] = useState("");

    useEffect(() => {
      consultaVenta();
      setfecha(moment(new Date()).format("YYYY-MM-DD"))
    }, [])

    async function consultaVenta(){
        let row={
            "idfactura":0, 
            "idcliente": 0, 
            "idempleado":0, 
            "fecha": fecha, 
            "total": 0 , 
            "estado": "Pendiente", 
            "lugar": 'Caja', 
        }
        let datosfactura=await DataFactura.consultar();
        if(datosfactura !== null){
            if(datosfactura.message === "Success"){
                console.log(datosfactura.res);
                setFactura(datosfactura.res);
            }
        }
        
    }
async function verDetalle (item,e)  {
 
   let detalle=await DataDetalle.consultarDetalle(item.idfactura);
   if(detalle !== null){
       if(detalle.message ==="Success"){
           setDetalle(detalle.res)
       }
   }
   
   var myInput = document.getElementById("exampleModal");
   e.addEventListener("shown.bs.modal", function () {
     myInput.focus();
   });
}

    return(
        <div className ="contain-fluid">
          <div className='div-table'>
        <div className="table-wrap">
        <table className="table-item">
        <thead >
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Empleado</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Lugar</th>
            </tr>
          </thead>
         <tbody>
        { factura ?
             factura.map((item, index) =>(
              <tr key={index} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e)=>verDetalle(item,e.target)}>
                 <td>{item.idfactura}</td>
                 <td>{moment(item.fecha).format("DD/MM/YYYY")}</td>
                 <td>{item.cliente}</td>
                 <td>{item.empleado}</td>
                  <td>{item.total}</td>
                 <td>{item.estado}</td>  
                 <td>{item.lugar}</td>
              
               </tr>
             )) 
             : null
             
        
             }
        
         </tbody>
        </table>
        </div>
     </div>
      <div>       
{/**modal de ingresar producto */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={true}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Detalle de la venta</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
     
      <div className="modal-body"> 
      <div className="table-wrap">
      <table className="table-item">
        <thead >
            <tr>
              <th>#</th>
              <th>Descripcion</th>
              <th>Rollo</th>
              <th>Yarda</th>
              <th>Precio </th>
              <th>Subtotal </th>
            </tr>
          </thead>
         <tbody>
        { detalle ?
             detalle.map((item, index) =>(
              <tr key={index} >
                 <td>{item.idfactura}</td>
                 <td>{item.descripcion}</td>
                  <td>{item.rollo}</td>
                 <td>{item.yarda}</td>  
                 <td>{item.precio}</td>
                 <td>{item.total}</td>
               </tr>
             )) 
             : null
             
        
             }
        
         </tbody>
        </table>

      </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Salir</button>
      
      </div>
    </div>
  </div>
</div>

  
</div>



 </div>
     
        );
}

export default HistorialVenta;