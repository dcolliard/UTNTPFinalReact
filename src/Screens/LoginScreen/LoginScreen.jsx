import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'

const LoginScreen = () => {
  return (
    <>
      <Navbar/>
      <form>
          <div>
              <label>Email:</label><br />
              <input type="email" name="email" required />
          </div>

          <div>
              <label>Contraseña:</label><br />
              <input type="password" name="contraseña" required />
          </div>

          <br />
          <button type="submit">
              Iniciar Sesión
          </button>
      </form>
    </>
  )
}

export default LoginScreen