//import "bootstrap/dist/css/bootstrap.min.css";
//import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/estado.css'
import swal from "sweetalert";

import React, { useState, useEffect } from 'react';

import DataPrecio from "../Precio/DataPrecio";
import DataPrecioCliente from "../Precio/DataPrecioCliente";
import DataFactura from "../Venta/DataFactura";
import DataDetalle from "../Venta/DataDetalle";
import ls from "local-storage";
import moment from "moment";
import audiom from '../Img/alert.mp3';

import { io } from "socket.io-client";
import host from "../host/host";

const connectionOptions =  {
  "force new connection" : true,
  "reconnectionAttempts": "Infinity", 
  "timeout" : 10000,                  
  "transports" : ["websocket"]
};

function CobroCaja(props) {
    const [idFactura,setIdFactura]=useState("");
    const [idcliente,setIdCliente]=useState("");
    const [idEmpleado, setIdEmpleado] =useState("")
    
 
    const [idproducto, setIdproducto]=useState("");
    const [precioActual, setPrecioActual]=useState("");
 
    const [subtotal,setSubtotal]=useState(0.00);
    const [total,setTotal]=useState(0.00);
    const [descuento,setDescuento]=useState("");
    const [cambio,setCambio]=useState(0.00);
    const [recibido,setRecibido]=useState("");

       const [facActual, setFacActual] = useState();
    const [datos, setdatos] = useState([]);
    
    const [datosv, setdatosv] = useState([]);
   
    const [precioCliente,setPrecioCliente]=useState(true);
    const [precios, setPrecios]=useState([]);
    const [nuevoPrecio,setNuevoPrecio]=useState("");

    useEffect(() => {
    
       
        
        obneterEmpleado() ;
        consultaFactura();
       tarea();
      
   
     
    }, []);

 const  obneterEmpleado=()=> {    
  if(ls.get('usuario')!==null){

      setIdEmpleado(ls.get("usuario").idempleado)
  }
}

const tarea = () => {
    const socket=io(host,connectionOptions);
        console.log(socket.id)
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
      "fecha": moment(new Date()).format("YYYY-MM-DD"), 
      "total": 0 , 
      "estado": "Pendiente", 
      "lugar": 'Caja', 
  } 
  let facturaPendiente=await DataFactura.consultarFacturas(fact);
  if(facturaPendiente !== null){
    if(facturaPendiente.message==="Success"){
      setdatos(facturaPendiente.res);
    }
  }
}

    const notificar = () => {
        let sound =new Audio(audiom);
        sound.play()
      
      }
      

async function VerDetalle(row)  {
    datosv.splice(0);
    setdatosv(datosv=>[...datosv]);
    setTotal("");
    setSubtotal("")
    setDescuento("")
    setCambio("")
    setRecibido("")

    setIdFactura(row.idfactura);
    setIdCliente(row.idcliente);
    setFacActual(row)
    

    let detalles=await DataDetalle.consultarDetalle(row.idfactura);
    if(detalles !== null){
        if(detalles.message === "Success"){
            console.log(detalles.res)
            setdatosv(detalles.res)
            calcTotal(detalles.res)
        }
    }
    
}

    
        const calcDescuento= (cantidad) => {
            setDescuento(cantidad)
            if(cantidad > 0){
            setTotal(subtotal-cantidad) 
            }else{
                setTotal(subtotal)
            }

        }

        const calcCambio= (cantidad) => {
            setRecibido(cantidad)
            if(cantidad > total){
            setCambio(Math.abs(total-cantidad)) 
            }
           
        }
      
   
       
            const calcTotal=(data )=>{       
            
                   let subTotal=0;
                   data.map((item)=>{       
                   // subTotal=Number(subTotal)+Number(item.yardatotal*item.precio_yarda);
                   subTotal=Number(subTotal)+ Number(item.total);
                    console.log("sutbotal: "+ subTotal);
                    return true;
                })
                console.log("subtotal a guardar" + subTotal);
                setSubtotal(subTotal);
                setTotal(subTotal)
            
               

            }

      



    
