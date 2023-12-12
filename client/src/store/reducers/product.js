import * as actionTypes from "../actions/actionTypes";
import {
  copyArray,
  // copyArray,
  // copyArray,
  updateObject,
  // addItem,
  // findItem,
  // updateArray,
  // getTotalPrice,
  // getTotalItems,
  removeItem,
  updateArray,
  // storeLocally,
  // getLocalStorage,
} from "../../utility/utility";

const initialState = {
  cart: [],
  products: [],
  product: {},
  results: 0,
  total_count: 0,
  width: null,
  prices: [],
  price: {},
  loading: false,
  total: 0.0,
  totalItems: 0,
  error: null,
  index: 1,
  page: 1,
  featured: [],
  featured_loading: false,
  featured_total_count: 0,
  shop: [],
  shop_loading: false,
  shop_total_count: 0,
  isActive: false,
  message: "",
};

// ============================================================================
// GET ALL PRODUCTS ===========================================================
// ============================================================================

const getInternalProductsStart = (state) => {
  return updateObject(state, {
    featured_loading: true,
  });
};

const getInternalProductsSuccess = (state, action) => {
  console.log("getInternalProductsSuccess", action.data);
  const products = action.data.data.data;
  // products.slice();
  // const products = action.data.data.slice();
  // console.log("getInternalProductsSuccess", products);
  return updateObject(state, {
    // starting_after: action.data.starting_after,
    // ending_before: action.data.ending_before,
    // has_more: action.data.products.has_more,
    products,
    loading: false,
    total_count: action.data.total_count,
    index: action.data.data.index,
    page: action.data.data.page,
    next_page: action.data.data.next_page,
    results: action.data.results,
  });
};

const getInternalProductsFail = (state) => {
  return updateObject(state, {
    loading: false,
  });
};
// ============================================================================
// GET A PRODUCT ==============================================================
// ============================================================================

const getInternalProductStart = (state) =>
  updateObject(state, { loading: true, has_more: false });

const getInternalProductSuccess = (state, action) => {
  console.log("getProductSuccess reducer", action.product);
  // console.log("getProductsSuccess = " + JSON.stringify(action.products));
  return updateObject(state, {
    product: action.product,
    loading: false,
  });
};

const getInternalProductFail = (state) =>
  updateObject(state, { loading: false });

// ============================================================================
// MIGRATE STRIPE PRODUCT =====================================================
// ============================================================================

const migrateStripeProductStart = (state) =>
  updateObject(state, { loading: true });

const migrateStripeProductSuccess = (state, action) => {
  const array = copyArray(state.products);
  const products = array.splice(1, 0, action.data);
  console.log("migrateStripeProductSuccess reducer", products);
  console.log();
  return updateObject(state, {
    products: products,
    loading: false,
    // total_count: state.total_count - 1,
    // results: state.results - 1,
  });
};

const migrateStripeProductFail = (state) =>
  updateObject(state, { loading: false });

// ============================================================================
// MIGRATE ALL STRIPE PRODUCTS ================================================
// ============================================================================

const migrateAllProductsStart = (state) =>
  updateObject(state, { loading: true });

const migrateAllProductsSuccess = (state, action) => {
  console.log("migrateProductSuccess reducer", action.products);
  console.log();
  return updateObject(state, {
    products: action.products,
    loading: false,
    // total_count: state.total_count - 1,
    // results: state.results - 1,
  });
};

const migrateAllProductsFail = (state) =>
  updateObject(state, { loading: false });

// ============================================================================
// ARCHIVE A PRODUCT ==========================================================
// ============================================================================

const archiveInternalProductStart = (state) =>
  updateObject(state, { loading: true });

