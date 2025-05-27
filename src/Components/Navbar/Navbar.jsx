import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import ICONS from '../Icons/Icons';

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
          setNombre(""); // o user.email o "Usuario"
        }
      } else {
        setNombre("");
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-info fixed-top shadow">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <ICONS.BICYCLE className="bi bi-bicycle me-2" style={{ fontSize: "1.5rem" }} />
          <i className="bi bi-bicycle me-2" style={{ fontSize: "1.5rem" }}></i>
          Tienda de Bicicletas
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          {nombre ? (
            <span className="navbar-text text-white me-3 d-none d-lg-inline">
              <i className="bi bi-person-circle me-1"></i> Sesión iniciada como:{" "}
              <strong>{nombre}</strong>
            </span>
          ) : null}

          <button
            className="btn btn-outline-light btn-sm"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right me-1"></i> Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
