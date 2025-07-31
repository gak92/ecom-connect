import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetching all products
export const fetchAdminProducts = createAsyncThunk(
  "/admin/fetchAdminProducts",
  async (_, rejectWithValue) => {
    try {
      console.log("Request to fetch products...");
      const { data } = await axios.get("/api/v1/admin/products");
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error in fetching products"
      );
    }
  }
);

// Create Products
export const createProduct = createAsyncThunk(
  "/admin/createProduct",
  async (productData, rejectWithValue) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/v1/admin/product/create",
        productData,
        config
      );
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error in creating a product"
      );
    }
  }
);

// Update Product
export const updateProduct = createAsyncThunk(
  "/admin/updateProduct",
  async ({ id, productData }, rejectWithValue) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.put(
        `/api/v1/admin/product/${id}`,
        productData,
        config
      );
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error in updating a product"
      );
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  "/admin/deleteProduct",
  async (id, rejectWithValue) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
      console.log(data);
      return { id };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error in deleting a product"
      );
    }
  }
);

// Fetch All users
export const fetchUsers = createAsyncThunk(
  "/admin/fetchUsers",
  async (_, rejectWithValue) => {
    try {
      const { data } = await axios.get("/api/v1/admin/users");
      // console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error in fetching users");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    products: [],
    success: false,
    error: null,
    loading: false,
    product: {},
    deleting: {},
    users: [],
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // fetching all product
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.products = action.payload.products;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "Error in fetching products";
      });

    // creating a product
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.products.push(action.payload.product);
        console.log(state.products);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "Error in creating a product";
      });

    // updating a product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.product = action.payload.product;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Error in updating a product";
      });

    // deleting a product
    builder
      .addCase(deleteProduct.pending, (state, action) => {
        const id = action.meta.arg;
        state.deleting[id] = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const id = action.payload.id;
        state.deleting[id] = false;
        state.products = state.products.filter((product) => product._id !== id);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        const id = action.meta.arg;
        state.deleting[id] = false;
        state.error = action.payload?.message || "Error in deleting a product";
      });

    // Fetching all users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.users = action.payload.users;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Error in fetching users";
      });
  },
});

export const { removeErrors, removeSuccess } = adminSlice.actions;

export default adminSlice.reducer;
