import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { getProducts } from '../../services/products';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getProductsList = async () => {
    setLoading(true);
    const products_list_response = await getProducts();
    if (products_list_response) {
      setProducts(products_list_response);
      setError(false);
    } else {
      setError('Error al obtener productos');
    }
    setLoading(false);
  };

  useEffect(() => {
    getProductsList();
  }, []);

  let content;
  if (loading) {
    content = <h2>Cargando...</h2>;
  } else if (error) {
    content = <h2>{error}</h2>;
  } else {
    content = products.map(product => (
      <div key={product.id} className="col-12 col-md-6 mb-4">
        <ProductCard {...product} />
      </div>
    ));
  }

  return (
    <div className="container">
      <div className="row">
        {content}
      </div>
    </div>
  );
};

export default ProductList;
