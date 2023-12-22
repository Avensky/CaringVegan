import * as actionTypes from "../actions/actionTypes";
import {
  copyArray,
  updateObject,
  removeInternalItem,
  updateInternalArray,
} from "../../utility/utility";

const initialState = {
  products: [],
  product: {},
  results: 0,
  total_count: 0,
  loading: false,
  total: 0.0,
  totalItems: 0,
  error: null,
  page: 1,
  featured: [],
  featured_loading: false,
  featured_total_count: 0,
  isActive: undefined,
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
  // const data = action.data.data;
  // console.log("getInternalProductsSuccess", data);
  const products = action.data.data.data;
  // console.log("getInternalProductsSuccess", products);
  // products.slice();
  // const products = action.data.data.slice();
  // console.log("getInternalProductsSuccess", products);
  return updateObject(state, {
    starting_after: action.data.starting_after,
    ending_before: action.data.ending_before,
    has_more: action.data.data.has_more,
    products: products,
    loading: false,
    total_count: action.data.total_count,
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
  // console.log("getProductSuccess reducer", action.product);
  // console.log("getProductsSuccess = " + JSON.stringify(action.products));
  return updateObject(state, {
    product: action.product,
    loading: false,
  });
};

const getInternalProductFail = (state) =>
  updateObject(state, { loading: false });

// ============================================================================
// ADD A PRODUCT ==============================================================
// ============================================================================

const addInternalProductStart = (state) =>
  updateObject(state, { loading: true });

const addInternalProductSuccess = (state, action) => {
  const newProduct = action.data.data;
  console.log("addProductSuccess reducer", newProduct);
  // console.log("getProductsSuccess = " + JSON.stringify(action.products));
  const products = copyArray(state.products);
  // const products = updateInternalArray(array, newProduct);

  // let page = action.data.data.page;
  // console.log("page", page);
  let results = state.results;

  if (state.results < 5) {
    products.push(newProduct);
    results = results + 1;
  }

  console.log("products", products);
  return updateObject(state, {
    // page: page,
    results: results,
    products: products,
    loading: false,
    total_count: state.total_count + 1,
  });
};

const addInternalProductFail = (state) =>
  updateObject(state, { loading: false });
// ============================================================================
// UPDATE PRODUCT =============================================================
// ============================================================================

const updateInternalProductStart = (state) =>
  updateObject(state, { loading: true });

const updateInternalProductSuccess = (state, action) => {
  const product = action.data.data;
  console.log("updateProductSuccess reducer", product);
  // console.log("getProductsSuccess = " + JSON.stringify(action.products));
  const products = copyArray(state.products);
  updateInternalArray(products, product);

  // let page = action.data.data.page;
  // console.log("page", page);

  console.log("products", products);
  return updateObject(state, {
    products: products,
    product: product,
    loading: false,
  });
};

const updateInternalProductFail = (state) =>
  updateObject(state, { loading: false });

// ============================================================================
// MIGRATE STRIPE PRODUCT =====================================================
// ============================================================================

const migrateProductStart = (state) => updateObject(state, { loading: true });

const migrateProductSuccess = (state, action) => {
  const array = copyArray(state.products);
  console.log("migrateProductSuccess array", array);
  const product = action.data.product;
  console.log("migrateProductSuccess product", product);
  const products = updateInternalArray(array, product);
  console.log("migrateProductSuccess reducer products", products);
  return updateObject(state, {
    products: products,
    product: product,
    loading: false,
    // total_count: state.total_count - 1,
    // results: state.results - 1,
  });
};

const migrateProductFail = (state) => updateObject(state, { loading: false });

// ============================================================================
// MIGRATE ALL STRIPE PRODUCTS ================================================
// ============================================================================

const migrateAllProductsStart = (state) =>
  updateObject(state, { loading: true });

const migrateAllProductsSuccess = (state, action) => {
  console.log("migrateAllProductsSuccess reducer", action.data);
  console.log();
  return updateObject(state, {
    products: action.data.products,
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
  const product = action.data.product;
  console.log("archiveInternalProductSuccess reducer", action.data.product);
  // console.log("deleteInternalProductSuccess reducer", action.id);
  // console.log("getProductsSuccess = " + JSON.stringify(action.products));
  const array = copyArray(state.products);
  const products = updateInternalArray(array, product);
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
// UNARCHIVE A PRODUCT ========================================================
// ============================================================================

const unarchiveInternalProductStart = (state) =>
  updateObject(state, { loading: true });

const unarchiveInternalProductSuccess = (state, action) => {
  const product = action.data.product;
  console.log("unarchiveInternalProductSuccess reducer", product);
  // console.log("unarchiveInternalProductSuccess reducer", action.id);
  // console.log("deleteInternalProductSuccess reducer", action.id);
  // console.log("getProductsSuccess = " + JSON.stringify(action.products));
  const array = copyArray(state.products);
  const products = updateInternalArray(array, product);
  // console.log("unarchiveInternalProductSuccess reducer", products);
  // console.log();
  return updateObject(state, {
    products: products,
    product: product,
    loading: false,
    message: action.data.message,
    total_count: state.total_count,
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
  const products = removeInternalItem(array, action.id);
  console.log("deleteInternalProductSuccess reducer", products);
  console.log();
  return updateObject(state, {
    products: products,
    product: {},
    loading: false,
    total_count: state.total_count - 1,
    // results: state.results - 1,
  });
};

const deleteInternalProductFail = (state) =>
  updateObject(state, { loading: false });

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

// ============================================================================
// GET FEATURED ===============================================================
// ============================================================================
const getFeaturedStart = (state) => {
  return updateObject(state, { loading: true });
};

const getFeaturedFail = (state) => {
  return updateObject(state, { featured_loading: false });
};

const getFeaturedSuccess = (state, action) => {
  const featured = action.featured;
  console.log("featuredsuccess: ", featured);
  console.log("featuredsuccess: ", featured.data);
  return updateObject(state, {
    featured: featured.data,
    featured_loading: false,
    featured_has_more: action.featured.has_more,
    featured_next_page: action.featured.next_page,
    featured_total_count: action.featured.total_count,
  });
};
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

    // product
    case actionTypes.ADD_INTERNAL_PRODUCT_SUCCESS:
      return addInternalProductSuccess(state, action);
    case actionTypes.ADD_INTERNAL_PRODUCT_FAIL:
      return addInternalProductFail(state, action);
    case actionTypes.ADD_INTERNAL_PRODUCT_START:
      return addInternalProductStart(state, action);
    // product update
    case actionTypes.UPDATE_INTERNAL_PRODUCT_SUCCESS:
      return updateInternalProductSuccess(state, action);
    case actionTypes.UPDATE_INTERNAL_PRODUCT_FAIL:
      return updateInternalProductFail(state, action);
    case actionTypes.UPDATE_INTERNAL_PRODUCT_START:
      return updateInternalProductStart(state, action);

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
    case actionTypes.MIGRATE_PRODUCT_SUCCESS:
      return migrateProductSuccess(state, action);
    case actionTypes.MIGRATE_PRODUCT_FAIL:
      return migrateProductFail(state, action);
    case actionTypes.MIGRATE_PRODUCT_START:
      return migrateProductStart(state, action);

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

    // Featured
    case actionTypes.GET_FEATURED_SUCCESS:
      return getFeaturedSuccess(state, action);
    case actionTypes.GET_FEATURED_START:
      return getFeaturedStart(state, action);
    case actionTypes.GET_FEATURED_FAIL:
      return getFeaturedFail(state, action);
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
