import host from '../host/host';
import Headers from '../host/Headers';

class DataDetalle{
    consultar(){
    return  fetch(host+'detalle/view', Headers.headerGet())
      .then(response =>  response.json())
      .then(responsedatos =>   responsedatos)
      .catch((error) =>error)  
  }

  
  consultarReg(codigo){
    
    return  fetch(host+`detalle/${codigo}`, Headers.headerGet())
              .then(response => response.json())
              .then((responsedatos) => responsedatos)
              .catch((error) => error);
  }
  
  consultarDetalle(codigo){
    
    return  fetch(host+`detalle/factura/${codigo}`, Headers.headerGet())
              .then(response => response.json())
              .then((responsedatos) => responsedatos)
              .catch((error) => error);
  }
  
   nuevoReg (datos) {
         return fetch(host+'detalle', Headers.headerPostCB(datos))
          .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
      }
  
  
      actualizarReg (datos)  {
        
         return fetch(host+`detalle/update`, Headers.headerPostCB(datos))
          .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
  
      }
  
     
      borraReg(codigo){
         return fetch(host+`detalle/delete/${codigo}`, Headers.headerPostSB())
         .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
      }
    }
    
  export default new DataDetalle()