import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgxicJVBlV7hnxK6SYrco18I3c--2czgU",
  authDomain: "utnreacttpfinal.firebaseapp.com",
  projectId: "utnreacttpfinal",
  storageBucket: "utnreacttpfinal.firebasestorage.app",
  messagingSenderId: "789522233594",
  appId: "1:789522233594:web:a72e52b0371bccb4d77143",
  measurementId: "G-J106B78V05"
};


const app = initializeApp(firebaseConfig);

//FIRESTORE nos permite tener una base de datos

//Obtener la constante database de nuestra app (basicamente un objeto de acceso a la base de datos de nuestra aplicacion)
export const auth = getAuth(app);           // Para autenticación
export const db = getFirestore(app);        // Para base de datos Firestore

export default app;