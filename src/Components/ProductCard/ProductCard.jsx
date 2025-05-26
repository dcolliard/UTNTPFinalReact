import React, { useState } from "react"
import { Link } from "react-router-dom"

const ProductCard = ({img, title, final_price, real_price, discount, is_admin, id,  key}) => {
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
        <div>
            <img src={img} />
            <h3>{title}</h3>
            <div>
                <span>${real_price}</span>
                <span>{discount}% OFF</span>
            </div>
            <span>${final_price}</span>
            {boton}
            <Link to={`/product/${id}`}>Ver detalle</Link>
        </div>
    )
}

export default ProductCard