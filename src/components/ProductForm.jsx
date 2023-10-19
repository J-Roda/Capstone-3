import React, { useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";

const ProductForm = () => {
  const { dispatch } = useProductsContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stocks, setStocks] = useState(1);
  const [price, setPrice] = useState(0);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = { name, description, stocks, price };

    const response = await fetch(
      "https://capstone-2-roda.onrender.com/products/create",
      {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setName("");
      setDescription("");
      setStocks(1);
      setPrice(0);
      setError(null);
      dispatch({ type: "CREATE_PRODUCT", payload: json });
      console.log("New product added", json);
    }
  };
  return (
    <form
      action=""
      className="container bg-dark text-light"
      onSubmit={handleSubmit}
    >
      <div className="row">
        <div className="col-12 justify-content-center align-items-center">
          <h3>Add products</h3>

          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            className="d-inline-block"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <label htmlFor="description">Description: </label>
          <input
            type="text"
            name="description"
            className="d-inline-block"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />

          <label htmlFor="stocks">Stocks: </label>
          <input
            type="number"
            name="stocks"
            onChange={(e) => setStocks(e.target.value)}
            value={stocks}
          />

          <label htmlFor="price">Price: </label>
          <input
            type="number"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />

          <button className="btn btn-primary">Add product</button>

          {error && <div className="">{error}</div>}
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