const detalleItem = (data) => {
  let item={
    "iddetalle":0,
    "idfactura":idFactura,
    "idproducto":data.idproducto,
    "rollo":data.cant_rollo,
    "yarda":data.yardatotal,
    "precio":data.precio_yarda,
    "total":data.total,

  }
 
  return item
}

 async function vender(estados) {
    
let fact={
    "idfactura":facActual.idfactura, 
    "idcliente": facActual.idcliente, 
    "idempleado":facActual.idempleado, 
    "fecha": moment(facActual.fecha).format("YYYY-MM-DD"), 
    "total": total ? total : 0 , 
    "estado": estados, 
    "lugar": facActual.lugar, 
}
console.log(fact)
let ingresado=await DataFactura.actualizarReg(fact);
    if(ingresado !== null){
        if(ingresado.message==="Success"){
            await Promise.all(   
                datosv.map(async (item) =>{
                let row=detalleItem(item)
                console.log(row)
                let detalleIngresado=await DataDetalle.actualizarReg(row);
                if(detalleIngresado !== null){
                    if(detalleIngresado.message === "Success" ){
                        console.log("detalle ingresado");
                    }
                }
                return true;
            })
            )
eliminar(fact);
        }
    }

   imprimirBoleta();
    

    borraDatosVenta();
    
    
 }
 const eliminar=(data)=>{
    console.log(data)


 
   datos.map((item, index)=>{
       if(data.idfactura===item.idfactura){
           
               console.log("numero de indice: " + index)
           datos.splice(index,1)     
           
           setdatos(datos=>[...datos]);
           
       }
       return true;
   })

     }     
const borraDatosVenta = () => {
    setFacActual("");
    datosv.splice(0);
    setdatosv(datosv=>[...datosv]);
    setTotal("");
    setSubtotal("")
    setDescuento("")
    setCambio("")
    setRecibido("")

}

          
 async function consultaPrecio(id) {
let dat = await DataPrecio.consultarXPro(id);
if (dat !== null) {
    console.log(dat.res);
    setPrecios(dat.res);
}
}

async function consultaPrecioCliente(datos) {
    let dat = await DataPrecioCliente.consultarXCliente(datos);
    if (dat !== null) {
        console.log(dat.res); 
        setPrecios(dat.res);
    }
}    
            
        const seleccionarPrecio = (tipo, id,actual,e) => {
            setPrecios([]);
            switch(tipo){
                case "normal":
                    consultaPrecio(id)
                    break;
                case "cliente":   
               let  data={
                   idprecio:0,
                   idproducto:id,
                   idcliente:idcliente,
                   preciorollo:0,
                   precioyarda:0
                }
                    consultaPrecioCliente(data);
                    break;
                 
                default:
                    break;
            }
            setIdproducto(id);
            setPrecioActual(actual)
        
            var myInput = document.getElementById("modalPrecio");
            e.addEventListener("shown.bs.modal", function () {
                myInput.focus();
            });
        }
        

const ModificarPrecio=(data, nuevoPrecio)=>{
    datosv.map((item) =>{
        if(item.idproducto === data.idproducto){
            item.precio=nuevoPrecio;
            item.total=((Number(item.rollo)*Number(item.yardaporrollo)) + Number(item.yarda))*Number(item.precio);
           
        }
        return true;
    })
     setdatosv(datosv => [...datosv]);
    calcTotal(datosv);
}
const ActualizarPrecio = () => {

   datosv.map((item) =>{
        if(item.idproducto === idproducto){
            item.precio=nuevoPrecio;
            item.total=((Number(item.rollo)*Number(item.yardaporrollo)) + Number(item.yarda))*Number(item.precio);
           
        }
        return true;
    })
    setNuevoPrecio("");
     setdatosv(datosv => [...datosv]);
    calcTotal(datosv);  
}


