//import "bootstrap/dist/css/bootstrap.min.css";
//import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/estado.css'
import DataProducto from "../Producto/DataProducto";
import DataProveedor from "../Proveedor/DataProveedor";
import DataBodega from "./DataBodega";
import moment from "moment";
import audiom from '../Img/alert.mp3';
import swal from "sweetalert";

import React, { useState,useEffect } from 'react';
import ls from "local-storage";
import { io } from "socket.io-client";
import host from "../host/hostweb";
import connectionOptions from "../host/connectionOptions";


function Bodega(props)  {
  const [idproducto, setidproducto] = useState("");
  const [idproveedor, setidproveedor] = useState("");
  const [nombrepro, setnombrepro] = useState("");
  const [estilo, setestilo] = useState(""); 
  const [color, setcolor] = useState("");
  const [cant_rollo, setcant_rollo] = useState(""); 
  const [yardaporrollo, setyardaporrollo] = useState("");
  const [cant_yarda, setcant_yarda] = useState(cant_rollo*yardaporrollo);
  const [precio_compra, setprecio_compra] = useState(0);
  const [ubicacion, setubicacion] = useState("Bodega");

  const [datos, setdatos] = useState([]);
  const [datosp, setdatosp] = useState([]);
  const [encontrado, setencontrado] = useState([]);
  const [buscar, setbuscar] = useState("");
  const [accion, setaccion] = useState("new")
  const [medir, setMedir] = useState(false)
  const [notify, setNotify] = useState(0)
  const [datosDespacho, setDatosDespacho] = useState([]);
  const [datosDB, setDatosDB] =useState([]);
  const [load, setload] = useState(false);
  const [proveedor, setproveedor] = useState(false);

 



  useEffect(()=>{
    acceso("Proveedor")
    setload(true)
    tarea();
    consultarProducto();
    consultarProveedor();
    consultarDespacho()
    
}, []);
const acceso = (modulo) => {
  let permiso=ls.get("permiso");
  permiso.map((item) =>{
      if(item.nombre === modulo){
          if(item.escritura ===1){
              setproveedor(true);
          }
      }
      return true;
  })
  
}
const tarea = () => {
  setload(false)
  const socket=io(host,connectionOptions);
      console.log(socket)
     socket.on("Bodega",function(data){
        console.log(data)
        consultarDespacho()
        notificar()
        //datosDespacho.push(data);
       });
    
  
}
const notificar = () => {
  let sound =new Audio(audiom);
  sound.play()
}

async function consultarProducto() {
  let dat = await DataProducto.consultarxUbicacion("Bodega");
  if (dat !== null) {
  console.log("🚀 ~ file: App.js ~ line 24 ~ consultarProducto ~ dat", dat);
    console.log(dat.res);
    setencontrado(dat.res);
    setdatos(dat.res); 
    
  }
}
async function consultarProveedor() {
  let datp = await DataProveedor.consultar();
 console.log(datp);
  if (datp !== null) {
 /* console.log("🚀 ~ file: App.js ~ line 24 ~ consulta proveedor ~ dat", dat);*/

   console.log(datp);
    setdatosp(datp.res);
  }
}

const DBodegaItem = () => {
  let item={
    "iddespacho":0,
    "idfactura":0,
    "idproducto":0,
    "descripcion":null,
    "rollo":0,
    "yarda":0,
    "ubicacion":"Bodega",
    "estado":null,

  }
 // console.log(item)
  return item
}
async function consultarDespacho() {
  let dat = await DataBodega.consultarMDespacho(DBodegaItem());
  if (dat !== null) {
    if(dat.message==="Success"){
    console.log(dat.res); 
    setDatosDB(dat.res);
    setNotify(dat.res.length) 
    }else{
      setDatosDB([]);
      setNotify("") 
    }
    
  }
}
async function abrirIngreso(e){
  limpiar();
  var myInput = document.getElementById("exampleModal");
  e.addEventListener("shown.bs.modal", function () {
    myInput.focus();
  });

}

const setMedidas = (params) => {
  consultarDespacho();
  setMedir(params) 
}


async function guardar(){
if(accion==="new"){


  let data={
    idproducto:0,
    idproveedor:idproveedor,
    nombre:nombrepro,
    estilo:estilo,
    color:color,
    cant_rollo:cant_rollo, 
    cant_yarda:cant_yarda,
    precio_compra:precio_compra,
    ubicacion:ubicacion,
  
  }
   let productod=await DataProducto.nuevoReg(data);
   if(productod !== null){
     if(productod.message ==="Success"){
  limpiar();
  swal("Producto", "Ingresado exitosamente", "success");
     consultarProducto();
     }else{
      swal("Aviso", "No se ingreso verifique que tiene ingresado los datos correcto", "warning");
   }
  
   }
   
  }else{
    let data={
      idproducto:idproducto,
      idproveedor:idproveedor,
      nombre:nombrepro,
      estilo:estilo,
      color:color,
      cant_rollo:cant_rollo, 
      cant_yarda:cant_yarda,
      precio_compra:precio_compra,
      ubicacion:ubicacion,
    }
     let productos=await DataProducto.actualizarReg(data);
     if(productos !== null){
    if(productos.message==="Success"){
      swal("Producto", "Actualizado exitosamente", "success");
      limpiar();
       consultarProducto();
     }}
   }
   
  

}
const limpiar=()=>{
  setidproducto("");
  setidproveedor("");
  setnombrepro("");
  setestilo("");
  setcolor("");
  setcant_rollo("");
  setcant_yarda("");
  
  //etyardaporrollo("");setprecio_compra("");
  //setubicacion("");
}

async function despacharMedida(data){
  let row={
    "iddespacho":data.iddespacho,
    "idfactura":data.idfactura,
    "idproducto":data.idproducto,
    "descripcion":data.descripcion,
    "rollo":data.rollo,
    "yarda":data.yarda,
    "ubicacion":data.ubicacion,
    "estado":"Despachado",
  }
let despachado=await DataBodega.actualizarReg(row);
if (despachado!==null){
  if(despachado.message === "Success"){
    swal("producto despachado");
  consultarDespacho();
}
}
}

const Busqueda =(buscarTexto)=>{
let text=buscarTexto.replace(/^\w/,(c) =>c.toLowerCase());
setbuscar(buscarTexto);
setdatos(encontrado.filter(function(item){
    return item.nombre.toLowerCase().includes(text) || item.color.toLowerCase().includes(text) || item.estilo.toLowerCase().includes(text) || item.ubicacion.toLowerCase().includes(text) ;   
  }).map(function({idproducto, idproveedor, nombre, estio, color, cant_rollo,yardaporrollo, cant_yarda, precio_compra,  ubicacion}){
    return{idproducto, idproveedor, nombre, estio, color,cant_rollo,yardaporrollo, cant_yarda, precio_compra,   ubicacion}
  })
 );
  }
  const salir = (params) => {
    setMedir(params);
    setNotify(0)
    datosDespacho.splice(0);
    
  }
  
function ListaProducto(){
return(
  <div className="div-table">
  <div className="table-wrap">
  <table className="table-item">
    <thead >
    <tr>
      <th>#</th>
      <th>Descripcion</th>
      <th>Proveedor</th>
      <th>Fecha ingreso</th>
      <th>Cantidad de Rollo</th>
      
      <th>Cantidad yarda</th>
      <th>Ubicacion</th>
   
    </tr>
  </thead>
 <tbody>
{ datos ?
     datos.map((item, index) =>(
      <tr key={index}>
           <td>{item.idproducto}</td> 
           <td>{item.nombre} {item.estilo} {item.color}</td>
         <td>{proveedor === true ? item.porveedor : null}</td>
         <td>{moment.utc(item.fecha_ingreso).format("DD/MM/YYYY")}</td>
        
         <td>{item.cant_rollo}</td>
          
         <td>{item.cant_yarda}</td>  
         <td>{item.ubicacion}</td>
      
       </tr>
     )) 
     : null
     

     }

 </tbody>
</table>
</div></div>
);
}
function ListadoAMedir(){

return (
<div>
  <div>
<nav className="navbar navbar-light bg-light ">
  <div className="container-fluid justify-content-end">
    <button className="btn btn-outline-dark btn-sm" onClick={()=>salir(false)} >Cerrar</button>
  </div>
</nav>

  </div>
  <div className="div-table">
<div className="table-wrap">
<table className="table-item">
  <thead >
    <tr>
     {/**  <th>#</th>*/}
      <th>Orden</th>
      <th>Descripcion</th>
      <th>Cantidad  de Rollo</th>
      <th>Cantidad yarda</th>
      <th>Ubicacion</th>
      <th>Estado</th>
      <th>Acción</th>
    
    </tr>
  </thead>
 <tbody>
{ datosDB ?
     datosDB.map((item, index) =>(
      <tr key={index}>
        {/**  <td>{item.iddespacho}</td>*/}
         <td>{item.idfactura}</td>
         <td>{item.descripcion}</td>
         <td>{item.rollo}</td>
          
         <td>{item.yarda}</td>  
         <td>{item.ubicacion}</td>
         <td>{item.estado}</td>
         <td>
         <button type="submit" className="ms-2 btn btn-outline-primary btn-sm" onClick={()=> despacharMedida(item)} >Despachar</button>
         </td>
       </tr>
     )) 
     : null
     

     }

 </tbody>
</table>
</div>
</div>
</div>
);
}
 

    return(
      <div className="container-fluid">
     
      <div className="row mb-2">
      <div className="col-9">
      <div className="input-group" >
                  <div className='input-group-text'>
                    <span className="fa fa-search input-gruop-text icon-search"></span>
                    </div>
            <input type="text" className="form-control " placeholder="Buscar Producto..."  value={buscar}  onChange={(e)=>Busqueda(e.target.value)} />
                                         
        </div>
                             
     </div> 
    <div className="col-sm">
      <button type="button" className="ml-2 btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e)=>abrirIngreso(e.target)} >nuevo</button>
      
      </div>
      <div className="col-sm">
      <div className="icon-wrappers" onClick={()=>setMedidas(true)}>
      
      <i className="fas fa-bell fa-lg icon-color" ></i>
      <span className="badge" >{notify}</span>
      </div>
    </div> 



</div>


<div
    className="modal fade"
    id="exampleModal"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden={true}
  >
<div className="modal-dialog  modal-dialog-scrollable" >
<div className="modal-content">
<div className="modal-header">
  <h5 className="modal-title">Ingresar nuevo producto</h5>
  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div className="modal-body">
<div className="form-outline mb-4">
   <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo del producto</label>   
<input type="text" id="form1Example1" className="form-control" hidden= {true} value={idproducto} onChange={(e) => setidproducto(e.target.value)} />

</div>
<div className="form-outline mb-4">
<label className="form-label" htmlFor="form1Example1" >Proveedor</label>

<select className="form-select" aria-label="Default select example"   value={idproveedor} onChange={(e)=>setidproveedor(e.target.value)}>
<option>Seleccione un proveedor</option>
{
datosp ?
     datosp.map((item,index) =>(
<option key={index} value={item.idproveedor}  >{item.nombre}</option>
     ))
     :
     null
}


</select>
</div>
<div className="form-outline mb-4">
<label className="form-label" htmlFor="form1Example1" >Nombre</label>
<input type="text" id="form1Example1" className="form-control" value={nombrepro}  onChange={(e) => setnombrepro(e.target.value)} />

</div>
<div className="form-outline mb-4">
 <label className="form-label" htmlFor="form1Example1" >Estilo</label>
  <input type="text" id="form1Example1" className="form-control" value={estilo}  onChange={(e) => setestilo(e.target.value)} />

</div>
<div className="form-outline mb-4">
 <label className="form-label" htmlFor="form1Example1" >Color</label>
  <input type="text" id="form1Example1" className="form-control" value={color}  onChange={(e) => setcolor(e.target.value)} />

</div>

<div className="form-outline mb-4">
 <label className="form-label" htmlFor="form1Example1" >Cantidad de Rollo</label>
  <input type="text" id="form1Example1" className="form-control" value={cant_rollo}  onChange={(e) => setcant_rollo(e.target.value)} />
</div>
<div className="form-outline mb-4">
 <label className="form-label" htmlFor="form1Example1" >Cantidad de yarda</label>
  <input type="text" id="form1Example1" className="form-control" value={cant_yarda} onChange={(e)=>setcant_yarda(e.target.value)}  />

</div>


</div>
<div className="modal-footer">
  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
  <button type="button" className="btn btn-primary" onClick={()=>guardar()} >Guardar</button>
</div>
</div>
</div>
</div>
<div>
{medir === true ? <ListadoAMedir  /> : <ListaProducto  /> }
</div>


  </div>
        

    );
        }
    export default Bodega;
    