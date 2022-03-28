//import "bootstrap/dist/css/bootstrap.min.css";
//import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/estado.css'
import DataFactura from "../Venta/DataFactura";

import CobroCaja from "./CobroCaja";
import HistorialVenta from "./HistorialVenta";
import moment from "moment";
import audiom from '../Img/alert.mp3';

import React, { useState,useEffect } from 'react';

import { io } from "socket.io-client";
import host from "../host/hostweb";
import connectionOptions from "../host/connectionOptions";


function Caja(props)  {
  const [cobro, setCobro] = useState(false)
  const [notify, setNotify] = useState(0)
  const [fecha,setFecha]=useState(moment.utc(new Date()).format("YYYY-MM-DD"));
  const [factura, setFactura] = useState([])



  useEffect(()=>{
    tarea();
    
    consultaFactura();

}, []);


const tarea = () => {
  const socket=io(host,connectionOptions);
     
     socket.on("Caja",function(data){
        console.log(data)
      consultaFactura();
        notificar()
      
        //datosDespacho.push(data);

       });
    
  
}




async function consultaFactura(){
  let fact={
    "idfactura":0, 
    "idcliente": 0, 
    "idempleado":0, 
    "fecha": fecha, 
    "total": 0 , 
    "estado": "Pendiente", 
    "lugar": 'Caja', 
} 
let facturaPendiente=await DataFactura.consultarFacturas(fact);
if(facturaPendiente !== null){
  if(facturaPendiente.message==="Success"){
    setFactura(facturaPendiente.res);
    setNotify(facturaPendiente.res.length)
  }else{
    setFactura([]);
  }
}

}

const notificar = () => {

  let sound =new Audio(audiom);
  sound.play()

}


const setMedidas = (params) => {
  setCobro(params) 
}




 

    return(
      <div className="container-fluid">
          <h6>Caja</h6>
      <div className="row d-flex   mb-1">
      <nav className="navbar navbar-light ">
               <form className="container-fluid justify-content-end">
               <button type="button" className="ml-5 btn btn-primary"  onClick={()=>setMedidas(false)} >Historial de venta</button>
               <div className="icon-wrappers ms-2" onClick={()=>setMedidas(true)}>
      <i className="fas fa-bell fa-lg icon-color" ></i>
      <span className="badge" >{notify}</span>
      </div> 
               </form>
              </nav>
   
   

</div>
<div>
  {/*______________________*/}
</div>

<div>
{cobro === true ? <CobroCaja  /> : <HistorialVenta  /> }
</div>


  </div>
        

    );
        }
    export default Caja;
    