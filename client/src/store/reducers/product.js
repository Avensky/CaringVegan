import * as actionTypes from "../actions/actionTypes";
import { copyArray, updateObject } from "../../utility/utility";

const initialState = {
  cart: [],
  products: [],
  product: {},
  width: null,
  prices: [],
  items: [],
  loading: false,
  posted: false,
  itemById: [],
  addedItems: [],
  shop: [],
  total: 0.0,
  totalItems: 0,
  totalPrice: 0,
  error: null,
  orderby: null,
  cartLoaded: false,
  shopLoaded: true,
};

// track screen width
const resize = (state, action) => {
  return updateObject(state, {
    width: action.width,
  });
};

const newItemStart = (state) => {
  return updateObject(state, { posted: false });
};

const newItemFail = (state) => {
  return updateObject(state, {
    loading: false,
  });
};

const newItemSuccess = (state) => {
  //const newItem = updateObject(action.itemData, { id: action.itemId })
  return updateObject(state, {
    loading: false,
    //        items: state.items.concat( newItem )
  });
};

const getItemByIdStart = (state) => {
  return updateObject(state, {
    loading: true,
  });
};

const getItemByIdFail = (state) => {
  return updateObject(state, {
    loading: false,
  });
};

const getItemByIdSuccess = (state, action) => {
  return updateObject(state, {
    itemById: action.itemById,
    loading: false,
  });
};

const getItemByTypeStart = (state) => {
  return updateObject(state, {
    loading: true,
  });
};

const getItemByTypeFail = (state) => {
  return updateObject(state, {
    loading: false,
  });
};

const getItemByTypeSuccess = (state, action) => {
  return updateObject(state, {
    items: action.items,
    loading: false,
  });
};

const deleteItemStart = (state) => {
  return updateObject(state, {
    loading: true,
  });
};

const deleteItemFail = (state) => {
  return updateObject(state, {
    loading: false,
  });
};

const deleteItemSuccess = (state) => {
  return updateObject(state, {
    loading: false,
  });
};

// ============================================================================
// GET PRODUCTS ===============================================================
// ============================================================================

const getProductsStart = (state) => {
  return updateObject(state, {
    loading: true,
  });
};

const getProductsSuccess = (state, action) => {
  console.log("reducer getProductsSuccess", action.products);
  // console.log("getProductsSuccess = " + JSON.stringify(action.products));
  return updateObject(state, {
    products: action.products,
    prices: action.products,
    // loading: false,
  });
};

const getProductsFail = (state) => {
  return updateObject(state, {
    // loading: false,
  });
};
// ============================================================================
// GET PRODUCT ================================================================
// ============================================================================

const getProductStart = (state) => {
  return updateObject(state, {
    loading: true,
  });
};

const getProductSuccess = (state, action) => {
  console.log("getProductSuccess reducer", action.product);
  // console.log("getProductsSuccess = " + JSON.stringify(action.products));
  return updateObject(state, {
    product: action.product,
    loading: false,
  });
};

const getProductFail = (state) => {
  return updateObject(state, {
    loading: false,
  });
};
// ============================================================================
// GET PRICE ==================================================================
// ============================================================================

const getPriceStart = (state) => {
  return updateObject(state, {
    // loading: true,
  });
};

const getPriceSuccess = (state, action) => {
  // const prices = [...state.prices, action.priceObj];
  // prices.push(action.priceObj);

  const prices = copyArray(state.prices); // avoids mutating the state
  prices.map((product) => {
    if (product.id === action.productid) {
      product.price = action.priceObj;
    }
  });

  // console.log("reducer getPriceSuccess: ", prices);
  return updateObject(state, {
    prices,
    // loading: false,
  });
};

const getPriceFail = (state) => {
  return updateObject(state, {
    // loading: false,
  });
};

