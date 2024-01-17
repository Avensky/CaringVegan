import * as actionTypes from "./actionTypes";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { formatRoute } from "../../utility/utility";

/* eslint-disable */
console.log("stripe", process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
let stripePromise = loadStripe(
  `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
);
/* eslint-enable */

export const setStripeActive = (isActive) => {
  // console.log("add to cart");
  return { type: actionTypes.SET_STRIPE_ACTIVE, isActive };
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
      .get("/api/v1/stripe/shop" + string)
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

// ===================================================================
// GET PRODUCTS ======================================================
// ===================================================================
export const getProducts = (params) => {
  console.log("getInternalProducts params", params);
  let string = formatRoute(params);
  console.log("string =", string);

  return (dispatch) => {
    dispatch(getProductsStart());
    axios
      .get("/api/v1/stripe" + string)
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
// UPDATE PRODUCT ====================================================
// ===================================================================
export const updateStripeProduct = (values, id) => {
  // console.log("data", data);
  return (dispatch) => {
    dispatch(updateStripeProductStart());
    axios
      .patch(`/api/v1/stripe/${id}`, values)
      .then((result) => {
        dispatch(updateStripeProductSuccess(result.data));
      })
      .catch((error) => {
        dispatch(updateStripeProductFail(JSON.stringify(error)));
      });
  };
};

export const updateStripeProductSuccess = (data) => {
  return { type: actionTypes.UPDATE_STRIPE_PRODUCT_SUCCESS, data };
};

export const updateStripeProductFail = (error) => {
  return { type: actionTypes.UPDATE_STRIPE_PRODUCT_FAIL, error };
};

export const updateStripeProductStart = () => {
  return { type: actionTypes.UPDATE_STRIPE_PRODUCT_START };
};
// ===================================================================
// MIGRATE PRODUCT ===================================================
// ===================================================================
export const migrateStripeProduct = (item) => {
  // console.log("data", data);
  return (dispatch) => {
    dispatch(migrateStripeProductStart());
    axios
      .post(`/api/v1/stripe/migrate`, item)
      .then((result) => {
        dispatch(migrateStripeProductSuccess(result.data));
      })
      .catch((error) => {
        dispatch(migrateStripeProductFail(JSON.stringify(error)));
      });
  };
};

export const migrateStripeProductSuccess = (data) => {
  return { type: actionTypes.MIGRATE_STRIPE_PRODUCT_SUCCESS, data };
};

export const migrateStripeProductFail = (error) => {
  return { type: actionTypes.MIGRATE_STRIPE_PRODUCT_FAIL, error };
};

export const migrateStripeProductStart = () => {
  return { type: actionTypes.MIGRATE_STRIPE_PRODUCT_START };
};

// ===================================================================
// MIGRATE ALL PRODUCTS ==============================================
// ===================================================================
export const migrateAllStripeProducts = (products) => {
  // console.log("data", data);
  return (dispatch) => {
    dispatch(migrateAllStripeProductsStart());
    axios
      .post(`/api/v1/stripe/migrateAll`, products)
      .then((result) => {
        console.log(
          "actions MIGRATEALL stripe products to mongodb ",
          result.data
        );
        const data = result.data;
        dispatch(migrateAllStripeProductsSuccess(data));
      })
      .catch((error) => {
        //console.log("getProducts error = " + error);
        // console.log("getProducts error = " + JSON.stringify(error));
        dispatch(migrateAllStripeProductsFail(JSON.stringify(error)));
      });
  };
};

export const migrateAllStripeProductsSuccess = (data) => {
  return { type: actionTypes.MIGRATE_ALL_STRIPE_PRODUCTS_SUCCESS, data };
};

export const migrateAllStripeProductsFail = (error) => {
  return { type: actionTypes.MIGRATE_ALL_STRIPE_PRODUCTS_FAIL, error };
};

export const migrateAllStripeProductsStart = () => {
  return { type: actionTypes.MIGRATE_ALL_STRIPE_PRODUCTS_START };
};

// ===================================================================
// GET PRODUCT =======================================================
// ===================================================================
export const getProduct = (id) => {
  return (dispatch) => {
    dispatch(getProductsStart());
    axios
      .get(`/api/v1/stripe/${id}`)
      .then((result) => {
        const product = result.data.product;
        // console.log("actions getProduct ", product);
        dispatch(getProductSuccess(product));
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
// UNARCHIVE PRODUCT =================================================
// ===================================================================
export const unarchiveStripeProduct = (id) => {
  return (dispatch) => {
    dispatch(unarchiveStripeProductStart());
    axios
      .patch(`/api/v1/stripe/unarchive/${id}`)
      .then((result) => {
        const data = result.data;
        console.log("unarchiveStripeProduct ", data);
        dispatch(unarchiveStripeProductSuccess(data));
      })
      .catch((error) => {
        //console.log("getProducts error = " + error);
        // console.log("getProducts error = " + JSON.stringify(error));
        dispatch(unarchiveStripeProductFail(JSON.stringify(error)));
      });
  };
};

export const unarchiveStripeProductSuccess = (data) => {
  return { type: actionTypes.UNARCHIVE_STRIPE_PRODUCT_SUCCESS, data };
};

export const unarchiveStripeProductFail = (error) => {
  return { type: actionTypes.UNARCHIVE_STRIPE_PRODUCT_FAIL, error };
};

export const unarchiveStripeProductStart = () => {
  return { type: actionTypes.UNARCHIVE_STRIPE_PRODUCT_START };
};
// ===================================================================
// ARCHIVE PRODUCT =======================================================
// ===================================================================
export const archiveStripeProduct = (id) => {
  return (dispatch) => {
    dispatch(archiveStripeProductStart());
    axios
      .delete(`/api/v1/stripe/${id}`)
      .then((result) => {
        const data = result.data;
        console.log("actions archiveStripeProduct ", data);
        dispatch(archiveStripeProductSuccess(data));
      })
      .catch((error) => {
        //console.log("getProducts error = " + error);
        // console.log("getProducts error = " + JSON.stringify(error));
        dispatch(archiveStripeProductFail(JSON.stringify(error)));
      });
  };
};

export const archiveStripeProductSuccess = (data) => {
  return { type: actionTypes.ARCHIVE_STRIPE_PRODUCT_SUCCESS, data };
};

export const archiveStripeProductFail = (error) => {
  return { type: actionTypes.ARCHIVE_STRIPE_PRODUCT_FAIL, error };
};

export const archiveStripeProductStart = () => {
  return { type: actionTypes.ARCHIVE_STRIPE_PRODUCT_START };
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
