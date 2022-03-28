import host from '../host/host';
import Headers from '../host/Headers';

class DatosUsuario{
    consultar(){
        
        return  fetch(host+'usuario/view',Headers.headerGet())
          .then(response =>  response.json())
          .then(responsedatos =>   responsedatos)
          .catch((error) =>error)  
      }
      
      consultarReg(codigo){
        
        return  fetch(host+`usuario/${codigo}`,Headers.headerGet())
                  .then(response => response.json())
                  .then((responsedatos) => responsedatos)
                  .catch((error) => error);
      }
      
      
  consultaruser(codigo){
    
    return  fetch(host+`usuario/user/${codigo}`, Headers.headerGet())
              .then(response => response.json())
              .then((responsedatos) => responsedatos)
              .catch((error) => error);
  }
       nuevoReg (datos) {
             return fetch(host+'usuario',Headers.headerPostCB(datos))
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
             return fetch(host+`usuario/delete/${codigo}`,Headers.headerPostSB()
             ).then(response =>response.json())
              .then((resp) => resp)
              .catch( (err) =>err);
          }
        
     
     
      obtenerUsuario(data){
        var datos=data;
         return fetch(host+`usuario/login`,{
             method:'POST',
             headers:{
                 Accept:'application/json',
                 'Content-Type':'application/json',
             },
             body: JSON.stringify(datos)
                     
         })
         .then(response => response.json())
         .then((resp) =>resp)
         .catch((err) =>console.log(err)) 
     
     }
  }
  export default new DatosUsuario()