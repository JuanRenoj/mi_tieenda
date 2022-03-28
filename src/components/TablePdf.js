import React,{useState,useEffect} from 'react';
import {Document,View,Page,Text,PDFViewer ,StyleSheet} from '@react-pdf/renderer';
import DataProducto from '../Producto/DataProducto';
function TablePdf(props) {

const [header,setheader]= useState([]);
 const [datosInforme, setdatosInforme] = useState([]);
 const [inversion, setInversion] = useState();
  const [cantProducto, setcantProducto] = useState();

useEffect(() => {
    setheader(["Producto","Cantidad de Rollo", "Cantidad de yarda","Precio de compra","Inversión"]);
  verInvetario()
}, [])
  
     const returnItemInforme = (datos) => {
       let data=[];
       datos.map((d)=>{
         if(d.cant_yarda > 0){
         let item={
         producto:d.nombre+" "+d.estilo+" "+d.color,
         cant_rollo:d.cant_rollo,
         cant_yarda:d.cant_yarda,
         precio_compra:d.precio_compra,
         subtotal:(Number(d.cant_yarda)*Number(d.precio_compra)).toFixed(2)
     
       }
         data.push(item);
     }
         return true;
       })
     
       
       return data;
     }
     const calcInversion=(data )=>{       
       let subTotal=0;
       data.map((item)=>{       
       subTotal=(Number(subTotal)+ Number(item.subtotal)).toFixed(2);
        return true;
     })
     return subTotal;
     }
     
     async function verInvetario(params){
     
     let listProducto=await DataProducto.consultar();
     if(listProducto!==null){
       if(listProducto.message==="Success"){
      setdatosInforme(returnItemInforme(listProducto.res));
      setInversion(calcInversion(returnItemInforme(listProducto.res)));
     setcantProducto(returnItemInforme(listProducto.res).length);
       }
     }
     
     
     }
             
    


return (
<PDFViewer style={{width:'100%',height:"90vh"}}>
    <Document>
        <Page size="LETTER" style={{padding:10}}>

            <View >
                <Text style={styles.cell}>Distribuidora Textiles G&S</Text>
                <Text style={styles.header}>Numero de producto en inventario: {cantProducto}</Text>
                <Text style={styles.header}>Total de inversion en todos los productos: Q.{inversion}</Text>
                  <Text style={styles.cells}>Detalles del inventario</Text>
            </View>

            <View style={styles.tableRow} >
                {header ?
                header.map((item,index)=>(    
                    <Text key={index} style={{ flex: 1, alignSelf: 'stretch',padding:2, fontSize:13, color:'red',textAlign: 'center', }} >{item}</Text>               
                ))
                :
                null
                } 
            </View>
       
            {datosInforme ?
            datosInforme.map((item,index)=>(
                <View key={index} style={styles.tableRow}> 
                    <Text style={{ flex: 1, alignSelf: 'stretch', fontSize:12, }} >{item.producto}</Text> 
                    <Text style={{ flex: 1, alignSelf: 'stretch', fontSize:12,textAlign: 'center', }} >{item.cant_rollo}</Text> 
                    <Text style={{ flex: 1, alignSelf: 'stretch', fontSize:12,textAlign: 'center', }} >{item.cant_yarda}</Text> 
                    <Text style={{ flex: 1, alignSelf: 'stretch', fontSize:12,textAlign: 'center', }} >{item.precio_compra}</Text>
                    <Text style={{ flex: 1, alignSelf: 'stretch', fontSize:12,textAlign: 'center', }} >{item.subtotal}</Text>  
                </View>
            ))

            :
            null
            }
            
 
          

        </Page>
    </Document> 
</PDFViewer>
      
    )
}


const styles = StyleSheet.create({
   
table: {
    width: '100%',
    borderWidth: 0.5,
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 12
},
tableRow:{
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor:"gray"
},
cell: {
   padding:5,
   marging: 5,
    borderWidth: 0.5,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    flexWrap: 'wrap'
},

cells: {
   padding:5,
   marging: 5,
 
    fontSize:13,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    flexWrap: 'wrap'
},
header: {
   padding:5,
   marging: 5,
fontSize:14,
    display: 'flex',
    flexWrap: 'wrap',
    color:"gray",
}
    })   


export default TablePdf;