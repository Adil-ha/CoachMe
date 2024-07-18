import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { accountService } from "../services/accountService";
const BASE_API_URL = "http://localhost:8090";

export const login = createAsyncThunk(
  "auth/login",
  async (newLogin, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/login`, newLogin);
      console.log("Login successful:", response.data);
      accountService.saveToken(response.data.bearer);
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/register`, newUser);
      console.log("Registration successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const headers = accountService.getToken();
      const response = await axios.post(`${BASE_API_URL}/logoutt`, null, {
        headers,
      });
      console.log("Disconnection successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Logout error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "auth/fetchUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const headers = accountService.getToken();
      const response = await axios.get(`${BASE_API_URL}/user/${userId}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error("Fetch user error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.pending, (state) => {})
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(register.pending, (state) => {})
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
      })
      .addCase(logout.pending, (state) => {})
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUserById.pending, (state) => {})
      .addCase(fetchUserById.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
