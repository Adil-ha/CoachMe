import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { accountService } from "../services/accountService";

const BASE_API_URL = "http://localhost:8090";

// Action asynchrone pour créer une nouvelle adresse
export const createAddress = createAsyncThunk(
  "addresses/create",
  async (newAddress, { rejectWithValue }) => {
    try {
      const headers = accountService.getToken(); // Assuming accountService.getToken() fetches the auth token
      const response = await axios.post(
        `${BASE_API_URL}/addresses`,
        newAddress,
        {
          headers,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Create address error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state for the address slice
const initialState = {
  addresses: [],
  address: null,
  loading: false,
  error: null,
};

// Address slice
const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.push(action.payload);
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addressSlice.reducer;