const imprimirBoleta = () => {
    swal("¡Desea imprimir el comprobante de venta?",
    {
        icon: "warning",
        buttons: {
          cancel: "No",
        Sí: true,
        },
      })
      .then((si) => {
        if (si) {
          var content=document.getElementById("factura").innerHTML;
    let w=window.open();
    w.document.write(content);
    w.document.close();
    w.focus();
    w.print();
    w.close();

         borraDatosVenta();
    return true;
 

        } else{
           
            borraDatosVenta();
        }
      });
   
}


     

  
return (
<div className="p-contain">
   
    <div className="h-contain d-flex flex-wrap-reverse">     
        <h6>Cobro en caja</h6>
    </div>
       
      
 
 {/* * comienzo del modal de precio 
 */}
 
 <div className="modal fade "  id="precioModal" tabIndex="-1" aria-labelledby="precioModalLabel" aria-hidden={true}  >
  <div className="modal-dialog  modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Seleccione el Precio</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="form-outline mb-4">
    
        <input type="text" id="form1Example1" className="form-control" value={idproducto}  hidden={true}  onChange={()=>{}}/>
   <label className="form-label" htmlFor="form1Example1" >Precio actual: Q{precioActual}</label>
  </div>

  <div className="form-outline mb-4">
      <h6>Precio por Rollo</h6>
      {precios ? 
      <select className="form-select" id="floatingSelectGrid" data-live-search="true" data-size="8" aria-label="Floating label select example" value={nuevoPrecio} onChange={(e)=>setNuevoPrecio(e.target.value)}>
      <option value="" >Seleccionar precio</option>
     { precios.map((item, index) =>(
        
      <option key={index} value={item.preciorollo} >{" " +item.preciorollo}</option>
     
      ))
     }
 </select>
      
      :null}
     
  </div>
  <div className="form-outline mb-4">
      <h6>Precios por yarda</h6>
      {precios ? 
      <select className="form-select" id="floatingSelectGrid" data-live-search="true" data-size="8" aria-label="Floating label select example" value={nuevoPrecio} onChange={(e)=>setNuevoPrecio(e.target.value)}>
       <option value="" >Seleccionar precio</option>
     { precios.map((item,index) =>(
        
      <option key={index} value={item.precioyarda} >{" " +item.precioyarda}</option>
     
      ))
     }
 </select>
      
      :null}
     
  </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>ActualizarPrecio()} >Aplicar</button>
      </div>
    </div>
  </div>
