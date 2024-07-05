import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { accountService } from "../services/accountService";

const BASE_API_URL = "http://localhost:8090";

// Action asynchrone pour récupérer tous les livres
export const fetchAllBooks = createAsyncThunk(
  "books/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/books`);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des livres :",
        error.response.data
      );
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch book by ID
export const fetchBookById = createAsyncThunk(
  "books/fetchById",
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_API_URL}/books/${bookId}`);
      return response.data;
    } catch (error) {
      console.error("Fetch book by ID error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a new book
export const createBook = createAsyncThunk(
  "books/create",
  async (newBook, { rejectWithValue }) => {
    try {
      const headers = accountService.getToken();
      const response = await axios.post(`${BASE_API_URL}/books`, newBook, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error("Create book error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Update a book
export const updateBook = createAsyncThunk(
  "books/update",
  async ({ id, updatedBook }, { rejectWithValue }) => {
    try {
      const headers = accountService.getToken();
      const response = await axios.put(
        `${BASE_API_URL}/books/${id}`,
        updatedBook,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Update book error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a book
export const deleteBook = createAsyncThunk(
  "books/delete",
  async (id, { rejectWithValue }) => {
    try {
      const headers = accountService.getToken();
      const response = await axios.delete(`${BASE_API_URL}/books/${id}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error("Delete book error:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    book: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchAllBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.push(action.payload);
      })
      .addCase(createBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.books.findIndex(
          (book) => book.id === action.payload.id
        );
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter((book) => book.id !== action.meta.arg);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;
