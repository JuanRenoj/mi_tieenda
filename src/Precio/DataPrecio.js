import host from '../host/host';
import Headers from '../host/Headers';

class DataProducto{
    consultar(){
    return  fetch(host+'precio/view', Headers.headerGet())
      .then(response =>  response.json())
      .then(responsedatos =>   responsedatos)
      .catch((error) =>error)  
  }
  consultarXPro(codigo){
    
    return  fetch(host+`precio/bypro/${codigo}`, Headers.headerGet())
              .then(response => response.json())
              .then((responsedatos) => responsedatos)
              .catch((error) => error);
  }

  consultarAllPro(codigo){
    
    return  fetch(host+`precio/allpro/${codigo}`, Headers.headerGet())
              .then(response => response.json())
              .then((responsedatos) => responsedatos)
              .catch((error) => error);
  }
  
  consultarReg(codigo){
    
    return  fetch(host+`precio/${codigo}`, Headers.headerGet())
              .then(response => response.json())
              .then((responsedatos) => responsedatos)
              .catch((error) => error);
  }
  
   nuevoReg (datos) {
         return fetch(host+'precio', Headers.headerPostCB(datos))
          .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
      }
  
  
      actualizarReg (datos)  {
          var data =datos;
         return fetch(host+`precio/update`, Headers.headerPostCB(datos))
          .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
  
      }
  
      borraReg(codigo){
         return fetch(host+`precio/delete/${codigo}`, Headers.headerPostSB())
         .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
      }
    }
    
  export default new DataProducto()