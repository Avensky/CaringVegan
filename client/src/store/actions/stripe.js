import * as actionTypes from "./actionTypes";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// eslint-disable-next-line no-undef
let stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

/*******************************************
 * Cart Stuffs
 *******************************************/
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
// ==========================================================================
// STRIPE SEARCH ============================================================
// ==========================================================================

export const getShopStart = () => {
  return { type: actionTypes.GET_SHOP_START };
};
export const getShopSuccess = (shop) => {
  return { type: actionTypes.GET_SHOP_SUCCESS, shop };
};
export const getShopFail = (err) => {
  return { type: actionTypes.GET_SHOP_FAIL, err };
};

export const getShop = (params) => {
  // const query = {params.}
  console.log("query: ", params);

  let string = "";

  if (params.active) {
    string = `?active=${params.active}`;
  }

  console.log("string: ", string);
  return (dispatch) => {
    dispatch(getShopStart());
    axios
      .get("/api/v1/stripe/products/shop" + string)
      .then((result) => {
        console.log("result", result.data);
        dispatch(getShopSuccess(result.data.shop));
      })
      .catch((err) => {
        console.log("err ", JSON.stringify(err));
        dispatch(getShopFail(JSON.stringify(err)));
      });
  };
};
// ==========================================================================
// STRIPE SEARCH ============================================================
// ==========================================================================

export const getFeaturedStart = () => {
  return { type: actionTypes.GET_FEATURED_START };
};
export const getFeaturedSuccess = (featured) => {
  return { type: actionTypes.GET_FEATURED_SUCCESS, featured };
};
export const getFeaturedFail = (err) => {
  return { type: actionTypes.GET_FEATURED_FAIL, err };
};

export const getFeatured = () => {
  return (dispatch) => {
    dispatch(getFeaturedStart());
    axios
      .get("/api/v1/stripe/products/featured")
      .then((result) => {
        console.log("result", result.data);
        dispatch(getFeaturedSuccess(result.data.featured));
      })
      .catch((err) => {
        console.log("err ", err);
        dispatch(getFeaturedFail(JSON.stringify(err)));
      });
  };
};
// ===================================================================
// GET PRODUCTS ======================================================
// ===================================================================
export const getProducts = (params) => {
  // console.log("params", params);
  let string = "";
  if (
    params.active ||
    params.page ||
    params.limit ||
    params.starting_after ||
    params.ending_before
  ) {
    string = "?";
    if (params.active !== undefined) {
      string = `${string}active=${params.active}`;
      params.limit ? (string = `${string}&limit=${params.limit}`) : null;
      params.ending_before
        ? (string = `${string}&ending_before=${params.ending_before}&has_more=${params.has_more}&index=${params.index}`)
        : null;
      console.log("Params.results ", params.results);
      params.starting_after &&
      params.has_more &&
      params.results === params.limit
        ? (string = `${string}&starting_after=${params.starting_after}&has_more=${params.has_more}&index=${params.index}`)
        : null;
    } else if (params.limit) {
      string = `${string}limit=${params.limit}`;
      params.ending_before && params.index > 1
        ? (string = `${string}&ending_before=${params.ending_before}&has_more=${params.has_more}&index=${params.index}`)
        : null;
      params.starting_after &&
      params.has_more &&
      params.results === params.limit
        ? (string = `${string}&starting_after=${params.starting_after}&has_more=${params.has_more}&index=${params.index}`)
        : null;
    } else if (
      params.starting_after &&
      params.has_more &&
      params.results === params.limit
    ) {
      string = `${string}&starting_after=${params.starting_after}&has_more=${params.has_more}`;
    } else if (params.ending_before && params.index > 1) {
      string = `${string}&ending_before=${params.ending_before}&has_more=${params.has_more}`;
    }
  }
  // limit ? (string = `${string}&limit=${limit}`) : null;
  // page ? (string = `${string}&page=${page}`) : null;

  console.log("string =", string);
  // console.log("params: ", params);
  return (dispatch) => {
    dispatch(getProductsStart());
    axios
      .get("/api/v1/stripe/products" + string)
      .then((result) => {
        // console.log("actions getProducts", result.data);
        const data = result.data;
        dispatch(getProductsSuccess(data));
      })
      .catch((error) => {
        // console.log("getProducts error = " + error);
        // console.log("getProducts error = " + JSON.stringify(error));
        dispatch(getProductsFail(JSON.stringify(error)));
      });
  };
};

export const getProductsSuccess = (data) => {
  return { type: actionTypes.GET_PRODUCTS_SUCCESS, data };
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
      .get(`/api/v1/stripe/products/${id}`)
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

// ==========================================================================
// STRIPE CHECKOUT ==========================================================
// ==========================================================================

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
      price: item.default_price.id,
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
