import host from '../host/host';
import Headers from '../host/Headers';

class DataInforme{
 


    consultarInforme(datos){
    
      return  fetch(host+`informe`,Headers.headerPostCB(datos))
                .then(response => response.json())
                .then((responsedatos) => responsedatos)
                .catch((error) => error);
    }
  }
    
  export default new DataInforme()