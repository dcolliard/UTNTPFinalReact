// LoginScreen.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from '../../Components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginScreen = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError("Error al iniciar sesión: " + err.message);
    }
  };

  return (
    <>


      <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
        <h1 className="mb-5 fw-bold text-info">Tienda de Bicicletas</h1>

        <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>

          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="ejemplo@correo.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Tu contraseña"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-success">Entrar</button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate("/register")}
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