const archiveInternalProductSuccess = (state, action) => {
  // console.log("deleteInternalProductSuccess reducer", action.data);
  console.log("archiveInternalProductSuccess reducer", action.id);
  // console.log("deleteInternalProductSuccess reducer", action.id);
  // console.log("getProductsSuccess = " + JSON.stringify(action.products));
  const array = copyArray(state.products);
  const product = action.data.product;
  const products = updateArray(array, product);
  // console.log("archiveInternalProductSuccess reducer", products);
  // console.log();
  return updateObject(state, {
    products: products,
    product: product,
    loading: false,
    message: action.data.message,
    // total_count: state.total_count - 1,
    // results: state.results - 1,
  });
};

const archiveInternalProductFail = (state) =>
  updateObject(state, { loading: false });

// ============================================================================
// ARCHIVE A PRODUCT ==========================================================
// ============================================================================

const unarchiveInternalProductStart = (state) =>
  updateObject(state, { loading: true });

const unarchiveInternalProductSuccess = (state, action) => {
  console.log("deleteInternalProductSuccess reducer", action.data.product);
  console.log("unarchiveInternalProductSuccess reducer", action.id);
  // console.log("deleteInternalProductSuccess reducer", action.id);
  // console.log("getProductsSuccess = " + JSON.stringify(action.products));
  const array = copyArray(state.products);
  const product = action.data.product;
  const products = updateArray(array, product);
  console.log("unarchiveInternalProductSuccess reducer", products);
  // console.log();
  return updateObject(state, {
    products: products,
    product: product,
    loading: false,
    message: action.data.message,
    // total_count: state.total_count - 1,
    // results: state.results - 1,
  });
};

const unarchiveInternalProductFail = (state) =>
  updateObject(state, { loading: false });
// ============================================================================
// DELETE A PRODUCT ===========================================================
// ============================================================================

const deleteInternalProductStart = (state) =>
  updateObject(state, { loading: true });

const deleteInternalProductSuccess = (state, action) => {
  // console.log("deleteInternalProductSuccess reducer", action.data);
  console.log("deleteInternalProductSuccess reducer", action.id);
  // console.log("deleteInternalProductSuccess reducer", action.id);
  // console.log("getProductsSuccess = " + JSON.stringify(action.products));
  const array = copyArray(state.products);
  const products = removeItem(array, action.id);
  console.log("deleteInternalProductSuccess reducer", products);
  console.log();
  return updateObject(state, {
    products: products,
    loading: false,
    // total_count: state.total_count - 1,
    // results: state.results - 1,
  });
};

const deleteInternalProductFail = (state) =>
  updateObject(state, { loading: false });

// // ============================================================================
// // GET FEATURED ===============================================================
// // ============================================================================
// const getFeaturedStart = (state) => {
//   return updateObject(state, { loading: true });
// };

// const getFeaturedFail = (state) => {
//   return updateObject(state, { featured_loading: false });
// };

// const getFeaturedSuccess = (state, action) => {
//   const featured = action.featured;
//   console.log("featuredsuccess: ", featured);
//   console.log("featuredsuccess: ", featured.data);
//   return updateObject(state, {
//     featured: featured.data,
//     featured_loading: false,
//     featured_has_more: action.featured.has_more,
//     featured_next_page: action.featured.next_page,
//     featured_total_count: action.featured.total_count,
//   });
// };
// // ============================================================================
// // GET FEATURED ===============================================================
// // ============================================================================
// const getShopStart = (state) => {
//   return updateObject(state, { loading: true });
// };

// const getShopFail = (state) => {
//   return updateObject(state, { shop_loading: false });
// };

// const getShopSuccess = (state, action) => {
//   const shop = action.shop;
//   console.log("getShopSuccess: ", shop);
//   // console.log("getShopSuccess: ", shop.data);
//   return updateObject(state, {
//     shop: shop.data,
//     shop_loading: false,
//     shop_has_more: action.shop.has_more,
//     shop_next_page: action.shop.next_page,
//     shop_total_count: action.shop.total_count,
//   });}
// ============================================================================
// GET PRICE ==================================================================
// ============================================================================

// const getPriceStart = (state) => updateObject(state, { loading: true });

