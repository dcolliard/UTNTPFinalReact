import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    const isActiveCallback = ({isActive}) => {
        if(isActive){
            return 'link link-seleccionado'
        }
        else{
            return 'link'
        }
    }
  return (
    <header>
        <h2>FakeStore</h2>
        <nav>
            {/* 
                Esto seria una mala practica
                    <a href="/">Inicio con ancla</a>
                    <br /> 
            */}
            {/* <Link to={'/'}>Inicio</Link>
            <Link to={'/contact'}>Contacto</Link> */}
            <NavLink
                to={'/'}
                className={
                    isActiveCallback
                }
            >
                Inicio
            </NavLink>
            <NavLink
                to={'/contact'}
                className={
                    isActiveCallback
                }
            >
                Contacto
            </NavLink>

            <Link to={'/product/new'}>
                Crear producto
            </Link>
        </nav>
    </header>
  )
}

/* 
El elemento ancla o a le indica al navegar que debe hacer una nueva solcitud GET a otra direccion

osea cuando hacer <a href='/contact'>Contacto</a>

Le estoy dando la orden al nevegador de que cuando el usuario de click sobre contacto se haga una solicitud GET a el recurso del servidor "/contact"
 */

export default Navbar