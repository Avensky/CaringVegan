import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utility/utility";

// =============================================================================
// GLOBAL STATE ================================================================
// =============================================================================
const initialState = {
  width: null,
  show: false,
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
const showAddProduct = (state, action) => {
  const show = action.show;
  return updateObject(state, { show });
}; // track screen width

// =============================================================================
// REDUCER =====================================================================
// =============================================================================
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESIZE:
      return resize(state, action);
    case actionTypes.SHOW_ADD_PRODUCT:
      return showAddProduct(state, action);
    default:
      return state;
  }
};

export default reducer;
