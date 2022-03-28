import host from '../host/host';
import Headers from '../host/Headers';

class DataSeptima{
    consultar(){
    return  fetch(host+'producto/view', Headers.headerGet())
      .then(response =>  response.json())
      .then(responsedatos =>   responsedatos)
      .catch((error) =>error)  
  }
  consultarDisponible(){
    return  fetch(host+'producto/venta', Headers.headerGet())
      .then(response =>  response.json())
      .then(responsedatos =>   responsedatos)
      .catch((error) =>error)  
  }
  
  consultarReg(codigo){
    
    return  fetch(host+`producto/${codigo}`, Headers.headerGet())
              .then(response => response.json())
              .then((responsedatos) => responsedatos)
              .catch((error) => error);
  }
  
   nuevoReg (datos) {
         return fetch(host+'producto', Headers.headerPostCB(datos))
          .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
      }
  
  
      actualizarReg (datos)  {
          var data =datos;
         return fetch(host+`producto/update`, Headers.headerPostCB(datos))
          .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
  
      }
  
      borraReg(codigo){
         return fetch(host+`producto/delete/${codigo}`, Headers.headerPostSB())
         .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
      }
      consultarxUbicacion(codigo){
        return fetch(host+`producto/ubicacion/${codigo}`, Headers.headerGet())
        .then(response =>response.json())
         .then((resp) => resp)
         .catch( (err) =>err);
     }
    }
    
  export default new DataSeptima()