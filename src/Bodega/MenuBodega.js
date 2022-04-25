import React,{useState} from 'react';
import Bodega from './Bodega';
import BodegaLaVuelta from '../BodegaLaVuelta/BodegaLaVuelta';
import BodegaLaSeptima from '../BodegaLaSeptima/BodegaLaSeptima';
import Bodega4 from '../Bodega4/Bodega4';
import IndexBodega from '../Bodega4/IndexBodega';
import AlertModel from '../Menu/AlertModel';
import ls from "local-storage";

function MenuBodega(props) {
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
    
    function VerBodega()  {
      switch(tipo){
          case 'Bodega':
            if(acceso("Bodega")){
              return <Bodega/>
            }else{
            
              return <AlertModel titulo="Aviso" msg="No tienes acceso a Bodega" />
            }
          case 'Bodega La Septima':
            if(acceso("Bodega La Septima")){
              return <BodegaLaSeptima/>
            }else{
              return <AlertModel titulo="Aviso" msg="No tienes acceso a Bodega La Septima" />
            }
         
            
          case 'Bodega La Vuelta':
            if(acceso("Bodega La Vuelta")){
              return <BodegaLaVuelta/>
            }else{
              return <AlertModel titulo="Aviso" msg="No tienes acceso a Bodega La Vuelta" />
            }
       
         case 'Bodega4':
          if(acceso("Bodega 4")){
            return <Bodega4/>
          }else{
            return <AlertModel titulo="Aviso" msg="No tienes acceso a Bodega 4" />
          }
    
         default:
            return<IndexBodega titulo="Bienvenido a la sección de Bodega" msg="Por favor seleccione  la bodega, en la parte superior, donde se encuentra asignado"/>
         

      }
    }
    

    return (
      <div className="container-fluid  p-2 vh-100 ">
          <div >
            <nav className="navbar navbar-light" >
               <form className="container-fluid justify-content-end">
                 <button className="btn btn-sm btn-primary me-2" type="button" onClick={()=>setTipo("Bodega")}> Bodega</button>
                 <button className="btn btn-sm btn-primary me-2" type="button" onClick={()=>setTipo("Bodega La Septima")}>Bodega La Septima</button>
                 <button className="btn btn-sm btn-primary me-2" type="button" onClick={()=>setTipo("Bodega La Vuelta")}>Bodega La Vuelta</button>
                 <button className="btn btn-sm btn-primary me-2" type="button" onClick={()=>setTipo("Bodega4")}>Bodega 4</button>
               </form>
              </nav>
            </div>
            <div  className="row pt-2 ">
            <VerBodega/>
            </div>
        </div>
    );
}

export default MenuBodega;
