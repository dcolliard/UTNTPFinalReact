import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(null); // null = cargando

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().rol === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, [user]);

  if (isAdmin === null) {
    // mientras chequea, podés mostrar un loader o nada
    return <div>Cargando...</div>;
  }

  if (!user || !isAdmin) {
    // no autenticado o no admin -> redirige a login o a home (según quieras)
    return <Navigate to="/login" replace />;
  }

  // es admin, renderiza el contenido protegido
  return children;
};

export default AdminRoute;
