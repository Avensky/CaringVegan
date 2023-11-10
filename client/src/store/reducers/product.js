import * as actionTypes from "../actions/actionTypes";
import {
  copyArray,
  updateObject,
  findItem,
  updateArray,
  getTotalPrice,
  getTotalItems,
  removeItem,
} from "../../utility/utility";

const initialState = {
  cart: [],
  products: [],
  product: {},
  width: null,
  prices: [],
  price: {},
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

// ============================================================================
// GET PRODUCTS ===============================================================
// ============================================================================

const getProductsStart = (state) => {
  return updateObject(state, {
    loading: true,
  });
};

const getProductsSuccess = (state, action) => {
  // console.log("reducer getProductsSuccess", action.products);
  // console.log("getProductsSuccess = " + JSON.stringify(action.products));
  return updateObject(state, {
    products: action.products,
    // prices: action.products,
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
  // console.log("getProductSuccess reducer", action.product);
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
    loading: true,
  });
};

const getPriceSuccess = (state, action) => {
  // const prices = [...state.prices, action.priceObj];
  // prices.push(action.priceObj);
  // console.log("reducer getPriceSuccess: ", action.mode);
  // console.log("reducer getPriceSuccess: ", action.priceObj);
  // console.log("reducer getPriceSuccess productid: ", action.productid);

  const prices = copyArray(state.prices); // avoid mutating state
  const products = copyArray(state.products); // avoid mutating state

  if (action.mode === "products") {
    // console.log("getPriceSuccess products", prices);
    const product = findItem(products, action.productid);
    product.price = action.priceObj;
    prices.push(product);
  }

  let price = copyArray(state.price);

  if (action.mode === "product") {
    // console.log("getPriceSuccess price", price);
    price = copyArray(state.product);
    price.price = action.priceObj;
  }

  return updateObject(state, {
    prices,
    price,
    loading: false,
  });
};

const getPriceFail = (state) => {
  return updateObject(state, {
    loading: false,
  });
};

// =============================================================================
// CART ========================================================================
// =============================================================================
const addToCart = (state, action) => {
  // console.log("add to cart ", action.product);

  // check if item already exists in cart
  console.log("addToCart start ", action.product);
  const cart = copyArray(state.cart);
  let cartItem = findItem(cart, action.product.id);

  if (cartItem) {
    cartItem.cartAmount += 1;
    updateArray(cart, cartItem);
  }

  if (!cartItem) {
    cartItem = { ...action.product };
    cartItem.cartAmount = 1;
    cart.push(cartItem);
  }

  console.log("cart ", cart);

  const totalItems = getTotalItems(cart);
  const total = getTotalPrice(cart);

  return updateObject(state, {
    cart,
    total: total,
    totalItems: totalItems,
    // shop: shop,
  });
};

const removeFromCart = (state, action) => {
  const cart = copyArray(state.cart);
  let updatedCart = removeItem(cart, action.id);

  // storeLocally('cart', updatedCart);
  const totalPrice = getTotalPrice(updatedCart);
  const totalItems = getTotalItems(updatedCart);

  return {
    ...state,
    cart: updatedCart,
    totalPrice: totalPrice,
    totalItems: totalItems,
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
  const cart = copyArray(state.cart);
  let cartItem = findItem(cart, action.id);
  let updatedCart;
  //if the qt == 0 then it should be removed
  if (cartItem && cartItem.cartAmount > 1) {
    cartItem.cartAmount -= 1;
    updatedCart = updateArray(cart, cartItem);
  } else {
    updatedCart = removeItem(cart, action.id);
  }
  // storeLocally('cart', updatedCart);
  const totalPrice = getTotalPrice(updatedCart);
  const totalItems = getTotalItems(updatedCart);

  return updateObject(state, {
    cart: updatedCart,
    totalPrice: totalPrice,
    totalItems: totalItems,
  });
};

// =============================================================================
// OTHER =======================================================================
// =============================================================================

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

// =============================================================================
// REDUCER =====================================================================
// =============================================================================

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Resize
    case actionTypes.RESIZE:
      return resize(state, action);

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
    case actionTypes.REMOVE_FROM_CART:
      return removeFromCart(state, action);
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
