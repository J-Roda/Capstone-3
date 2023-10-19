import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

function ProductDetails({ product }) {
  const { user } = useAuthContext();
  const priceSet = new Set();
  const priceRange = [];

  for (let i = 0; i < product.details.length; i++) {
    priceSet.add(product.details[i].price);
  }

  for (const price of priceSet.values()) {
    priceRange.push(price);
  }

  return (
    <div className="col-lg-4 col-md-6 mb-5">
      <div
        className="card mx-auto pt-1 px-2 rounded-lg"
        style={{ width: '18rem' }}
      >
        <Link to={`product/${product._id}`}>
          <img
            src="https://i.pinimg.com/564x/c1/1d/16/c11d164de692594acf53c9a855093139.jpg"
            className="card-img-top rounded-lg"
            alt="..."
          />
        </Link>
        <div className="card-body">
          <Link to={`product/${product._id}`} className=" text-decoration-none">
            <h5 className="card-title text-dark font-weight-bold">
              {product.name}
            </h5>
            <p className="card-text text-secondary">
              {product.description.slice(0, 59)}...
            </p>
          </Link>
          <p className="card-text text-secondary">
            <img
              src="images/ratings/empty-star.png"
              alt="empty-star"
              className="mr-1"
            />
            <img
              src="images/ratings/empty-star.png"
              alt="empty-star"
              className="mr-1"
            />
            <img
              src="images/ratings/empty-star.png"
              alt="empty-star"
              className="mr-1"
            />
            <img
              src="images/ratings/empty-star.png"
              alt="empty-star"
              className="mr-1"
            />
            <img src="images/ratings/empty-star.png" alt="empty-star" />
          </p>
          {priceRange.length < 2 ? (
            <p className="card-text font-weight-bold text-dark">
              &#8369;{priceRange[0]}
            </p>
          ) : (
            <p className="card-text font-weight-bold text-dark">
              &#8369;{priceRange[0]} - &#8369;
              {priceRange[priceRange.length - 1]}
            </p>
          )}

          {/* {!user && (
            <div className="d-flex justify-content-around">
              <Link
                to={!user ? '/login' : '/'}
                className="btn btn-primary d-inline-block"
              >
                Buy Now!
              </Link>
              <Link
                to={!user ? '/login' : '/'}
                className="btn btn-primary d-inline-block"
              >
                Add to cart
              </Link>
            </div>
          )} */}

          {user &&
            (user.isAdmin ? (
              <div className="d-flex justify-content-around">
                <a href="/" className="btn btn-primary d-inline-block">
                  Edit Product
                </a>
                <a href="/" className="btn btn-primary d-inline-block">
                  Archived
                </a>
              </div>
            ) : (
              <div className="d-flex justify-content-around">
                <a href="/" className="btn btn-primary d-inline-block">
                  Buy Now!
                </a>
                <a href="/" className="btn btn-primary d-inline-block">
                  Add to cart
                </a>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

ProductDetails.propTypes = {
  product: PropTypes.object,
};

export default ProductDetails;
