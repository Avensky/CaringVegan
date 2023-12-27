import { formatRoute } from "../../utility/utility";
import * as actionTypes from "./actionTypes";
// import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// eslint-disable-next-line no-undef
// let stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// ===================================================================
// GET ALL PRODUCTS ==================================================
// ===================================================================

export const getInternalProducts = (params) => {
  // console.log("getInternalProducts params", params);
  let string = formatRoute(params);
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
// GET ONE PRODUCT ===================================================
// ===================================================================
export const getInternalProduct = (id) => {
  return (dispatch) => {
    dispatch(getInternalProductsStart());
    axios
      .get(`/api/v1/products/${id}`)
      .then((result) => {
        const product = result.data.data.data;
        // console.log("actions getProduct ", product);
        // const product = result.data;
        dispatch(getInternalProductSuccess(product));
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

// ===================================================================
// MIGRATE A PRODUCT =================================================
// ===================================================================
export const migrateProduct = (item) => {
  return (dispatch) => {
    dispatch(migrateProductStart());
    axios
      .post(`/api/v1/products/migrate/`, item)
      .then((result) => {
        console.log("migrate product data: ", result.data);
        dispatch(migrateProductSuccess(result.data));
      })
      .catch((error) => {
        dispatch(migrateProductFail(JSON.stringify(error)));
      });
  };
};

export const migrateProductSuccess = (data) => {
  return { type: actionTypes.MIGRATE_PRODUCT_SUCCESS, data };
};

export const migrateProductFail = (error) => {
  return { type: actionTypes.MIGRATE_PRODUCT_FAIL, error };
};

export const migrateProductStart = () => {
  return { type: actionTypes.MIGRATE_PRODUCT_START };
};
// ===================================================================
// MIGRATE ALL PRODUCTS ==============================================
// ===================================================================
export const migrateAllProducts = (products) => {
  // console.log("data", data);
  return (dispatch) => {
    dispatch(migrateAllProductsStart());
    axios
      .post(`/api/v1/products/migrateAll`, products)
      .then((result) => {
        dispatch(migrateAllProductsSuccess(result.data));
      })
      .catch((error) => {
        //console.log("getProducts error = " + error);
        // console.log("getProducts error = " + JSON.stringify(error));
        dispatch(migrateAllProductsFail(JSON.stringify(error)));
      });
  };
};

export const migrateAllProductsSuccess = (data) => {
  return { type: actionTypes.MIGRATE_ALL_PRODUCTS_SUCCESS, data };
};

export const migrateAllProductsFail = (error) => {
  return { type: actionTypes.MIGRATE_ALL_PRODUCTS_FAIL, error };
};

export const migrateAllProductsStart = () => {
  return { type: actionTypes.MIGRATE_ALL_PRODUCTS_START };
};

// ===================================================================
// DELETE PRODUCT =======================================================
// ===================================================================
export const deleteInternalProduct = (id) => {
  console.log("deleteInternalProduct id: ", id);
  return (dispatch) => {
    dispatch(deleteInternalProductStart());
    axios
      .delete(`/api/v1/products/${id}`)
      .then((result) => {
        console.log("actions delete product ", result.data);
        const data = result.data;
        dispatch(deleteInternalProductSuccess(data, id));
      })
      .catch((error) => {
        //console.log("getProducts error = " + error);
        // console.log("getProducts error = " + JSON.stringify(error));
        dispatch(deleteInternalProductFail(JSON.stringify(error)));
      });
  };
};

export const deleteInternalProductSuccess = (data, id) => {
  return { type: actionTypes.DELETE_INTERNAL_PRODUCT_SUCCESS, data, id };
};

export const deleteInternalProductFail = (error) => {
  return { type: actionTypes.DELETE_INTERNAL_PRODUCT_FAIL, error };
};

export const deleteInternalProductStart = () => {
  return { type: actionTypes.DELETE_INTERNAL_PRODUCT_START };
};
// ===================================================================
// ADD A PRODUCT =====================================================
// ===================================================================
export const updateInternalProduct = (values, id) => {
  console.log("updateInternalProduct values: ", values);
  console.log("updateInternalProduct id: ", id);
  // console.log(values);

  // const formData = new FormData();
  // for (let value in values) {
  //   formData.append(value, values[value]);
  // }
  return (dispatch) => {
    dispatch(updateInternalProductStart());
    axios
      .patch(`/api/v1/products/${id}`, values)
      .then((result) => {
        // console.log("actions updateInternalProduct ", result.data);
        const data = result.data.data;
        dispatch(updateInternalProductSuccess(data));
      })
      .catch((err) => dispatch(updateInternalProductFail(JSON.stringify(err))));
  };
};

export const updateInternalProductSuccess = (data) => {
  return { type: actionTypes.UPDATE_INTERNAL_PRODUCT_SUCCESS, data };
};

export const updateInternalProductFail = (error) => {
  return { type: actionTypes.UPDATE_INTERNAL_PRODUCT_FAIL, error };
};

export const updateInternalProductStart = () => {
  return { type: actionTypes.UPDATE_INTERNAL_PRODUCT_START };
};
// ===================================================================
// ADD A PRODUCT =====================================================
// ===================================================================
export const addInternalProduct = (values) => {
  console.log("addInternalProduct values: ", values);
  // console.log(values);

  const formData = new FormData();
  for (let value in values) {
    formData.append(value, values[value]);
  }
  return (dispatch) => {
    dispatch(addInternalProductStart());
    axios
      .post(`/api/v1/products`, formData)
      .then((result) => {
        console.log("actions addInternalProduct ", result.data);
        const data = result.data.data;
        dispatch(addInternalProductSuccess(data));
      })
      .catch((err) => dispatch(addInternalProductFail(JSON.stringify(err))));
  };
};

export const addInternalProductSuccess = (data) => {
  return { type: actionTypes.ADD_INTERNAL_PRODUCT_SUCCESS, data };
};

export const addInternalProductFail = (error) => {
  return { type: actionTypes.ADD_INTERNAL_PRODUCT_FAIL, error };
};

export const addInternalProductStart = () => {
  return { type: actionTypes.ADD_INTERNAL_PRODUCT_START };
};

// ===================================================================
// ARCHIVE PRODUCT ===================================================
// ===================================================================
export const archiveInternalProduct = (id) => {
  console.log("archiveInternalProduct id: ", id);
  return (dispatch) => {
    dispatch(archiveInternalProductStart());
    axios
      .delete(`/api/v1/products/internal/${id}`)
      .then((result) => {
        console.log("actions archiveInternalProduct ", result.data);
        const data = result.data;
        dispatch(archiveInternalProductSuccess(data, id));
      })
      .catch((error) => {
        //console.log("getProducts error = " + error);
        // console.log("getProducts error = " + JSON.stringify(error));
        dispatch(archiveInternalProductFail(JSON.stringify(error)));
      });
  };
};

export const archiveInternalProductSuccess = (data, id) => {
  return { type: actionTypes.ARCHIVE_INTERNAL_PRODUCT_SUCCESS, data, id };
};

export const archiveInternalProductFail = (error) => {
  return { type: actionTypes.ARCHIVE_INTERNAL_PRODUCT_FAIL, error };
};

export const archiveInternalProductStart = () => {
  return { type: actionTypes.ARCHIVE_INTERNAL_PRODUCT_START };
};
// ===================================================================
// UNARCHIVE PRODUCT ===================================================
// ===================================================================
export const unarchiveInternalProduct = (id) => {
  console.log("unarchiveInternalProduct id: ", id);
  return (dispatch) => {
    dispatch(unarchiveInternalProductStart());
    axios
      .patch(`/api/v1/products/internal/${id}`)
      .then((result) => {
        console.log("actions unarchiveInternalProduct ", result);
        const data = result.data;
        dispatch(unarchiveInternalProductSuccess(data));
      })
      .catch((error) => {
        //console.log("getProducts error = " + error);
        // console.log("getProducts error = " + JSON.stringify(error));
        dispatch(unarchiveInternalProductFail(JSON.stringify(error)));
      });
  };
};

export const unarchiveInternalProductSuccess = (data, id) => {
  return { type: actionTypes.UNARCHIVE_INTERNAL_PRODUCT_SUCCESS, data, id };
};

export const unarchiveInternalProductFail = (error) => {
  return { type: actionTypes.UNARCHIVE_INTERNAL_PRODUCT_FAIL, error };
};

export const unarchiveInternalProductStart = () => {
  return { type: actionTypes.UNARCHIVE_INTERNAL_PRODUCT_START };
};

export const setIsActive = (isActive) => {
  // console.log("add to cart");
  return { type: actionTypes.SET_IS_ACTIVE, isActive };
};

// ==========================================================================
//  SEARCH ============================================================
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
      .get("/api/v1/products/featured")
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
