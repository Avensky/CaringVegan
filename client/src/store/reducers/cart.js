//import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/actionTypes/cart'
import * as actionTypes from "../actions/actionTypes";
import {
  copyArray,
  updateObject,
  findItem,
  updateArray,
  getTotalPrice,
  getTotalItems,
  removeItem,
  removeInternalItem,
  storeLocally,
  // getLocalStorage,
} from "../../utility/utility";

const initialState = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
  error: null,
  loading: false,
};

// =============================================================================
// CART ========================================================================
// =============================================================================
const addToCart = (state, action) => {
  // check if item already exists in cart
  console.log("addToCart start ", action.product);
  let cart = copyArray(state.cart);
  let cartItem = findItem(cart, action.product.id);

  if (cartItem) {
    cartItem.cartAmount += 1;
    cart = updateArray(cart, cartItem);
  }

  if (!cartItem) {
    cartItem = { ...action.product };
    cartItem.cartAmount = 1;
    cart.push(cartItem);
  }

  storeLocally("cart", cart);
  const totalItems = getTotalItems(cart);
  const total = getTotalPrice(cart);

  return updateObject(state, { cart, total, totalItems });
};

const subQuantity = (state, action) => {
  let cart = copyArray(state.cart);
  let cartItem = findItem(cart, action.id);

  //if the qt == 0 then it should be removed
  if (cartItem && cartItem.cartAmount > 1) {
    cartItem.cartAmount -= 1;
    cart = updateArray(cart, cartItem);
  } else {
    cart = removeInternalItem(cart, action.id);
  }

  storeLocally("cart", cart);
  const total = getTotalPrice(cart);
  const totalItems = getTotalItems(cart);

  return updateObject(state, { cart, total, totalItems });
};

const removeFromCart = (state, action) => {
  let cart = copyArray(state.cart);
  cart = removeItem(cart, action.id);

  storeLocally("cart", cart);
  const total = getTotalPrice(cart);
  const totalItems = getTotalItems(cart);

  return updateObject(state, { cart, total, totalItems });
};

// =============================================================================
// OTHER =======================================================================
// =============================================================================

const loadCart = (state) => {
  // console.log("loadCart action", action);
  let cart = localStorage.getItem("cart") || [];
  // console.log("localstorage cart", cart);
  let totalItems, total;
  if (cart.length > 0) {
    cart = JSON.parse(cart);
    totalItems = getTotalItems(cart);
    total = getTotalPrice(cart);
  }

  return updateObject(state, { cart, totalItems, total });
};

const loadShop = (state, action) => {
  let items = state.items;
  let shop = state.shop;
  let addedItems = state.addedItems;
  let orderby = action.values;
  console.log("loadShop orderby= " + JSON.stringify(orderby));
  //let orderby = state.orderby
  console.log("loadShop state orderby= " + JSON.stringify(state.orderby));
  if (!orderby && state.orderby) {
    orderby = state.orderby;
  }
  if (orderby) {
    if (orderby.value === "Lowest price") {
      console.log("LoadShop lowest price");
      if (addedItems.length > 0) {
        console.log("addedItems.length>0" + JSON.stringify(items));
        shop = items
          .map((obj) => addedItems.find((item) => item._id === obj._id) || obj)
          .sort(function (a, b) {
            return a.price - b.price;
          });
      } else {
        console.log("else" + items);
        shop = items
          .map((item) => item)
          .sort(function (a, b) {
            return a.price - b.price;
          });
      }
    }
    if (orderby.value === "Highest price") {
      console.log("LoadShop Highest price");
      if (addedItems.length > 0) {
        console.log("addedItems.length>0" + items);
        shop = items
          .map((obj) => addedItems.find((item) => item._id === obj._id) || obj)
          .sort(function (a, b) {
            return b.price - a.price;
          });
      } else {
        console.log("else" + items);
        shop = items
          .map((item) => item)
          .sort(function (a, b) {
            return b.price - a.price;
          });
      }
    }
    if (orderby.value === "Most recent") {
      console.log("date loadShop");
      if (addedItems.length > 0) {
        shop = items
          .map((obj) => addedItems.find((item) => item._id === obj._id) || obj)
          .sort(function (a, b) {
            return b.date - a.date;
          });
      } else {
        shop = items.sort(function (a, b) {
          return b.date - a.date;
        });
      }
    }
    if (orderby.value === "Most Popular") {
      console.log("sold loadShop");
      if (addedItems.length > 0) {
        shop = items
          .map((obj) => addedItems.find((item) => item._id === obj._id) || obj)
          .sort(function (a, b) {
            return b.sold - a.sold;
          });
      } else {
        shop = items.sort(function (a, b) {
          return b.sold - a.sold;
        });
      }
    }
  } else {
    shop = items.map(
      (obj) => addedItems.find((item) => item._id === obj._id) || obj
    );
    console.log("loadShop = ", shop);
  }
  return updateObject(state, {
    orderby: orderby,
    shop: shop,
    shopLoaded: true,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return addToCart(state, action);
    case actionTypes.REMOVE_FROM_CART:
      return removeFromCart(state, action);
    case actionTypes.SUB_QUANTITY:
      return subQuantity(state, action);
    case actionTypes.LOAD_CART:
      return loadCart(state, action);
    case actionTypes.LOAD_SHOP:
      return loadShop(state, action);
    default:
      return state;
  }
};

export default reducer;
