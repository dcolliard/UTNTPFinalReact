import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../services/products'
import Navbar from '../../Components/Navbar/Navbar'

const ProductDetailScreen = () => {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const {product_id} = useParams()

     const getProductDetail = async () => {
            setLoading(true)
            //El setTimeout no es necesario
            setTimeout(
                async () => {
                    const product_detail_response = await getProductById({product_id})
                    if (product_detail_response) {
                        setProduct(product_detail_response)
                    }
                    else {
                        setError('Error al buscar producto')
                    }
                    setLoading(false)
                },
                2000
            )
    
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
        content = <div>
            Producto: {product.title}
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