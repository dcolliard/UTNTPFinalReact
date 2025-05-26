import { collection, getDocs } from 'firebase/firestore'
import database from '../config/firebase'

export const getProducts = async () => {
    try {
        //Paso 1 buscar la colleccion en nuestra DB
        const products_collection_reference = collection(database, 'products')

        //Paso 2 obtener la lista de documentos
        const result = await getDocs(products_collection_reference)

        console.log("Resultado de getDocs:", result)

        //Paso 3 formateamos la respuesta para que sea compatible con nuestra aplicacion
        const product_list_formatted = result.docs.map(
            (document) => {
                console.log('Document:', document)
                console.log('Document data:', document.data())
                return {
                    id: document.id,
                    ...document.data() //Esto nos devuelve los campos (ejemplo: precio, img, title)
                }
            }
        )
        return product_list_formatted
    }
    catch (error) {
        console.error('Error al obtener productos:', error)
        return null
    }
}

/* Ejemplo explicativo del spread operator

const data = {
get: () => {
        return { price: 20, title: 'juan' }
    }
}

const id = 1

const producto = { id: id, ...data.get() }
console.log(producto)
*/

/* 
export const getProducts = async () =>{
    try{
        const response = await fetch(
            'http://localhost:5173/api/products.json',
            {
                method: 'GET'
            }
        )
        const data = await response.json()
        return data
    }
    catch(error){
        console.error('Error al obtener productos:', error)
        return null
    }
} */

export const getProductById = async ({ product_id }) => {
    const products = await getProducts()
    return products.find(product => product.id == product_id)

}