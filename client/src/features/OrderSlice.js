import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { accountService } from "../services/accountService";

const BASE_API_URL = "http://localhost:8090";

// API calls
const fetchOrderByIdAPI = async (orderId) => {
  const headers = accountService.getToken();
  const response = await axios.get(`${BASE_API_URL}/orders/${orderId}`, {
    headers,
  });
  return response.data;
};

const createOrderAPI = async (orderData) => {
  const headers = accountService.getToken();
  const response = await axios.post(`${BASE_API_URL}/orders`, orderData, {
    headers,
  });
  return response.data;
};

const addBookToOrderAPI = async ({ orderId, orderDetailDTOList }) => {
  const headers = accountService.getToken();
  const response = await axios.post(
    `${BASE_API_URL}/orders/${orderId}/books`,
    orderDetailDTOList,
    { headers }
  );
  return response.data;
};

const updateOrderStatusAPI = async (orderId, orderStatus) => {
  const headers = accountService.getToken();
  const response = await axios.patch(
    `${BASE_API_URL}/orders/${orderId}/status`,
    { orderStatus },
    { headers }
  );
  return response.data;
};

const deleteOrderAPI = async (orderId) => {
  const headers = accountService.getToken();
  const response = await axios.delete(`${BASE_API_URL}/orders/${orderId}`, {
    headers,
  });
  return response.data;
};

// Actions
export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      return await fetchOrderByIdAPI(orderId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const headers = accountService.getToken();
      const response = await axios.get(`${BASE_API_URL}/orders`, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error("Fetch all orders error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      return await createOrderAPI(orderData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addBookToOrder = createAsyncThunk(
  "order/addBookToOrder",
  async ({ orderId, orderDetailDTOList }, { rejectWithValue }) => {
    try {
      return await addBookToOrderAPI({ orderId, orderDetailDTOList });
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, orderStatus }, { rejectWithValue }) => {
    try {
      return await updateOrderStatusAPI(orderId, orderStatus);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      return await deleteOrderAPI(orderId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    order: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBookToOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBookToOrder.fulfilled, (state, action) => {
        state.loading = false;
        if (state.order) {
          state.order.orderDetailDTOS = state.order.orderDetailDTOS.concat(
            action.payload
          );
        }
      })
      .addCase(addBookToOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        if (state.order) {
          state.order.status = action.payload.status;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order.id !== action.meta.arg
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