// =============================================================================
// CART ========================================================================
// =============================================================================
const addToCart = (state, action) => {
  // Find item in db
  let addedItem = state.items.find((item) => item._id === action.id);
  // Find item in cart
  let existed_item;
  if (state.addedItems) {
    existed_item = state.addedItems.find((item) => action.id === item._id);
  }
  let stringMyAddedItems, total, totalItems, shop, addedItems;
  if (existed_item) {
    if (existed_item.amount < addedItem.quantity) {
      existed_item.amount += 1;
    }
    addedItems = state.addedItems.map(
      (obj) => [existed_item].find((item) => item._id === obj._id) || obj
    );
    shop = state.shop.map(
      (obj) => [existed_item].find((item) => item._id === obj._id) || obj
    );
    //make cart a string and store in local space
    stringMyAddedItems = JSON.stringify(addedItems);
    localStorage.setItem("addedItems", stringMyAddedItems);
    total = addedItems
      .map((item) => item.price * item.amount)
      .reduce((prev, curr) => prev + curr, 0);
    totalItems = addedItems.reduce((a, b) => a + b.amount, 0);
  } else {
    addedItem.amount = 1;
    shop = state.shop.map(
      (obj) => [addedItem].find((item) => item._id === obj._id) || obj
    );
    addedItems = [...state.addedItems, addedItem];
    //make cart a string and store in local space
    stringMyAddedItems = JSON.stringify(addedItems);
    localStorage.setItem("addedItems", stringMyAddedItems);
    total = addedItems
      .map((item) => item.price * item.amount)
      .reduce((prev, curr) => prev + curr, 0);
    totalItems = addedItems.reduce((a, b) => a + b.amount, 0);
  }
  return {
    ...state,
    addedItems: addedItems,
    total: total,
    totalItems: totalItems,
    shop: shop,
  };
};

const removeItem = (state, action) => {
  let existed_item = state.addedItems.find((item) => action.id === item._id);
  let quantityToRemove = existed_item.amount;
  delete existed_item.amount;
  let addedItems = state.addedItems.filter((item) => action.id !== item._id);
  let newTotal = state.total - existed_item.price * quantityToRemove;
  let shop = state.shop.map(
    (obj) => [existed_item].find((item) => item._id === obj._id) || obj
  );
  //store in local storage
  let stringNewItems = JSON.stringify(addedItems);
  localStorage.setItem("addedItems", stringNewItems);
  return {
    ...state,
    addedItems: addedItems,
    total: newTotal,
    totalItems: state.totalItems - quantityToRemove,
    shop: shop,
  };
};

const addQuantity = (state, action) => {
  let addedItem = state.addedItems.find((item) => item.id === action.id);
  addedItem.quantity += 1;
  let newTotal = state.total + addedItem.price;
  let new_items = state.addedItems.map(
    (obj) => [addedItem].find((o) => o.id === obj.id) || obj
  );
  //store in local storage
  let stringNewItems = JSON.stringify(new_items);
  localStorage.setItem("addedItems", stringNewItems);
  return {
    ...state,
    addedItems: new_items,
    total: newTotal,
    totalItems: state.totalItems + 1,
  };
};
const subQuantity = (state, action) => {
  let existed_item = state.addedItems.find((item) => item._id === action.id);
  let stringMyAddedItems, total, shop, addedItems;
  //if the qt == 0 then it should be removed
  if (existed_item && existed_item.amount > 1) {
    existed_item.amount -= 1;
    addedItems = state.addedItems.map(
      (obj) => [existed_item].find((o) => o._id === obj.id) || obj
    );
    shop = state.shop.map(
      (obj) => [existed_item].find((item) => item._id === obj._id) || obj
    );
    total = state.total - existed_item.price;
    //store in local storage
    stringMyAddedItems = JSON.stringify(addedItems);
    localStorage.setItem("addedItems", stringMyAddedItems);
    return {
      ...state,
      addedItems: addedItems,
      total: total,
      totalItems: state.totalItems - 1,
      shop: shop,
    };
  }

  if (existed_item && existed_item.amount === 1) {
    existed_item.amount -= 1;
    addedItems = state.addedItems.filter((item) => item._id !== action.id);
    shop = state.shop.map(
      (obj) => [existed_item].find((item) => item._id === obj._id) || obj
    );
    total = state.total - existed_item.price;
    //store in local storage
    stringMyAddedItems = JSON.stringify(addedItems);
    localStorage.setItem("addedItems", stringMyAddedItems);
    return {
      ...state,
      addedItems: addedItems,
      total: total,
      totalItems: state.totalItems - 1,
      shop: shop,
    };
  } else {
    return {
      ...state,
    };
  }
};
const addShipping = (state) => {
  return {
    state,
    total: state.total + 6,
  };
};

const subShipping = (state) => {
  return {
    state,
    total: state.total - 6,
  };
};

