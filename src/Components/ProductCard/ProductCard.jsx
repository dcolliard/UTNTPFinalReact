import React, { useState } from "react"
import { Link } from "react-router-dom"
import ICONS from "../Icons/Icons"
import './ProductCard.css'

const ProductCard = ({img, title, price, id}) => {
    const [isBought, setIsBought] = useState(false)

    const handleClickBuyButton = () =>{
        alert("Gracias por su compra!")
        setIsBought(true)
    }

    let boton 

    if(isBought){
        boton =<button disabled className="btn btn-secondary d-flex align-items-center gap-2"
                  onClick={handleClickBuyButton}>
                  <ICONS.CART style={{ marginRight: 5 }} />
                  Comprado
                  </button>
    }
    else{
        boton =<button className="btn btn-warning d-flex align-items-center gap-2"
                  onClick={handleClickBuyButton}>
                  <ICONS.CART style={{ marginRight: 5 }} />
                  Comprar ahora 
                  </button>
    }

    return (

        <div className="product-card">
            <img src={img} className="img-fluid" style={{ objectFit: "contain" }} />
            <h3>{title}</h3>
            <div>
                <span className="price">${price}</span>
            </div>
            <br></br>
            
            <div className="actions">
                {boton}
                <Link to={`/product/${id}`}>Ver detalle</Link>
            </div>
        </div>
    )
}

export default ProductCard