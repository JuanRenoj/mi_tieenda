import host from '../host/host';
import Headers from '../host/Headers';

class DataBodega{
 
    consultar(){
    // console.log( "esta es la cabecera "+ Headers.headerGet())
    return  fetch(host+'dbodega/view',Headers.headerGet())
      .then(response =>  response.json())
      .then(responsedatos =>   responsedatos)
      .catch((error) =>error)  
  }
  
  consultarReg(codigo){
    
    return  fetch(host+`dbodega/${codigo}`,Headers.headerGet())
              .then(response => response.json())
              .then((responsedatos) => responsedatos)
              .catch((error) => error);
  }

  
   nuevoReg (datos) {
         return fetch(host+'dbodega',Headers.headerPostCB(datos))
          .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
      }
  
  
      actualizarReg (datos)  {
         return fetch(host+`dbodega/update`, Headers.headerPostCB(datos))
          .then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
  
      }
  
      borraReg(codigo){
         return fetch(host+`dbodega/delete/${codigo}`,Headers.headerPostSB()
         ).then(response =>response.json())
          .then((resp) => resp)
          .catch( (err) =>err);
      }
    

    consultarMDespacho(datos){
    
      return  fetch(host+`dbodega/despacho`,Headers.headerPostCB(datos))
                .then(response => response.json())
                .then((responsedatos) => responsedatos)
                .catch((error) => error);
    }
  }
    
  export default new DataBodega()