import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'


function RegistroScreen() {
  return (
    <>
    <Navbar />
    <form>
      <div>
        <label>Nombre:</label><br />
        <input type="text" name="nombre" required />
      </div>

      <div>
        <label>Email:</label><br />
        <input type="email" name="email" required />
      </div>

      <div>
        <label>Contraseña:</label><br />
        <input type="password" name="contraseña" required />
      </div>

      <div>
        <label>Repetir contraseña:</label><br />
        <input type="password" name="rcontraseña" required />
      </div>

      <button type="submit">
        Registrarse
      </button>
    </form>
  </>
  )
}

export default RegistroScreen