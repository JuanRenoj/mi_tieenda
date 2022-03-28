import React,{useState} from 'react';
import Precios from './Precios';
import PrecioCliente from './PrecioCliente';
import IndexPrecio from './IndexPrecio';
import AlertModel from '../Menu/AlertModel';
import ls from "local-storage";


function MenuPrecio(props) {
    const [tipo, setTipo] = useState("");

    
   
    
    const acceso = (modulo) => {
        let permiso=ls.get("permiso");
        let acceso=false;
       permiso.map((item) => {
            if(item.nombre === modulo){
                if(item.escritura ===1){
                    acceso= true;
                }
            }
            return true;
          })
        return acceso
    }
    
    function VerPrecio()  {
      switch(tipo){
          case 'Precio':
            if(acceso("Precio")){
              return <Precios/>
            }else{
            
              return <AlertModel titulo="Aviso" msg="No tienes acceso a Precios" />
            }
          case 'PrecioCliente':
            if(acceso("Precio Cliente")){
              return <PrecioCliente/>
            }else{
              return <AlertModel titulo="Aviso" msg="No tienes acceso a Precio por cliente" />
            }
         
         
       
    
         default:
            return<IndexPrecio titulo="Bienvenido a la sección de Precio" msg="Para continuar seleccione una de las opcions en la parte superior derecho"/>
         

      }
    }
    

    return (
      <div className="container-fluid  p-2 vh-100 ">
            <div>
            <nav className="navbar navbar-light bg-light">
               <form className="container-fluid justify-content-end">
                 <button className="btn btn-sm btn-primary me-2" type="button" onClick={()=>setTipo("Precio")}>Precio</button>
                 <button className="btn btn-sm btn-primary me-2" type="button" onClick={()=>setTipo("PrecioCliente")}>Precio por Cliente</button>
                
               </form>
              </nav>
            </div>
            <div  className="row pt-2 ">
            <VerPrecio/>
            </div>
        </div>
    );
}

export default MenuPrecio;
