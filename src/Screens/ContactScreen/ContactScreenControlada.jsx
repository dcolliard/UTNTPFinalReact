import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'

const ContactScreen = () => {
    const fields = {
        NOMBRE_COMPLETO: 'nombre_completo',
        MENSAJE: 'mensaje',
        EMAIL: 'email'
    }
    const initial_form_state = {
        [fields.NOMBRE_COMPLETO]: 'Pepe',
        [fields.EMAIL]: 'pepe@gmail.com',
        [fields.MENSAJE]: 'Hola que tal?'
    }
    const [form_values_state, setFormValuesState] = useState(initial_form_state)

   

    /* Manejamos un formulario */
    const handleSubmitContactForm = (event) => {
        event.preventDefault()//Previene el comportamiento por defecto de un evento
    }

    const handleChangeInputValue = (event) =>{
        setFormValuesState(
            (prev_state) =>{
                return {...prev_state, [event.target.name]: event.target.value}
            }
        )
        //Capturamos el nuevo valor y lo guardamos en un estado
    }



    const [contador, setContador] = useState(0)
    const incrementar = () =>{
        setContador((prev) => prev + 1)
        setContador((prev) => prev + 1)
        setContador((prev) => prev + 1)
    }
    return (
        <div>
            <span>{contador}</span>
            <button onClick={incrementar}>Incrementar</button>
            <Navbar />
            <h1>Contactanos</h1>
            <form onSubmit={handleSubmitContactForm} className='form'>
                <div>
                    <label htmlFor='nombre-completo'>Nombre completo:</label>
                    <input 
                        type="text" 
                        placeholder='Joe doe' 
                        maxLength={30} 
                        id='nombre_completo' 
                        name={fields.NOMBRE_COMPLETO}
                        onChange={handleChangeInputValue} 
                        value={form_values_state[fields.NOMBRE_COMPLETO]}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type='email' 
                        placeholder='joedoe@mail.com' 
                        id='email' 
                        name={fields.EMAIL} 
                        onChange={handleChangeInputValue} 
                        value={form_values_state[fields.EMAIL]}
                    />
                </div>
                <div>
                    <label htmlFor="mensaje">Mensaje:</label>
                    <textarea 
                        placeholder='Escribe tu mensaje...' 
                        id='mensaje' 
                        name={fields.MENSAJE}
                        onChange={handleChangeInputValue} 
                        value={form_values_state[fields.MENSAJE]}
                    ></textarea>
                </div>
                <button type='submit' >Enviar consulta</button>

            </form>
        </div>
    )
}


export default ContactScreen