/*import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ProductList from '../../Components/ProductList/ProductList'

const HomeScreen = () => {
  return (
    <div>
        <Navbar/>
        <h1>Catalogo de productos:</h1>
        <ProductList/>
    </div>
  )
}

export default HomeScreen*/

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import ProductList from "../../Components/ProductList/ProductList";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

const HomeScreen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rol, setRol] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data()); // Para depuración
        if (docSnap.exists()) {
          setRol(docSnap.data().rol);
        }
      }
    };
    fetchUserRole();
  }, [user]);

  const handleAgregarProducto = () => {
    navigate("/product/create");
  };

  return (
    <div>
      <Navbar />
      <br/>
      <h1>Catalogo de productos:</h1>

      {/* Mostrar botón solo si rol es Admin */}
      {rol === "admin" && (
        <button onClick={handleAgregarProducto} style={{ marginBottom: 20 }}>
          Agregar producto
        </button>
      )}

      <ProductList />
  
    </div>
  );
};

export default HomeScreen;



