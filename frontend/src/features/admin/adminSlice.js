import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance.js";

// ── Async Thunks ────────────────────────────────────────────────

export const fetchAdminProducts = createAsyncThunk(
  "/admin/fetchAdminProducts",
  async (_, { rejectWithValue }) => {
    // ← fixed: was (_, rejectWithValue)
    try {
      const { data } = await api.get("/admin/products");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error in fetching products",
      );
    }
  },
);

export const createProduct = createAsyncThunk(
  "/admin/createProduct",
  async (productData, { rejectWithValue }) => {
    // ← fixed
    try {
      const { data } = await api.post("/admin/product/create", productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error in creating a product",
      );
    }
  },
);

export const updateProduct = createAsyncThunk(
  "/admin/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    // ← fixed
    try {
      const { data } = await api.put(`/admin/product/${id}`, productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error in updating a product",
      );
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "/admin/deleteProduct",
  async (id, { rejectWithValue }) => {
    // ← fixed
    try {
      const { data } = await api.delete(`/admin/product/${id}`);
      return { id };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error in deleting a product",
      );
    }
  },
);

export const fetchUsers = createAsyncThunk(
  "/admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    // ← fixed
    try {
      const { data } = await api.get("/admin/users");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error in fetching users");
    }
  },
);

export const getSingleUser = createAsyncThunk(
  "/admin/getSingleUser",
  async (id, { rejectWithValue }) => {
    // ← fixed
    try {
      const { data } = await api.get(`/admin/user/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error in fetching single user",
      );
    }
  },
);

export const updateUserRole = createAsyncThunk(
  "/admin/updateUserRole",
  async ({ userId, role }, { rejectWithValue }) => {
    // ← fixed
    try {
      const { data } = await api.put(`/admin/user/${userId}`, { role });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error in updating user role",
      );
    }
  },
);

export const deleteUser = createAsyncThunk(
  "/admin/deleteUser",
  async (userId, { rejectWithValue }) => {
    // ← fixed
    try {
      const { data } = await api.delete(`/admin/user/${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting user");
    }
  },
);

export const fetchAllOrders = createAsyncThunk(
  "/admin/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    // ← fixed
    try {
      const { data } = await api.get("/admin/orders");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch all orders",
      );
    }
  },
);

export const deleteOrder = createAsyncThunk(
  "/admin/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    // ← fixed
    try {
      const { data } = await api.delete(`/admin/order/${orderId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete order");
    }
  },
);

export const updateOrderStatus = createAsyncThunk(
  "/admin/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    // ← fixed
    try {
      const { data } = await api.put(`/admin/order/${orderId}`, { status });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update order status",
      );
    }
  },
);

export const fetchProductReviews = createAsyncThunk(
  "/admin/fetchProductReviews",
  async (productId, { rejectWithValue }) => {
    // ← fixed
    try {
      const { data } = await api.get(`/admin/reviews?id=${productId}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch product reviews",
      );
    }
  },
);

export const deleteReview = createAsyncThunk(
  "/admin/deleteReview",
  async ({ productId, reviewId }, { rejectWithValue }) => {
    // ← fixed
    try {
      const { data } = await api.delete(
        `/admin/reviews?productId=${productId}&id=${reviewId}`,
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete product review",
      );
    }
  },
);

// ── Slice ───────────────────────────────────────────────────────

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
    user: {},
    message: null,
    orders: [],
    totalAmount: 0,
    order: {},
    reviews: [],
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = false;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all products
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "Error in fetching products";
      });

    // Create product
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.products.push(action.payload.product);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "Error in creating a product";
      });

    // Update product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.product = action.payload.product;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Error in updating a product";
      });

    // Delete product
    builder
      .addCase(deleteProduct.pending, (state, action) => {
        state.deleting[action.meta.arg] = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleting[action.payload.id] = false;
        state.products = state.products.filter(
          (p) => p._id !== action.payload.id,
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleting[action.meta.arg] = false;
        state.error = action.payload?.message || "Error in deleting a product";
      });

    // Fetch users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Error in fetching users";
      });

    // Single user
    builder
      .addCase(getSingleUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Error in fetching single user";
      });

    // Update user role
    builder
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Error in updating user role";
      });

    // Delete user
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Error in deleting user";
      });

    // Fetch all orders
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch all orders";
      });

    // Delete order
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete order";
      });

    // Update order status
    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.order = action.payload.order;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to update order status";
      });

    // Fetch product reviews
    builder
      .addCase(fetchProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews;
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch product reviews";
      });

    // Delete review
    builder
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to delete product review";
      });
  },
});

export const { removeErrors, removeSuccess, clearMessage } = adminSlice.actions;
export default adminSlice.reducer;
