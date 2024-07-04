import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { accountService } from "../services/accountService";

const BASE_API_URL = "http://localhost:8090";

// Action asynchrone pour récupérer toutes les performances
export const fetchAllPerformances = createAsyncThunk(
  "performances/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/performances`);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des performances :",
        error.response.data
      );
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch performance by ID
export const fetchPerformanceById = createAsyncThunk(
  "performances/fetchById",
  async (performanceId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/performances/${performanceId}`
      );
      return response.data;
    } catch (error) {
      console.error("Fetch performance by ID error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a new performance
export const createPerformance = createAsyncThunk(
  "performances/create",
  async (newPerformance, { rejectWithValue }) => {
    try {
      const headers = accountService.getToken();
      const response = await axios.post(
        `${BASE_API_URL}/performances`,
        newPerformance,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Create performance error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Update a performance
export const updatePerformance = createAsyncThunk(
  "performances/update",
  async ({ id, updatedPerformance }, { rejectWithValue }) => {
    try {
      const headers = accountService.getToken();
      const response = await axios.put(
        `${BASE_API_URL}/performances/${id}`,
        updatedPerformance,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Update performance error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a performance
export const deletePerformance = createAsyncThunk(
  "performances/delete",
  async (id, { rejectWithValue }) => {
    try {
      const headers = accountService.getToken();
      const response = await axios.delete(
        `${BASE_API_URL}/performances/${id}`,
        {
          headers,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Delete performance error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const performanceSlice = createSlice({
  name: "performances",
  initialState: {
    performances: [],
    performance: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPerformances.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPerformances.fulfilled, (state, action) => {
        state.loading = false;
        state.performances = action.payload;
      })
      .addCase(fetchAllPerformances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPerformanceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPerformanceById.fulfilled, (state, action) => {
        state.loading = false;
        state.performance = action.payload;
      })
      .addCase(fetchPerformanceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPerformance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPerformance.fulfilled, (state, action) => {
        state.loading = false;
        state.performances.push(action.payload);
      })
      .addCase(createPerformance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePerformance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePerformance.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.performances.findIndex(
          (performance) => performance.id === action.payload.id
        );
        if (index !== -1) {
          state.performances[index] = action.payload;
        }
      })
      .addCase(updatePerformance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePerformance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePerformance.fulfilled, (state, action) => {
        state.loading = false;
        state.performances = state.performances.filter(
          (performance) => performance.id !== action.meta.arg
        );
      })
      .addCase(deletePerformance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default performanceSlice.reducer;
