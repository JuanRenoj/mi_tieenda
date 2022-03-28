import ls from "local-storage";
class Headers{
     
    headerGet(){
      let  headerGets={
          method:'GET',
          headers:{
          authorization: "Baerer "+ls.get('usuario').token, 
          Accept: 'application/json',
          'Content-Type': 'application/json',
          }
      } 
    //  console.log("cosnoss   "+headerGets)
      return headerGets;
      }

      headerPostSB(){
        let  headerPost={
            method:'POST',
            headers:{
            authorization: "Baerer "+ls.get('usuario').token, 
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }
        } 
        return headerPost;
        }
        headerPostCB(data){
            let  headerPost={
                method: 'POST',
                headers: {
                  authorization:  "Baerer "+ls.get('usuario').token, 
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
            return headerPost;
            }

}
export default  new Headers();