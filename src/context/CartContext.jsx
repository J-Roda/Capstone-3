import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types"

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CART":
      return { carts: action.payload };
  }
}

export const CartContextProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(cartReducer, { carts: null })

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      { children }
    </CartContext.Provider>
  )
}

CartContextProvider.propTypes = {
  children: PropTypes.object
}