const loadCart = (state) => {
  let stringLocalAddedItems = localStorage.getItem("addedItems");
  let addedItems = [];
  let items = state.items;
  let shop, totalItems, total;

  if (stringLocalAddedItems) {
    let localAddedItems = JSON.parse(stringLocalAddedItems);
    addedItems = localAddedItems;
  }

  if (items.length > 0 && state.orderby === "Lowest price") {
    if (addedItems.length > 0) {
      shop = items
        .map((obj) => addedItems.find((item) => item._id === obj._id) || obj)
        .sort(function (a, b) {
          return a.price - b.price;
        });
    } else {
      shop = items.sort(function (a, b) {
        return a.price - b.price;
      });
    }
    console.log("loadCart Lowest price = ", shop);
  }
  if (items.length > 0 && state.orderby === "Highest price") {
    if (addedItems.length > 0) {
      shop = items
        .map((obj) => addedItems.find((item) => item._id === obj._id) || obj)
        .sort(function (a, b) {
          return b.price - a.price;
        });
    } else {
      shop = items.sort(function (a, b) {
        return b.price - a.price;
      });
    }
    console.log("loadCart Highest price = ", shop);
  } else {
    shop = items;
    console.log("loadCart = ", shop);
  }

  totalItems = addedItems.reduce((a, b) => a + b.amount, 0);
  total = addedItems
    .map((item) => item.price * item.amount)
    .reduce((prev, curr) => prev + curr, 0);
  return {
    ...state,
    addedItems: addedItems,
    totalItems: totalItems,
    total: total,
    shop: shop,
    cartLoaded: true,
  };
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

const orderBy = (state, action) => {
  //let shop=state.shop.sort( function ( a, b ) { return b.price - a.price; } );
  console.log("orderby " + JSON.stringify(action.values.value));
  //console.log('orderby '+ action.values);

  //    console.log('orderBy')
  return updateObject(state, {
    orderby: action.values.value,
  });
};

const checkoutStart = (state) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};
const checkoutFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};
const checkoutSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    checkout: action.response,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Resize
    case actionTypes.RESIZE:
      return resize(state, action);

    // New item
    case actionTypes.NEW_ITEM_SUCCESS:
      return newItemSuccess(state, action);
    case actionTypes.NEW_ITEM_FAIL:
      return newItemFail(state, action);
    case actionTypes.NEW_ITEM_START:
      return newItemStart(state, action);

    case actionTypes.DELETE_ITEM_SUCCESS:
      return deleteItemSuccess(state, action);
    case actionTypes.DELETE_ITEM_FAIL:
      return deleteItemFail(state, action);
    case actionTypes.DELETE_ITEM_START:
      return deleteItemStart(state, action);

    case actionTypes.GET_ITEM_BY_ID_SUCCESS:
      return getItemByIdSuccess(state, action);
    case actionTypes.GET_ITEM_BY_ID_FAIL:
      return getItemByIdFail(state, action);
    case actionTypes.GET_ITEM_BY_ID_START:
      return getItemByIdStart(state, action);

    case actionTypes.GET_ITEM_BY_TYPE_SUCCESS:
      return getItemByTypeSuccess(state, action);
    case actionTypes.GET_ITEM_BY_TYPE_FAIL:
      return getItemByTypeFail(state, action);
    case actionTypes.GET_ITEM_BY_TYPE_START:
      return getItemByTypeStart(state, action);

    // products
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return getProductsSuccess(state, action);
    case actionTypes.GET_PRODUCTS_FAIL:
      return getProductsFail(state, action);
    case actionTypes.GET_PRODUCTS_START:
      return getProductsStart(state, action);

    // product
    case actionTypes.GET_PRODUCT_SUCCESS:
      return getProductSuccess(state, action);
    case actionTypes.GET_PRODUCT_FAIL:
      return getProductFail(state, action);
    case actionTypes.GET_PRODUCT_START:
      return getProductStart(state, action);

    // price
    case actionTypes.GET_PRICE_SUCCESS:
      return getPriceSuccess(state, action);
    case actionTypes.GET_PRICE_FAIL:
      return getPriceFail(state, action);
    case actionTypes.GET_PRICE_START:
      return getPriceStart(state, action);
    // prices

    case actionTypes.ADD_TO_CART:
      return addToCart(state, action);
    case actionTypes.REMOVE_ITEM:
      return removeItem(state, action);
    case actionTypes.ADD_QUANTITY:
      return addQuantity(state, action);
    case actionTypes.SUB_QUANTITY:
      return subQuantity(state, action);
    case actionTypes.ADD_SHIPPING:
      return addShipping(state, action);
    case actionTypes.SUB_SHIPPING:
      return subShipping(state, action);
    case actionTypes.LOAD_CART:
      return loadCart(state, action);
    case actionTypes.LOAD_SHOP:
      return loadShop(state, action);
    case actionTypes.ORDER_BY:
      return orderBy(state, action);
    case actionTypes.CHECKOUT_START:
      return checkoutStart(state, action);
    case actionTypes.CHECKOUT_FAIL:
      return checkoutFail(state, action);
    case actionTypes.CHECKOUT_SUCCESS:
      return checkoutSuccess(state, action);

    default:
      return state;
  }
};

export default reducer;
