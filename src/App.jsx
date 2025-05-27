import React, { useState } from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import ProductDetailScreen from './Screens/ProductDetailScreen/ProductDetailScreen'
import CreateProductScreen from './Screens/CreateProductScreen/CreateProductScreen'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import RegistroScreen from './Screens/RegistroScreen/RegistroScreen'
import { useAuth } from "./context/AuthContext";
import PrivateRoute from "./Components/PrivateRoute";
import AdminRoute from "./Components/AdminRoute";

const App = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;









return (
    <Routes>
      <Route path="/login"    element={!user ? <LoginScreen /> : <Navigate to="/" replace />} />

      <Route path="/register" element={!user ? <RegistroScreen /> : <Navigate to="/" replace />}/>

      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomeScreen />
          </PrivateRoute>
        }
      />

      <Route
        path='/product/:product_id'
        element={
          <PrivateRoute>
            <ProductDetailScreen />
          </PrivateRoute>
        }
      />

        <Route
        path='/product/create'
        element={
          <AdminRoute>
            <CreateProductScreen />
          </AdminRoute>
        }
      />

    </Routes>
  );
}


export default App