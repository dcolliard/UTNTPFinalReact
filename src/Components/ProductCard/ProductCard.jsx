import React, { useState } from "react"
import { Link } from "react-router-dom"
import './ProductCard.css'

const ProductCard = ({img, name, price, id}) => {
    //Key siempre valdra undefined


    const [isBought, setIsBought] = useState(false)

    const handleClickBuyButton = () =>{
        alert("Gracias por su compra!")
        setIsBought(true)
    }

    let boton 

    if(isBought){
        boton = <button disabled>Comprado</button>
    }
    else{
        boton = <button onClick={handleClickBuyButton}>Comprar</button>
    }

    return (

        <div className="product-card">
            <img src={img} />
            <h3>{name}</h3>
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