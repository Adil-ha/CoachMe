import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { accountService } from "../services/accountService";

const BASE_API_URL = "http://localhost:8090";

// API calls
const fetchCartByUserIdAPI = async (userId) => {
  const headers = accountService.getToken();
  const response = await axios.get(`${BASE_API_URL}/carts/user/${userId}`, {
    headers,
  });
  return response.data;
};

const createCartAPI = async (cartData) => {
  const headers = accountService.getToken();
  const response = await axios.post(`${BASE_API_URL}/carts`, cartData, {
    headers,
  });
  return response.data;
};

// Fonction d'API pour ajouter un livre au panier
const addBookToCartAPI = async ({ cartId, bookId, quantity }) => {
  const headers = accountService.getToken();
  const cartDetailDTO = { bookId, quantity };
  const response = await axios.post(
    `${BASE_API_URL}/carts/${cartId}/books`,
    cartDetailDTO,
    { headers }
  );
  return response.data;
};

const removeBookFromCartAPI = async (cartId, bookId) => {
  const headers = accountService.getToken();
  const response = await axios.delete(
    `${BASE_API_URL}/carts/${cartId}/books/${bookId}`,
    { headers }
  );
  return response.data;
};

const clearCartAPI = async (cartId) => {
  const headers = accountService.getToken();
  const response = await axios.delete(`${BASE_API_URL}/carts/${cartId}`, {
    headers,
  });
  return response.data;
};

// Actions
export const fetchCartByUserId = createAsyncThunk(
  "cart/fetchCartByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      return await fetchCartByUserIdAPI(userId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createCart = createAsyncThunk(
  "cart/createCart",
  async (cartData, { rejectWithValue }) => {
    try {
      return await createCartAPI(cartData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addBookToCart = createAsyncThunk(
  "cart/addBookToCart",
  async ({ cartId, bookId, quantity }, { rejectWithValue }) => {
    try {
      return await addBookToCartAPI({ cartId, bookId, quantity });
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeBookFromCart = createAsyncThunk(
  "cart/removeBookFromCart",
  async ({ cartId, bookId }, { rejectWithValue }) => {
    try {
      return await removeBookFromCartAPI(cartId, bookId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (cartId, { rejectWithValue }) => {
    try {
      return await clearCartAPI(cartId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCartByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(createCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBookToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBookToCart.fulfilled, (state, action) => {
        state.loading = false;
        // Mise à jour du panier avec le nouveau détail de livre ajouté
        if (state.cart) {
          state.cart.cartDetailDTOList.push(action.payload);
        }
      })
      .addCase(addBookToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeBookFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeBookFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.cartDetailDTOList = state.cart.cartDetailDTOList.filter(
          (book) => book.bookId !== action.meta.arg.bookId
        );
      })
      .addCase(removeBookFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.cart = { ...state.cart, cartDetailDTOList: [] };
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
