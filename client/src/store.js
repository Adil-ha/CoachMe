import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/LoginSlice";
import performanceReducer from "./features/PerformanceSlice";
import coachingCoachingReducer from "./features/RequestCoachingSlice";
import bookReducer from "./features/BookSlice";
import addressReducer from "./features/AddressSlice";
import cartReducer from "./features/CartSlice";
import orderReducer from "./features/OrderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    performances: performanceReducer,
    coachingRequests: coachingCoachingReducer,
    books: bookReducer,
    addresses: addressReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
export default store;
