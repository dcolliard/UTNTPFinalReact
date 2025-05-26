import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'

const ContactScreen = () => {

  const [form_values_state, setFormValuesState] = useState()

  const fields = {
    NOMBRE_COMPLETO: 'nombre_completo',
    MENSAJE: 'mensaje',
    EMAIL: 'email'
  }

  /* Manejamos un formulario */
  const handleSubmitContactForm = (event) =>{
    event.preventDefault()//Previene el comportamiento por defecto de un evento
    event.target // Que es? El elemento que emito el evento
    console.dir(event.target.className)
    //FormData
    const contact_form_data = new FormData(event.target)
    const contact_form_values = {}
    for(let field in fields){
      contact_form_values[fields[field]] = contact_form_data.get(fields[field])
    }
    setFormValuesState(contact_form_values)

  }

  return (
    <div>
        <Navbar/>
        <h1>Contactanos</h1>
        <form onSubmit={handleSubmitContactForm} className='form'>
          <div>
            <label htmlFor='nombre-completo'>Nombre completo:</label>
            <input type="text" placeholder='Joe doe' maxLength={30} id='nombre_completo' name={fields.NOMBRE_COMPLETO}/>
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type='email' placeholder='joedoe@mail.com' id='email' name={fields.EMAIL} />
          </div>
          <div>
            <label htmlFor="mensaje">Mensaje:</label>
            <textarea placeholder='Escribe tu mensaje...' id='mensaje' name={fields.MENSAJE}></textarea>
          </div>
          <button type='submit' >Enviar consulta</button>

        </form>
    </div>
  )
}


export default ContactScreen