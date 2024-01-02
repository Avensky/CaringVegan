import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utility/utility";

// =============================================================================
// GLOBAL STATE ================================================================
// =============================================================================
const initialState = {
  width: null,
  show: false,
  sidebar: "",
  disableScroll: false,
  disableScrollUpdateProduct: false,
  showAddPriceSidebar: false,
  showUpdateProductSidebar: false,
};

// =============================================================================
// RESIZE ======================================================================
// =============================================================================
const resize = (state, action) => {
  return updateObject(state, { width: action.width });
}; // track screen width

// =============================================================================
// showAddProduct ======================================================================
// =============================================================================
const showSidebar = (state, action) => {
  const show = action.show;
  const sidebar = action.sidebar;
  return updateObject(state, {
    show: show,
    sidebar: sidebar,
    disableScroll: show,
  });
};

// =============================================================================
// showUpdateProduct ======================================================================
// =============================================================================
const showUpdateProductSidebar = (state, action) => {
  const show = action.show;
  return updateObject(state, {
    showUpdateProductSidebar: show,
    disableScroll: show,
  });
};

// =============================================================================
// showUpdateProduct ======================================================================
// =============================================================================
const showAddPriceSidebar = (state, action) => {
  const show = action.show;
  return updateObject(state, {
    showAddPriceSidebar: show,
    // disableScroll: show,
    disableScrollUpdateProduct: show,
  });
};

// =============================================================================
// REDUCER =====================================================================
// =============================================================================
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESIZE:
      return resize(state, action);
    case actionTypes.SHOW_SIDEBAR:
      return showSidebar(state, action);
    case actionTypes.SHOW_UPDATE_PRODUCT_SIDEBAR:
      return showUpdateProductSidebar(state, action);
    case actionTypes.SHOW_ADD_PRICE_SIDEBAR:
      return showAddPriceSidebar(state, action);
    default:
      return state;
  }
};

export default reducer;
