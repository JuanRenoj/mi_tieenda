//import "bootstrap/dist/css/bootstrap.min.css";
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
import Precios from "../Precio/Precios";



function Producto(props)  {
    const [idproducto, setidproducto] = useState("");
    const [idproveedor, setidproveedor] = useState("");
    const [nombrepro, setnombrepro] = useState("");
    const [estilo, setestilo] = useState(""); 
    const [color, setcolor] = useState("");
    const [cant_rollo, setcant_rollo] = useState(""); 
    const [yardaporrollo, setyardaporrollo] = useState("");
    const [cant_yarda, setcant_yarda] = useState(cant_rollo*yardaporrollo);
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



const calcCantYarda = (cantidad) => {
  setyardaporrollo(cantidad);
  setcant_yarda(cant_rollo * cantidad);
}

const calcCantRollo = (cantidad) => {
  setcant_rollo(cantidad);
  setcant_yarda(yardaporrollo * cantidad);
}

async function actualizar(datos, e){
    setidproducto(datos.idproducto);
    setidproveedor(datos.idproveedor);
    setnombrepro(datos.nombre);
    setestilo(datos.estilo);
    setcolor(datos.color);
    setcant_rollo(datos.cant_rollo);
    setyardaporrollo(datos.yardaporrollo);
    setcant_yarda(datos.cant_rollo * datos.yardaporrollo);
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
      yardaporrollo:yardaporrollo,
      cant_yarda:cant_yarda,
      precio_compra:precio_compra,
      ubicacion:ubicacion,
      accion:accion
    }
     let productod=await DataProducto.nuevoReg(data);
     if(productod !== null){
    limpiar();
       alert(productod.message)
       consultarProducto();
      
     }
    
    }else{
      let data={
        idproducto:idproducto,
        idproveedor:idproveedor,
        nombre:nombrepro,
        estilo:estilo,
        color:color,
        cant_rollo:cant_rollo, 
        yardaporrollo:yardaporrollo,
        cant_yarda:cant_yarda,
        precio_compra:precio_compra,
        ubicacion:ubicacion,
      }
       let productos=await DataProducto.actualizarReg(data);
       if(productos !== null){
      
         alert(productos.message )
        limpiar();
         consultarProducto();
       }
     }
     
    

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
    alert("precio ingresado");
    consultarProducto();
    
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
      alert("precio ingresado");
      consultarProducto();

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
    setyardaporrollo("");
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
  alert("producto eliminado correctamente");
  consultarProducto();
}
}

