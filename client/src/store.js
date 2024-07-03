import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/LoginSlice";
import serviceReducer from "./features/ServiceSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
  },
});
export default store;