</div>
 {/** final del modal precio  _____________________________________________________*/}
 
    <div className="row">
    <div className="col-12 col-sm-12 col-md-9 col-lg-9">
            <div className="col div-secc ">
                <div className="table-wrap  ">
                    <table className="table-item">
                        
                        <thead >
                            <tr >
                                <th >#</th>
                                <th >Empleado</th>
                                <th >Cliente</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Estado</th>
                              
                            </tr>
                        </thead>
                        <tbody >
                            {datos ? datos.map((item,index) => (
                                <tr key={index} onClick={()=>VerDetalle(item)}>
                                    <td >{item.idfactura}</td>
                                    <td >{item.empleado}</td>
                                    <td >{item.cliente}</td>
                                    <td>{moment(item.fecha).format("YYYY-MM-DD")}</td>
                                    <td>{item.total}</td>
                                    <td>{item.estado}</td>
                                    
                                  
                                </tr>
                            ))
                            : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
             <h6 className="text-black" >Lista de producto del cliente</h6>
            <div className="col div-secc ">
                <div className="table-wrap">
                    <table className="table-subitem">
                  
                        <thead >
                            <tr>
                                <th></th>
                                <th>Descripcion</th>
                                <th>Rollo</th> 
                                <th>Yarda</th>
                                <th>Total de yarda</th>
                                <th>precio yarda</th>
                                <th>Subtotal</th>
                               
                            
                             
                                
                            </tr>
                        </thead>
                        <tbody>
                            {datosv ? datosv.map((item,index) => (
                            <tr key={index} >
                                <td></td>
                                <td>{item.descripcion}</td>
                                
                                <td>{item.rollo}</td>
                                <td>{item.yarda}</td>
                                <td >{item.rollo+item.yarda}</td>
                                <td>
                                    <div className="d-flex  align-items-center ">
                                        <input onChange={(e)=>{ModificarPrecio(item,e.target.value)}} className="form-control form-control-sm " value={item.precio}/> 
                                        <i className="fa fa-pencil-square-o ms-1 fa-lg ms-1 " aria-hidden="true" data-bs-toggle="modal" data-bs-target="#precioModal" style={{color:"#1C78E3"}} onClick={(e)=>seleccionarPrecio("normal",item.idproducto,item.precio_yarda,e.target)}></i>
                                        {precioCliente ? 
                                        <i className="fa fa-address-card fa-lg ms-1" aria-hidden="true" data-bs-toggle="modal" data-bs-target="#precioModal"  style={{color:"#2ED19E"}} onClick={(e)=>seleccionarPrecio("cliente",item.idproducto,item.precio_yarda,e.target)}></i> 
                                        : null}
                                    </div> 
                                </td>
                                <td className="text-center">{item.total}</td>   
                               
                               
                            </tr>
                            ))
                            : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
           
        </div> 
        <div className="col-12 col-sm-12 col-md-3 col-lg-3 div-cobro ">
                       
  <div class="row mb-2 mt-3">
  <label for="inputPassword3" class="col-sm-4 col-form-label">Subtotal</label>
    <div class="col-sm-8">
    <input className="form-control" value={subtotal} disabled /> 
    </div>
  </div>

  <div class="row mb-2">
    <label for="inputPassword3" class="col-sm-4 col-form-label">Descuento:</label>
    <div class="col-sm-8">
      <input type="number" class="form-control" value={descuento} onChange={(e)=>calcDescuento(e.target.value)}/> 
    </div>
  </div>
  <div class="row mb-2">
    <label for="inputPassword3" class="col-sm-4 col-form-label">Total:</label>
    <div class="col-sm-8">
      <input type="number" class="form-control" disabled value={total}/> 
    </div>
  </div>
  <div class="row mb-2">
    <label for="inputPassword3" class="col-sm-4 col-form-label">Recibido:</label>
    <div class="col-sm-8">
      <input type="number" class="form-control" value={recibido} onChange={(e)=>calcCambio(e.target.value)}/>
    </div>
  </div>
  <div class="row mb-3">
    <label for="inputPassword3" class="col-sm-4 col-form-label">Cambio:</label>
    <div class="col-sm-8">
      <input type="number" class="form-control" disabled value={cambio} />
    </div>
  </div>
  <div className="row d-flex justify-content-center">
    <button type="button" className="btn btn-primary w-75 mb-2 " onClick={() =>vender("Vendido")} >Cobrar</button>
   
  </div> 
                
            </div>
    </div>
    {/**detalles del comprobante de venta */}
    <div className="rowfac" id="factura">
        <div>
            <h5>Distribuidora textiles GS</h5>
            
        </div>

 <div className="colfac">
                    <table className="table">
                  
                        <thead >
                            <tr>
                       
                                <th className="col-md-3">Descripcion</th>
                                <th>Rollo</th> 
                                <th>Yarda</th>
                                <th>Total de yarda</th>
                                <th>Precio</th>
                                <th  className="text-center">Subtotal</th>
                             
                                
                            </tr>
                        </thead>
                        <tbody>
                            {datosv ? datosv.map((item,index) => (
                            <tr key={index} >
                          
                                <td className="col-md-3">{item.descripcion}</td>
                               
                                <td >{item.cant_rollo}</td>
                                <td >{item.cant_yarda}</td>
                                <td >{item.yardatotal}</td>
                                <td >{item.precio_yarda}</td>
                               
                                <td className="text-center">{item.total}</td>   
                              
                            </tr>
                            ))
                            : null
                            }
                        </tbody>
                    </table>
                </div>
  
    <div className="rowfoot" id="rowfoot">
    <div className="colf">
                    <span>Subtotal: {"Q "+subtotal+" "}</span>
                    </div>
                    <div className="colf">   
                    <span>Descuento: { "Q "+ descuento}</span> 
                    </div>                   
                    <div className="colf">
                    <span>Total: {"Q "+total+" "} </span> 
                    </div> 
    </div>
</div>
</div>


    );
}
export default CobroCaja;
