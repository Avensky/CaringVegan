import * as actionTypes from "./actionTypes";
import axios from "axios";

//add cart action
export const addToCart = (id) => {
  return {
    type: actionTypes.ADD_TO_CART,
    id,
  };
};
//remove item action
export const removeItem = (id) => {
  return {
    type: actionTypes.REMOVE_ITEM,
    id,
  };
};
//subtract qt action
export const subtractQuantity = (id) => {
  return {
    type: actionTypes.SUB_QUANTITY,
    id,
  };
};
//add qt action
export const addQuantity = (id) => {
  return {
    type: actionTypes.ADD_QUANTITY,
    id,
  };
};

export const loadCart = () => {
  // local storage
  return {
    type: actionTypes.LOAD_CART,
  };
};
export const loadShop = (values) => {
  return {
    type: actionTypes.LOAD_SHOP,
    values,
  };
};

export const orderBy = (values) => {
  return {
    type: actionTypes.ORDER_BY,
    values,
  };
};

/*******************************************
 * Get Items from database
 *******************************************/

// ===================================================================
// GET PRODUCTS ======================================================
// ===================================================================

export const getProducts = () => {
  return (dispatch) => {
    dispatch(getProductsStart());
    axios
      .get("/api/v1/products")
      .then((result) => {
        // console.log("/api/v1/products", result.data.products.data);
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
  return {
    type: actionTypes.GET_PRODUCTS_SUCCESS,
    products,
  };
};
export const getProductsFail = (error) => {
  return {
    type: actionTypes.GET_PRODUCTS_FAIL,
    error,
  };
};
export const getProductsStart = () => {
  return {
    type: actionTypes.GET_PRODUCTS_START,
  };
};

// ===================================================================
// GET PRICE =========================================================
// ===================================================================

export const getPrices = (products) => {
  return (dispatch) => {
    for (let i = 0; i < products.length; i++) {
      // console.log("get prices ", products[i].id);
      dispatch(getPrice(products[i].default_price, products[i].id));
    }
  };
};

export const getPrice = (priceid, productid) => {
  // console.log("action price ", price);
  // console.log("action id ", id);
  return (dispatch) => {
    dispatch(getPriceStart());
    axios
      .get("/api/v1/prices/" + priceid)
      .then((result) => {
        // console.log("/api/v1/prices", result.data.price);
        const priceObj = result.data.price;
        dispatch(getPriceSuccess(priceObj, productid));
      })
      .catch((error) => {
        dispatch(getPriceFail(JSON.stringify(error)));
      });
  };
};
export const getPriceStart = () => {
  return {
    type: actionTypes.GET_PRICE_START,
  };
};
export const getPriceSuccess = (priceObj, productid) => {
  return {
    type: actionTypes.GET_PRICE_SUCCESS,
    priceObj,
    productid,
  };
};
export const getPriceFail = (error) => {
  return {
    type: actionTypes.GET_PRICE_FAIL,
    error,
  };
};
// ===================================================================
// GET PRICES ========================================================
// ===================================================================

// =====================================================================
// New Item ============================================================
// =====================================================================
export const newItemStart = () => {
  return {
    type: actionTypes.NEW_ITEM_START,
  };
};

export const newItemFail = (error) => {
  return {
    type: actionTypes.NEW_ITEM_FAIL,
    error: error,
  };
};

export const newItemSuccess = (itemData) => {
  return {
    type: actionTypes.NEW_ITEM_SUCCESS,
    itemData: itemData,
  };
};

export const newItem = (values) => {
  return (dispatch) => {
    dispatch(newItemStart());

    axios
      .post("/api/addImage", values)
      .then((response) => {
        console.log(response);
        const data = response.data;
        console.log(data);
        dispatch(newItemSuccess(data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(newItemFail(error));
      });
  };
};

/*******************************************
 * Get Items by id
 *******************************************/

export const getItemByIdSuccess = (charById) => {
  return {
    type: actionTypes.GET_ITEM_BY_ID_SUCCESS,
    charById: charById,
  };
};
export const getItemByIdFail = (error) => {
  return {
    type: actionTypes.GET_ITEM_BY_ID_FAIL,
    error: error,
  };
};
export const getItemByIdStart = () => {
  return {
    type: actionTypes.GET_ITEM_BY_ID_START,
  };
};
export const getItemById = (id) => {
  return (dispatch) => {
    dispatch(getItemByIdStart());
    axios
      .get("/api/getitemDetails/" + id)
      .then((result) => {
        console.log(result);
        const charById = result.data;
        //            const fetchedPostsById = {id: id}
        //            const obj = {...post, ...fetchedPostsById}
        dispatch(getItemByIdSuccess(charById));
      })
      .catch((error) => {
        dispatch(getItemByIdFail(error));
      });
  };
};

/*******************************************
 * Get Items by type
 *******************************************/

export const getItemByTypeSuccess = (items) => {
  return {
    type: actionTypes.GET_ITEM_BY_TYPE_SUCCESS,
    items,
  };
};

export const getItemByTypeFail = (error) => {
  return {
    type: actionTypes.GET_ITEM_BY_TYPE_FAIL,
    error: error,
  };
};

export const getItemByTypeStart = () => {
  return {
    type: actionTypes.GET_ITEM_BY_TYPE_START,
  };
};

export const getItemByType = (type) => {
  return (dispatch) => {
    dispatch(getItemByTypeStart());
    axios
      .get("/api/getProductsbytype/" + type)
      .then((result) => {
        const items = result.data;
        console.log("get item by type = ", items);
        dispatch(getItemByTypeSuccess(items));
      })
      .catch((error) => {
        dispatch(getItemByTypeFail(error));
      });
  };
};

/*******************************************
 * Update Item
 *******************************************/
export const updateItemStart = () => {
  return { type: actionTypes.UPDATE_ITEM_START };
};

export const updateItemFail = (error) => {
  return {
    type: actionTypes.UPDATE_ITEM_FAIL,
    error: error,
  };
};

export const updateItemSuccess = (itemData) => {
  return {
    type: actionTypes.UPDATE_ITEM_SUCCESS,
    itemData: itemData,
  };
};

export const updateItem = (id, name, age, relatives, bio) => {
  return (dispatch) => {
    dispatch(updateItemStart());

    const itemData = {
      id: id,
      name: name,
      age: age,
      relatives: relatives,
      bio: bio,
    };

    axios
      .delete("/api/updateitem/" + itemData)
      .then((response) => {
        console.log(response);
        dispatch(updateItemSuccess(itemData));
      })
      .catch((error) => {
        console.log(error);
        dispatch(updateItemFail(error));
      });
  };
};

/*******************************************
 * Delete Item
 *******************************************/

export const deleteItemStart = () => {
  return {
    type: actionTypes.DELETE_ITEM_START,
  };
};

export const deleteItemFail = (error) => {
  return {
    type: actionTypes.DELETE_ITEM_FAIL,
    error: error,
  };
};

export const deleteItemSuccess = () => {
  return {
    type: actionTypes.DELETE_ITEM_SUCCESS,
  };
};

export const deleteItem = (id) => {
  return (dispatch) => {
    dispatch(deleteItemStart());
    axios
      .delete("/api/deleteitem/" + id)
      .then((response) => {
        console.log(response);
        dispatch(deleteItemSuccess());
      })
      .catch((error) => {
        console.log(error);
        dispatch(deleteItemFail(error));
      });
  };
};
