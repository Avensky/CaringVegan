import * as actionTypes from "./actionTypes";

export const addToCart = (product) => {
  // console.log("add to cart");
  return { type: actionTypes.ADD_TO_CART, product };
};

export const removeFromCart = (id) => {
  return { type: actionTypes.REMOVE_FROM_CART, id };
};

export const subQuantity = (id) => {
  return { type: actionTypes.SUB_QUANTITY, id };
};

// local storage
export const loadCart = () => {
  return { type: actionTypes.LOAD_CART };
};
