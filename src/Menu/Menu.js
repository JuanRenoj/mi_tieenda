import React, { useEffect, useState } from 'react';

import Cliente from '../Cliente/Cliente';
import Empleado from "../Empleado/Empleado";
import Proveedor from "../Proveedor/Proveedor";
import '../css/estado.css'
import { Nombre } from '../host/Info';
import Venta from '../Venta/Venta';
import Producto from '../Producto/Producto';

import Caja from '../Caja/Caja';
import MenuBodega from '../Bodega/MenuBodega';
import MenuPrecio from '../Precio/MenuPrecio';
import ls from "local-storage";
import Informe from '../Informe/Informe';
import Usuario from '../Usuario/Usuario';
import Tienda2 from '../Venta/Tienda2';

import AlertModel from './AlertModel';
import IndexBodega from '../Bodega4/IndexBodega';


function Menu(props)  {
    const [screen, setScreen] = useState("");
    const [usuario, setUsuario] =useState("");
    const nav_item="nav-item";
    const nav_active="nav-item nav-active";

   
    useEffect(() => {
       iniciar();
    }, [])

    const iniciar=()=>{
  if(ls.get('usuario')===null){
    props.history.push('./')
  }else{
      setUsuario(ls.get("usuario").nombre)
  }
}

const acceso = (modulo) => {
    let permiso=ls.get("permiso");
    let acceso=false;
    permiso.map((item) =>{
        if(item.nombre === modulo){
            if(item.escritura ===1){
                acceso= true;
            }
        }
        return true;
    })
    return acceso
}

/*
window.onbeforeunload = function() {
    localStorage.clear();
 }
 
*/
    const ColocarContent=()=>{

        let usuarios=usuario;
         switch (screen) {
             case 'Empleado':
                 if(acceso("Empleado")){
                    return <Empleado />
                    }else{
                        return <AlertModel titulo="Aviso" msg="No tienes acceso a Empleado" />
                      }
               
             case 'Cliente':
                if(acceso("Cliente")){
                    return <Cliente />
                    }else{
                        return <AlertModel titulo="Aviso" msg="No tienes acceso a Cliente" />;
                      }
               
             case 'Proveedor':
                if(acceso("Proveedor")){
                    return <Proveedor />
                    }else{
                        return <AlertModel titulo="Aviso" msg="No tienes acceso a Proveedor" />
                      }
                     
             case 'Venta':
                if(acceso("Punto de Venta")){
                    return <Venta />
                    }else{
                        return <AlertModel titulo="Aviso" msg="No tienes acceso a Punto de Venta" />
                      }
                     
                      case 'Tienda 2':
                        if(acceso("Tienda La Septima")){
                            return <Tienda2 />
                            }else{
                                return <AlertModel titulo="Aviso" msg="No tienes acceso a Tienda la Septima" />
                              }
                           
             case 'Producto':
                if(acceso("Producto")){
                    return <Producto />
                    }else{
                        return <AlertModel titulo="Aviso" msg="No tienes acceso a Producto" />
                      }
                      
             case 'Informe':
                if(acceso("Informe")){
                    return <Informe />
                    }else{
                        return <AlertModel titulo="Aviso" msg="No tienes acceso a Informe" />
                      }
                     
             case 'Bodega':
             return <MenuBodega/>   
             case 'Caja':
                if(acceso("Caja")){
                    return <Caja />
                    }else{
                        return <AlertModel titulo="Aviso" msg="No tienes acceso a Caja" />
                      }
                      
             case 'Usuario':
                if(acceso("Permiso")){
                    return <Usuario />
                    }else{
                        return <AlertModel titulo="Aviso" msg="No tienes acceso a Precio" />
                      } 
                case 'Precio':
                         return <MenuPrecio />  
             default:  

                return <IndexBodega titulo={usuarios} msg={"Bienvenido a " + Nombre}/>
           }
     }
    
     const cerrarSesion=()=>{
         ls.clear();
         props.history.push('./');
     }

    return (
        
<div className="container-fluid vh-100">
    
        <div className="row flex-nowrap ">
            <div className="col-auto col-sm-auto  col-md-1 col-xl-2 px-sm-1 px-0 nav-lateral max-vh-100 ">
                <div className="d-flex flex-column align-items-center  align-items-sm-start px-3 pt-2  min-vh-100">
                    <p    className="d-flex align-items-center pb-3 mb-md-0 me-md-auto  text-decoration-none">
                        <span className="fs-5 d-none d-none d-md-none d-xl-inline  text-center">{Nombre}</span>

                
                    </p>
                    <div className="dropdown pb-4">
                        <p     className="d-flex align-items-center  text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://raw.githubusercontent.com/bitsolutionsoft/img/main/perfil.jpg" alt="perfil" width="30" height="30" className="rounded-circle"/>
                            <span className="d-none d-md-none d-xl-inline mx-1">{usuario}</span>
                        </p>
                        <ul className="dropdown-menu dropdown-menu text-small shadow">
                       
                       <li onClick={()=>setScreen("Usuario")}><button    className="dropdown-item " >Ajustes</button></li>
                     
                       <li>
                           <hr className="dropdown-divider"/>
                       </li>
                       <li onClick={cerrarSesion}>
                           <button    className="dropdown-item" >Cerra Sesion</button></li>
                   </ul>
                    </div>
                    
                    <ul className="nav nav-pills flex-column mb-sm-auto w-100 mb-0 align-items-center align-items-sm-start" id="menu">
                    
                        <li onClick={()=>setScreen("Venta")}  className={screen === "Venta" ? nav_active : nav_item}>
                            <div    className="align-middle px-0">
                            <i class="fas fa-cart-plus fa-lg"></i> <span className="ms-1 d-none d-md-none d-xl-inline">Punto de venta</span>
                            </div>
                        </li>
                    {/*    <li onClick={()=>setScreen("Tienda 2")}  className="nav-item">
                            <button    className="nav-link align-middle px-0">
                            <i class="fas fa-cart-plus fa-lg" ></i><span className="ms-1 d-none d-md-none d-xl-inline">Tienda la Setptima</span>
                            </button>
                        </li>*/} 
                        <li onClick={()=>setScreen("Producto")} className={screen === "Producto" ? nav_active : nav_item}>
                            <div    className=" align-middle px-0">
                            <i class="fas fa-box fa-lg"></i><span className="ms-1 d-none d-md-none d-xl-inline">Producto</span>
                            </div>
                        </li>
                        <li onClick={()=>setScreen("Precio")} className={screen === "Precio" ? nav_active : nav_item}>
                            <div    className=" align-middle px-0">
                            <i class="fas fa-tags fa-lg"></i> <span className="ms-1 d-none d-md-none d-xl-inline">Precio Producto</span>
                            </div>
                        </li>

                        <li onClick={()=>setScreen("Cliente")} className={screen === "Cliente" ? nav_active : nav_item}>
                            <div    data-bs-toggle="collapse" className=" px-0 align-middle">
                            <i class="fas fa-users fa-lg"></i><span className="ms-1 d-none d-md-none d-xl-inline">Cliente</span> 
                            </div>
                           
                        </li>
                        <li onClick={()=>setScreen("Informe")} className={screen === "Informe" ? nav_active : nav_item}>
                        <div    className=" px-0 align-middle">
                        <i class="fas fa-chart-bar fa-lg"></i><span className="ms-1 d-none d-md-none d-xl-inline">Informe</span>
                        </div>
                        </li>
                        <li onClick={()=>setScreen("Empleado")} className={screen === "Empleado" ? nav_active : nav_item}> 
                            <div    data-bs-toggle="collapse" className="px-0 align-middle " >
                            <i class="fas fa-users fa-lg"></i> <span className="ms-1 d-none d-md-none d-xl-inline">Empleado</span>
                            </div>
                           
                        </li>
                        <li onClick={()=>setScreen("Bodega")} className={screen === "Bodega" ? nav_active : nav_item}>
                            <div   data-bs-toggle="collapse" className=" px-0 align-middle">
                            <i class="fas fa-th-large fa-lg"></i><span className="ms-1 d-none d-md-none d-xl-inline">Bodega</span> 
                            </div>
                                
                        </li>

                        <li onClick={()=>setScreen("Caja")} className={screen === "Caja" ? nav_active : nav_item}>
                            <div   data-bs-toggle="collapse" className="px-0 align-middle">
                            <i class="fas fa-cash-register fa-lg"></i><span className="ms-1 d-none d-md-none d-xl-inline">Caja</span> 
                            </div>
                               
                        </li>

                        <li onClick={()=>setScreen("Proveedor")} className={screen === "Proveedor" ? nav_active : nav_item}>
                            <div    className=" px-0 align-middle">
                            <i class="fas fa-user fa-lg"></i> <span className="ms-1 d-none d-md-none d-xl-inline">Proveedores</span> 
                            </div>
                        </li>
                        <li onClick={cerrarSesion} className="nav-item">
                            <div    className="px-0 align-middle" >
                            <i class="fas fa-sign-out fa-lg" ></i> <span className="ms-1 d-none d-md-none d-xl-inline">Salir</span> 
                            </div>
                        </li>
                    </ul>
                    <hr/>
                   
                </div>
            </div>
            
            <div className="col  max-vh-100 overflow-auto div-center">
            <ColocarContent  /> 
            </div>
        </div>
    </div>
    
    );



}

export default Menu;