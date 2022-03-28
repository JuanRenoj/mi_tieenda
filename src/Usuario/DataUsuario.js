import host from '../host/host';
import Headers from '../host/Headers';
class DataUsuario{
    consultar(){
    return  fetch(host+'usuario/view', Headers.headerGet() )
      .then(response =>  response.json())
      .then(responsedatos =>   responsedatos)
      .catch((error) =>error)  
  }
  
  consultarReg(codigo){
    
    return  fetch(host+`usuario/${codigo}`, Headers.headerGet())
              .then(response => response.json())
              .then((responsedatos) => responsedatos)
              .catch((error) => error);
  }
  

   nuevoReg (datos) {
  
         return fetch(host+'usuario', Headers.headerPostCB(datos))
          .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
      }
  
  
      actualizarReg (datos)  {
        
         return fetch(host+`usuario/update`, Headers.headerPostCB(datos))
          .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
  
      }
  
      borraReg(codigo){
         return fetch(host+`usuario/delete/${codigo}`, Headers.headerPostSB())
         .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
      }
    }
    
  export default new DataUsuario()