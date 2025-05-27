import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Navbar from "../../Components/Navbar/Navbar";

const CreateProductScreen = () => {
  const initial_state_form = {
    title: '',
    price: 0,
    description: '',
    img: null
  };

  const [form_state, setFormState] = useState(initial_state_form);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const field = event.target.name;

    if (field === 'img') {
      setFormState((prev) => ({
        ...prev,
        img: event.target.files[0]
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        [field]: event.target.value
      }));
    }
  };

  const uploadImgToImgBB = async (img_file) => {
    const API_KEY_IMGBB = 'b960424e13b28821ebb0ec82403b50ea';
    const form_data = new FormData();
    form_data.append('image', img_file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${API_KEY_IMGBB}`,
      {
        method: 'POST',
        body: form_data
      }
    );

    const data = await response.json();
    return data.data.url;
  };

  const handleToastClose = () => {
    setShowToast(false);
    navigate('/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const url_img = await uploadImgToImgBB(form_state.img);
      const collection_ref = collection(db, 'products');

      await addDoc(collection_ref, {
        title: form_state.title,
        price: form_state.price,
        description: form_state.description,
        img: url_img
      });

      setFormState(initial_state_form);
      setShowToast(true);
    } catch (error) {
      console.error("Error al crear el producto:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5" style={{ maxWidth: 600 }}>
        <h2 className="text-center mb-4">Crear nuevo producto</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              placeholder="Escribe el título..."
              value={form_state.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">Precio</label>
            <input
              type="number"
              className="form-control"
              name="price"
              id="price"
              placeholder="Escribe el precio..."
              min={0}
              value={form_state.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Descripción</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="5"
              placeholder="Escribe la descripción..."
              value={form_state.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="img" className="form-label">Selecciona una imagen</label>
            <input
              type="file"
              className="form-control"
              id="img"
              name="img"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Creando producto..." : "Crear producto"}
          </button>
        </form>
      </div>

{showToast && (
  <div
    className="toast show position-fixed top-50 start-50 translate-middle bg-secondary text-white"
    role="alert"
    style={{ zIndex: 9999, cursor: 'pointer', minWidth: '300px' }}
    onClick={handleToastClose}
  >
    <div className="d-flex">
      <div className="toast-body">
        ✅ Producto creado exitosamente
      </div>
      <button
        type="button"
        className="btn-close btn-close-white me-2 m-auto"
        onClick={handleToastClose}
      ></button>
    </div>
  </div>
)}

    </div>
  );
};

export default CreateProductScreen;
