import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import productReducer from "./reducers/product";
import ordersReducer from "./reducers/orders";
import stripeReducer from "./reducers/stripe";

export default configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    orders: ordersReducer,
    stripe: stripeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serialzableCheck: false,
    }),
});
