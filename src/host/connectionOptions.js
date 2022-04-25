/**  'force new connection' : true,
    reconnec#ffffffempts: 'Infinity', 
    timeout : 10000,  
   
    rememberUpgrade:true, */
    const connectionOptions =  {
    
        "IEO":3,
         "transports": ["websocket","polling"]
       };
       
       export default connectionOptions;