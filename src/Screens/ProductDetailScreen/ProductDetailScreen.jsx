import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../services/products'
import Navbar from '../../Components/Navbar/Navbar'
import './ProductDetailScreen.css'

const ProductDetailScreen = () => {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const {product_id} = useParams()

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

     const getProductDetail = async () => {
            setLoading(true)
            const product_detail_response = await getProductById({product_id})
            if (product_detail_response) {
                setProduct(product_detail_response)
            }
            else {
                setError('Error al buscar producto')
            }
            setLoading(false)
    
    }

    useEffect(
        () => {
            getProductDetail()
        },
        []
    )
    let content
    if(loading){
        content = <h2>Cargando...</h2>
    }
    else if(!loading && !product){
        content = <div>No encontrado</div>
    }
    else{
        content = <div className='product-detail-screen'>
            <div class="imagen">
                <img src={product.img} />
            </div>
            <div class="texto">
                <h2>{product.name}</h2>
                <p className='description'>{product.description}</p>
                <div className="actions">
                    <span className="price">${product.price}</span>
                    {boton}   
                </div>
            </div>
        </div>
                   
    }
  return (
    <div>
        <Navbar/>
        {content}
    </div>
  )
}

export default ProductDetailScreen