// LoginScreen.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from '../../Components/Navbar/Navbar'

const LoginScreen = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth(); // viene del AuthContext
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(form.email, form.password);
      navigate("/"); // o a donde necesites redirigir
    } catch (err) {
      setError("Error al iniciar sesión: " + err.message);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="Correo"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button type="submit">Entrar</button>
    </form>

    
    <p>¿No tenés cuenta?</p>
    <button onClick={() => navigate("/register")}>Registrarse</button>
    </>
  );
};

export default LoginScreen;