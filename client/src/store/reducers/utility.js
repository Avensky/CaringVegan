import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utility/utility";

// =============================================================================
// GLOBAL STATE ================================================================
// =============================================================================
const initialState = {
  width: null,
  show: false,
  sidebar: "",
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
  console.log("show", show);
  console.log("sidebar", sidebar);
  return updateObject(state, { show: show, sidebar: sidebar });
}; // track screen width

// =============================================================================
// REDUCER =====================================================================
// =============================================================================
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESIZE:
      return resize(state, action);
    case actionTypes.SHOW_SIDEBAR:
      return showSidebar(state, action);
    default:
      return state;
  }
};

export default reducer;