// const getPriceSuccess = (state, action) => {
//   const prices = copyArray(state.prices); // avoid mutating state
//   const products = copyArray(state.products); // avoid mutating state

//   if (action.mode === "products") {
//     // console.log("getPriceSuccess products", prices);
//     const product = findItem(products, action.productid);
//     product.price = action.priceObj;
//     prices.push(product);
//   }

//   let price = copyArray(state.price);

//   if (action.mode === "product") {
//     // console.log("getPriceSuccess price", price);
//     price = copyArray(state.product);
//     price.price = action.priceObj;
//   }

//   return updateObject(state, { prices, price, loading: false });
// };

// const getPriceFail = (state) => updateObject(state, { loading: false });

// =============================================================================
// CART ========================================================================
// =============================================================================
const setIsActive = (state, action) => {
  return updateObject(state, { isActive: action.isActive });
};
// =============================================================================
// CART ========================================================================
// =============================================================================

// const addToCart = (state, action) => {
//   // check if item already exists in cart
//   console.log("addToCart start ", action.product);
//   let cart = copyArray(state.cart);
//   let cartItem = findItem(cart, action.product.id);

//   if (cartItem) {
//     cartItem.cartAmount += 1;
//     cart = updateArray(cart, cartItem);
//   }

//   if (!cartItem) {
//     cartItem = { ...action.product };
//     cartItem.cartAmount = 1;
//     cart.push(cartItem);
//   }

//   storeLocally("cart", cart);
//   const totalItems = getTotalItems(cart);
//   const total = getTotalPrice(cart);

//   return updateObject(state, { cart, total, totalItems });
// };

// const subQuantity = (state, action) => {
//   let cart = copyArray(state.cart);
//   let cartItem = findItem(cart, action.id);

//   //if the qt == 0 then it should be removed
//   if (cartItem && cartItem.cartAmount > 1) {
//     cartItem.cartAmount -= 1;
//     cart = updateArray(cart, cartItem);
//   } else {
//     cart = removeItem(cart, action.id);
//   }

//   storeLocally("cart", cart);
//   const total = getTotalPrice(cart);
//   const totalItems = getTotalItems(cart);

//   return updateObject(state, { cart, total, totalItems });
// };

// const removeFromCart = (state, action) => {
//   let cart = copyArray(state.cart);
//   cart = removeItem(cart, action.id);

//   storeLocally("cart", cart);
//   const total = getTotalPrice(cart);
//   const totalItems = getTotalItems(cart);

//   return updateObject(state, { cart, total, totalItems });
// };

// // =============================================================================
// // OTHER =======================================================================
// // =============================================================================

// const addShipping = (state) => {
//   return { state, total: state.total + 6 };
// };

// const subShipping = (state) => {
//   return { state, total: state.total - 6 };
// };

// // =============================================================================
// // OTHER =======================================================================
// // =============================================================================

// const loadCart = (state, action) => {
//   console.log("loadCart action", action);
//   let cart = localStorage.getItem("cart") || [];
//   console.log("localstorage cart", cart);
//   let totalItems, total;
//   if (cart.length > 0) {
//     cart = JSON.parse(cart);
//     totalItems = getTotalItems(cart);
//     total = getTotalPrice(cart);
//   }

//   return updateObject(state, { cart, totalItems, total });
// };

