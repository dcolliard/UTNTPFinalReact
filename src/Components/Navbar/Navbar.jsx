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
    <div className='navbar'>
        <Link to={'/'}>Inicio</Link>
        <Link to={'/login'}>Login</Link>
        <Link to={'/registro'}>Registro</Link>
    </div>
  )
}

export default Navbar