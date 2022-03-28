import host from '../host/host';
import Headers from '../host/Headers';

class DataPermiso{
 
    consultar(){
    // console.log( "esta es la cabecera "+ Headers.headerGet())
    return  fetch(host+'permiso/view',Headers.headerGet())
      .then(response =>  response.json())
      .then(responsedatos =>   responsedatos)
      .catch((error) =>error)  
  }
  
  consultarReg(codigo){
    
    return  fetch(host+`permiso/${codigo}`,Headers.headerGet())
              .then(response => response.json())
              .then((responsedatos) => responsedatos)
              .catch((error) => error);
  }
  
   nuevoReg (datos) {
         return fetch(host+'permiso',Headers.headerPostCB(datos))
          .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
      }
  
  
      actualizarReg (datos)  {
         return fetch(host+`permiso/update`, Headers.headerPostCB(datos))
          .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
  
      }
  
      borraReg(codigo){
         return fetch(host+`permiso/delete/${codigo}`,Headers.headerPostSB()
         ).then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
      }

      consultarPermiso(codigo){
        return fetch(host+`permiso/emp/${codigo}`,Headers.headerGet()
        ).then(response =>response.json())
         .then((resp) => resp)
         .catch( (err) =>err);
     }
    }
    
  export default new DataPermiso()