import host from '../host/host';
import Headers from '../host/Headers';
class DataProveedor{
    consultar(){
    return  fetch(host+'proveedor/view', Headers.headerGet() )
      .then(response =>  response.json())
      .then(responsedatos =>   responsedatos)
      .catch((error) =>error)  
  }
  
  consultarReg(codigo){
    
    return  fetch(host+`proveedor/${codigo}`, Headers.headerGet())
              .then(response => response.json())
              .then((responsedatos) => responsedatos)
              .catch((error) => error);
  }
  
   nuevoReg (datos) {
  
         return fetch(host+'proveedor', Headers.headerPostCB(datos))
          .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
      }
  
  
      actualizarReg (datos)  {
        
         return fetch(host+`proveedor/update`, Headers.headerPostCB(datos))
          .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
  
      }
  
      borraReg(codigo){
         return fetch(host+`proveedor/delete/${codigo}`, Headers.headerPostSB())
         .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
      }
    }
    
  export default new DataProveedor()