const Busqueda =(buscarTexto)=>{
  let text=buscarTexto.replace(/^\w/,(c) =>c.toLowerCase());
  setbuscar(buscarTexto);
  setdatos(encontrado.filter(function(item){
      return item.nombre.toLowerCase().includes(text) || item.color.toLowerCase().includes(text) || item.estilo.toLowerCase().includes(text) || item.ubicacion.toLowerCase().includes(text) ;   
    }).map(function({idproducto, idproveedor, nombre, estio, color, cant_rollo,yardaporrollo, cant_yarda, precio_compra,preciorollo,precioyarda,  ubicacion}){
      return{idproducto, idproveedor, nombre, estio, color,cant_rollo,yardaporrollo, cant_yarda, precio_compra, preciorollo,precioyarda,  ubicacion}
    })
   );
    }

    const Busqueda2 = (texto) => {

      let buscarTexto = texto;
      let text=buscarTexto.replace(/^\w/,(c) =>c.toLowerCase());
      setbuscar(buscarTexto);
      setdatos(encontrado.filter(function(item){
          return item.nombre.toLowerCase().includes(text) || item.color.toLowerCase().includes(text) || item.estilo.toLowerCase().includes(text) || item.ubicacion.toLowerCase().includes(text) ;   
        }).map(function({idproducto, idproveedor, nombre, estio, color,cant_rollo,yardaporrollo, cant_yarda, precio_compra, preciorollo,precioyarda, ubicacion}){
          return{idproducto, idproveedor, nombre, estio, color,cant_rollo,yardaporrollo, cant_yarda, precio_compra,preciorollo,precioyarda,  ubicacion}
        })
       );
        }   
        const Busqueda3 = (texto) => {

          let buscarTexto = texto;
          let text=buscarTexto.replace(/^\w/,(c) =>c.toLowerCase());
          setbuscar(buscarTexto);
          setdatos(encontrado.filter(function(item){
              return item.nombre.toLowerCase().includes(text) || item.color.toLowerCase().includes(text) || item.estilo.toLowerCase().includes(text) || item.ubicacion.toLowerCase()===(text) ;   
            }).map(function({idproducto, idproveedor, nombre, estio, color,cant_rollo,yardaporrollo, cant_yarda, precio_compra, preciorollo,precioyarda, ubicacion}){
              return{idproducto, idproveedor, nombre, estio, color,cant_rollo,yardaporrollo, cant_yarda, precio_compra,preciorollo,precioyarda,  ubicacion}
            })
           );
            }  

            const Busqueda4 = (texto) => {

              let buscarTexto = texto;
              let text=buscarTexto.replace(/^\w/,(c) =>c.toLowerCase());
              setbuscar(buscarTexto);
              setdatos(encontrado.filter(function(item){
                  return item.nombre.toLowerCase().includes(text) || item.color.toLowerCase().includes(text) || item.estilo.toLowerCase().includes(text) || item.ubicacion.toLowerCase()===(text) ;   
                }).map(function({idproducto, idproveedor, nombre, estio, color,cant_rollo,yardaporrollo, cant_yarda, precio_compra, preciorollo,precioyarda, ubicacion}){
                  return{idproducto, idproveedor, nombre, estio, color,cant_rollo,yardaporrollo, cant_yarda, precio_compra,preciorollo,precioyarda,  ubicacion}
                })
               );
                }  
        
        return(
          <div className="container-fluid vh-100">
            <div className="mb-2">   <h5 className="modal-title">Producto</h5></div>
            <div className="row mb-2">
            <div className="col-9">
            <div className=" input-group form-group">                              
                                            <div className="input-group-prepend col-9">
                                            <span className="bi bi-search" style={{color:'gray'}}  ></span>

                                            <input type="text" className="form-control " placeholder="Buscar Producto..."  value={buscar}  onChange={(e)=>Busqueda(e.target.value)} />
                                            </div>
                                            
                                        </div>
                                   
           </div> 
    <div className="col-sm">
  <button type="button" className="ml-2 btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e)=>abrirIngreso(e.target)} >Nuevo</button>
</div> 


<div className="col-9">
<div className="col"> 
               <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"    value=""  onChange={(e)=>Busqueda(e.target.value)} selected/>
                  <label class="form-check-label" for="exampleRadios1">Todos</label>
                </div> 
               <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="Tienda"  onClick={(e) => Busqueda4(e.target.value)}/>
                  <label class="form-check-label" for="exampleRadios2">Tienda</label>
               </div>

               <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="Tienda 2"  onClick={(e) => Busqueda2(e.target.value)}/>
                  <label class="form-check-label" for="exampleRadios3">Tienda 2</label>
               </div>
               <div class="form-check form-check-inline">
                 <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="Bodega" onClick={(e) => Busqueda3(e.target.value)}/>
                 <label class="form-check-label" for="exampleRadios4">Bodega</label>
               </div>
               <div class="form-check form-check-inline">
                 <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios5" value="Bodega 2" onClick={(e) => Busqueda2(e.target.value)}/>
                 <label class="form-check-label" for="exampleRadios5">Bodega 2</label>
               </div>
               <div class="form-check form-check-inline">
                 <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios6" value="Bodega 3" onClick={(e) => Busqueda2(e.target.value)}/>
                 <label class="form-check-label" for="exampleRadios6">Bodega 3</label>
               </div> 
               <div class="form-check form-check-inline">
                 <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios7" value="Bodega 4" onClick={(e) => Busqueda2(e.target.value)} />
                 <label class="form-check-label" for="exampleRadios7">Bodega 4 </label>
               </div>            
            </div>
</div>
{/**modal de ingresar producto */}

  <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
  <div className="modal-dialog  modal-dialog-scrollable" >
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Ingreso de nuevo producto</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div className="form-outline mb-4">
         <label className="form-label" for="form1Example1" hidden= "true" >Codigo del producto</label>   
    <input type="text" id="form1Example1" className="form-control" hidden= "true" value={idproducto} onChange={e => setidproducto(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
     <label className="form-label" for="form1Example1" >Proveedor</label>

     <select class="form-select" aria-label="Default select example"   value={idproveedor} onChange={(e)=>setidproveedor(e.target.value)}>
     <option>Seleccione un proveedor</option>
     {
     datosp ?
           datosp.map((item) =>(
  <option value={item.idproveedor}  >{item.nombre}</option>
           ))
           :
           null
     }

     
</select>
  </div>
  <div className="form-outline mb-4">
     <label className="form-label" for="form1Example1" >Nombre</label>
     <input type="text" id="form1Example1" className="form-control" value={nombrepro}  onChange={e => setnombrepro(e.target.value)} />
   
  </div>
  <div className="form-outline mb-4">
       <label className="form-label" for="form1Example1" >Estilo</label>
        <input type="text" id="form1Example1" className="form-control" value={estilo}  onChange={e => setestilo(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
       <label className="form-label" for="form1Example1" >Color</label>
        <input type="text" id="form1Example1" className="form-control" value={color}  onChange={e => setcolor(e.target.value)} />

  </div>

  <div className="form-outline mb-4">
       <label className="form-label" for="form1Example1" >Cantidad de Rollo</label>
        <input type="text" id="form1Example1" className="form-control" value={cant_rollo}  onChange={e => calcCantRollo(e.target.value)} />

  </div>
  <div className="form-outline mb-4">
     <label className="form-label" for="form1Example1" >Yarda por rollo</label>
     <input type="text" id="form1Example1" className="form-control" value={yardaporrollo}  onChange={e => calcCantYarda(e.target.value)}/>
   
  </div>
  <div className="form-outline mb-4">
       <label className="form-label" for="form1Example1" >Cantidad total yarda</label>
        <input type="text" id="form1Example1" className="form-control" value={cant_yarda}   />

  </div>
  <div className="form-outline mb-4">
       <label className="form-label" for="form1Example1" >Precio de compra por rollo</label>
        <input type="text" id="form1Example1" className="form-control" value={precio_compra}  onChange={e => setprecio_compra(e.target.value)} />

  </div>
  
  
  <div className="form-outline mb-4">
     <label className="form-label" for="form1Example1" >Ubicacion</label>
     <div className="col-20">
<div className="col"> 
               <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value={ubicacion} checked={ubicacion === "Tienda" ? true : false}  onClick={() => setubicacion("Tienda")} selected/>
                  <label class="form-check-label" for="exampleRadios1">Tienda</label>
               </div>
               <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value={ubicacion} checked={ubicacion === "Tienda 2" ? true : false}  onClick={() => setubicacion("Tienda 2")} selected/>
                  <label class="form-check-label" for="exampleRadios1">Tienda 2</label>
               </div>
               <div class="form-check form-check-inline">
                 <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value={ubicacion} checked={ubicacion === "Bodega" ? true : false}  onClick={() => setubicacion("Bodega")}/>
                 <label class="form-check-label" for="exampleRadios2">Bodega </label>
               </div>
               <div class="form-check form-check-inline">
                 <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value={ubicacion} checked={ubicacion === "Bodega 2" ? true : false}   onClick={() => setubicacion("Bodega 2")}/>
                 <label class="form-check-label" for="exampleRadios3"> Bodega 2</label>
               </div> 
               <div class="form-check form-check-inline">
                 <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value={ubicacion} checked={ubicacion === "Bodega 3" ? true : false}   onClick={() => setubicacion("Bodega 3")} />
                 <label class="form-check-label" for="exampleRadios3"> Bodega 3</label>
               </div>  
               <div class="form-check form-check-inline">
                 <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value={ubicacion} checked={ubicacion === "Bodega 4" ? true : false}   onClick={() => setubicacion("Bodega 4")} />
                 <label class="form-check-label" for="exampleRadios3"> Bodega 4</label>
               </div>            
            </div>
</div>
  </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" onClick={()=>guardar()} >Guardar</button>
      </div>
    </div>
  </div>
</div>
</div>

{/**modal de principal */}


{/**modal de ingresar precio de venta */}



<div
          class="modal fade"
          id="precioModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
  <div className="modal-dialog  modal-dialog-scrollable" >
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Ingreso de nuevo producto</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div className="form-outline mb-4">
         <label className="form-label" for="form1Example1" hidden= "true" >Codigo del producto</label>   
    <input type="text" id="form1Example1" className="form-control" hidden= "true" value={idproducto} onChange={e => setidproducto(e.target.value)} />

  </div>
 
  <div className="form-outline mb-4">
     <label className="form-label" for="form1Example1" >Precio por rollo</label>
     <input type="text" id="form1Example1" className="form-control" value={precio_rollo}  onChange={e => setprecio_rollo(e.target.value)} />
   
  </div>
  <div className="form-outline mb-4">
       <label className="form-label" for="form1Example1" >Precio por yarda</label>
        <input type="text" id="form1Example1" className="form-control" value={precio_yarda}  onChange={e => setprecio_yarda(e.target.value)} />

  </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" onClick={()=>guardarprecio()} >Guardar</button>
      </div>
    </div>
  </div>
  </div>
  </div>

  
{/**modal de ingresar precio de venta por cliente*/}

<div
          class="modal fade"
          id="preciocModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
  <div className="modal-dialog  modal-dialog-scrollable" >
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Ingreso precio por cliente</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="col">  
                  <select class="form-select" id="floatingSelectGrid" data-live-search="true" data-size="8" aria-label="Floating label select example" value={idcliente} onChange={(e)=>setIdCliente(e.target.value)}>
                         {datoscl ? datoscl.map((item) =>(
                         <option value={item.idcliente} data-tokens={item.nombre}>{item.nombre+ " " +item.apellido}</option>))
                         :
                        null
                          }
                    </select>
              </div>
 
  <div className="form-outline mb-4">
     <label className="form-label" for="form1Example1" >Precio por rollo</label>
     <input type="text" id="form1Example1" className="form-control" value={precio_rollo2}  onChange={e => setprecio_rollo2(e.target.value)} />
   
  </div>
  <div className="form-outline mb-4">
       <label className="form-label" for="form1Example1" >Precio por yarda</label>
        <input type="text" id="form1Example1" className="form-control" value={precio_yarda2}  onChange={e => setprecio_yarda2(e.target.value)} />

  </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" onClick={()=>guardarpreciocliente()} >Guardar</button>
      </div>
    </div>
  </div>
  </div>
  </div>
  {/**fin del modal precio cliente */}

<div className="col-md-12 table-responsive-sm max-vh-80 overflow-auto">
<table class="table table-hover table-sm    ">
  <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Proveedor</th>
            <th>Fecha</th>
            <th>Descripcion</th>
            <th>Cantidad  de Rollo</th>
            <th>Yarda por Rollo</th>
            <th>Cantidad yarda</th>
            <th>Precio compra rollo</th>
            <th>Precio venta yarda</th>
            <th>Precio venta rollo</th>
            <th>Ubicacion</th>
            <th>Opciones</th>
          </tr>
        </thead>
       <tbody>
      { datos ?
           datos.map((item) =>(
            <tr key={item.id}>
               <td>{item.idproducto}</td>
               <td>{item.proveedor}</td>
               <td>{moment(item.fecha_ingreso).format("DD/MM/YYYY")}</td>
               <td>{item.nombre} {item.estilo} {item.color}</td>
               <td>{item.cant_rollo}</td>
                <td>{item.yardaporrollo}</td>
               <td>{item.cant_yarda}</td>  
               <td>{item.precio_compra}</td> 
               <td>{item.preciorollo}</td> 
               <td>{item.precioyarda}</td> 
               <td>{item.ubicacion}</td>
               <td>
               <div className="dropdown">
  <button className="btn btn-primary dropdown-toggle " type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
   
  </button>
  <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
    <li className=" dropdown-item" data-bs-toggle="modal" data-bs-target="#precioModal" onClick={(e)=>abrirPrecio(e.target, item.idproducto)} >Ingresar precio</li>
    <li className=" dropdown-item" data-bs-toggle="modal" data-bs-target="#preciocModal" onClick={(e)=>abrirPrecioxcliente(e.target, item.idproducto)} >Ingresar precio cliente</li>
    <li  className=" dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e)=>actualizar(item,e.target)} >Editar</li>
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
        

    );
        }
    export default ProductoSeptima;