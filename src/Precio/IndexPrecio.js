import React from 'react';
import img from "../Img/Logo.jpg";

function IndexPrecio(props) {
    return (
        <div className="container-fluid mt-20  row justify-content-center align-items-center ">
            <div className="card mt-20" style={{width: '18rem' }}>
  <img src={img} className="card-img-top img" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{props.titulo}</h5>
    <p className="card-text">{props.msg}</p>
    
  </div>
</div>


        </div>
    )
}

export default IndexPrecio