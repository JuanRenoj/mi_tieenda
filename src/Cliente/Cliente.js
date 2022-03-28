
//import "bootstrap/dist/css/bootstrap.min.css";
//import 'bootstrap-icons/font/bootstrap-icons.css';
import DataCliente from "./DataCliente";
import React, { useState,useEffect } from 'react';
import swal from "sweetalert";
import '../css/estado.css';
function Cliente(props)  {
    const [idcliente, setidcliente] = useState("");
    const [nombre, setnombre] = useState("");
    const [apellido, setapellido] = useState("");
    const [direccion, setdireccion] = useState(""); 
    const [telefono, settelefono] = useState("");
    const [correo, setcorreo] = useState("");
    const [encontrado, setencontrado] = useState([]);
    const [buscar, setbuscar] = useState("");
    const [datos, setdatos] = useState([]);
    const [accion, setaccion] = useState("new")

    useEffect(()=>{
        consultarCliente();
    }, []);

    async function consultarCliente() {
        let dat = await DataCliente.consultar();
       console.log(dat);
        if (dat !== null) {
       /* console.log("🚀 ~ file: App.js ~ line 24 ~ consulta cliente ~ dat", dat);*/
       setencontrado(dat.res); 
         console.log(dat);
          setdatos(dat.res);
        }
      }
    

  async function abrirIngreso(e){
    limpiar();
    var myInput = document.getElementById("exampleModal");
    e.addEventListener("shown.bs.modal", function () {
      myInput.focus();
    });

}

async function actualizar(datos, e){
    setidcliente(datos.idcliente)
    setnombre(datos.nombre);
    setapellido(datos.apellido);
      setdireccion(datos.direccion);
    settelefono(datos.telefono);
    setcorreo(datos.correo);
  
    setaccion("update")

    var myInput = document.getElementById("exampleModal");
    e.addEventListener("shown.bs.modal", function () {
      myInput.focus();
    });
}
async function guardar(){
  if(accion==="new"){
    let data={
      idcliente:0,
      nombre:nombre,
      apellido:apellido,
      direccion:direccion,
      telefono:telefono,
      correo:correo,

     

    }
     let cliented=await DataCliente.nuevoReg(data);
     if(cliented !== null){
    limpiar();
    swal("Cliente", "Ingresado exitosamente", "success");
       consultarCliente();
     }
    
    }else{
      let data={
    idcliente:idcliente,
      nombre:nombre,
      apellido:apellido,
       direccion:direccion,
      telefono:telefono,  
      correo:correo,
   
      }
       let clientes=await DataCliente.actualizarReg(data);
       if(clientes !== null){
      
        swal("Cliente", "Actualizado exitosamente", "success");
        limpiar();
         consultarCliente();
       }
     }
     
    

}
const limpiar=()=>{
    setidcliente("")
     setnombre("");
     setapellido("");
     settelefono("");
     setcorreo("");
     setdireccion("");
     setaccion("new");
    
}

async function eliminar(idcliente){
let cliente=await DataCliente.borraReg(idcliente);


if (cliente!==null){
  swal("Cliente", "Eliminado exitosamente", "success");
  consultarCliente();
}
}
const Busqueda =(buscarTexto)=>{
  let text=buscarTexto.replace(/^\w/,(c) =>c.toLowerCase());
  setbuscar(buscarTexto);
  setdatos(encontrado.filter(function(item){
      return item.nombre.toLowerCase().includes(text) || item.apellido.toLowerCase().includes(text) ;   
    }).map(function({idcliente, nombre, apellido, direccion,telefono,correo}){
      return{idcliente, nombre, apellido,direccion,telefono,correo}
    })
   );
  }
    return(
      <div className="container-fluid  p-2 vh-100 ">

           <div className="mb-2">   <h5 className="modal-title">Cliente</h5></div>
            <div className="row mb-2">
            <div className="col-9">
            <div className=" input-group form-group">
                                       
                                            
                                            <div className="input-group-prepend col-9">
                                            <span className="bi bi-search" style={{color:'gray'}}  ></span>
                                            <input type="text" className="form-control " placeholder="Buscar Cliente..."  value={buscar}  onChange={(e)=>Busqueda(e.target.value)} />
                                            </div>
                                            
                                        </div>
                                   
           </div> 
    <div className="col-sm">
  <button type="button" className="ml-2 btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e)=>abrirIngreso(e.target)} >nuevo</button>
</div></div>


  <div className="modal fade"  id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={true}  >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Ingreso de Cliente</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo de Cliente</label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idcliente} onChange={(e) => setidcliente(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
     <label className="form-label" htmlFor="form1Example1" >Nombre</label>
     <input type="text" id="form1Example1" className="form-control" value={nombre}  onChange={(e) => setnombre(e.target.value)} />
   
  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Apellido</label>
        <input type="text" id="form1Example1" className="form-control" value={apellido}  onChange={(e) => setapellido(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Direccion</label>
        <input type="text" id="form1Example1" className="form-control" value={direccion}  onChange={(e) => setdireccion(e.target.value)} />

  </div>

  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Telefono</label>
        <input type="text" id="form1Example1" className="form-control" value={telefono}  onChange={(e) => settelefono(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
  <label htmlFor="exampleFormControlInput1" className="form-label">Correo Electronico</label>
  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={correo}  onChange={(e) => setcorreo(e.target.value)}/>
</div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-primary" onClick={()=>guardar()} >Guardar</button>
      </div>
    </div>
  </div>
</div>
<div ClassName="div-table">
<div className="table-wrap">
<table className="table-item">
  <thead >
          <tr>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Direccion</th>
            <th>Telefono</th>
            <th>Correo</th>
        
            <th>Opciones</th>
          </tr>
        </thead>
       <tbody>
      {datos ?
           datos.map((item,index) =>(
            <tr  key={index}>
               
               <td>{item.idcliente}</td>
               <td>{item.nombre}</td>
               <td>{item.apellido}</td>
               <td>{item.direccion}</td>
               <td>{item.telefono}</td>
               <td>{item.correo}</td>
            
            
               <td>
               <button type="button" className=" btn  btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e)=>actualizar(item,e.target)} >Editar</button>
             
               <button type="submit" className="ms-2 btn btn-outline-primary btn-sm" onClick={()=>eliminar(item.idcliente)}>Eliminar</button>
               </td>
             </tr>
           ))
            :
           <div>No tiene acceso a los datos </div>
            }
      
       </tbody>
      </table>
      </div>

  </div>
        </div>
        

    );
        }
    export default Cliente;
    