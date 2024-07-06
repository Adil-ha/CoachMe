import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/LoginSlice";
import performanceReducer from "./features/PerformanceSlice";
import coachingCoachingReducer from "./features/RequestCoachingSlice";
import bookReducer from "./features/BookSlice";
import addressReducer from "./features/AddressSlice";
import cartReducer from "./features/CartSlice";
import cartDetailReducer from "./features/CartDetailSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    performances: performanceReducer,
    coachingRequests: coachingCoachingReducer,
    books: bookReducer,
    addresses: addressReducer,
    cart: cartReducer,
    cartDetails: cartDetailReducer,
  },
});
export default store;
