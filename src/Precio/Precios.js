//import "bootstrap/dist/css/bootstrap.min.css";
//import 'bootstrap-icons/font/bootstrap-icons.css';
import DataProducto from "../Producto/DataProducto";

import DataPrecio from "../Precio/DataPrecio";

import DataCliente from "../Cliente/DataCliente";
import '../css/estado.css';
import React, { useState,useEffect } from 'react';

import swal from "sweetalert";


function Precios(props)  {

    const [datos, setdatos] = useState([]);
    const [encontrado, setencontrado] = useState([]);
    const [buscar, setbuscar] = useState("");
    const [tipo, settipo] = useState("");
    const [accion, setaccion] = useState("new");

    
  
    const [idproducto, setidproducto] = useState("");
 
    const [idprecio, setidprecio] = useState("");
 
    const [precio_rollo, setprecio_rollo] = useState("");
    const [precio_yarda, setprecio_yarda] = useState("")
   
    const [datoscl, setdatoscl] = useState([]);
    const [preciosNormal, setpreciosNormal] = useState([]);


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
      
      
      async function ConsultaPrecioNormal(codigo){
          setidproducto(codigo);
          let precios =await DataPrecio.consultarXPro(codigo);
          console.log(precios)
          if(precios !== null){
              if(precios.message ==="Success"){
                  setpreciosNormal(precios.res);
              }
          }
      }
    
      const abrirPrecio=(e,idpro)=>{
        setidproducto(idpro)  
        var myInput = document.getElementById("precioModal");
        e.addEventListener("shown.bs.modal", function () {
          myInput.focus();
        });
      
      }
    
       const abrirPrecioActualiza=(e,item)=>{
        setidproducto(item.idproducto)  
        setidprecio(item.idprecio);
        setprecio_rollo(item.preciorollo);
        setprecio_yarda(item.precioyarda);
        setaccion("update")

        var myInput = document.getElementById("precioModal");
        e.addEventListener("shown.bs.modal", function () {
          myInput.focus();
        });
      
      }
       
async function guardarprecio(){
    if(accion==="new"){
    let datosprecio = {
      "idprecio":0,
      "idproducto":idproducto,
      "preciorollo":precio_rollo,
      "precioyarda":precio_yarda
    
    }
    let precioingresado= await DataPrecio.nuevoReg(datosprecio);
    if(precioingresado !== null){
      if (precioingresado.message==="Success") {
      
        swal("Precio","Ingresado con exito","success");
        ConsultaPrecioNormal(idproducto)
      }else{
        swal("Precio","No se puedo ingresar, verifique que los datos ingresado son correctos","warning");
      }
    }
    }else{
        let datosprecio = {
            "idprecio":idprecio,
            "idproducto":idproducto,
            "preciorollo":precio_rollo,
            "precioyarda":precio_yarda
          
          }
          let precioingresado= await DataPrecio.actualizarReg(datosprecio);
          if(precioingresado !== null){
            if (precioingresado.message==="Success") {
              swal("Precio","Actualizado con exito", "success");
              ConsultaPrecioNormal(idproducto)
            }
          }
    }
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

 async function  eliminarPrecio(codigo){
     let eliminarp=await DataPrecio.borraReg(codigo);
     if(eliminarp !== null){
         if(eliminarp.message==="Success"){
             swal("Precio","Eliminado con exito","success");
            ConsultaPrecioNormal(idproducto)
         }
     }
   }

return(
  <div>
           <div className="mb-2">   <h5 className="modal-title">Precios</h5></div>
            

{/**modal de ingresar precio de venta */}



<div
          className="modal fade"
          id="precioModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={true}
        >
  <div className="modal-dialog  modal-dialog-scrollable" >
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Ingreso de nuevo precio</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo del producto</label>   
    <input type="text" id="form1Example1" className="form-control" hidden={true} value={idproducto} onChange={(e) => setidproducto(e.target.value)} />

  </div>
 
  <div className="form-outline mb-4">
     <label className="form-label" htmlFor="form1Example1" >Precio por rollo</label>
     <input type="text" id="form1Example1" className="form-control" value={precio_rollo}  onChange={(e) => setprecio_rollo(e.target.value)} />
   
  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Precio por yarda</label>
        <input type="text" id="form1Example1" className="form-control" value={precio_yarda}  onChange={(e) => setprecio_yarda(e.target.value)} />

  </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-primary" onClick={()=>guardarprecio()} >Guardar</button>
      </div>
    </div>
  </div>
  </div>
  </div>

  

 < div className=" row ">
     <div className="col-12 col-sm-12 col-md-7 col-lg-7 ">
        <div className="row mb-2 ">
            <div className="col">
            <div className=" input-group form-group input-group-prepend">
                                       
                                            
                                            <div className="input-group-prepend  w-100" >
                                            <span className="bi bi-search" style={{color:'gray'}}  ></span>
                                            <input type="text" className="form-control " placeholder="Buscar Producto..."  value={buscar}  onChange={(e)=>Busqueda(e.target.value)} />
                                            </div>
                                            
                                        </div>
                                   
           </div> 
   


        </div>
     <div className="div-table"> 
<div className="table-wrap">
<table className="table-item">
  <thead >
          <tr>
            <th>#</th>
            <th>Descripcion</th>
            <th>Precio compra</th>
            

          
          <th>Precio venta rollo</th>
            <th>Precio venta yarda</th>
  
            <th>Opciones</th>
          </tr>
        </thead>
       <tbody>
      { datos ?
           datos.map((item,index) =>(
            <tr key={index} onClick={()=>ConsultaPrecioNormal(item.idproducto)}>
               <td>{item.idproducto}</td>
              
             
               <td>{item.nombre} {item.estilo} {item.color}</td>
            
               <td>{item.precio_compra}</td> 
               <td>{item.preciorollo}</td> 
               <td>{item.precioyarda}</td> 
              
               <td>
               <div className="dropdown">
  <button className="btn btn-sm btn-primary dropdown-toggle " type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
   
  </button>
  <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
    <li className=" dropdown-item" data-bs-toggle="modal" data-bs-target="#precioModal" onClick={(e)=>abrirPrecio(e.target, item.idproducto)} >Ingresar precio</li>
  
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
          
      <div className="col-12 col-sm-12 col-md-5 col-lg-5 ">
        <h5>Precio asignado para el producto</h5> 
        
          <div className="div-table">
    


     <div className="table-wrap">
<table className="table-subitem">
  
  <thead >
          <tr>
          <th>#</th>
         
          <th>Precio por rollo</th>
            <th>Precio por yarda</th>
           
            <th>Opciones</th>

          </tr>
        </thead>
       <tbody>
      {preciosNormal ?
           preciosNormal.map((item,index) =>(
            <tr  key={index}>
               
               <td>{item.idprecio}</td>
             
             
               <td>{item.preciorollo}</td>
               <td>{item.precioyarda}</td>
              
            
              
               <td>
               <div className="dropdown">
  <button className="btn btn-outline-primary dropdown-toggle " type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
   
  </button>
  <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
    <li className=" dropdown-item" data-bs-toggle="modal" data-bs-target="#precioModal" onClick={(e)=>abrirPrecioActualiza(e.target, item)} >Editar</li>
    <li className=" dropdown-item"  onClick={()=>eliminarPrecio(item.idprecio)} >Elimnar</li>
    
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
    export default Precios;
    