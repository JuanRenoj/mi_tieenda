//import "bootstrap/dist/css/bootstrap.min.css";
//import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/estado.css'
import DataEmpleado from "./DataEmpleado";
import DataPermiso from "./DataPermiso.js";
import DatosUsuario from "../Login/DatosUsuario";
import DataModulo from "./DataModulo";
import React, { useState,useEffect } from 'react';
import md5 from "md5";
import swal from "sweetalert";

function Empleado(props)  {
    const [idempleado, setidempleado] = useState("");
    const [nombre, setnombre] = useState("");
    const [apellido, setapellido] = useState("");
    const [dpi, setdpi] = useState(""); 
    const [telefono, settelefono] = useState("");
    const [correo, setcorreo] = useState("");
    const [estado, setestado] = useState("");
    const [datos, setdatos] = useState([]);  
    const [encontrado, setencontrado] = useState([]);
    const [buscar, setbuscar] = useState("");
    const [accion, setaccion] = useState("new");
    const [modulo, setmodulo] = useState([]);
    
    useEffect(()=>{
        consultarEmpleado();
        consultarModulo();
        setestado("Activo")
    }, []);

    async function consultarEmpleado() {
        let dat = await DataEmpleado.consultar();
        if (dat !== null) {
        console.log("🚀 ~ file: App.js ~ line 24 ~ consultarEmpleado ~ dat", dat);
          console.log(dat.res);
          setencontrado(dat.res); 
          setdatos(dat.res);
        }
      }
    

      async function consultarModulo() {
        let dat = await DataModulo.consultar();
        if (dat !== null) {
        console.log("🚀 ~ file: App.js ~ line 24 ~ consultarEmpleado ~ dat", dat);
          
          setmodulo(dat.res);
        }
      }

      async function consultarPermiso(idemp) {
        
        let dat = await DataPermiso.consultarPermiso(idemp);
        if (dat !== null) {
        console.log("🚀 ~ file: App.js ~ line 24 ~ consultarEmpleado ~ dat", dat);
        if(dat.message ==="Success"){
          console.log(dat.res);
       
         swal("Los permisos ya han sido asignado, para cambiar permiso vaya a ajuste");
        
        }else{
          asignarPermiso(idemp);
          let newdat=await DataPermiso.consultarPermiso(idemp);
          if(newdat !== null){
            if(newdat.message === "Success"){
              console.log(dat.res);
              swal("Permiso asignado, para cambiar permiso vaya a ajuste");
            
            }
          }
          
        }
        }
      
      }

const returnRowPermiso = (idemp,idmod) => {
  let row={
    "idpermiso":0,
    "idempleado":idemp,
    "idmodulo":idmod,
    "lectura":0,
    "escritura":0,
  }
  return row;
}

      async function asignarPermiso(id){
        if(modulo !== null){
      await Promise.all( modulo.map((item) => {
          let permisodatos=returnRowPermiso(id,item.idmodulo);
          let permisos=  DataPermiso.nuevoReg(permisodatos);
           if(permisos !== null){
             if (permisos.message === "Success") {
               console.log("ingresado")
             }
           }
           return true;
          }
          ) )
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
    setidempleado(datos.idempleado)
    setnombre(datos.nombre);
    setapellido(datos.apellido);
    settelefono(datos.telefono);
    setcorreo(datos.correo);
    setdpi(datos.dpi);
    setestado(datos.estado);
    setaccion("update")

    var myInput = document.getElementById("exampleModal");
    e.addEventListener("shown.bs.modal", function () {
      myInput.focus();
    });
}




async function guardar(){
  if(accion==="new"){
    let data={
      idempleado:0,
      nombre:nombre,
      apellido:apellido,
      dpi:dpi,
      telefono:telefono,   
      correo:correo,
      estado:estado,
     

    }

     let empleadod=await DataEmpleado.nuevoReg(data);
     if(empleadod !== null){
       if(empleadod.message ==="Success"){
    limpiar();
    swal("Empleado", "Ingresado exitosamente", "success");
       consultarEmpleado();
       }else{
        swal("Empleado", "No se ingreso, verifique que los datos ingresado son correctos", "warning");
       }
     }
    
    }else{
      let data={
    idempleado:idempleado,
      nombre:nombre,
      apellido:apellido,
      telefono:telefono,
      dpi:dpi,
      correo:correo,
      estado:estado
      }
       let empleados=await DataEmpleado.actualizarReg(data);
       if(empleados !== null){
        if(empleados.message ==="Success"){

        limpiar();
         consultarEmpleado();
         swal("Empleado","Actilizado con exito","success");
        }
        
       }
     }
     
    

}
const limpiar=()=>{
    setidempleado("")
     setnombre("");
     setapellido("");
     settelefono("");
     setcorreo("");
     setdpi("");
     setestado("");
}


async function eliminar(idempleado){
let empleado=await DataEmpleado.borraReg(idempleado);


if (empleado!==null){
 if(empleado.message !== "Success"){
   swal("Empleado","Eliminado con exito","success");
   consultarEmpleado();
 }
  
}
}

const Busqueda =(buscarTexto)=>{
  let text=buscarTexto.replace(/^\w/,(c) =>c.toLowerCase());
  setbuscar(buscarTexto);
  setdatos(encontrado.filter(function(item){
      return item.nombre.toLowerCase().includes(text) || item.apellido.toLowerCase().includes(text) || item.dpi.toLowerCase().includes(text) ;   
    }).map(function({idempleado, nombre, apellido,telefono,correo, dpi, estado}){
      return{idempleado, nombre, apellido,telefono,correo, dpi, estado}
    })
   );
    }

    return(
        <div className="container">
            <div className="mb-2">   <h5 className="modal-title">Empleado</h5></div>
            <div className="row mb-2">
            <div className="col-9">
            <div className="input-group" >
                  <div className='input-group-text'>
                    <span className="fa fa-search input-gruop-text icon-search"></span>
                    </div>
                      <input type="text" className="form-control " placeholder="Buscar Empleado..."  value={buscar}  onChange={(e)=>Busqueda(e.target.value)} />     
                    </div>                                 
           </div> 
    <div className="col-sm">
  <button type="button" className="ml-2 btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e)=>abrirIngreso(e.target)} >Agregar Nuevo</button>
 
</div>
</div>
{/**modal para ingreso de empleado */}

  <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={true}
        >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Ingreso de Empleado</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo de empleado</label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idempleado} onChange={(e) => setidempleado(e.target.value)} />

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
       <label className="form-label" htmlFor="form1Example1" >DPI</label>
        <input type="text" id="form1Example1" className="form-control" value={dpi}  onChange={(e) => setdpi(e.target.value)} />

  </div>

  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Telefono</label>
        <input type="text" id="form1Example1" className="form-control" value={telefono}  onChange={(e) => settelefono(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Correo</label>
        <input type="text" id="form1Example1" className="form-control" value={correo}  onChange={(e) => setcorreo(e.target.value)} />

  </div>
  <div className="form-outline mb-4 center">
       <label className="form-label" htmlFor="form1Example1">Estado</label>
       <div className="form-outline mb-4">
        <div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={estado} checked={estado === "Activo" ? true : false} onChange={() => setestado("Activo")} selected/>
  <label className="form-check-label" htmlFor="inlineRadio1">Activo</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={estado} checked={estado === "No Activo" ? true : false} onChange={() => setestado("No Activo")}/>
  <label className="form-check-label" htmlFor="inlineRadio2">No activo</label>
  </div>
</div>

  </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-primary" onClick={()=>guardar()} >Guardar</button>
      </div>
    </div>
  </div>
</div>

<div className="div-table">
<div className="table-wrap">
  
<table className="table-item ">
  <thead >
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DPI</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>Estado</th>
            <th>Opciones</th>
          </tr>
        </thead>
       <tbody>
      { datos ?
           datos.map((item,index) =>(
            <tr key={index}>
               
               <td>{item.idempleado}</td>
               <td>{item.nombre}</td>
               <td>{item.apellido}</td>
               <td>{item.dpi}</td>
               <td>{item.telefono}</td>
               <td>{item.correo}</td>
               {item.estado === "Activo" ? <td ><p className="activo">{item.estado}</p></td>:
               <td ><p className="noactivo">{item.estado}</p></td>
                }
               
               <td>
               <div className="d-flex dropdown justify-content-center alig-items-center">
  <i className="fas fa-ellipsis-h icon-option" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
   
  </i>
  <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton2">
    <li className=" dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e)=>actualizar(item,e.target)} >Editar</li>
    <li  className="dropdown-item" onClick={()=>eliminar(item.idempleado)}>Eliminar</li>
    <li className=" dropdown-item"  onClick={(e)=>consultarPermiso(item.idempleado)} >Permisos</li>
    
   
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

    );
        }
    export default Empleado;
    