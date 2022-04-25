
import '../css/estado.css';

import DataProducto from "../Producto/DataProducto";


import DataPrecioCliente from "../Precio/DataPrecioCliente";
import DataCliente from "../Cliente/DataCliente";

import React, { useState,useEffect } from 'react';

import swal from "sweetalert";


function PrecioCliente(props)  {

    const [datos, setdatos] = useState([]);
    const [encontrado, setencontrado] = useState([]);
    const [buscar, setbuscar] = useState("");
    const [tipo, settipo] = useState("");
   
    const [accionC, setaccionC] = useState("new");
    
  
    const [idproducto, setidproducto] = useState("");
    const [idcliente,setIdCliente]=useState("");
   
    const [idprecio2, setidprecio2] = useState("")
   
    const [precio_rollo2, setprecio_rollo2] = useState("");
    const [precio_yarda2, setprecio_yarda2] = useState("");
    const [datoscl, setdatoscl] = useState([]);

    const [cliente, setcliente] = useState("");
const [preciosCliente, setpreciosCliente] = useState([])

    useEffect(()=>{
        settipo("normal");
        consultarCliente();
        consultarProducto();
    }, []);

   async function consultarProducto() {
        let dat = await DataProducto.consultar();
        if (dat !== null) {
        console.log("🚀 ~ file: App.js ~ line 24 ~ consultarProducto ~ dat", dat);
          console.log(dat.res);
          setencontrado(dat.res); 
          setdatos(dat.res);
        }
      }
      async function consultarCliente() {
        let datc = await DataCliente.consultar();
      
        if (datc !== null) {
            if(datc.message ==="Success"){
              console.log(datc.res)
          setdatoscl(datc.res);
            }
         
        }
      
      }
      
      
    
      async function ConsultaPrecioCliente(codigo){
        setidproducto(codigo);
        let precios =await DataPrecioCliente.consultarPXCliente(codigo);
        if(precios !== null){
            console.log("preciosCliente",precios)
            if(precios.message ==="Success"){
                console.log("preciosCliente",precios.res)
                setpreciosCliente(precios.res);

            }
        }
    }

      
      const  abrirPrecioxcliente =(e,idpro)=>{
        setidproducto(idpro)
        setIdCliente("")
        setprecio_rollo2("");
        setprecio_yarda2("");
         var myInput = document.getElementById("preciocModal");
         e.addEventListener("shown.bs.modal", function () {
           myInput.focus();
         });
       
       }
       
      const  abrirPrecioxclienteActualiza =(e,item)=>{
        setidproducto(item.idproducto);  
        setidprecio2(item.idprecio);
        setprecio_rollo2(item.preciorollo);
        setprecio_yarda2(item.precioyarda);
        setaccionC("update")
        setIdCliente(item.idcliente);
        setcliente(item.cliente);
         var myInput = document.getElementById("precioaModal");
         e.addEventListener("shown.bs.modal", function () {
           myInput.focus();
         });
       
       }
     
       
    /*guardar precio por cliente*/
    async function guardarpreciocliente(){
        if(accionC==="new"){
      let datosprecio = {
        "idprecio":0,
        "idproducto":idproducto,
        "idcliente":idcliente,
        "preciorollo":precio_rollo2,
        "precioyarda":precio_yarda2
      
      }
    
      let precioingresado= await DataPrecioCliente.nuevoReg(datosprecio);
      console.log(precioingresado)
      if(precioingresado !== null){
        if (precioingresado.message==="Success") {
        
          swal("Precio","Ingresado con exito","success");
          ConsultaPrecioCliente(idproducto);
        }else{
          swal("Aviso","No se pudo Ingresar el precio, verifique se que los datos son correctos","warning");
        }
      }}else{
        let datosprecio = {
            "idprecio":idprecio2,
            "idproducto":idproducto,
            "idcliente":idcliente,
            "preciorollo":precio_rollo2,
            "precioyarda":precio_yarda2
          
          }
          let precioingresado= await DataPrecioCliente.actualizarReg(datosprecio);
          console.log("act",precioingresado)
          if(precioingresado !== null){
            if (precioingresado.message==="Success") {
         
              swal("Precio","Actualizado con exito","success");
              ConsultaPrecioCliente(idproducto);

            }
          }  
      }
      //console.log(datosprecio)
      }
    
      const Busqueda =(buscarTexto)=>{
        let text=buscarTexto.replace(/^\w/,(c) =>c.toLowerCase());
        setbuscar(buscarTexto);
        setdatos(encontrado.filter(function(item){
            return item.nombre.toLowerCase().includes(text) || item.color.toLowerCase().includes(text) || item.estilo.toLowerCase().includes(text) || item.ubicacion.toLowerCase().includes(text) ;   
          }).map(function({idproducto, idproveedor, nombre, estio, color, cant_rollo,yardaporrollo, cant_yarda, precio_compra,preciorollo,precioyarda,  ubicacion}){
            return{idproducto, idproveedor, nombre, estio, color,cant_rollo,yardaporrollo, cant_yarda, precio_compra, preciorollo,precioyarda,  ubicacion}
          })
         );
          }

   async function eliminarPrecioc(codigo){
    let eliminarprecio=await DataPrecioCliente.borraReg(codigo);
    if(eliminarprecio !== null){
        if(eliminarprecio.message==="Success"){
            
            swal("Precio","Eliminado con exito","success");
            ConsultaPrecioCliente(idproducto);
        }
    }
   }

return(
  <div className="container-fluid">
           <div className="mb-2">   <h5 className="modal-title">Precios por cliente</h5></div>

  
{/**modal de ingresar precio de venta por cliente*/}
<div
          className="modal fade"
          id="precioaModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
  <div className="modal-dialog  modal-dialog-scrollable" >
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Actualizacion de precio por cliente</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="col">  
      <label className="form-label" htmlFor="form1Example1" >{cliente}</label>      

                    
              </div>
 
  <div className="form-outline mb-4">
     <label className="form-label" htmlFor="form1Example1" >Precio por rollo</label>
     <input type="text" id="form1Example1" className="form-control" value={precio_rollo2}  onChange={e => setprecio_rollo2(e.target.value)} />
   
  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Precio por yarda</label>
        <input type="text" id="form1Example1" className="form-control" value={precio_yarda2}  onChange={e => setprecio_yarda2(e.target.value)} />

  </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-primary" onClick={()=>guardarpreciocliente()} >Guardar</button>
      </div>
    </div>
  </div>
  </div>
  </div>

<div
          className="modal fade"
          id="preciocModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
  <div className="modal-dialog  modal-dialog-scrollable" >
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Ingreso precio por cliente</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="col">  
                  <select className="form-select" id="floatingSelectGrid" data-live-search="true"  data-size="8" aria-label="Floating label select example" value={idcliente} onChange={(e)=>setIdCliente(e.target.value)}>
                  <option value="" >Seleccionar Cliente</option>
                         {datoscl ? datoscl.map((item,index) =>(
                         <option key={index} value={item.idcliente} data-tokens={item.nombre}>{item.nombre+ " " +item.apellido}</option>))
                         :
                        null
                          }
                    </select>

                    
              </div>
 
  <div className="form-outline mb-4">
     <label className="form-label" htmlFor="form1Example1" >Precio por rollo</label>
     <input type="text" id="form1Example1" className="form-control" value={precio_rollo2}  onChange={e => setprecio_rollo2(e.target.value)} />
   
  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Precio por yarda</label>
        <input type="text" id="form1Example1" className="form-control" value={precio_yarda2}  onChange={e => setprecio_yarda2(e.target.value)} />

  </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-primary" onClick={()=>guardarpreciocliente()} >Guardar</button>
      </div>
    </div>
  </div>
  </div>
  </div>
  {/**fin del modal precio cliente */}

 < div className="  row ">
      <div className="col-12 col-sm-12 col-md-6 col-lg-6 ">
        <div className="row mb-2 ">
            <div className="col">
            <div className="input-group" >
                  <div className='input-group-text'>
                    <span className="fa fa-search input-gruop-text icon-search"></span>
                    </div>
                    <input type="text" className="form-control " placeholder="Buscar Producto..."  value={buscar}  onChange={(e)=>Busqueda(e.target.value)} />
                     </div>
                                   
           </div> 
   


        </div>
        <div className="div-table">
        <div className="table-wrap">
<table className="table-item ">
  <thead >          <tr>
            <th>#</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Opciones</th>
          </tr>
        </thead>
       <tbody>
      { datos ?
           datos.map((item,index) =>(
            <tr key={index} onClick={()=>ConsultaPrecioCliente(item.idproducto)}>
               <td>{item.idproducto}</td>
              
             
               <td>{item.nombre} {item.estilo} {item.color}</td>
            <td>
            <div className='d-flex flex-column text-start'>
                 <label className='item-title'>De compra: <span className='desc-item'>{item.precio_compra}</span> </label>
                 <label className='item-title'>De venta/Rollo: <span className='desc-item'> {item.preciorollo}</span></label>
                 <label className='item-title'>De Venta/Yarda: <span className='desc-item'> {item.precioyarda}</span></label>
                 </div>
            </td>
             
               <td>
               <div className="dropdown">
  <i className="fas fa-ellipsis-h icon-option" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
   
  </i>
  <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton2">
 
    <li className=" dropdown-item" data-bs-toggle="modal" data-bs-target="#preciocModal" onClick={(e)=>abrirPrecioxcliente(e.target, item.idproducto)} >Ingresar precio cliente</li>
    
  </ul>
</div>

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
          
      <div className="col-12 col-sm-12 col-md-6 col-lg-6 ">
       <h5>Precios por Cliente</h5>
        

        <div className="div-table">
     <div className="table-wrap">
<table className="table-subitem ">
  <thead >
          <tr>
          <th>#</th>
          <th>Cliente</th>
          <th>Precio</th>
            <th>Opciones</th>

          </tr>
        </thead>
       <tbody>
      {preciosCliente ?
           preciosCliente.map((item,index) =>(
            <tr  key={index}>
               
               <td>{item.idprecio}</td>
             <td>{item.cliente}</td>
             <td>
             <div className='d-flex flex-column text-start'>
                 
                 <label className='item-title'>De venta/Rollo: <span className='desc-item'> {item.preciorollo}</span></label>
                 <label className='item-title'>De Venta/Yarda: <span className='desc-item'> {item.precioyarda}</span></label>
                 </div>
             </td>
             
              
            
              
               <td>
               <div className="dropdown">
  <i className="fas fa-ellipsis-h icon-option" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
   
  </i>
  <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton2">
    <li className=" dropdown-item" data-bs-toggle="modal" data-bs-target="#precioaModal" onClick={(e)=>abrirPrecioxclienteActualiza(e.target, item)} >Editar</li>
    <li className=" dropdown-item"  onClick={()=>eliminarPrecioc(item.idprecio)} >Elimnar</li>
    
  </ul>
</div>

               </td>
             </tr>
           ))
            :
          null
            }
      
       </tbody>
      </table>
      </div>
      
      </div>
      </div>
      </div>
        </div>
        

    );
        }
    export default PrecioCliente;
    