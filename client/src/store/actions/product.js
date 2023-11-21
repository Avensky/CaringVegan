import * as actionTypes from "./actionTypes";
// import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// eslint-disable-next-line no-undef
// let stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// ===================================================================
// GET PRODUCTS ======================================================
// ===================================================================

export const buildString = (params) => {
  let string;
  if (
    params.active ||
    params.page ||
    params.limit ||
    params.starting_after ||
    params.ending_before
  ) {
    if (params.active !== undefined) {
      string = `?active=${params.active}`;
    }
    if (params.limit !== undefined) {
      if (string === undefined) {
        string = `?limit=${params.limit}`;
      } else {
        const limit = `limit=${params.limit}`;
        let join = [string, limit].join("&");
        string = `${join}`;
      }
    }

    if (params.page !== undefined) {
      console.log("params.page ", params.page);
      if (string === undefined) {
        string = `?page=${params.page}`;
      } else {
        const page = `page=${params.page}`;
        let join = [string, page].join("&");
        string = `${join}`;
      }
    }

    if (params.ending_before) {
      if (string === undefined) {
        string = `?ending_before=${params.ending_before}&has_more=${params.has_more}&index=${params.index}`;
      } else {
        const ending_before = `ending_before=${params.ending_before}&has_more=${params.has_more}&index=${params.index}`;
        let join = [string, ending_before].join("");
        string = `${join}`;
      }
    }

    if (params.starting_after) {
      if (string === undefined) {
        string = `?starting_after=${params.starting_after}&has_more=${params.has_more}&index=${params.index}`;
      } else {
        const starting_after = `${string}&starting_after=${params.starting_after}&has_more=${params.has_more}&index=${params.index}`;
        let join = [string, starting_after].join("");
        string = `${join}`;
      }
    }
  }
  return string;
};

export const getInternalProducts = (params) => {
  console.log("params", params);
  let string = buildString(params);
  console.log("string =", string);
  // console.log("params: ", params);
  return (dispatch) => {
    dispatch(getInternalProductsStart());
    axios
      .get("/api/v1/products" + string)
      .then((result) => {
        dispatch(getInternalProductsSuccess(result.data));
      })
      .catch((error) => {
        dispatch(getInternalProductsFail(JSON.stringify(error)));
      });
  };
};

export const getInternalProductsSuccess = (data) => {
  return { type: actionTypes.GET_INTERNAL_PRODUCTS_SUCCESS, data };
};

export const getInternalProductsFail = (error) => {
  return { type: actionTypes.GET_INTERNAL_PRODUCTS_FAIL, error };
};

export const getInternalProductsStart = () => {
  return { type: actionTypes.GET_INTERNAL_PRODUCTS_START };
};

// ===================================================================
// GET PRODUCT =======================================================
// ===================================================================
export const getInternalProduct = (id) => {
  return (dispatch) => {
    dispatch(getInternalProductsStart());
    axios
      .get(`/api/v1/products/${id}`)
      .then((result) => {
        // console.log("actions getProduct ", result.data);
        // const product = result.data;
        dispatch(getInternalProductSuccess(result.data.product));
      })
      .catch((error) => {
        //console.log("getProducts error = " + error);
        // console.log("getProducts error = " + JSON.stringify(error));
        dispatch(getInternalProductFail(JSON.stringify(error)));
      });
  };
};

export const getInternalProductSuccess = (product) => {
  return { type: actionTypes.GET_INTERNAL_PRODUCT_SUCCESS, product };
};

export const getInternalProductFail = (error) => {
  return { type: actionTypes.GET_INTERNAL_PRODUCT_FAIL, error };
};

export const getInternalProductStart = () => {
  return { type: actionTypes.GET_INTERNAL_PRODUCT_START };
};

// /*******************************************
//  * Cart Stuffs
//  *******************************************/
// export const addToCart = (product) => {
//   // console.log("add to cart");
//   return { type: actionTypes.ADD_TO_CART, product };
// };

// export const removeFromCart = (id) => {
//   return { type: actionTypes.REMOVE_FROM_CART, id };
// };

// export const subQuantity = (id) => {
//   return { type: actionTypes.SUB_QUANTITY, id };
// };

// // local storage
// export const loadCart = () => {
//   return { type: actionTypes.LOAD_CART };
// };
// // ==========================================================================
// // STRIPE SEARCH ============================================================
// // ==========================================================================

// export const getShopStart = () => {
//   return { type: actionTypes.GET_SHOP_START };
// };
// export const getShopSuccess = (shop) => {
//   return { type: actionTypes.GET_SHOP_SUCCESS, shop };
// };
// export const getShopFail = (err) => {
//   return { type: actionTypes.GET_SHOP_FAIL, err };
// };