// const loadShop = (state, action) => {
//   let items = state.items;
//   let shop = state.shop;
//   let addedItems = state.addedItems;
//   let orderby = action.values;
//   console.log("loadShop orderby= " + JSON.stringify(orderby));
//   //let orderby = state.orderby
//   console.log("loadShop state orderby= " + JSON.stringify(state.orderby));
//   if (!orderby && state.orderby) {
//     orderby = state.orderby;
//   }
//   if (orderby) {
//     if (orderby.value === "Lowest price") {
//       console.log("LoadShop lowest price");
//       if (addedItems.length > 0) {
//         console.log("addedItems.length>0" + JSON.stringify(items));
//         shop = items
//           .map((obj) => addedItems.find((item) => item._id === obj._id) || obj)
//           .sort(function (a, b) {
//             return a.price - b.price;
//           });
//       } else {
//         console.log("else" + items);
//         shop = items
//           .map((item) => item)
//           .sort(function (a, b) {
//             return a.price - b.price;
//           });
//       }
//     }
//     if (orderby.value === "Highest price") {
//       console.log("LoadShop Highest price");
//       if (addedItems.length > 0) {
//         console.log("addedItems.length>0" + items);
//         shop = items
//           .map((obj) => addedItems.find((item) => item._id === obj._id) || obj)
//           .sort(function (a, b) {
//             return b.price - a.price;
//           });
//       } else {
//         console.log("else" + items);
//         shop = items
//           .map((item) => item)
//           .sort(function (a, b) {
//             return b.price - a.price;
//           });
//       }
//     }
//     if (orderby.value === "Most recent") {
//       console.log("date loadShop");
//       if (addedItems.length > 0) {
//         shop = items
//           .map((obj) => addedItems.find((item) => item._id === obj._id) || obj)
//           .sort(function (a, b) {
//             return b.date - a.date;
//           });
//       } else {
//         shop = items.sort(function (a, b) {
//           return b.date - a.date;
//         });
//       }
//     }
//     if (orderby.value === "Most Popular") {
//       console.log("sold loadShop");
//       if (addedItems.length > 0) {
//         shop = items
//           .map((obj) => addedItems.find((item) => item._id === obj._id) || obj)
//           .sort(function (a, b) {
//             return b.sold - a.sold;
//           });
//       } else {
//         shop = items.sort(function (a, b) {
//           return b.sold - a.sold;
//         });
//       }
//     }
//   } else {
//     shop = items.map(
//       (obj) => addedItems.find((item) => item._id === obj._id) || obj
//     );
//     console.log("loadShop = ", shop);
//   }
//   return updateObject(state, {
//     orderby: orderby,
//     shop: shop,
//     shopLoaded: true,
//   });
// };

// const orderBy = (state, action) => {
//   //let shop=state.shop.sort( function ( a, b ) { return b.price - a.price; } );
//   // console.log("orderby " + JSON.stringify(action.values.value));
//   //console.log('orderby '+ action.values);

//   //    console.log('orderBy')
//   return updateObject(state, {
//     orderby: action.values.value,
//   });
// };

// // =============================================================================
// // OTHER =======================================================================
// // =============================================================================

// const checkoutStart = (state) => {
//   return updateObject(state, {
//     error: null,
//     loading: true,
//   });
// };
// const checkoutFail = (state, action) => {
//   return updateObject(state, {
//     loading: false,
//     error: action.error,
//   });
// };
// const checkoutSuccess = (state, action) => {
//   return updateObject(state, {
//     loading: false,
//     checkout: action.response,
//   });
// };

