import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/LoginSlice";
import performanceReducer from "./features/PerformanceSlice";
import coachingCoachingReducer from "./features/RequestCoachingSlice";
import bookReducer from "./features/BookSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    performances: performanceReducer,
    coachingRequests: coachingCoachingReducer,
    books: bookReducer,
  },
});
export default store;
