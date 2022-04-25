//import "bootstrap/dist/css/bootstrap.min.css";
//import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/estado.css'
import DataEmpleado from "../Empleado/DataEmpleado";
import DataPermiso from "../Empleado/DataPermiso";
import DatosUsuario from "../Login/DatosUsuario";
import DataModulo from "../Empleado/DataModulo";
import React, { useState,useEffect } from 'react';
import md5 from "md5";


function Usuario(props)  {
    const [idempleado, setidempleado] = useState("");
   
    const [datos, setdatos] = useState([]);
    const [usuario, setusuario] = useState();
  
    const [encontrado, setencontrado] = useState([]);
    const [buscar, setbuscar] = useState("");
    const [accion, setaccion] = useState("new");
    const [modulo, setmodulo] = useState([]);
    const [pexistente, setpexistente] = useState([]);
    const [Usuarios, setUsuarios] = useState([]);
    const [idusuario, setidusuario] = useState();
    const [pass, setpass] = useState();
    useEffect(()=>{
        consultarEmpleado();
        consultarModulo();
 
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
      async function consultarUsuario(codigo){
        let dat = await DatosUsuario.consultaruser(codigo);
        console.log("ee ", dat);
        if (dat !== null) {
        console.log("🚀 ~ file: App.js ~ line 49 ~ consultarEmpleado ~ dat", dat);
          console.log(dat.res);
          setUsuarios(dat.res);
        
        }

      }

      async function consultarModulo() {
        let dat = await DataModulo.consultar();
        if (dat !== null) {
        console.log("🚀 ~ file: App.js ~ line 24 ~ consultarEmpleado ~ dat", dat);
          
          setmodulo(dat.res);
        }
      }

      async function consultarPermiso(idemp,e) {
        setpexistente([]);
        let dat = await DataPermiso.consultarPermiso(idemp);
        if (dat !== null) {
       
        if(dat.message ==="Success"){
            setpexistente(dat.res)
          console.log(dat.res);
     AbrirPermiso(e)
       
        }
        else{
         alert("Vaya a la seccion de empleado para asignar los permisos")
        }
        }
      
      }



      
      async function AbrirPermiso  (e) {
   
    
        var myInput = document.getElementById("permisosModal");
        e.addEventListener("shown.bs.modal", function () {
          myInput.focus();
        });
      
      }
    

        async function ActualizarEscritura(item, escritura){
          let datospermiso = {
            "idpermiso":item.idpermiso,
            "idempleado":item.idempleado,
            "idmodulo":item.idmodulo,
            "lectura":item.lectura,
            "escritura":escritura ? 1 : 0
          }
         ActualilzarPermiso(datospermiso);
          
          }
        async function ActualilzarPermiso(datospermiso){
          let permisoIngresado= await DataPermiso.actualizarReg(datospermiso);
        if(permisoIngresado !== null){
          if (permisoIngresado.message==="Success") {
          console.log("actualizado")
          actualizarPExistente(datospermiso)
          }else{
              alert("No se pudo actualizar el permiso");
          }
        }
        }
const actualizarPExistente = (dato) => {
  pexistente.map((item)=>{
    if(item.idpermiso===dato.idpermiso){
      item.idpermiso=dato.idpermiso;
      item.idempleado=dato.idempleado;
      item.idmodulo=dato.idmodulo;
      item.lectura=dato.lectura;
      item.escritura=dato.escritura
      setpexistente(pexistente =>[...pexistente]);
    }
    return true;
  })
}



async function abrirmodalusuario(e,idemp){
  setidempleado(idemp)
  limpiar();
   var myInput = document.getElementById("usuarioModal");
   e.addEventListener("shown.bs.modal", function () {
     myInput.focus();
   });
 
 }



 async function abrirmodalusuarioa(item, e){
    setidempleado(item.idempleado)
    setidusuario(item.idusuario);
    setusuario(item.usuario);
    setpass(item.pass);
    setaccion("update")
     var myInput = document.getElementById("usuarioaModal");
     e.addEventListener("shown.bs.modal", function () {
       myInput.focus();
     });
   }


const limpiar = () => {
  //setidempleado(item.idempleado)
    setidusuario("");
    setusuario("");
    setpass("");
    setaccion("new")
}




async function guardaruser(){
  if (accion==="new")
  {
  let datosusuario = {
    "idusuario":0,
    "idempleado":idempleado,
    "usuario":usuario,
    "pass": md5(pass)
  
  }
 
  let usuarioIngresado= await DatosUsuario.nuevoReg(datosusuario);
  if(usuarioIngresado !== null){
    if (usuarioIngresado.message==="Success") {
      alert("Usuario ingresado");
      consultarUsuario(idempleado);
    }
  }
}
else {

    let datosusuario = {
        "idusuario":idusuario,
        "idempleado":idempleado,
        "usuario":usuario,
        "pass": md5(pass)
      
      }
     
      let usuarioIngresado= await DatosUsuario.actualizarReg(datosusuario);
      if(usuarioIngresado !== null){
        if (usuarioIngresado.message==="Success") {
          alert("Usuario actulizado");
          consultarUsuario(idempleado);
        }
      }

}
  }

async function eliminar(idusuario,idempleado){
let usuarios=await DatosUsuario.borraReg(idusuario);


if (usuarios!==null){
  alert("Usuario eliminado correctamente");
  consultarUsuario(idempleado);
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
            <div className="mb-2">   <h5 className="modal-title">Ajuste a los perfiles de usuarios</h5></div>
            <div className="row mb-2 max-vh-15 ">
           
</div>

{/*-modal ingreso de usuario y contraseña */}
<div
          className="modal fade"
          id="usuarioModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={true}
        >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Asignar de usuario y contraseña</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden={true} >Codigo de empleado</label>   
    <input type="text" id="form1Example1" className="form-control" hidden={true} value={idempleado} onChange={(e) => setidempleado(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
     <label className="form-label" htmlFor="form1Example2" >Usuario</label>
     <input type="text" id="form1Example2" className="form-control" value={usuario}  onChange={(e) => setusuario(e.target.value)} />
   
  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example3" >Contraseña</label>
        <input type="password" id="form1Example3" className="form-control" value={pass}  onChange={(e) => setpass(e.target.value)} />

  </div>
  

 
  
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-primary" onClick={()=>guardaruser()} >Guardar</button>
      </div>
    </div>
  </div>
</div>

{/*fin del modal */}
<div
          className="modal fade"
          id="usuarioaModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden= {true} 
        >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Actualización de usuario y contraseña</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example4" hidden= {true} >Codigo de empleado</label>   
    <input type="text" id="form1Example4" className="form-control" hidden=  {true}  value={idempleado} onChange={(e) => setidempleado(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example5" hidden=  {true}  >Codigo de empleado</label>   
    <input type="text" id="form1Example5" className="form-control" hidden=  {true}  value={idusuario} onChange={(e) => setidusuario(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
     <label className="form-label" htmlFor="form1Example6" >Usuario</label>
     <input type="text" id="form1Example6" className="form-control" value={usuario}  onChange={(e) => setusuario(e.target.value)} />
   
  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example7" >Contraseña</label>
        <input type="password" id="form1Example7" className="form-control" value={pass}  onChange={(e) => setpass(e.target.value)} />

  </div>
  

 
  
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-primary" onClick={()=>guardaruser()} >Guardar</button>
      </div>
    </div>
  </div>
</div>

{/*-modal permisos*/}
<div
          className="modal fade "
          id="permisosModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden= {true} 
        >
  <div className="modal-dialog  ">
    <div className="modal-content ">
      <div className="modal-header">
        <h5 className="modal-title">Otorgar Permisos</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div className="div-table">
<div className="table-wrap">
      <table className="table-subitem">
  <thead>
    <tr>
  <th></th>
      <th >Modulo</th>
      <th>Permiso</th>
     
    </tr>
  </thead>
  <tbody>
    {pexistente ? 
    pexistente.map((item,index)=>(
       <tr key={index}>
         <td></td>
      <td>{item.nombre}</td>
      <td>
        <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="escritura"  checked={item.escritura === 1 ? true : false } onChange={(e)=>ActualizarEscritura(item, e.target.checked)}/>
        </div> 
      </td>
     {/**  <td> 
        <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="lectura" checked={item.lectura === 1 ? true : false }  onChange={(e)=>ActualizarLectura(item, e.target.checked)}/>
        </div>
      </td>*/}
    </tr> 
    ))
    
    : 
    <tr>
      <div className="spinner-grow text-primary" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
    </tr>
    }
  
  
  </tbody>
</table>
</div>
      </div></div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Salir</button>
    
      </div>
    </div>
  </div>
</div>

{/*fin del modal */}
<div className="row max-vh-85 ">
<div className="col-12 col-sm-12 col-md-6 col-lg-6 ">
<div className="col-12 mb-2">
            <div className="input-group" >
                  <div className='input-group-text'>
                    <span className="fa fa-search input-gruop-text icon-search"></span>
                    </div> 
                    <input type="text" className="form-control " placeholder="Buscar Empleado..."  value={buscar}  onChange={(e)=>Busqueda(e.target.value)} />
                    </div>                         
           </div> 
<div className="div-table"> 
<div className="table-wrap">
<table className="table-item">
  <thead >
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Apellido</th>
        
            <th>Opciones</th>
          </tr>
        </thead>
       <tbody>
      { datos ?
           datos.map((item,index) =>(
            <tr key={index} onClick={()=>consultarUsuario(item.idempleado)}>
               
               <td>{item.idempleado}</td>
               <td>{item.nombre}</td>
               <td>{item.apellido}</td>
               <td>
               <div className="d-flex dropdown justify-content-center alig-items-center">
  <button className="btn btn-primary btn-sm dropdown-toggle " type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
   
  </button>
  <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
    <li className=" dropdown-item" id="ingreso" data-bs-toggle="modal" data-bs-target="#permisosModal"    onClick={(e)=>consultarPermiso(item.idempleado,e.target)} >Permisos</li>
    
    <li  className=" dropdown-item" data-bs-toggle="modal"  data-bs-target="#usuarioModal" onClick={(e)=>abrirmodalusuario(e.target, item.idempleado)} >Usuario y Contraseña</li>
  </ul>
</div>


                 </td>

             </tr>
           )) 
           : null
           
      
           }
      
       </tbody>
      </table>
</div></div>

</div>

<div className="col-12 col-sm-12 col-md-6 col-lg-6 ">
<div className="div-table"> 
<div className="table-wrap">
<table className="table-subitem">
  <thead >
          <tr>
            <th></th>
            <th>#</th>
            <th>Usuario</th>
            
        
            <th>Opciones</th>
          </tr>
        </thead>
       <tbody>
      { Usuarios ?
           Usuarios.map((item,index) =>(
            <tr key={index} >
              <td></td>
               <td>{item.idusuario}</td>
              
               <td>{item.usuario}</td>
               
               <td>
               <div className="d-flex dropdown justify-content-center alig-items-center">
  <button className="btn btn-primary dropdown-toggle " type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
   
  </button>
  <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
    <li className=" dropdown-item" data-bs-toggle="modal" data-bs-target="#usuarioaModal" onClick={(e)=>abrirmodalusuarioa(item,e.target)} >Editar</li>
    <li  className="dropdown-item" onClick={()=>eliminar(item.idusuario, item.idempleado)}>Eliminar</li>
    
     </ul>
</div>


                 </td>

             </tr>
           )) 
           : null
           
      
           }
      
       </tbody>
      </table>
      </div></div></div>
  </div>
        </div>
        

    );
        }
    export default Usuario;