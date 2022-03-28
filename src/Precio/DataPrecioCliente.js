import host from '../host/host';
import Headers from '../host/Headers';

class DataPrecioCliente{
    consultar(){
    return  fetch(host+'pxcliente/view', Headers.headerGet())
      .then(response =>  response.json())
      .then(responsedatos =>   responsedatos)
      .catch((error) =>error)  
  }
 
  consultarReg(codigo){
    
    return  fetch(host+`pxcliente/${codigo}`, Headers.headerGet())
              .then(response => response.json())
              .then((responsedatos) => responsedatos)
              .catch((error) => error);
  }
  
   nuevoReg (datos) {
         return fetch(host+'pxcliente', Headers.headerPostCB(datos))
          .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
      }
  
  
      actualizarReg (datos)  {
          
         return fetch(host+`pxcliente/update`, Headers.headerPostCB(datos))
          .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
  
      }

      consultarXCliente(datos){
    
        return  fetch(host+`pxcliente/bycp`, Headers.headerPostCB(datos))
                  .then(response => response.json())
                  .then((responsedatos) => responsedatos)
                  .catch((error) => error);
      }

      consultarPXCliente(codigo){
    
        return  fetch(host+`pxcliente/bycl/${codigo}`, Headers.headerGet())
                  .then(response => response.json())
                  .then((responsedatos) => responsedatos)
                  .catch((error) => error);
      }
      
      
  
      borraReg(codigo){
         return fetch(host+`pxcliente/delete/${codigo}`, Headers.headerPostSB())
         .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
      }
    }
    
  export default new DataPrecioCliente()