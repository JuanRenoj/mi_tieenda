import host from '../host/host';
import Headers from '../host/Headers';

class DataModulo{
 
    consultar(){
    // console.log( "esta es la cabecera "+ Headers.headerGet())
    return  fetch(host+'modulo/view',Headers.headerGet())
      .then(response =>  response.json())
      .then(responsedatos =>   responsedatos)
      .catch((error) =>error)  
  }
  
  consultarReg(codigo){
    
    return  fetch(host+`modulo/${codigo}`,Headers.headerGet())
              .then(response => response.json())
              .then((responsedatos) => responsedatos)
              .catch((error) => error);
  }
  
   nuevoReg (datos) {
         return fetch(host+'modulo',Headers.headerPostCB(datos))
          .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
      }
  
  
      actualizarReg (datos)  {
         return fetch(host+`modulo/update`, Headers.headerPostCB(datos))
          .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
  
      }
  
      borraReg(codigo){
         return fetch(host+`modulo/delete/${codigo}`,Headers.headerPostSB()
         ).then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
      }
    }
    
  export default new DataModulo()