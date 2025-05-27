import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async () => {
    setError(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        email,
        name,
        creadoEn: new Date(),
      });

      navigate("/");
    } catch (err) {
      setError("Error al registrarse: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Registrarse</h2>

      <label>Nombre</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Tu nombre"
      />

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="correo@ejemplo.com"
      />

      <label>Contraseña</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="********"
      />

      <button onClick={handleRegister} style={{ marginTop: 10 }}>
        Crear cuenta
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p style={{ marginTop: 20 }}>
        ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión aquí</Link>
      </p>
    </div>
  );
};

export default RegisterScreen;
