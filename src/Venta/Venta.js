//import "bootstrap/dist/css/bootstrap.min.css";
//import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/estado.css'
import DataProducto from "../Producto/DataProducto";
import React, { useState, useEffect } from 'react';

import DataCliente from "../Cliente/DataCliente";
import DataPrecio from "../Precio/DataPrecio";
import DataPrecioCliente from "../Precio/DataPrecioCliente";
import DataFactura from "../Venta/DataFactura";
import DataDetalle from "../Venta/DataDetalle";
import ls from "local-storage";
import moment from "moment";

import { io } from "socket.io-client";
import host from "../host/hostweb";
import DataBodega from "../Bodega/DataBodega";
import swal from "sweetalert";
import connectionOptions from "../host/connectionOptions";



function Venta(props) {
    const [idFactura,setIdFactura]=useState("");
    const [idcliente,setIdCliente]=useState("");
    const [idEmpleado, setIdEmpleado] =useState("")
   
    const [fecha,setFecha]=useState("");
    const [idproducto, setIdproducto]=useState("");
    const [precioActual, setPrecioActual]=useState("");
 

    const [subtotal,setSubtotal]=useState(0.00);
    const [total,setTotal]=useState(0.00);
    const [descuento,setDescuento]=useState("");
    const [cambio,setCambio]=useState(0.00);
    const [recibido,setRecibido]=useState("");
    const [nombre, setnombre] = useState("");
    const [apellido, setapellido] = useState("");
    const [direccion, setdireccion] = useState(""); 
    const [telefono, settelefono] = useState("");
    const [correo, setcorreo] = useState("");
    const [datos, setdatos] = useState([]);
    const [encontrado, setencontrado] = useState([]);
    const [buscar, setbuscar] = useState("");
    const [datosv, setdatosv] = useState([]);
    const [datosc, setdatosc] = useState([]);
    const [precioCliente,setPrecioCliente]=useState(false);
    const [precios, setPrecios]=useState([]);
    const [nuevoPrecio,setNuevoPrecio]=useState("");
    const [datosDefault, setdatosDefault] = useState([]);

    useEffect(() => {
   
      acceso("Precio Cliente")
        consultarProducto();
        consultarCliente("primero");
        obneterEmpleado()
        setFecha(moment(new Date()).format("YYYY-MM-DD"));
   
     //  numero_orden();
    }, []);
    const acceso = (modulo) => {
        let permiso=ls.get("permiso");
  
        permiso.map((item) =>{
            if(item.nombre === modulo){
                if(item.escritura ===1){
                    setPrecioCliente(true);
                }
            }
            return true;
        })
        
    }
 const  obneterEmpleado=()=> {    
  if(ls.get('usuario')!==null){
console.log(ls.get("usuario"))
      setIdEmpleado(ls.get("usuario").idempleado)
  }
}
async function numero_orden() {
    let orden = await DataFactura.NumeroOrden()
    if(orden !== null) {
        if(orden.message==="Success"){
            console.log("numero de orde:" +orden.res[0].numero_orden)
            setIdFactura(orden.res[0].numero_orden);
        }
    }
    
}
    async function consultarProducto() {
        let dat = await DataProducto.consultarDisponible();
        if (dat !== null) {
            console.log("🚀 ~ file: App.js ~ line 24 ~ consultarProducto ~ dat", dat);
         setdatosDefault(dat.res)
//setencontrado(dat.res);
            setdatos(dat.res);
        }
    }
    async function consultarCliente(position) {
        let datc = await DataCliente.consultar();
    
        if (datc !== null) {
          setdatosc(datc.res);
 
          switch(position){
          case "primero":
            setIdCliente(datc.res[0].idcliente)
            break;
            case "ultimo":
            let ult=datc.res.length-1;
        
            setIdCliente(datc.res[ult].idcliente)
            break;
            default:
            break;
            }
        }
    
      }


    async function abrirIngreso(e) {
        limpiarCliente();
        var myInput = document.getElementById("exampleModal");
        e.addEventListener("shown.bs.modal", function () {
            myInput.focus();
        });

    }

 
    

async function guardarCliente(){
      let data={
        idcliente:0,
        nombre:nombre,
        apellido:apellido,
        direccion:direccion,
        telefono:telefono,
        correo:correo,
      }
       let cliented=await DataCliente.nuevoReg(data);
       if(cliented !== null){
           if(cliented.message ==="Success"){
             limpiarCliente();
           
             swal("Cliente ingresado con exito");
              consultarCliente("ultimo");
        }
       }
    }

 
    const limpiarCliente=()=>{
       // setidcliente("")
         setnombre("");
         setapellido("");
         settelefono("");
         setcorreo("");
         setdireccion("");
       
        
    }

    const Busqueda = (buscarTexto) => {
      setencontrado(datosDefault);
        let text = buscarTexto.replace(/^\w/, (c) => c.toLowerCase());
        setbuscar(buscarTexto);
        setdatos(encontrado.filter(function (item) {
            return item.nombre.toLowerCase().includes(text) || item.color.toLowerCase().includes(text) || item.estilo.toLowerCase().includes(text) || item.ubicacion.toLowerCase().includes(text);
        }).map(function ({ idproducto, proveedor, nombre, estilo, color, cant_rollo,   cant_yarda,precio_rollo, precio_yarda, ubicacion }) {
            return { idproducto, proveedor, nombre, estilo, color, cant_rollo,   cant_yarda,precio_rollo, precio_yarda, ubicacion }
        })
        );
    }

    
const BusquedaTodo =(buscarTexto)=>{
    let text=buscarTexto.toLowerCase();
    let filt=datosDefault.filter(function(item){
      return item.nombre.toLowerCase().includes(text) || item.color.toLowerCase().includes(text) || item.estilo.toLowerCase().includes(text) || item.ubicacion.toLowerCase().includes(text) ;   
    }).map(function ({ idproducto, proveedor, nombre, estilo, color, cant_rollo,   cant_yarda,precio_rollo, precio_yarda, ubicacion }) {
        return { idproducto, proveedor, nombre, estilo, color, cant_rollo,   cant_yarda,precio_rollo, precio_yarda, ubicacion }
    })
setencontrado(filt);
   setdatos(filt);
      }
  
     
          const Busqueda3 = (texto) => {
           
            let text=texto.toLowerCase();
          
              let filt=datosDefault.filter(function(item){
                return item.ubicacion.toLowerCase()===(text) ;   
            }).map(function ({ idproducto, proveedor, nombre, estilo, color, cant_rollo,  cant_yarda,precio_rollo, precio_yarda, ubicacion }) {
                return { idproducto, proveedor, nombre, estilo, color, cant_rollo,  cant_yarda,precio_rollo, precio_yarda, ubicacion }
            })
        setencontrado(filt);
             setdatos(filt);

              }  

        
        const calcDescuento= (cantidad) => {
            setDescuento(cantidad)
            if(cantidad > 0){
            setTotal(subtotal-cantidad) 
            }else{
                setTotal(subtotal)
            }

        }

        const calcCambio= (cantidad) => {
            
            if(cantidad > total){
            setCambio(Math.abs(total-cantidad)) 
            }else{
                setCambio(0)
            }
            setRecibido(cantidad)
           
        }
      
      const updateDatosDefault = (params) => {
          datosDefault.map(item =>{
              if(item.idproducto === params.idproducto){
                item.cant_rollo=  params.cant_rollo;
                item.cant_yarda=   params.cant_yarda;  
              }
              return true;
          }
          )
          
      }
        
const existeProducto = (data) => {
    let existente=false;
    if(datosv.length > 0){
        datosv.map((item)=>{
            if(data.idproducto === item.idproducto){
            existente= true    
        }
        return true;
        })
    }
    return existente;
}
const AgregarNuevo = (data) => {
    let newItem={
        "idproducto":data.idproducto,
        "descripcion":data.nombre + " " +data.estilo + " "+ data.color,
        "cant_rollo":"",
        "cant_yarda": "",  
        "precio_yarda":data.precio_yarda,
        "total":0,
        "ubicacion":data.ubicacion,
        
    }

     let datosDeventas=returnDatosDeVenta(datosv,newItem);  
 
  setdatosv(datosDeventas);

    calcTotal(datosDeventas);
}

const returnDatosDeVenta = ( datosventa,newItem) => {
    let dts=datosventa;
    dts.push(newItem);
    return dts;
    
}

 const AgregarProducto=(data,cantidad) =>{
        datos.map((item) =>{
        if(item.idproducto === data.idproducto){
           if(item.cant_yarda >= cantidad){
           if(!existeProducto(data)){
               AgregarNuevo(data,cantidad);
           }
           }
           setdatos(datos=>[...datos]);  
           setencontrado(datos);
       }
       return true;
    } );    
 
          calcTotal(datosv)        
            }
  
            const AgregarYarda= (data,cantidad) => {
                let newdatos;
                datosv.map((item) =>{
                    if(item.idproducto === data.idproducto){
                         if(cantidad >=1){
                            item.cant_yarda=cantidad;
                         item.total=(Number(item.precio_yarda)* Number(item.cant_yarda)).toFixed(2);
                            newdatos=item;
                        setdatosv(datosv=>[...datosv]);  
                        calcTotal(datosv);
                        }
                        if(cantidad === ""){
                            item.cant_yarda="";          
                            item.total=(Number(item.precio_yarda)* Number(item.cant_yarda)).toFixed(2);
                            newdatos=item;
                        setdatosv(datosv=>[...datosv]);  
                        calcTotal(datosv);
                        }
                   
                    }
                    return true; 
                });
               return newdatos;
        }
    
         
        const AgregarRollo= (data,cantidad) => {
            let newdatos;
            datosv.map((item) =>{
                if(item.idproducto === data.idproducto){
                     if(cantidad >= 1){
                        item.cant_rollo=cantidad;
                        item.total=Number(item.precio_yarda)* Number(item.cant_yarda).toFixed(2);
                    newdatos=item;
                    setdatosv(datosv=>[...datosv]);  
                   
                    calcTotal(datosv);
                    }
                    if(cantidad === ""){
                        item.cant_rollo=""; 
                     
                        item.total=((item.precio_yarda*item.cant_yarda)).toFixed(2);
                      newdatos=item;  
                    setdatosv(datosv=>[...datosv]);  
                    
                    calcTotal(datosv);
                    }
                 
                }
                return true; 
            });
         return newdatos;  
    }
       
    
    const descontarRollo = (data, cantidad) => {
        datos.map(item =>{
            if(item.idproducto === data.idproducto)
            {
                item.cant_rollo=Number(item.cant_rollo)+ Number(data.cant_rollo);
                if(item.cant_rollo >= cantidad){
                    item.cant_rollo=(Number(item.cant_rollo)-Number(cantidad)).toFixed(2);
                    AgregarRollo(data,cantidad)
                    setdatos(datos => [...datos])
                    setdatosDefault(datos)
                }else{
                    AgregarRollo(data,item.cant_rollo)
                    let anterior=Number(item.cant_rollo);
                    item.cant_rollo=(Number(item.cant_rollo)-Number(anterior)).toFixed(2)
                    setdatos(datos => [...datos]) 
                    setdatosDefault(datos)
                }
            }
            return true;
        })

        
    }
    const descontarYarda = (data, cantidad) => {
        datos.map(item =>{
            if(item.idproducto === data.idproducto) {
                item.cant_yarda=Number(item.cant_yarda)+ Number(data.cant_yarda);
                if(item.cant_yarda >= cantidad){
                    item.cant_yarda=(Number(item.cant_yarda)-Number(cantidad)).toFixed(2);
                    AgregarYarda(data,cantidad)
                    setdatos(datos => [...datos])
                }else{
                    AgregarYarda(data,item.cant_yarda)
                    let anterior=Number(item.cant_yarda);
                    item.cant_yarda=(Number(item.cant_yarda)-Number(anterior)).toFixed(2);
                    setdatos(datos => [...datos]) 
                }
            }
            return true;
        }) 
    }
    
    

            const calcTotal=(data )=>{       
                   let subTotal=0;
                   data.map((item)=>{       
                   subTotal=(Number(subTotal)+ Number(item.total)).toFixed(2);
                    console.log("sutbotal: "+ subTotal);
                    return true;
                })
                setSubtotal(subTotal);
                setTotal(subTotal)
            }

      

const devolverProducto = (data) => {
    let res=false;
   res=datos.map((item)=>{
              if(item.idproducto === data.idproducto){
                  item.cant_yarda=(Number(item.cant_yarda)+Number(data.cant_yarda));
                  item.cant_rollo=(Number(item.cant_rollo)+Number(data.cant_rollo));
                  updateDatosDefault(item)
                   setdatos(datos => [...datos])
                 
                   res= true;
              }
              return true;     
          });
          return res;
  
}


       const eliminar=(data,idpro)=>{
           console.log(data) 
          datosv.map((item, index)=>{
              if(data.idproducto===item.idproducto){
                  if(devolverProducto(data)){
                      console.log("numero de indice: " + index)
                  datosv.splice(index,1)     
                  calcTotal(datosv);
                  setdatosv(datosv=>[...datosv]);
                
                  }
              }
              return true;
          })

            }        
const detalleItem = (data,codigoFac) => {
  let item={
    "iddetalle":0,
    "idfactura":codigoFac,
    "idproducto":data.idproducto,
    "rollo":data.cant_rollo !== "" ? data.cant_rollo : 0,
    "yarda":data.cant_yarda !== "" ? data.cant_yarda : 0,
    "precio":data.precio_yarda,
    "total":data.total,

  }
 
  return item
}

 async function vender(estados,lugar) {

let fact={
    "idfactura":0, 
    "idcliente": idcliente, 
    "idempleado":idEmpleado, 
    "fecha": fecha, 
    "total": total , 
    "estado": estados, 
    "lugar": lugar, 
}
    let ingresado=await DataFactura.nuevoReg(fact);
    if(ingresado !== null){
       
        if(ingresado.message==="Success"){
            await Promise.all(   
                datosv.map(async (item) =>{
                let row=detalleItem(item,ingresado.res[0].idfactura)
                console.log(row)
                let detalleIngresado=await DataDetalle.nuevoReg(row);
                if(detalleIngresado !== null){
                    if(detalleIngresado.message === "Success" ){
                        console.log("detalle ingresado");
                    }
                }
            })
            )


  
    }
    }
  
     returnTipoBodega(datosv,"Bodega",ingresado.res[0].idfactura)
    returnTipoBodega(datosv,"Bodega La Septima",ingresado.res[0].idfactura)
    returnTipoBodega(datosv,"Bodega La Vuelta",ingresado.res[0].idfactura)
    returnTipoBodega(datosv,"Bodega 4",ingresado.res[0].idfactura)
     if(estados ==="Caja"){
        enviarACaja(ingresado.res[0].idfactura) 
    }

   imprimirBoleta();
   
    
 }

const borraDatosVenta = () => {
    datosv.splice(0);
    setdatosv(datosv=>[...datosv]);
    setTotal("");
    setSubtotal("")
    setDescuento("")
    setCambio("")
    setRecibido("")

}

          
 async function consultaPrecio(id) {
let dat = await DataPrecio.consultarXPro(id);
if (dat !== null) {
    console.log(dat.res);
    setPrecios(dat.res);
}
}

async function consultaPrecioCliente(datos) {
    let dat = await DataPrecioCliente.consultarXCliente(datos);
    if (dat !== null) {
        console.log(dat.res); 
        setPrecios(dat.res);
    }
}    
            
        const seleccionarPrecio = (tipo, id,actual,e) => {
            setPrecios([]);
            switch(tipo){
                case "normal":
                    consultaPrecio(id)
                    break;
                case "cliente":   
               let  data={
                   idprecio:0,
                   idproducto:id,
                   idcliente:idcliente,
                   preciorollo:0,
                   precioyarda:0
                }
                    consultaPrecioCliente(data);
                    break;
                 
                default:
                    break;
            }
            setIdproducto(id);
            setPrecioActual(actual)
            limpiarCliente();
            var myInput = document.getElementById("modalPrecio");
            e.addEventListener("shown.bs.modal", function () {
                myInput.focus();
            });
        }
        

const ModificarPrecio=(data, nuevoPrecio)=>{
    datosv.map((item) =>{
        if(item.idproducto === data.idproducto){
            item.precio_yarda=nuevoPrecio;
            item.total=Number(item.cant_yarda)*Number(item.precio_yarda);
           
        }
        return true;
    })
     setdatosv(datosv => [...datosv]);
    calcTotal(datosv);
}
const ActualizarPrecio = () => {

   datosv.map((item) =>{
        if(item.idproducto === idproducto){
            item.precio_yarda=nuevoPrecio;
            item.total=Number(item.cant_yarda)*Number(item.precio_yarda);
           
        }
        return true;
    })
    setNuevoPrecio("");
     setdatosv(datosv => [...datosv]);
    calcTotal(datosv);  
}


const imprimirBoleta = () => {
    swal("¡Desea imprimir el comprobante de venta?",
    {
        icon: "warning",
        buttons: {
          cancel: "No",
        Sí: true,
        },
      })
      .then((si) => {
        if (si) {
          var content=document.getElementById("factura").innerHTML;
    let w=window.open();
    w.document.write(content);
    w.document.close();
    w.focus();
    w.print();
    w.close();

       consultarProducto();
    numero_orden();
    setIdCliente(datosc[0].idcliente);
    borraDatosVenta();
    return true;
 

        } else{
            consultarProducto();
            numero_orden();
            setIdCliente(datosc[0].idcliente);
            borraDatosVenta();
        }
      });
   
}

async function returnTipoBodega (data, bodega, cod)  {
    await Promise.all(   
        data.map(async (item) =>{
            if(item.ubicacion===bodega){
        let row=detalleBItem(item,cod)
        console.log(row)
        let despachoBodega=await DataBodega.nuevoReg(row);
        if(despachoBodega !== null){
            if(despachoBodega.message === "Success" ){
                console.log("Despacho bodega ingresado");
                  solicitarMedidaBodega(bodega,cod);
            }
        }
    }
    })
    )
  
    
}

     
const detalleBItem = (data,codigoFac) => {
    let item={
      "iddespacho":0,
      "idfactura":codigoFac,
      "idproducto":data.idproducto,
      "descripcion":data.descripcion,
      "rollo":data.cant_rollo !== "" ? data.cant_rollo : 0,
      "yarda":data.cant_yarda !== "" ? data.cant_yarda : 0,
      "ubicacion":data.ubicacion,
      "estado":'Pendiente',
  
    }
   // console.log(item)
    return item
  }

  const solicitarMedidaBodega = (params,cod) => {
      switch(params){
            case "Bodega":
              enviarABodega(cod);
            break;
            case "Bodega La Septima":
              enviarABodega1(cod);
            break;
            case "Bodega La Vuelta":
              enviarABodega2(cod);
            break;
            case "Bodega 4":
               enviarABodega3(cod)
               break;
            default:
               // console.log("");
            break;

      }
      
  }
  
const enviarABodega=(cod)=>{
    const socket=io(host,connectionOptions);
   socket.on("connect",()=>{
     socket.emit('Bodega',{modulo:'bodega',message:cod});
    });
  }
  const enviarABodega1=(cod)=>{
    const socket=io(host,connectionOptions);
   socket.on("connect",()=>{
     socket.emit('BodegaLaSeptima',{modulo:'BodegaLaSeptima',message:cod});
    });
  }
  const enviarABodega2=(cod)=>{
    const socket=io(host,connectionOptions);
   socket.on("connect",()=>{
     socket.emit('BodegaLaVuelta',{modulo:'BodegaLaVuelta',message:cod});
    });
  }
  const enviarABodega3=(cod)=>{
    const socket=io(host,connectionOptions);
    console.log(socket)
   socket.on("connect",()=>{
     socket.emit('Bodega4',{modulo:'Bodega4',message:cod});
    });
  }
  const enviarACaja=(cod)=>{
    const socket=io(host,connectionOptions);
   socket.on("connect",()=>{
     socket.emit('Caja',{modulo:'Caja',message:cod});
    });
  }
return (
<div className="container-fluid p-2 vh-100">
   
    <div className="h-contain d-flex flex-wrap-reverse">     
        <div className="col d-flex ">
             <div className="col">   
                <h6 className="modal-title ">Punto de Venta, Textiles G&S</h6>
              </div>
              <div className="row">
              <div className="col">  
                  <select className="form-select form-select-sm" id="floatingSelectGrid" data-live-search="true" data-size="8" aria-label="Floating label select example" value={idcliente} onChange={(e)=>setIdCliente(e.target.value)}>
                         {datosc ? datosc.map((item,index) =>(
                         <option key={index} value={item.idcliente} data-tokens={item.nombre}>{item.nombre+ " " +item.apellido}</option>))
                         :
                        null
                          }
                    </select>
              </div>
              <div className="col">
                  <button type="button" className="ml-2 btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e)=>abrirIngreso(e.target)} >+ Cliente</button>
               
              </div> 
              </div>                                    
        </div>
        
    </div>
       
        <div className="row g-3 mb-1">    
        <h6>Lista de producto Disponible</h6>
            <div className="col">
                <div className=" col input-group  form-group " >
                    <div className="col input-group-prepend " >
                    <i className="bi bi-search" style={{color:'gray'}}  ></i>
                    <input type="text" className="form-control" placeholder="Buscar Producto..."  value={buscar}  onChange={(e)=>Busqueda(e.target.value)} />
                    </div>
                </div>                      
            </div> 
            <div className="col"> 
               <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"    value=""  onChange={(e)=>BusquedaTodo(e.target.value)} selected/>
                  <label className="form-check-label" htmlFor="exampleRadios1">Todos</label>
                </div> 
               <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Tienda"  onClick={(e) => Busqueda3(e.target.value)}/>
                  <label className="form-check-label" htmlFor="exampleRadios2">Tienda</label>
               </div>
               <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="Bodega La Septima" onClick={(e) => Busqueda3(e.target.value)}/>
                 <label className="form-check-label" htmlFor="exampleRadios3">Bodega La Septima</label>
               </div>
               <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="Bodega La Vuelta" onClick={(e) => Busqueda3(e.target.value)}/>
                 <label className="form-check-label" htmlFor="exampleRadios4"> Bodega La Vuelta</label>
               </div> 
               <div v="form-check form-check-inline">
                 <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios5" value="Bodega 4" onClick={(e) => Busqueda3(e.target.value)} />
                 <label className="form-check-label" htmlFor="exampleRadios5"> Bodega 4 </label>
               </div>            
            </div>

          
                            
                  
    </div>
    {/**seccion de modal */}

    <div className="modal fade "  id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"  >
  <div className="modal-dialog  modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Ingreso de Cliente</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

  <div className="form-outline mb-4">
     <label className="form-label" htmlFor="form1Example1" >Nombre</label>
     <input type="text" id="form1Example1" className="form-control" value={nombre}  onChange={e => setnombre(e.target.value)} />
   
  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Apellido</label>
        <input type="text" id="form1Example1" className="form-control" value={apellido}  onChange={e => setapellido(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Direccion</label>
        <input type="text" id="form1Example1" className="form-control" value={direccion}  onChange={e => setdireccion(e.target.value)} />

  </div>

  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Telefono</label>
        <input type="text" id="form1Example1" className="form-control" value={telefono}  onChange={e => settelefono(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Correo</label>
        <input type="text" id="form1Example1" className="form-control" value={correo}  onChange={e => setcorreo(e.target.value)} />

  </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-primary" onClick={()=>guardarCliente()} >Guardar</button>
      </div>
    </div>
  </div>
</div>
 {/**final de la seccion del modal 
  * ---------------------------------------------------------------------------
  * comienzo del modal de precio 
 */}
 
 <div className="modal fade "  id="precioModal" tabIndex="-1" aria-labelledby="precioModalLabel" aria-hidden="true"  >
  <div className="modal-dialog  modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Seleccione el Precio</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="form-outline mb-4">
    
        <input type="text" id="form1Example1" className="form-control" value={idproducto}  hidden={true} onChange={()=>{}} />
   <label className="form-label" htmlFor="form1Example1" >Precio actual: Q{precioActual}</label>
  </div>

  <div className="form-outline mb-4">
      <h6>Precio por Rollo</h6>
      {precios ? 
      <select className="form-select" id="floatingSelectGrid" data-live-search="true" data-size="8" aria-label="Floating label select example" value={nuevoPrecio} onChange={(e)=>setNuevoPrecio(e.target.value)}>
      <option value="" >Seleccionar precio</option>
     { precios.map((item, index) =>(
        
      <option key={index} value={item.preciorollo} >{" " +item.preciorollo}</option>
     
      ))
     }
 </select>
      
      :null}
     
  </div>
  <div className="form-outline mb-4">
      <h6>Precios por yarda</h6>
      {precios ? 
      <select className="form-select" id="floatingSelectGrid" data-live-search="true" data-size="8" aria-label="Floating label select example" value={nuevoPrecio} onChange={(e)=>setNuevoPrecio(e.target.value)}>
       <option value="" >Seleccionar precio</option>
     { precios.map((item,index) =>(
        
      <option key={index} value={item.precioyarda} >{" " +item.precioyarda}</option>
     
      ))
     }
 </select>
      
      :null}
     
  </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>ActualizarPrecio()} >Aplicar</button>
      </div>
    </div>
  </div>
</div>
 {/** final del modal precio  _____________________________________________________*/}
 
    <div className="row">
        <div className="col-12 col-sm-12 col-md-9 col-lg-9">
            <div className="col div-secc">
                <div className="table-wrap ">
                    <table className="table-item" >
                        
                        <thead >
                            <tr >
                                <th>#</th>
                                <th>Descripcion</th>
                                <th>cantidad rollo</th>                                
                                <th>Cantidad yarda</th>
                                <th>Precio rollo</th>
                                <th>Precio yarda</th>                             
                                <th>Ubicacion</th>
                            </tr>
                        </thead>
                        <tbody >
                            {datos ? datos.map((item,index) => (
                                <tr key={index} onClick={()=>{AgregarProducto(item,0)}}>
                                    <td >{item.idproducto}</td>
                                    <td >{item.nombre+ " "} {item.estilo+ " "} {item.color}</td>
                                    <td >{item.cant_rollo}</td>    
                                    <td >{item.cant_yarda}</td> 
                                    <td >{item.precio_rollo}</td>
                                    <td >{item.precio_yarda}</td>
                                    <td >{item.ubicacion}</td>
                                  
                                </tr>
                            ))
                            : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
<h6 className="text-black mt-3" >Lista de producto del cliente</h6>
            <div className="col div-secc "> 
            
                <div className="table-wrap">
                    <table className="table-subitem">
                  
                        <thead >
                            <tr>
                                <th></th>
                                <th>Descripcion</th>
                                <th>Rollo</th> 
                                <th>Yarda</th>                              
                                <th>Precio yarda</th>
                                <th>Subtotal</th>
                                <th>ubicacion</th>
                                <th>Acción</th>
                             
                                
                            </tr>
                        </thead>
                        <tbody>
                            {datosv ? datosv.map((item,index) => (
                            <tr key={index} >
                                <td></td>
                                <td>{item.descripcion}</td>
                                
                                <td><input type="number" className="form-control  form-control-sm w-50 "  value= {item.cant_rollo} onChange={(e)=>{descontarRollo(item,(e.target.value))}}/></td>
                                <td><input type="number" className="form-control  form-control-sm w-50 "  value={item.cant_yarda}  onChange={(e)=>{descontarYarda(item,(e.target.value))}}/></td>
                            
                                <td>
                                    <div className="d-flex  align-items-center ">
                                        <input type="number" onChange={(e)=>{ModificarPrecio(item,e.target.value)}} className="form-control form-control-sm w-50" value={item.precio_yarda}/> 
                                        <i className="bi bi-pencil-square " aria-hidden="true" data-bs-toggle="modal" data-bs-target="#precioModal" style={{color:"#1C78E3"}} onClick={(e)=>seleccionarPrecio("normal",item.idproducto,item.precio_yarda,e.target)}></i>
                                        {precioCliente ? 
                                        <i className="bi bi-credit-card-2-back" aria-hidden="true" data-bs-toggle="modal" data-bs-target="#precioModal"  style={{color:"#2ED19E"}} onClick={(e)=>seleccionarPrecio("cliente",item.idproducto,item.precio_yarda,e.target)}></i> 
                                        : null}
                                    </div> 
                                </td>
                                <td >{item.total}</td>   
                                <td >{item.ubicacion}</td>
                                <td >
                                <i className="bi bi-trash"   style={{color:"#D6294A"}} aria-hidden="true" onClick={()=> eliminar(item, item.idproducto)}></i>
                                </td>
                            </tr>
                            ))
                            : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
          
        </div>
          <div className="col-12 col-sm-12 col-md-3 col-lg-3 div-cobro">
          
  
  <div class="row mb-2 mt-3">
  <label for="inputPassword3" class="col-sm-4 col-form-label">Subtotal</label>
    <div class="col-sm-8">
    <input className="form-control" value={subtotal} disabled /> 
    </div>
  </div>

  <div class="row mb-2">
    <label for="inputPassword3" class="col-sm-4 col-form-label">Descuento:</label>
    <div class="col-sm-8">
      <input type="number" class="form-control" value={descuento} onChange={(e)=>calcDescuento(e.target.value)}/> 
    </div>
  </div>
  <div class="row mb-2">
    <label for="inputPassword3" class="col-sm-4 col-form-label">Total:</label>
    <div class="col-sm-8">
      <input type="number" class="form-control" disabled value={total}/> 
    </div>
  </div>
  <div class="row mb-2">
    <label for="inputPassword3" class="col-sm-4 col-form-label">Recibido:</label>
    <div class="col-sm-8">
      <input type="number" class="form-control" value={recibido} onChange={(e)=>calcCambio(e.target.value)}/>
    </div>
  </div>
  <div class="row mb-3">
    <label for="inputPassword3" class="col-sm-4 col-form-label">Cambio:</label>
    <div class="col-sm-8">
      <input type="number" class="form-control" disabled value={cambio} />
    </div>
  </div>
  <div className="row d-flex justify-content-center">
    <button type="button" className="btn btn-primary w-75 mb-2 " onClick={() =>vender("Vendido","Tienda")} >Vender</button>
    <button type="button" className="btn btn-danger w-75 " onClick={() =>vender("Pendiente","Caja")} >A caja</button>
  </div> 
     
</div>
    </div>
    {/**detalles del comprobante de venta */}
    <div className="rowfac" id="factura">
        <div>
            <h5>Distribuidora textiles GS</h5>
            
        </div>

 <div className="colfac">
                    <table className="table">
                  
                        <thead >
                            <tr>
                       
                                <th >Descripcion</th>
                                <th >Rollo</th> 
                                <th >Yarda</th>
                                <th >Precio</th>
                                <th  >Subtotal</th>
                             
                                
                            </tr>
                        </thead>
                        <tbody>
                            {datosv ? datosv.map((item,index) => (
                            <tr key={index} >
                          
                                <td  >{item.descripcion}</td>
                               
                                <td  >{item.cant_rollo}</td>
                                <td  >{item.cant_yarda}</td>
                                <td  >{item.precio_yarda}</td>
                               
                                <td >{item.total}</td>   
                              
                            </tr>
                            ))
                            : null
                            }
                        </tbody>
                    </table>
                </div>
  
    <div className="rowfoot" id="rowfoot">
    <div className="colf">
                    <span>Subtotal: {"Q "+subtotal+" "}</span>
                    </div>
                    <div className="colf">   
                    <span>Descuento: { "Q "+ descuento}</span> 
                    </div>                   
                    <div className="colf">
                    <span>Total: {"Q "+total+" "} </span> 
                    </div> 
    </div>
</div>
</div>


    );
}
export default Venta;
