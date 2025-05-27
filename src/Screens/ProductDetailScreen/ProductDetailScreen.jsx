import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/products';
import Navbar from '../../Components/Navbar/Navbar';
import './ProductDetailScreen.css';
import ICONS from "../../Components/Icons/Icons";

const ProductDetailScreen = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { product_id } = useParams();

  const [isBought, setIsBought] = useState(false);

  const handleClickBuyButton = () => {
    alert("¡Gracias por su compra!");
    setIsBought(true);
  };

  useEffect(() => {
    const getProductDetail = async () => {
      setLoading(true);
      const product_detail_response = await getProductById({ product_id });
      if (product_detail_response) {
        setProduct(product_detail_response);
      } else {
        setError('Error al buscar producto');
      }
      setLoading(false);
    };

    getProductDetail();
  }, [product_id]);

  let content;

  if (loading) {
    content = <h2 className="text-center mt-5">Cargando...</h2>;
  } else if (!loading && !product) {
    content = <div className="text-center mt-5">Producto no encontrado</div>;
  } else {
    content = (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 text-center">
            <img
              src={product.img}
              alt={product.title}
              className="img-fluid rounded product-image"
            />
          </div>
          <div className="col-md-6">
            <h2 className="mb-3">{product.title}</h2>
            <p className="text-muted">{product.description}</p>
            <h3 className="text-success">${product.price}</h3>
            <div className="mt-4">
              {isBought ? (
                <button className="btn btn-secondary" disabled>
                  Comprado
                </button>
              ) : (
                <button
                  className="btn btn-warning d-flex align-items-center gap-2"
                  onClick={handleClickBuyButton}
                >
                  <ICONS.CART style={{ marginRight: 5 }} />
                  Comprar ahora
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <br/>
      {content}
    </div>
  );
};

export default ProductDetailScreen;
