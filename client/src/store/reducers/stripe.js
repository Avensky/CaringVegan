import * as actionTypes from "../actions/actionTypes";
import {
  copyArray,
  updateObject,
  findItem,
  updateArray,
} from "../../utility/utility";

const initialState = {
  products: [],
  product: {},
  results: 0,
  total_count: 0,
  loading: false,
  error: null,
  index: 1,
  featured: [],
  featured_loading: false,
  featured_total_count: 0,
  isActive: undefined,
};

const setStripeActive = (state, action) => {
  return updateObject(state, { isActive: action.isActive });
};

// ============================================================================
// GET FEATURED ===============================================================
// ============================================================================
const getShopStart = (state) => {
  return updateObject(state, { loading: true });
};

const getShopFail = (state) => {
  return updateObject(state, { shop_loading: false });
};

const getShopSuccess = (state, action) => {
  const shop = action.shop;
  console.log("getShopSuccess: ", shop);
  // console.log("getShopSuccess: ", shop.data);
  return updateObject(state, {
    shop: shop.data,
    shop_loading: false,
    shop_has_more: action.shop.has_more,
    shop_next_page: action.shop.next_page,
    shop_total_count: action.shop.total_count,
  });
};

// ============================================================================
// MIGRATE ALL STRIPE PRODUCTS ================================================
// ============================================================================

const migrateAllStripeProductsStart = (state) =>
  updateObject(state, { loading: true });

const migrateAllStripeProductsSuccess = (state, action) => {
  console.log("migrateStripeProductSuccess reducer", action.data.products);
  return updateObject(state, {
    products: action.products,
    loading: false,
    // total_count: state.total_count - 1,
    // results: state.results - 1,
  });
};

const migrateAllStripeProductsFail = (state) =>
  updateObject(state, { loading: false });

// ============================================================================
// UPDATE STRIPE PRODUCT ======================================================
// ============================================================================

const updateStripeProductStart = (state) =>
  updateObject(state, { loading: true });

const updateStripeProductSuccess = (state, action) => {
  const array = copyArray(state.products);
  const product = action.data.product;
  const products = updateArray(array, product);
  console.log("updateStripeProductSuccess reducer", product);
  return updateObject(state, {
    products: products,
    product: product,
    loading: false,
    // total_count: state.total_count - 1,
    // results: state.results - 1,
  });
};

const updateStripeProductFail = (state) =>
  updateObject(state, { loading: false });

// ============================================================================
// MIGRATE STRIPE PRODUCTS ====================================================
// ============================================================================

const migrateStripeProductStart = (state) =>
  updateObject(state, { loading: true });

const migrateStripeProductSuccess = (state, action) => {
  const array = copyArray(state.products);
  const product = action.data.product;
  const products = updateArray(array, product);
  console.log("migrateStripeProductSuccess reducer", product);
  return updateObject(state, {
    products: products,
    product: product,
    loading: false,
    // total_count: state.total_count - 1,
    // results: state.results - 1,
  });
};

const migrateStripeProductFail = (state) =>
  updateObject(state, { loading: false });

// ============================================================================
// GET PRODUCTS ===============================================================
// ============================================================================

const getProductsStart = (state) => {
  return updateObject(state, {
    featured_loading: true,
  });
};

const getProductsSuccess = (state, action) => {
  console.log("getProductSuccess", action.data);
  return updateObject(state, {
    starting_after: action.data.starting_after,
    ending_before: action.data.ending_before,
    total_count: action.data.products.total_count,
    has_more: action.data.products.has_more,
    products: action.data.products.data,
    results: action.data.results,
    index: action.data.index,
    loading: false,
  });
};

const getProductsFail = (state) => {
  return updateObject(state, {
    loading: false,
  });
};
// ============================================================================
// GET PRODUCT ================================================================
// ============================================================================

const getProductStart = (state) => updateObject(state, { loading: true });

const getProductSuccess = (state, action) => {
  // console.log("getProductSuccess reducer", action.product);
  // console.log("getProductsSuccess = " + JSON.stringify(action.products));
  return updateObject(state, {
    product: action.product,
    loading: false,
  });
};

const getProductFail = (state) => updateObject(state, { loading: false });

// ============================================================================
// GET PRODUCT ================================================================
// ============================================================================

const archiveStripeProductStart = (state) =>
  updateObject(state, { loading: true });

