import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import ProductList from "../../Components/ProductList/ProductList";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import ICONS from "../../Components/Icons/Icons";



const HomeScreen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rol, setRol] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
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
      <br />
      <br />
      <br />
      <h1 style={{ textAlign: 'center' }}>Bienvenido al catálogo de bicicletas</h1>


      {/* Contenedor con flex para botón a la derecha */}
      {rol === "admin" && (
        <div class="container" style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
          <button
            className="btn btn-success d-flex align-items-center"
            onClick={handleAgregarProducto}
          >
            <ICONS.PLUS style={{ marginRight: 5 }}  />
            Agregar producto
          </button>
        </div>
      )}

      <ProductList />
    </div>
  );
};

export default HomeScreen;
