import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetching all products
export const getProduct = createAsyncThunk(
  "product/getProduct",
  async ({ keyword, page=1, category }, { rejectWithValue }) => {
    try {
      let link = "/api/v1/products?page="+page;
      if(category) {
        link += `&category=${category}`;
      }
      if(keyword) {
        link += `&keyword=${encodeURIComponent(keyword)}`;
      }

      // const link = keyword
      //   ? `/api/v1/products?keyword=${encodeURIComponent(keyword)}&page=${page}`
      //   : `/api/v1/products?page=${page}`;

      const { data } = await axios.get(link);
      //   console.log("Response: ", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Fetching a single product details
export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const link = `/api/v1/product/${id}`;
      const { data } = await axios.get(link);
      //   console.log("Response: ", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productCount: 0,
    error: null,
    loading: false,
    product: null,
    resultsPerPage: 3,
    totalPages: 0,
  },
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        // console.log("Fulfilled Action: ", action.payload);
        state.loading = false;
        state.error = null;
        state.products = action.payload.products;
        state.productCount = action.payload.productCount;
        state.resultsPerPage = action.payload.resultsPerPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getProduct.rejected, (state, action) => {
        // console.log("Rejected Action: ", action.payload);
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.products = [];
      });

    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        console.log("Fulfilled Action (Product Details): ", action.payload);
        state.loading = false;
        state.error = null;
        state.product = action.payload.product;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        // console.log("Rejected Action: ", action.payload);
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { removeError } = productSlice.actions;
export default productSlice.reducer;
