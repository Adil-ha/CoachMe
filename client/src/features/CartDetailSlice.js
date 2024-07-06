import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addBookToCart,
  removeBookFromCart,
  updateCartDetailQuantity,
} from "../api/cartDetailAPI";

const initialState = {
  cartDetails: [],
  loading: false,
  error: null,
};

export const addBook = createAsyncThunk(
  "cartDetail/addBook",
  async ({ cartId, bookId, quantity }) => {
    await addBookToCart(cartId, bookId, quantity);
    return { cartId, bookId, quantity };
  }
);

export const removeBook = createAsyncThunk(
  "cartDetail/removeBook",
  async ({ cartId, bookId }) => {
    await removeBookFromCart(cartId, bookId);
    return { cartId, bookId };
  }
);

export const updateQuantity = createAsyncThunk(
  "cartDetail/updateQuantity",
  async ({ cartDetailId, quantity }) => {
    await updateCartDetailQuantity(cartDetailId, quantity);
    return { cartDetailId, quantity };
  }
);

const cartDetailSlice = createSlice({
  name: "cartDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.cartDetails.push(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        state.loading = false;
        state.cartDetails = state.cartDetails.filter(
          (detail) =>
            !(
              detail.cartId === action.payload.cartId &&
              detail.bookId === action.payload.bookId
            )
        );
      })
      .addCase(removeBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const cartDetail = state.cartDetails.find(
          (detail) => detail.id === action.payload.cartDetailId
        );
        if (cartDetail) {
          cartDetail.quantity = action.payload.quantity;
        }
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cartDetailSlice.reducer;
