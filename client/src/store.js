import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/LoginSlice";
import performanceReducer from "./features/PerformanceSlice";
import coachingCoachingReducer from "./features/RequestCoachingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    performances: performanceReducer,
    coachingRequests: coachingCoachingReducer,
  },
});
export default store;
