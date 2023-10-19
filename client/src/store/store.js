import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import shopReducer from "./reducers/shop";
import ordersReducer from "./reducers/orders";

export default configureStore({
  reducer: {
    auth: authReducer,
    shop: shopReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serialzableCheck: false,
    }),
});
