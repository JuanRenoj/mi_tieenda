import host from '../host/host';
import Headers from '../host/Headers';

class DataEmpleado{
 
    consultar(){
    // console.log( "esta es la cabecera "+ Headers.headerGet())
    return  fetch(host+'empleado/view',Headers.headerGet())
      .then(response =>  response.json())
      .then(responsedatos =>   responsedatos)
      .catch((error) =>error)  
  }
  
  consultarReg(codigo){
    
    return  fetch(host+`empleado/${codigo}`,Headers.headerGet())
              .then(response => response.json())
              .then((responsedatos) => responsedatos)
              .catch((error) => error);
  }
  
   nuevoReg (datos) {
         return fetch(host+'empleado',Headers.headerPostCB(datos))
          .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
      }
  
  
      actualizarReg (datos)  {
         return fetch(host+`empleado/update`, Headers.headerPostCB(datos))
          .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
  
      }
  
      borraReg(codigo){
         return fetch(host+`empleado/delete/${codigo}`,Headers.headerPostSB()
         ).then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
      }
    }
    
  export default new DataEmpleado()