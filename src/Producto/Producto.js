// "bootstrap/dist/css/bootstrap.min.css";
//import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/estado.css'
import '../css/login.css'
import DataProducto from "./DataProducto";
import DataProveedor from "../Proveedor/DataProveedor";
import DataPrecio from "../Precio/DataPrecio";
import DataPrecioCliente from "../Precio/DataPrecioCliente";
import DataCliente from "../Cliente/DataCliente";
import moment from "moment";
import React, { useState,useEffect } from 'react';
import swal from "sweetalert";
import TablePdf from "../components/TablePdf";
import  ReactPDF  from '@react-pdf/renderer';



function Producto(props)  {
    const [idproducto, setidproducto] = useState("");
    const [idproveedor, setidproveedor] = useState("");
    const [nombrepro, setnombrepro] = useState("");
    const [estilo, setestilo] = useState(""); 
    const [color, setcolor] = useState("");
    const [cant_rollo, setcant_rollo] = useState(""); 
    const [cant_yarda, setcant_yarda] = useState("");
    const [precio_compra, setprecio_compra] = useState("");
    const [ubicacion, setubicacion] = useState("");
    const [datos, setdatos] = useState([]);
 
    const [datosp, setdatosp] = useState([]);
    const [encontrado, setencontrado] = useState([]);
    const [buscar, setbuscar] = useState("");
    const [idcliente,setIdCliente]=useState("");
    const [accion, setaccion] = useState("new");
    const [datoscl, setdatoscl] = useState([]);
    const [precio_rollo, setprecio_rollo] = useState("");
    const [precio_yarda, setprecio_yarda] = useState("")
    const [precio_rollo2, setprecio_rollo2] = useState("");
    const [precio_yarda2, setprecio_yarda2] = useState("");
 const [datosDefault, setdatosDefault] = useState([]);
 const [rowMover, setrowMover] = useState();
 const [newcant_rollo, setnewcant_rollo] = useState(""); 
 const [newcant_yarda, setnewcant_yarda] = useState(""); 
 const [newubicacion, setnewubicacion] = useState("");
 const [rowAnterior, setrowAnterior] = useState();   

 const [viewInforme, setViewInforme] = useState(false)
 
 
    



    useEffect(()=>{
        consultarProducto();
        consultarProveedor();
        consultarCliente();
        
    }, []);

    async function consultarProducto() {
        let dat = await DataProducto.consultar();
        if (dat !== null) {
        console.log("🚀 ~ file: App.js ~ line 24 ~ consultarProducto ~ dat", dat);
          console.log(dat.res);
          setdatosDefault(dat.res);
          setencontrado(dat.res); 
          setdatos(dat.res);
        }
      }
      async function consultarProveedor() {
        let datp = await DataProveedor.consultar();
       console.log(datp);
        if (datp !== null) {
       /* console.log("🚀 ~ file: App.js ~ line 24 ~ consulta proveedor ~ dat", dat);*/
      
         console.log(datp);
          setdatosp(datp.res);
        }
      }

async function abrirIngreso(e){
    limpiar();
    var myInput = document.getElementById("exampleModal");
    e.addEventListener("shown.bs.modal", function () {
      myInput.focus();
    });

}

async function abrirPrecio(e,idpro){
  setidproducto(idpro)
limpiar2();
  var myInput = document.getElementById("precioModal");
  e.addEventListener("shown.bs.modal", function () {
    myInput.focus();
  });

}

async function abrirPrecioxcliente(e,idpro){
 setidproducto(idpro)
  var myInput = document.getElementById("preciocModal");
  e.addEventListener("shown.bs.modal", function () {
    myInput.focus();
  });

}





async function actualizar(datos, e){

    setidproducto(datos.idproducto);
    setidproveedor(datos.idproveedor);
    setnombrepro(datos.nombre);
    setestilo(datos.estilo);
    setcolor(datos.color);
    setcant_rollo(datos.cant_rollo);
    setcant_yarda(datos.cant_yarda);
    setprecio_compra(datos.precio_compra);
    setubicacion(datos.ubicacion);
    setaccion("update")


    var myInput = document.getElementById("exampleModal");
    e.addEventListener("shown.bs.modal", function () {
      myInput.focus();
    });
}
async function guardar(){
  if(accion==="new"){
    let data={
      idproducto:0,
      idproveedor:idproveedor,
      nombre:nombrepro,
      estilo:estilo,
      color:color,
      cant_rollo:cant_rollo, 
      cant_yarda:cant_yarda,
      precio_compra:precio_compra,
      ubicacion:ubicacion,
     
    }
     let productod=await DataProducto.nuevoReg(data);
     if(productod !== null){
       if(productod.message==="Success"){
        limpiar();
       swal("Producto","Ingresado con exito","success");
       consultarProducto();
       }else{
swal("Producto","No se pudo Ingresar, verifique que los datos ingresado son correctos","warning");
       }
   
      
     }
    
    }else{
      console.log("actualizar")
      let data={
        idproducto:idproducto,
        idproveedor:idproveedor,
        nombre:nombrepro,
        estilo:estilo,
        color:color,
        cant_rollo:cant_rollo, 
        cant_yarda:cant_yarda,
        precio_compra:precio_compra,
        ubicacion:ubicacion,
      }
       let productos=await DataProducto.actualizarReg(data);
       console.log(productos)
       if(productos !== null){
      if(productos.message ==="Success"){
         swal("Producto","Actualizado con exito","success");
        limpiar();
         consultarProducto();
      }
        
       }
     }
     
    

}

const actualizar2=(datos, e)=>{
  setnewcant_rollo("");
  setnewubicacion("");
setrowMover(datos);
setrowAnterior(datos)
  setcant_rollo(datos.cant_rollo);
  setcant_yarda(datos.cant_yarda);
  setubicacion(datos.ubicacion);
  var myInput = document.getElementById("moverModal");
  e.addEventListener("shown.bs.modal", function () {
    myInput.focus();
  });
}

const actualizar3=(datos, e)=>{
  setnewcant_rollo("");
  setnewubicacion("");
  setrowMover(datos);
  setrowAnterior(datos)
  setnewcant_rollo(datos.cant_rollo);
  setnewcant_yarda(datos.cant_yarda);
  setcant_rollo(datos.cant_rollo);
  setcant_yarda(datos.cant_yarda);
setubicacion(datos.ubicacion);
  var myInput = document.getElementById("movertodoModal");
  e.addEventListener("shown.bs.modal", function () {
    myInput.focus();
  });
}

async function guardarprecio(){
let datosprecio = {
  "idprecio":0,
  "idproducto":idproducto,
  "preciorollo":precio_rollo,
  "precioyarda":precio_yarda

}
let precioingresado= await DataPrecio.nuevoReg(datosprecio);
if(precioingresado !== null){
  if (precioingresado.message==="Success") {
    swal("Precio","Ingresaso con exito","success");
    consultarProducto();
    
  }else{
    swal("Precio","No se pudo ingresar, verifique los datos ingresado son correctos","warning");
  }
}
}

/*guardar precio por cliente*/
async function guardarpreciocliente(){
  let datosprecio = {
    "idprecio":0,
    "idproducto":idproducto,
    "idcliente":idcliente,
    "preciorollo":precio_rollo2,
    "precioyarda":precio_yarda2
  
  }
  let precioingresado= await DataPrecioCliente.nuevoReg(datosprecio);
  if(precioingresado !== null){
    if (precioingresado.message==="Success") {
      swal("Precio","Ingresado con exito","success");
      consultarProducto();
    }else{
      swal("Precio","No se pudo ingresar, verifique que los datos ingresado son correctos","warning");
    }
  }
  //console.log(datosprecio)
  }




async function consultarCliente(position) {
  let datc = await DataCliente.consultar();

  if (datc !== null) {
    setdatoscl(datc.res);

   
  }

}

const limpiar=()=>{
  
    setidproducto("");
    setidproveedor("");
    setnombrepro("");
    setestilo("");
    setcolor("");
    setcant_rollo("");
    setcant_yarda("");
    setprecio_compra("");
    setubicacion("");
}

const limpiar2=()=>{
 
    setIdCliente("");
    setprecio_rollo("");
    setprecio_yarda("");
}


async function eliminar(idproducto){
let producto=await DataProducto.borraReg(idproducto);


if (producto!==null){
  if(producto.message ==="Success"){
     swal("Producto","Eliminado cn exito","success");
  consultarProducto();
  }
 
}
}

const Busqueda =(buscarTexto)=>{
  let text=buscarTexto.replace(/^\w/,(c) =>c.toLowerCase());
  setbuscar(buscarTexto);
  
  setdatos(encontrado.filter(function(item){
      return item.nombre.toLowerCase().includes(text) || item.color.toLowerCase().includes(text) || item.estilo.toLowerCase().includes(text) || item.ubicacion.toLowerCase().includes(text) ;   
    }).map(function({idproducto, proveedor, nombre, estilo, color, cant_rollo, cant_yarda, precio_compra,preciorollo,precioyarda,  ubicacion}){
      return{idproducto, proveedor, nombre, estilo, color,cant_rollo, cant_yarda, precio_compra, preciorollo,precioyarda,  ubicacion}
    })
   );
  
    }

    
const BusquedaTodo =(buscarTexto)=>{
  let text=buscarTexto.toLowerCase();
  let filt=datosDefault.filter(function(item){
    return item.nombre.toLowerCase().includes(text) || item.color.toLowerCase().includes(text) || item.estilo.toLowerCase().includes(text) || item.ubicacion.toLowerCase().includes(text) ;   
  }).map(function({idproducto, proveedor, nombre, estilo, color,cant_rollo, cant_yarda, precio_compra, preciorollo,precioyarda, ubicacion}){
    return{idproducto, proveedor, nombre, estilo, color,cant_rollo, cant_yarda, precio_compra,preciorollo,precioyarda,  ubicacion}
  });
 setencontrado(filt)
 setdatos(filt);
    }

   
        const Busqueda3 = (texto) => {
         
          let text=texto.toLowerCase();
        
            let filt=datosDefault.filter(function(item){
              return item.ubicacion.toLowerCase()===(text) ;   
            }).map(function({idproducto, proveedor, nombre, estilo, color,cant_rollo, cant_yarda, precio_compra, preciorollo,precioyarda, ubicacion}){
              return{idproducto, proveedor, nombre, estilo, color,cant_rollo, cant_yarda, precio_compra,preciorollo,precioyarda,  ubicacion}
            });
           setencontrado(filt)
           setdatos(filt);
           
          

            }  
async function moverTodo(){
  let data={
    idproducto:rowAnterior.idproducto,
    idproveedor:rowAnterior.idproveedor,
    nombre:rowAnterior.nombre,
    estilo:rowAnterior.estilo,
    color:rowAnterior.color,
    cant_rollo:rowAnterior.cant_rollo, 
    cant_yarda:rowAnterior.cant_yarda,
    precio_compra:rowAnterior.precio_compra,
    ubicacion:newubicacion,
   }
    let productos=await DataProducto.actualizarReg(data);
    console.log(productos)
    if(productos !== null){
   if(productos.message ==="Success"){
      swal("Producto","Movido con exito","success");
    limpiarMover()
      consultarProducto();
   }
     
    }
}

async function moverProducto(){

  let data={
    idproducto:0,
    idproveedor:rowMover.idproveedor,
    nombre:rowMover.nombre,
    estilo:rowMover.estilo,
    color:rowMover.color,
    cant_rollo:newcant_rollo, 
    cant_yarda:newcant_yarda,
    precio_compra:rowMover.precio_compra,
    ubicacion:newubicacion,
    
  }
  let productod=await DataProducto.nuevoReg(data);
  if(productod !== null){
    if(productod.message==="Success"){
   
   actualizarCantidadP()
    
    }else{
swal("Producto","No se pudo Ingresar, verifique que los datos ingresado son correctos","warning");
    }

   
  }
 
 }
  
  
 const limpiarMover = () => {
   setnewcant_rollo("");
   setnewubicacion("")
 }
 


async function actualizarCantidadP(){
   let data={
    idproducto:rowAnterior.idproducto,
    idproveedor:rowAnterior.idproveedor,
    nombre:rowAnterior.nombre,
    estilo:rowAnterior.estilo,
    color:rowAnterior.color,
    cant_rollo:Number(rowAnterior.cant_rollo)-Number(newcant_rollo), 
    cant_yarda:(Number(rowAnterior.cant_yarda)-Number(newcant_yarda)).toFixed(2) ,
    precio_compra:rowAnterior.precio_compra,
    ubicacion:rowAnterior.ubicacion,
   }
    let productos=await DataProducto.actualizarReg(data);
    console.log(productos)
    if(productos !== null){
   if(productos.message ==="Success"){
      swal("Producto","Movido con exito","success");
    limpiarMover()
      consultarProducto();
   }
     
    }
}


        return(
          <div className="container-fluid  p-2 vh-100 ">
            
            <div className="row mb-2 ">
              <div className="mb-2">   <h5 className="modal-title">Producto</h5></div>

            <div className="col-9">
            <div className=" input-group form-group ">                              
                                            <div className="input-group-prepend w-100">
                                            <span className="bi bi-search" style={{color:'gray'}}  ></span>
                                            <input type="text" className="form-control " placeholder="Buscar Producto..."  value={buscar}  onChange={(e)=>Busqueda(e.target.value)} />
                                            </div>
                                            
                                        </div>
                                   
           </div> 
    <div className="col-auto">
  <button type="button" className="ml-2 btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e)=>abrirIngreso(e.target)} >Nuevo</button>
</div> 
<div className="col-auto">
  <button type="button" className="ml-2 btn btn-warning"  onClick={()=>setViewInforme(true)} >Inventario</button>
</div> 


<div className="row">
  
<div className="col"> 
               <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"    value=""  onClick={(e)=>BusquedaTodo(e.target.value)} />
                  <label className="form-check-label" htmlFor="exampleRadios1">Todos</label>
                </div> 
               <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Tienda"  onChange={(e) => Busqueda3(e.target.value)}/>
                  <label className="form-check-label" htmlFor="exampleRadios2">Tienda</label>
               </div>
                <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="Bodega" onChange={(e) => Busqueda3(e.target.value)}/>
                 <label className="form-check-label" htmlFor="exampleRadios4">Bodega</label>
               </div>

               <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="Tienda La Septima"  onChange={(e) => Busqueda3(e.target.value)}/>
                  <label className="form-check-label" htmlFor="exampleRadios3">Tienda La Septima</label>
               </div>
              
               <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios5" value="Bodega La Septima" onChange={(e) => Busqueda3(e.target.value)}/>
                 <label className="form-check-label" htmlFor="exampleRadios5">Bodega La Septima</label>
               </div>
               <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios6" value="Bodega La Vuelta" onChange={(e) => Busqueda3(e.target.value)}/>
                 <label className="form-check-label" htmlFor="exampleRadios6">Bodega La Vuelta</label>
               </div> 
               <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios7" value="Bodega 4" onChange={(e) => Busqueda3(e.target.value)} />
                 <label className="form-check-label" htmlFor="exampleRadios7">Bodega 4 </label>
               </div>            
            </div>
</div>
{/**modal de ingresar producto */}

  <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={true}
        >
  <div className="modal-dialog  modal-dialog-scrollable" >
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Ingreso de nuevo producto</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo del producto</label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idproducto} onChange={(e) => setidproducto(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
     <label className="form-label" htmlFor="form1Example1" >Proveedor</label>

     <select className="form-select" aria-label="Default select example"   value={idproveedor} onChange={(e)=>setidproveedor(e.target.value)}>
     <option>Seleccione un proveedor</option>
     {
     datosp ?
           datosp.map((item,index) =>(
  <option key={index} value={item.idproveedor}  >{item.nombre}</option>
           ))
           :
           null
     }

     
</select>
  </div>
  <div className="form-outline mb-4">
     <label className="form-label" htmlFor="form1Example1" >Nombre</label>
     <input type="text" id="form1Example1" className="form-control" value={nombrepro}  onChange={(e) => setnombrepro(e.target.value)} />
   
  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Estilo</label>
        <input type="text" id="form1Example1" className="form-control" value={estilo}  onChange={(e) => setestilo(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Color</label>
        <input type="text" id="form1Example1" className="form-control" value={color}  onChange={(e) => setcolor(e.target.value)} />

  </div>

  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Cantidad de Rollo</label>
        <input type="text" id="form1Example1" className="form-control" value={cant_rollo}  onChange={(e) => setcant_rollo(e.target.value)} />

  </div>
 
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Cantidad total yarda</label>
        <input type="text" id="form1Example1" className="form-control" value={cant_yarda} onChange={(e) => setcant_yarda(e.target.value)}  />

  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Precio de compra por rollo</label>
        <input type="text" id="form1Example1" className="form-control" value={precio_compra}  onChange={(e) => setprecio_compra(e.target.value)} />

  </div>
  
  
  <div className="form-outline mb-4">
     <label className="form-label" htmlFor="form1Example1" >Ubicacion</label>
     <div className="col-20">
<div className="col"> 
               <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value={ubicacion} checked={ubicacion === "Tienda" ? true : false}  onChange={() => setubicacion("Tienda")} />
                  <label className="form-check-label" htmlFor="exampleRadios1">Tienda</label>
               </div> 
               <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value={ubicacion} checked={ubicacion === "Bodega" ? true : false}  onChange={() => setubicacion("Bodega")}/>
                 <label className="form-check-label" htmlFor="exampleRadios2">Bodega </label>
               </div>
               <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value={ubicacion} checked={ubicacion === "Tienda La Septima" ? true : false}  onChange={() => setubicacion("Tienda La Septima")} />
                  <label className="form-check-label" htmlFor="exampleRadios3">Tienda La Septima</label>
               </div>
              
               <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value={ubicacion} checked={ubicacion === "Bodega La Septima" ? true : false}   onChange={() => setubicacion("Bodega La Septima")}/>
                 <label className="form-check-label" htmlFor="exampleRadios4"> Bodega La Septima</label>
               </div> 
               <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios5" value={ubicacion} checked={ubicacion === "Bodega La Vuelta" ? true : false}   onChange={() => setubicacion("Bodega La Vuelta")} />
                 <label className="form-check-label" htmlFor="exampleRadios5"> Bodega La Vuelta</label>
               </div>  
               <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios6" value={ubicacion} checked={ubicacion === "Bodega 4" ? true : false}   onChange={() => setubicacion("Bodega 4")} />
                 <label className="form-check-label" htmlFor="exampleRadios6"> Bodega 4</label>
               </div>            
            </div>
</div>
  </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-primary" onClick={()=>guardar()} >Guardar</button>
      </div>
    </div>
  </div>
</div>
</div>

{/**modal de principal */}



{/*mover producto a otra bodega */}
<div
          className="modal fade"
          id="moverModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={true}
        >
  <div className="modal-dialog  modal-dialog-scrollable" >
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Mover producto a otra ubicacion</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="row mb-4">
       <label className="form-label" htmlFor="form1Example1" >Cantidad rollo actual:  {cant_rollo}</label>
       <label className="form-label" htmlFor="form1Example1" >Cantidad yarda actual:  {cant_yarda}</label>
       <label className="form-label" htmlFor="form1Example1" >Ubicación actual:  {ubicacion}</label>
      

  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Cantidad de rollo</label>
        <input type="text" id="form1Example1" className="form-control" value={newcant_rollo}  onChange={(e) => setnewcant_rollo(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example2" >Cantidad de yarda</label>
        <input type="text" id="form1Example2" className="form-control" value={newcant_yarda}  onChange={(e) => setnewcant_yarda(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Mover a</label>  
  </div>
  
  <div className="form-outline mb-4">
     <div className="col">
<div className="col"> 
               <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value={newubicacion} checked={newubicacion === "Tienda" ? true : false}  onChange={() => setnewubicacion("Tienda")} />
                  <label className="form-check-label" htmlFor="exampleRadios1">Tienda</label>
               </div> 
               <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value={newubicacion} checked={newubicacion === "Bodega" ? true : false}  onChange={() => setnewubicacion("Bodega")}/>
                 <label className="form-check-label" htmlFor="exampleRadios2">Bodega </label>
               </div>
               <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value={newubicacion} checked={newubicacion === "Tienda La Septima" ? true : false}  onChange={() => setnewubicacion("Tienda La Septima")} />
                  <label className="form-check-label" htmlFor="exampleRadios3">Tienda La Septima</label>
               </div>
              
               <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value={newubicacion} checked={newubicacion === "Bodega La Septima" ? true : false}   onChange={() => setnewubicacion("Bodega La Septima")}/>
                 <label className="form-check-label" htmlFor="exampleRadios4"> Bodega La Septima</label>
               </div> 
               <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios5" value={newubicacion} checked={newubicacion === "Bodega La Vuelta" ? true : false}   onChange={() => setnewubicacion("Bodega La Vuelta")} />
                 <label className="form-check-label" htmlFor="exampleRadios5"> Bodega La Vuelta</label>
               </div>  
               <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios6" value={newubicacion} checked={newubicacion === "Bodega 4" ? true : false}   onChange={() => setnewubicacion("Bodega 4")} />
                 <label className="form-check-label" htmlFor="exampleRadios6"> Bodega 4</label>
               </div>            
            </div>
</div>
  </div>
 
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-primary" onClick={()=>moverProducto()} >Guardar</button>
      </div>
    </div>
  </div>

</div>

{/*mover todo */}
<div
          className="modal fade"
          id="movertodoModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={true}
        >
  <div className="modal-dialog  modal-dialog-scrollable" >
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Mover producto a otra ubicación</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="row mb-4">
       <label className="form-label" htmlFor="form1Example1" >Cantidad rollo actual:  {cant_rollo}</label>
       <label className="form-label" htmlFor="form1Example1" >Cantidad yarda actual:  {cant_yarda}</label>
       <label className="form-label" htmlFor="form1Example1" >Ubicación actual:  {ubicacion}</label>
      

  </div>
 
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Mover todo a</label>  
  </div>
  
  <div className="form-outline mb-4">
     <div className="col-20">
<div className="col"> 
               <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value={newubicacion} checked={newubicacion === "Tienda" ? true : false}  onChange={() => setnewubicacion("Tienda")} />
                  <label className="form-check-label" htmlFor="exampleRadios1">Tienda</label>
               </div> 
               <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value={newubicacion} checked={newubicacion === "Bodega" ? true : false}  onChange={() => setnewubicacion("Bodega")}/>
                 <label className="form-check-label" htmlFor="exampleRadios2">Bodega </label>
               </div>
               <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value={newubicacion} checked={newubicacion === "Tienda La Septima" ? true : false}  onChange={() => setnewubicacion("Tienda La Septima")} />
                  <label className="form-check-label" htmlFor="exampleRadios3">Tienda La Septima</label>
               </div>
              
               <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value={newubicacion} checked={newubicacion === "Bodega La Septima" ? true : false}   onChange={() => setnewubicacion("Bodega La Septima")}/>
                 <label className="form-check-label" htmlFor="exampleRadios4"> Bodega La Septima</label>
               </div> 
               <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios5" value={newubicacion} checked={newubicacion === "Bodega La Vuelta" ? true : false}   onChange={() => setnewubicacion("Bodega La Vuelta")} />
                 <label className="form-check-label" htmlFor="exampleRadios5"> Bodega La Vuelta</label>
               </div>  
               <div className="form-check form-check-inline">
                 <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios6" value={newubicacion} checked={newubicacion === "Bodega 4" ? true : false}   onChange={() => setnewubicacion("Bodega 4")} />
                 <label className="form-check-label" htmlFor="exampleRadios6"> Bodega 4</label>
               </div>            
            </div>
</div>
  </div>
 
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-primary" onClick={()=>moverTodo()} >Guardar</button>
      </div>
    </div>
  </div>


</div>
</div>

 {/**modal final de mdal */}
{/**modal de ingresar precio de venta */}



<div
          className="modal fade"
          id="precioModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={true}
        >
  <div className="modal-dialog  modal-dialog-scrollable" >
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Ingreso de nuevo producto</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="form-outline mb-4">
         <label className="form-label" htmlFor="form1Example1" hidden= {true} >Codigo del producto</label>   
    <input type="text" id="form1Example1" className="form-control" hidden= {true} value={idproducto} onChange={(e) => setidproducto(e.target.value)} />

  </div>
 
  <div className="form-outline mb-4">
     <label className="form-label" htmlFor="form1Example1" >Precio por rollo</label>
     <input type="text" id="form1Example1" className="form-control" value={precio_rollo}  onChange={(e) => setprecio_rollo(e.target.value)} />
   
  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Precio por yarda</label>
        <input type="text" id="form1Example1" className="form-control" value={precio_yarda}  onChange={(e) => setprecio_yarda(e.target.value)} />

  </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-primary" onClick={()=>guardarprecio()} >Guardar</button>
      </div>
    </div>
  </div>
  </div>
  </div>

  
{/**modal de ingresar precio de venta por cliente*/}

<div
          className="modal fade"
          id="preciocModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden={true}
        >
  <div className="modal-dialog  modal-dialog-scrollable" >
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Ingreso precio por cliente</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="col">  
                  <select className="form-select" id="floatingSelectGrid" data-live-search="true" data-size="8" aria-label="Floating label select example" value={idcliente} onChange={(e)=>setIdCliente(e.target.value)}>
                         {datoscl ? datoscl.map((item,index) =>(
                         <option key={index} value={item.idcliente} data-tokens={item.nombre}>{item.nombre+ " " +item.apellido}</option>))
                         :
                        null
                          }
                    </select>
              </div>
 
  <div className="form-outline mb-4">
     <label className="form-label" htmlFor="form1Example1" >Precio por rollo</label>
     <input type="text" id="form1Example1" className="form-control" value={precio_rollo2}  onChange={(e) => setprecio_rollo2(e.target.value)} />
   
  </div>
  <div className="form-outline mb-4">
       <label className="form-label" htmlFor="form1Example1" >Precio por yarda</label>
        <input type="text" id="form1Example1" className="form-control" value={precio_yarda2}  onChange={(e) => setprecio_yarda2(e.target.value)} />

  </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-primary" onClick={()=>guardarpreciocliente()} >Guardar</button>
      </div>
    </div>
  </div>
  </div>
  </div>
  {/**fin del modal precio cliente 
   * 
   * <div className="col-md-12 table-responsive-sm  tblheight">
   * 
  */}

<div className="col-md-12  ">
  {viewInforme !== true  ? 
<div className="div-table">
<div className="table-wrap">
<table className="table-item">
  <thead >
          <tr>
            <th>#</th>
            <th>Descripcion</th>
            <th>Proveedor</th>
            <th>Fecha</th>
            
            <th>Cantidad  de Rollo</th>
            <th>Cantidad yarda</th>
            <th>Precio compra rollo</th>
            <th>Precio venta rollo</th>  
            <th>Precio venta yarda</th>
            <th>Ubicacion</th>
            <th>Opciones</th>
          </tr>
        </thead>
       <tbody>
        
      { datos ?
           datos.map((item,index) =>(
            <tr key={index}>
               <td>{item.idproducto}</td>
               <td>{item.nombre} {item.estilo} {item.color}</td>
               <td>{item.proveedor}</td>
               <td>{moment.utc(item.fecha_ingreso).format("DD/MM/YYYY")}</td>
               
               <td>{item.cant_rollo}</td>
               <td>{item.cant_yarda}</td>  
               <td>{item.precio_compra}</td> 
               <td>{item.preciorollo}</td> 
               <td>{item.precioyarda}</td> 
               <td>{item.ubicacion}</td>
               <td>
               <div className="dropdown">
  <button class="btn btn-primary btn-sm dropdown-toggle" type="button"  id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
  
  </button>
  <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
    <li className=" dropdown-item" data-bs-toggle="modal" data-bs-target="#precioModal" onClick={(e)=>abrirPrecio(e.target, item.idproducto)} >Ingresar precio</li>
    <li className=" dropdown-item" data-bs-toggle="modal" data-bs-target="#preciocModal" onClick={(e)=>abrirPrecioxcliente(e.target, item.idproducto)} >Ingresar precio cliente</li>
    <li  className=" dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e)=>actualizar(item,e.target)} >Editar</li>
    <li  className=" dropdown-item" data-bs-toggle="modal" data-bs-target="#moverModal" onClick={(e)=>actualizar2(item,e.target)} >Mover a</li>
    <li  className=" dropdown-item" data-bs-toggle="modal" data-bs-target="#movertodoModal" onClick={(e)=>actualizar3(item,e.target)} >Mover todo a</li>
    
    <li  className="dropdown-item" onClick={()=>eliminar(item.idproducto)}>Eliminar</li>
  </ul>
</div>

               </td>
         
              
           
             </tr>
           )) 
           : null
           
      
           }
      
       </tbody>
      </table>
      </div>
      </div> 
:

<div className="col-md-12">
<div className="col-auto d-flex flex-row-reverse m-1 ">
  <button type="button" className="ml-2 btn btn-outline-primary"  onClick={()=>setViewInforme(false)} >Salir</button>
</div>
 <TablePdf />
</div>
}
 </div> 
        </div>
        

    );
        }
    export default Producto;