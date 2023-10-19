import React, { useEffect, useState } from 'react';
import { useProductsContext } from '../hooks/useProductsContext';

// components
import ProductDetails from '../components/ProductDetails';

const Home = () => {
  const { products, dispatch } = useProductsContext();
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const keys = ['name'];

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `http://localhost:3000/api/products?name=${query}`
      );

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'GET_PRODUCTS', payload: json });
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div className="container py-5">
      <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          name="name"
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      <h3>Recently Added</h3>
      <div className="row">
        {products &&
          products.map((product) => (
            <ProductDetails key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Home;
