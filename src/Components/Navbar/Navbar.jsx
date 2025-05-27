/*import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
        await logout();
        navigate("/login"); // redirige después de cerrar sesión
        } catch (error) {
        console.error("Error al cerrar sesión:", error);
        }
    };

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
        <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  )
}

export default Navbar */

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setNombre(docSnap.data().name);
        } else {
          setNombre(""); // o poner user.email o "Usuario"
        }
      }
    };

    fetchUserName();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="navbar">
      <Link to={"/"}>Inicio</Link>

      {nombre && <span style={{ marginLeft: 10 }}>Usuario: {nombre}</span>}

      <button onClick={handleLogout} style={{ marginLeft: "auto" }}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default Navbar;


