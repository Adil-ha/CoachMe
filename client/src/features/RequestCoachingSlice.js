import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { accountService } from "../services/accountService";

const BASE_API_URL = "http://localhost:8090";

// Fetch all coaching requests
export const fetchAllCoachingRequests = createAsyncThunk(
  "coachingRequests/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const headers = accountService.getToken();
      const response = await axios.get(`${BASE_API_URL}/coaching-requests`, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error("Fetch all coaching requests error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch coaching request by ID
export const fetchCoachingRequestById = createAsyncThunk(
  "coachingRequests/fetchById",
  async (requestId, { rejectWithValue }) => {
    try {
      const headers = accountService.getToken();
      const response = await axios.get(
        `${BASE_API_URL}/coaching-requests/${requestId}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Fetch coaching request by ID error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a new coaching request
export const createCoachingRequest = createAsyncThunk(
  "coachingRequests/create",
  async (newRequest, { rejectWithValue }) => {
    try {
      const headers = accountService.getToken();
      const response = await axios.post(
        `${BASE_API_URL}/coaching-requests`,
        newRequest,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Create coaching request error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Update a coaching request status
export const updateCoachingRequestStatus = createAsyncThunk(
  "coachingRequests/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const headers = accountService.getToken();
      await axios.put(`${BASE_API_URL}/coaching-requests/${id}/status`, null, {
        params: { status },
        headers,
      });
      return { id, status };
    } catch (error) {
      console.error(
        "Update coaching request status error:",
        error.response.data
      );
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a coaching request
export const deleteCoachingRequest = createAsyncThunk(
  "coachingRequests/delete",
  async (id, { rejectWithValue }) => {
    try {
      const headers = accountService.getToken();
      await axios.delete(`${BASE_API_URL}/coaching-requests/${id}`, {
        headers,
      });
      return id;
    } catch (error) {
      console.error("Delete coaching request error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const coachingRequestSlice = createSlice({
  name: "coachingRequests",
  initialState: {
    coachingRequests: [],
    coachingRequest: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCoachingRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCoachingRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.coachingRequests = action.payload;
      })
      .addCase(fetchAllCoachingRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCoachingRequestById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoachingRequestById.fulfilled, (state, action) => {
        state.loading = false;
        state.coachingRequest = action.payload;
      })
      .addCase(fetchCoachingRequestById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCoachingRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCoachingRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.coachingRequests.push(action.payload);
      })
      .addCase(createCoachingRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCoachingRequestStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCoachingRequestStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.coachingRequests.findIndex(
          (request) => request.id === action.payload.id
        );
        if (index !== -1) {
          state.coachingRequests[index].status = action.payload.status;
        }
      })
      .addCase(updateCoachingRequestStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCoachingRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCoachingRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.coachingRequests = state.coachingRequests.filter(
          (request) => request.id !== action.payload
        );
      })
      .addCase(deleteCoachingRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default coachingRequestSlice.reducer;
