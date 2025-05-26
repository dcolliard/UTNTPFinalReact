import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ProductList from '../../Components/ProductList/ProductList'

const HomeScreen = () => {
  return (
    <div>
        <Navbar/>
        <h1>Catalogo de productos:</h1>
        <ProductList/>
        {/* Aca podrian llamar al catalogo de productos que hicimos la clase pasada */}
    </div>
  )
}

export default HomeScreen