import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import productReducer from "./reducers/product";
import ordersReducer from "./reducers/orders";

export default configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serialzableCheck: false,
    }),
});
