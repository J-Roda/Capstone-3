import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const ProductsContext = createContext();

export const productReducer = (state, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {
        products: action.payload,
      };
    case 'CREATE_PRODUCT':
      return {
        products: [action.payload, ...state.products],
      };
    default:
      return state;
  }
};

export const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, { products: null });

  return (
    <ProductsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};

ProductContextProvider.propTypes = {
  children: PropTypes.object,
};
