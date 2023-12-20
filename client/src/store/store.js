import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import productReducer from "./reducers/product";
import ordersReducer from "./reducers/orders";
import cartReducer from "./reducers/cart";
import stripeReducer from "./reducers/stripe";
import utilityReducer from "./reducers/utility";

export default configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    product: productReducer,
    orders: ordersReducer,
    stripe: stripeReducer,
    utility: utilityReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serialzableCheck: false,
    }),
});
