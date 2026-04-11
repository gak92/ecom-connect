import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance.js";

export const addItemsToCart = createAsyncThunk(
  "cart/addItemsToCart",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/product/${id}`);
      return {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.image[0].url,
        stock: data.product.stock,
        quantity,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while adding items to cart",
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // Cart items and shipping are safe to persist in localStorage (non-sensitive)
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    loading: false,
    error: null,
    success: false,
    message: null,
    removingId: null,
    shippingInfo: JSON.parse(localStorage.getItem("shippingInfo")) || {},
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeMessage: (state) => {
      state.message = null;
    },

    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload,
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
      localStorage.removeItem("shippingInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemsToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemsToCart.fulfilled, (state, action) => {
        const item = action.payload;
        const existing = state.cartItems.find(
          (i) => i.product === item.product,
        );

        if (existing) {
          existing.quantity = item.quantity;
          state.message = `${item.name} quantity updated to ${item.quantity}`;
        } else {
          state.cartItems.push(item);
          state.message = `${item.name} added to cart`;
        }

        state.loading = false;
        state.success = true;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(addItemsToCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "An error occurred while adding items to cart";
      });
  },
});

export const {
  removeErrors,
  removeMessage,
  removeItemFromCart,
  saveShippingInfo,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