// =============================================================================
// REDUCER =====================================================================
// =============================================================================

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // products
    case actionTypes.GET_INTERNAL_PRODUCTS_SUCCESS:
      return getInternalProductsSuccess(state, action);
    case actionTypes.GET_INTERNAL_PRODUCTS_FAIL:
      return getInternalProductsFail(state, action);
    case actionTypes.GET_INTERNAL_PRODUCTS_START:
      return getInternalProductsStart(state, action);

    // product
    case actionTypes.GET_INTERNAL_PRODUCT_SUCCESS:
      return getInternalProductSuccess(state, action);
    case actionTypes.GET_INTERNAL_PRODUCT_FAIL:
      return getInternalProductFail(state, action);
    case actionTypes.GET_INTERNAL_PRODUCT_START:
      return getInternalProductStart(state, action);

    // product archive
    case actionTypes.ARCHIVE_INTERNAL_PRODUCT_SUCCESS:
      return archiveInternalProductSuccess(state, action);
    case actionTypes.ARCHIVE_INTERNAL_PRODUCT_FAIL:
      return archiveInternalProductFail(state, action);
    case actionTypes.ARCHIVE_INTERNAL_PRODUCT_START:
      return archiveInternalProductStart(state, action);

    // product unarchive
    case actionTypes.UNARCHIVE_INTERNAL_PRODUCT_SUCCESS:
      return unarchiveInternalProductSuccess(state, action);
    case actionTypes.UNARCHIVE_INTERNAL_PRODUCT_FAIL:
      return unarchiveInternalProductFail(state, action);
    case actionTypes.UNARCHIVE_INTERNAL_PRODUCT_START:
      return unarchiveInternalProductStart(state, action);

    // product delete
    case actionTypes.DELETE_INTERNAL_PRODUCT_SUCCESS:
      return deleteInternalProductSuccess(state, action);
    case actionTypes.DELETE_INTERNAL_PRODUCT_FAIL:
      return deleteInternalProductFail(state, action);
    case actionTypes.DELETE_INTERNAL_PRODUCT_START:
      return deleteInternalProductStart(state, action);

    // migrate
    case actionTypes.MIGRATE_STRIPE_PRODUCT_SUCCESS:
      return migrateStripeProductSuccess(state, action);
    case actionTypes.MIGRATE_STRIPE_PRODUCT_FAIL:
      return migrateStripeProductFail(state, action);
    case actionTypes.MIGRATE_STRIPE_PRODUCT_START:
      return migrateStripeProductStart(state, action);

    // migrate all
    case actionTypes.MIGRATE_ALL_PRODUCTS_SUCCESS:
      return migrateAllProductsSuccess(state, action);
    case actionTypes.MIGRATE_ALL_PRODUCTS_FAIL:
      return migrateAllProductsFail(state, action);
    case actionTypes.MIGRATE_ALL_PRODUCTS_START:
      return migrateAllProductsStart(state, action);

    // misc
    case actionTypes.SET_IS_ACTIVE:
      return setIsActive(state, action);

    // // Featured
    // case actionTypes.GET_FEATURED_SUCCESS:
    //   return getFeaturedSuccess(state, action);
    // case actionTypes.GET_FEATURED_START:
    //   return getFeaturedStart(state, action);
    // case actionTypes.GET_FEATURED_FAIL:
    //   return getFeaturedFail(state, action);

    // // Featured
    // case actionTypes.GET_SHOP_SUCCESS:
    //   return getShopSuccess(state, action);
    // case actionTypes.GET_SHOP_START:
    //   return getShopStart(state, action);
    // case actionTypes.GET_SHOP_FAIL:
    //   return getShopFail(state, action);

    // // price
    // case actionTypes.GET_PRICE_SUCCESS:
    //   return getPriceSuccess(state, action);
    // case actionTypes.GET_PRICE_FAIL:
    //   return getPriceFail(state, action);
    // case actionTypes.GET_PRICE_START:
    //   return getPriceStart(state, action);
    // // prices

    // case actionTypes.ADD_TO_CART:
    //   return addToCart(state, action);
    // case actionTypes.REMOVE_FROM_CART:
    //   return removeFromCart(state, action);
    // case actionTypes.SUB_QUANTITY:
    //   return subQuantity(state, action);

    // case actionTypes.ADD_SHIPPING:
    //   return addShipping(state, action);
    // case actionTypes.SUB_SHIPPING:
    //   return subShipping(state, action);
    // case actionTypes.LOAD_CART:
    //   return loadCart(state, action);
    // case actionTypes.LOAD_SHOP:
    //   return loadShop(state, action);
    // case actionTypes.ORDER_BY:
    //   return orderBy(state, action);
    // case actionTypes.CHECKOUT_START:
    //   return checkoutStart(state, action);
    // case actionTypes.CHECKOUT_FAIL:
    //   return checkoutFail(state, action);
    // case actionTypes.CHECKOUT_SUCCESS:
    //   return checkoutSuccess(state, action);

    default:
      return state;
  }
};

export default reducer;
