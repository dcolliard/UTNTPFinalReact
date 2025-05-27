import React, { useEffect, useState } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import { getProducts } from '../../services/products'
import './ProductList.css'


const ProductList = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    //Use state sirve para controlar la recarga de un componente
    //Use effect sirve para controlar la recarga de una funcion (o efecto)

    const getProductsList = async () => {
        const products_list_response = await getProducts()
        if (products_list_response) {
            setProducts(products_list_response)
        }
        else {
            setError('Error al obtener productos')
        }
        setLoading(false)

    }

    useEffect(
        () => {
            getProductsList()
        },
        []
    )


    //EL objetivo seria crear el array de componentes de forma automatica
    const componentes = products.map(
        (product) => {
            return <ProductCard
                {...product}
                key={product.id}
            />
        }
    )
    let content
    if (loading) {
        content = <h2>Cargando...</h2>
    }
    else {
        if (error) {
            content = <h2>{error}</h2>
        }
        else {
            content = componentes
        }
    }

    return (
        <div className='product-list'>
            {content}
        </div>
    )
}

export default ProductList