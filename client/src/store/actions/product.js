import * as actionTypes from "./actionTypes";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// eslint-disable-next-line no-undef
let stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

/*******************************************
 * Get screen size
 *******************************************/
export const resize = () => {
  const width = window.innerWidth;
  // const height = window.innerHeight;
  // console.log(width);
  return {
    type: actionTypes.RESIZE,
    width,
  };
};

/*******************************************
 * Cart Stuffs
 *******************************************/
console.log("add to cart");
export const addToCart = (product) => {
  return { type: actionTypes.ADD_TO_CART, product };
};

export const removeFromCart = (id) => {
  return { type: actionTypes.REMOVE_FROM_CART, id };
};

export const subQuantity = (id) => {
  return { type: actionTypes.SUB_QUANTITY, id };
};

//add qt action
export const addQuantity = (id) => {
  return { type: actionTypes.ADD_QUANTITY, id };
};

// local storage
export const loadCart = () => {
  return { type: actionTypes.LOAD_CART };
};

export const loadShop = (values) => {
  return { type: actionTypes.LOAD_SHOP, values };
};

export const orderBy = (values) => {
  return { type: actionTypes.ORDER_BY, values };
};

// ===================================================================
// GET PRODUCTS ======================================================
// ===================================================================

export const getProducts = () => {
  return (dispatch) => {
    dispatch(getProductsStart());
    axios
      .get("/api/v1/products")
      .then((result) => {
        // console.log("actions getProducts", result.data.products.data);
        const products = result.data.products.data;
        dispatch(getProductsSuccess(products));
      })
      .catch((error) => {
        //console.log("getProducts error = " + error);
        // console.log("getProducts error = " + JSON.stringify(error));
        dispatch(getProductsFail(JSON.stringify(error)));
      });
  };
};
export const getProductsSuccess = (products) => {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, products };
};
export const getProductsFail = (error) => {
  return { type: actionTypes.GET_PRODUCTS_FAIL, error };
};
export const getProductsStart = () => {
  return { type: actionTypes.GET_PRODUCTS_START };
};
// ===================================================================
// GET PRODUCT =======================================================
// ===================================================================

export const getProduct = (id) => {
  return (dispatch) => {
    dispatch(getProductsStart());
    axios
      .get(`/api/v1/products/${id}`)
      .then((result) => {
        // console.log("actions getProduct ", result.data);
        // const product = result.data;
        dispatch(getProductSuccess(result.data.product));
      })
      .catch((error) => {
        //console.log("getProducts error = " + error);
        // console.log("getProducts error = " + JSON.stringify(error));
        dispatch(getProductFail(JSON.stringify(error)));
      });
  };
};
export const getProductSuccess = (product) => {
  return { type: actionTypes.GET_PRODUCT_SUCCESS, product };
};
export const getProductFail = (error) => {
  return { type: actionTypes.GET_PRODUCT_FAIL, error };
};
export const getProductStart = () => {
  return { type: actionTypes.GET_PRODUCT_START };
};

// ===================================================================
// GET PRICE =========================================================
// ===================================================================
export const getPrice = (priceid, productid, mode) => {
  // console.log("action price ", price);
  // console.log("action id ", id);
  return (dispatch) => {
    dispatch(getPriceStart());
    axios
      .get("/api/v1/prices/" + priceid)
      .then((result) => {
        // console.log("action getPriceStart /api/v1/prices", result.data.price);
        const priceObj = result.data.price;
        dispatch(getPriceSuccess(priceObj, productid, mode));
      })
      .catch((error) => {
        dispatch(getPriceFail(JSON.stringify(error)));
      });
  };
};
export const getPriceStart = () => {
  return { type: actionTypes.GET_PRICE_START };
};
export const getPriceSuccess = (priceObj, productid, mode) => {
  return {
    type: actionTypes.GET_PRICE_SUCCESS,
    priceObj,
    productid,
    mode,
  };
};
export const getPriceFail = (error) => {
  return { type: actionTypes.GET_PRICE_FAIL, error };
};
// ===================================================================
// STRIPE CHECKOUT ========================================================
// ===================================================================

export const checkoutStart = () => {
  return {
    type: actionTypes.CHECKOUT_START,
  };
};
export const checkoutSuccess = async (session) => {
  const stripe = await stripePromise;
  // When the customer clicks on the button, redirect them to Checkout.
  const result = await stripe.redirectToCheckout({
    sessionId: session.id,
  });
  console.log("checkoutSuccess result ", result);
  return {
    type: actionTypes.CHECKOUT_SUCCESS,
    result,
  };
};

export const checkoutFail = (error) => {
  console.log(error);
  return {
    type: actionTypes.CHECKOUT_FAIL,
    error,
  };
};

export const checkout = (cart, user) => {
  console.log("cart ", cart);

  let line_items = cart.map((item) => {
    let data = {
      price: item.price.id,
      quantity: item.cartAmount,
      //tax_rates   : [keys.taxRates]
    };
    console.log("data = " + JSON.stringify(data));
    return data;
  });
  let body;
  user
    ? (body = { items: line_items, userid: user["_id"] })
    : (body = { items: line_items });
  console.log("body = ", body);
  return (dispatch) => {
    dispatch(checkoutStart());
    // Call your backend to create the Checkout Session
    axios
      .post("/api/v1/stripe/checkout", body)
      .then(async (res) => {
        const session = res.data;
        console.log("axios checkout", session);
        // Get Stripe.js instance
        // const stripe = await stripePromise;
        // // When the customer clicks on the button, redirect them to Checkout.
        // const result = await stripe.redirectToCheckout({
        //   sessionId: session.id,
        // });
        console.log("checkoutSuccess result ", session);
        dispatch(checkoutSuccess(session));
      })
      .catch((err) => {
        // console.log("err", err);
        dispatch(checkoutFail(JSON.stringify(err)));
      });
  };
};
