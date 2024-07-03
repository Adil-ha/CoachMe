import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { accountService } from "../services/accountService";

const BASE_API_URL = "http://localhost:8090";

// Fetch all services
export const fetchAllServices = createAsyncThunk(
  "services/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/services`);
      return response.data;
    } catch (error) {
      console.error("Fetch all services error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch service by ID
export const fetchServiceById = createAsyncThunk(
  "services/fetchById",
  async (serviceId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/services/${serviceId}`);
      return response.data;
    } catch (error) {
      console.error("Fetch service by ID error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a new service
export const createService = createAsyncThunk(
  "services/create",
  async (newService, { rejectWithValue }) => {
    try {
      const headers = accountService.getToken();
      const response = await axios.post(
        `${BASE_API_URL}/services`,
        newService,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Create service error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Update a service
export const updateService = createAsyncThunk(
  "services/update",
  async ({ id, updatedService }, { rejectWithValue }) => {
    try {
      const headers = accountService.getToken();
      const response = await axios.put(
        `${BASE_API_URL}/services/${id}`,
        updatedService,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Update service error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a service
export const deleteService = createAsyncThunk(
  "services/delete",
  async (id, { rejectWithValue }) => {
    try {
      const headers = accountService.getToken();
      const response = await axios.delete(`${BASE_API_URL}/services/${id}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error("Delete service error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    service: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchAllServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.services.push(action.payload);
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.services.findIndex(
          (service) => service.id === action.payload.id
        );
        if (index !== -1) {
          state.services[index] = action.payload;
        }
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter(
          (service) => service.id !== action.meta.arg
        );
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default serviceSlice.reducer;