// export const getShop = (params) => {
//   // const query = {params.}
//   console.log("query: ", params);

//   let string = "";

//   if (params.active) {
//     string = `?active=${params.active}`;
//   }

//   console.log("string: ", string);
//   return (dispatch) => {
//     dispatch(getShopStart());
//     axios
//       .get("/api/v1/products/shop" + string)
//       .then((result) => {
//         console.log("result", result.data);
//         dispatch(getShopSuccess(result.data.shop));
//       })
//       .catch((err) => {
//         console.log("err ", JSON.stringify(err));
//         dispatch(getShopFail(JSON.stringify(err)));
//       });
//   };
// };
// // ==========================================================================
// // STRIPE SEARCH ============================================================
// // ==========================================================================

// export const getFeaturedStart = () => {
//   return { type: actionTypes.GET_FEATURED_START };
// };
// export const getFeaturedSuccess = (featured) => {
//   return { type: actionTypes.GET_FEATURED_SUCCESS, featured };
// };
// export const getFeaturedFail = (err) => {
//   return { type: actionTypes.GET_FEATURED_FAIL, err };
// };

// export const getFeatured = () => {
//   return (dispatch) => {
//     dispatch(getFeaturedStart());
//     axios
//       .get("/api/v1/products/featured")
//       .then((result) => {
//         console.log("result", result.data);
//         dispatch(getFeaturedSuccess(result.data.featured));
//       })
//       .catch((err) => {
//         console.log("err ", err);
//         dispatch(getFeaturedFail(JSON.stringify(err)));
//       });
//   };
// };

// // ===================================================================
// // GET PRICE =========================================================
// // ===================================================================
// export const getPrice = (priceid, productid, mode) => {
//   // console.log("action price ", price);
//   // console.log("action id ", id);
//   return (dispatch) => {
//     dispatch(getPriceStart());
//     axios
//       .get("/api/v1/prices/" + priceid)
//       .then((result) => {
//         // console.log("action getPriceStart /api/v1/prices", result.data.price);
//         const priceObj = result.data.price;
//         dispatch(getPriceSuccess(priceObj, productid, mode));
//       })
//       .catch((error) => {
//         dispatch(getPriceFail(JSON.stringify(error)));
//       });
//   };
// };

// export const getPriceStart = () => {
//   return { type: actionTypes.GET_PRICE_START };
// };
// export const getPriceSuccess = (priceObj, productid, mode) => {
//   return {
//     type: actionTypes.GET_PRICE_SUCCESS,
//     priceObj,
//     productid,
//     mode,
//   };
// };

// export const getPriceFail = (error) => {
//   return { type: actionTypes.GET_PRICE_FAIL, error };
// };

// // ==========================================================================
// // STRIPE CHECKOUT ==========================================================
// // ==========================================================================

// export const checkoutStart = () => {
//   return {
//     type: actionTypes.CHECKOUT_START,
//   };
// };
// export const checkoutSuccess = async (session) => {
//   const stripe = await stripePromise;
//   // When the customer clicks on the button, redirect them to Checkout.
//   const result = await stripe.redirectToCheckout({
//     sessionId: session.id,
//   });
//   console.log("checkoutSuccess result ", result);
//   return {
//     type: actionTypes.CHECKOUT_SUCCESS,
//     result,
//   };
// };

// export const checkoutFail = (error) => {
//   console.log(error);
//   return {
//     type: actionTypes.CHECKOUT_FAIL,
//     error,
//   };
// };

// export const checkout = (cart, user) => {
//   console.log("cart ", cart);

//   let line_items = cart.map((item) => {
//     let data = {
//       price: item.default_price.id,
//       quantity: item.cartAmount,
//       //tax_rates   : [keys.taxRates]
//     };
//     console.log("data = " + JSON.stringify(data));
//     return data;
//   });
//   let body;
//   user
//     ? (body = { items: line_items, userid: user["_id"] })
//     : (body = { items: line_items });
//   console.log("body = ", body);
//   return (dispatch) => {
//     dispatch(checkoutStart());
//     // Call your backend to create the Checkout Session
//     axios
//       .post("/api/v1/stripe/checkout", body)
//       .then(async (res) => {
//         const session = res.data;
//         console.log("axios checkout", session);
//         // Get Stripe.js instance
//         // const stripe = await stripePromise;
//         // // When the customer clicks on the button, redirect them to Checkout.
//         // const result = await stripe.redirectToCheckout({
//         //   sessionId: session.id,
//         // });
//         console.log("checkoutSuccess result ", session);
//         dispatch(checkoutSuccess(session));
//       })
//       .catch((err) => {
//         // console.log("err", err);
//         dispatch(checkoutFail(JSON.stringify(err)));
//       });
//   };
// };