const archiveStripeProductSuccess = (state, action) => {
  console.log("archiveStripeProductSuccess reducer", action.data);
  // console.log("archiveStripeProductSuccess = " + JSON.stringify(action.products));
  const array = copyArray(state.products);
  const product = action.data.product;
  const products = updateArray(array, product);
  return updateObject(state, {
    products: products,
    product: product,
    loading: false,
  });
};

const archiveStripeProductFail = (state) =>
  updateObject(state, { loading: false });

// ============================================================================
// GET PRODUCT ================================================================
// ============================================================================

const unarchiveStripeProductStart = (state) =>
  updateObject(state, { loading: true });

const unarchiveStripeProductSuccess = (state, action) => {
  console.log(
    "unarchiveStripeProductSuccess reducer",
    JSON.stringify(action.data)
  );
  // console.log("archiveStripeProductSuccess = " + (action.products));
  const array = copyArray(state.products);
  const product = action.data.product;
  console.log("unarchiveStripeProductSuccess product", product);
  // console.log("unarchiveStripeProductSuccess reducer", action.id);
  const products = updateArray(array, product);
  return updateObject(state, {
    products: products,
    product: product,
    loading: false,
  });
};

const unarchiveStripeProductFail = (state) =>
  updateObject(state, { loading: false });
// ============================================================================
// GET PRICE ==================================================================
// ============================================================================

const getPriceStart = (state) => updateObject(state, { loading: true });

const getPriceSuccess = (state, action) => {
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

  return updateObject(state, { prices, price, loading: false });
};

const getPriceFail = (state) => updateObject(state, { loading: false });

// =============================================================================
// OTHER =======================================================================
// =============================================================================

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
    case actionTypes.SET_STRIPE_ACTIVE:
      return setStripeActive(state, action);

    // shop
    case actionTypes.GET_SHOP_SUCCESS:
      return getShopSuccess(state, action);
    case actionTypes.GET_SHOP_START:
      return getShopStart(state, action);
    case actionTypes.GET_SHOP_FAIL:
      return getShopFail(state, action);

    // update
    case actionTypes.UPDATE_STRIPE_PRODUCT_SUCCESS:
      return updateStripeProductSuccess(state, action);
    case actionTypes.UPDATE_STRIPE_PRODUCT_FAIL:
      return updateStripeProductFail(state, action);
    case actionTypes.UPDATE_STRIPE_PRODUCT_START:
      return updateStripeProductStart(state, action);

    // migrate
    case actionTypes.MIGRATE_ALL_STRIPE_PRODUCTS_SUCCESS:
      return migrateAllStripeProductsSuccess(state, action);
    case actionTypes.MIGRATE_ALL_STRIPE_PRODUCTS_FAIL:
      return migrateAllStripeProductsFail(state, action);
    case actionTypes.MIGRATE_ALL_STRIPE_PRODUCTS_START:
      return migrateAllStripeProductsStart(state, action);

    // migrate
    case actionTypes.MIGRATE_STRIPE_PRODUCT_SUCCESS:
      return migrateStripeProductSuccess(state, action);
    case actionTypes.MIGRATE_STRIPE_PRODUCT_FAIL:
      return migrateStripeProductFail(state, action);
    case actionTypes.MIGRATE_STRIPE_PRODUCT_START:
      return migrateStripeProductStart(state, action);

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

    // archive
    case actionTypes.ARCHIVE_STRIPE_PRODUCT_SUCCESS:
      return archiveStripeProductSuccess(state, action);
    case actionTypes.ARCHIVE_STRIPE_PRODUCT_FAIL:
      return archiveStripeProductFail(state, action);
    case actionTypes.ARCHIVE_STRIPE_PRODUCT_START:
      return archiveStripeProductStart(state, action);

    // archive
    case actionTypes.UNARCHIVE_STRIPE_PRODUCT_SUCCESS:
      return unarchiveStripeProductSuccess(state, action);
    case actionTypes.UNARCHIVE_STRIPE_PRODUCT_FAIL:
      return unarchiveStripeProductFail(state, action);
    case actionTypes.UNARCHIVE_STRIPE_PRODUCT_START:
      return unarchiveStripeProductStart(state, action);

    // price
    case actionTypes.GET_PRICE_SUCCESS:
      return getPriceSuccess(state, action);
    case actionTypes.GET_PRICE_FAIL:
      return getPriceFail(state, action);
    case actionTypes.GET_PRICE_START:
      return getPriceStart(state, action);
    // prices
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
