import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utility/utility";

// =============================================================================
// GLOBAL STATE ================================================================
// =============================================================================
const initialState = {
  width: null,
};

// =============================================================================
// RESIZE ======================================================================
// =============================================================================
const resize = (state, action) => {
  return updateObject(state, { width: action.width });
}; // track screen width

// =============================================================================
// REDUCER =====================================================================
// =============================================================================
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESIZE:
      return resize(state, action);
    default:
      return state;
  }
};

export default reducer;
