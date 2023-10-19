import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { uid } from 'uid';
import { useAuthContext } from '../hooks/useAuthContext';

const ShowProduct = () => {
  const { productId } = useParams();
  const { user } = useAuthContext();
  const [product, setProduct] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [stock, setStock] = useState(0);

  const sizesWithColors = [];
  const colors = [];

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`
      );
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setIsLoading(false);
      }

      if (response.ok) {
        setProduct(json);

        setIsLoading(false);
      }
    };

    fetchProduct();
  }, []);

  {
    product &&
      product.details.map((detail) => {
        sizesWithColors.push({ ...detail });
        !colors.includes(detail.color) && colors.push(detail.color);
      });
  }

  const addQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const subtractQuantity = () => {
    if (quantity > 1) setQuantity((prevQuantity) => prevQuantity - 1);
  };

  useEffect(() => {
    console.log(stock);
    console.log(typeof stock);
  }, [stock]);
  return (
    <div className="container p-5">
      {!isLoading && (
        <div className="row bg-light">
          <div
            id="carouselExampleIndicators"
            className="carousel slide col-6 py-2"
            data-ride="carousel"
            data-interval="false"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
              ></li>
            </ol>
            <div className="carousel-inner rounded-lg">
              <div className="carousel-item active">
                <img
                  src="https://i.pinimg.com/564x/c1/1d/16/c11d164de692594acf53c9a855093139.jpg"
                  className="d-block w-100 "
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://i.pinimg.com/564x/c1/1d/16/c11d164de692594acf53c9a855093139.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://i.pinimg.com/564x/c1/1d/16/c11d164de692594acf53c9a855093139.jpg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-target="#carouselExampleIndicators"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-target="#carouselExampleIndicators"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </button>
          </div>

          <div className="col-6 p-5">
            <h3>{product.name}</h3>

            <p>{product.description}</p>

            <div className="row pl-3 mt-5 align-items-center">
              <h6 className="mr-2">Colors: </h6>
              {colors.map((col) => (
                <button
                  key={uid()}
                  className="rounded mx-1"
                  onClick={(e) => {
                    setColor(col);
                  }}
                >
                  {col}
                </button>
              ))}
            </div>

            <div className="row pl-3 mt-5 align-items-center">
              <h6 className="mr-2">Sizes: </h6>
              {sizesWithColors.map(
                (swc) =>
                  swc.color === color && (
                    <button
                      key={uid()}
                      className="btn btn-dark mx-1"
                      onClick={(e) => {
                        setSize(swc.size);
                        setStock(swc.stocks);
                      }}
                      disabled={!swc.hasStocks}
                    >
                      {swc.size}
                    </button>
                  )
              )}
            </div>

            <div className="row pl-3 mt-5 align-items-center">
              <h6 className="mr-2 mt-1 ">Stocks: </h6>
              {sizesWithColors.map(
                (swc) =>
                  swc.color === color &&
                  swc.size === size && <span key={uid()}>{swc.stocks}</span>
              )}
            </div>

            <div className="row pl-3 mt-5 align-items-center">
              <h6 className="mr-2">Quantity: </h6>
              <button className="btn btn-primary" onClick={subtractQuantity}>
                -
              </button>
              <input
                type="number"
                className="form-control input-quantity text-center mx-1"
                onChange={(e) =>
                  e.target.value <= stock
                    ? setQuantity(Number(e.target.value))
                    : setQuantity(100)
                }
                value={quantity || setQuantity(1)}
                disabled={true}
              />
              <button
                className="btn btn-primary"
                onClick={addQuantity}
                disabled={quantity === stock}
              >
                +
              </button>
            </div>
            <div className="row mt-5 justify-content-around">
              <Link
                to={!user ? '/login' : '/'}
                className="btn btn-danger d-inline-block"
              >
                Buy Now!
              </Link>
              <Link
                to={!user ? '/login' : ''}
                className="btn btn-primary d-inline-block"
              >
                Add to cart
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowProduct;
