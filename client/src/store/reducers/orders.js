import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utility/utility";

const initialState = {
  orders: [],
  loading: false,
};

const fetchOrdersStart = (state) => {
  return updateObject(state, {
    loading: true,
  });
};

const fetchOrdersFail = (state) => {
  return updateObject(state, {
    loading: false,
  });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.payload,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);

    default:
      return state;
  }
};

export default reducer;
