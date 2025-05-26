import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import database from '../../config/firebase'

const CreateProductScreen = () => {
    //Cada vez que cambie el valor de un input voy a actualizar mi estado de formulario
    let initial_state_form = {
        title: '',
        price: 0,
        discount: 0,
        img: null
    }
    const [form_state, setFormState] = useState(initial_state_form)
    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
        let field = event.target.name
        let new_value = event.target.value
        
        if (field === 'img') {
            setFormState(
                (prev_state) => {
                    return {
                        ...prev_state,
                        'img': event.target.files[0] //LLamamos al primer valor de la lista de adjuntados
                    }
                }
            )
        }
        else {
            setFormState(
                (prev_state) => {
                    return {
                        ...prev_state,
                        [field]: new_value
                    }
                }
            )
        }

    }

    const uploadImgToImgBB = async (img_file) => {

        let API_KEY_IMGBB = 'd0bc686385a0fc689b60774c9807d88d'
        //Debemos enviar un formulario a la API: https://api.imgbb.com/
        //Debemos enviar: form-data
        //Paso 1: Creamos un formulario
        const form_data = new FormData()

        //Paso 2: Adjuntamos el archivo al formulario
        //Imgbb necesita el campo image para poder subir la imagen
        form_data.append('image', img_file)

        //Paso 3: Emitir una consulta HTTP con metodo POST a la API de https://api.imgbb.com/
        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${API_KEY_IMGBB}`,
            {
                method: 'POST',
                //El body es la carga util de la consulta, los datos que envias en si
                body: form_data
            }
        )
        const data = await response.json()
        console.log('Respuesta de IMGBB:', data)
        return data.data.url
    }

    //QUE es una API KEY? las api keys son claves que nos permiten identificarnos como usuarios de x servicio

    const handleSubmit = async (event) => {
    
        event.preventDefault()
        setLoading(true)

        //Subir la imagen a la DB de imagenes (imgbb)
        //Le pasamos la imagen guardada en el form_state
        const url_img = await uploadImgToImgBB(form_state.img)

        //Seleccionamos nuestra coleccion
        const collection_ref = collection(database, 'products')
        //Agregar un documento a la colleccion seleccionada
        await addDoc(
            collection_ref,
            {
                title: form_state.title,
                price: form_state.price,
                discount: form_state.discount,
                img: url_img
            }
        )

        //Reiniciar nuestro formulario
        setFormState(initial_state_form)
        setLoading(false)
    }

    console.log(form_state)
    return (
        <div>
            <h1>Crea tu producto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Titulo:</label>
                    <input
                        type="text"
                        name='title'
                        id="title"
                        placeholder='Escribe el titulo...'
                        value={form_state.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price">Precio:</label>
                    <input
                        type="number"
                        name='price'
                        id="price"
                        placeholder='Escribe el precio...'
                        min={0}
                        value={form_state.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="discount">Descuento (opcional):</label>
                    <input
                        type="number"
                        name='discount'
                        id="discount"
                        placeholder='Escribe el descuento...'
                        max={99}
                        min={0}
                        value={form_state.discount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="img">Seleciona una imagen:</label>
                    <input
                        type='file'
                        id='img'
                        name='img'
                        onChange={handleChange}
                    />
                </div>
                <button
                    type='submit'
                    disabled={loading}
                >
                    {loading ? "Creando producto..." : 'Crear producto'}

                </button>
            </form>
        </div>
    )
}

export default CreateProductScreen