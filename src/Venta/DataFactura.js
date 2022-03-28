import host from '../host/host';
import Headers from '../host/Headers';

class DataFactura{
    consultar(){
    return  fetch(host+'factura/view', Headers.headerGet())
      .then(response =>  response.json())
      .then(responsedatos =>   responsedatos)
      .catch((error) =>error)  
  }

  NumeroOrden(){
    return  fetch(host+'factura/orden', Headers.headerGet())
      .then(response =>  response.json())
      .then(responsedatos =>   responsedatos)
      .catch((error) => error )  
  }

  consultarReg(codigo){
    
    return  fetch(host+`factura/${codigo}`, Headers.headerGet())
              .then(response => response.json())
              .then((responsedatos) => responsedatos)
              .catch((error) => error);
  }
  
   nuevoReg (datos) {
         return fetch(host+'factura', Headers.headerPostCB(datos))
          .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
      }
  
  
      actualizarReg (datos)  {
         
         return fetch(host+`factura/update`, Headers.headerPostCB(datos))
          .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
  
      }
  
      borraReg(codigo){
         return fetch(host+`factura/delete/${codigo}`, Headers.headerPostSB())
         .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
      }
      
     consultarFacturas (datos)  {
         
        return fetch(host+`factura/caja`, Headers.headerPostCB(datos))
         .then(response =>response.json())
         .then((resp) => resp)
         .catch( (err) =>err);
 
     }
 
    }
    
  export default new DataFactura()