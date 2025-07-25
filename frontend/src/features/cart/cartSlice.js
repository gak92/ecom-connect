import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addItemsToCart = createAsyncThunk(
  "cart/addItemsToCart",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${id}`);
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
        error.response?.data || "An error occurred while adding items to cart"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
    success: false,
    message: null,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },

    removeMessage: (state) => {
      state.message = null;
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
        state.cartItems.push(item);
        state.loading = false;
        state.error = null;
        state.success = true;
        state.message = `Item ${item.name} added to cart successfully`;

      })
      .addCase(addItemsToCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "An error occurred while adding items to cart";
      });
  },
});

export const { removeErrors, removeMessage } = cartSlice.actions;
export default cartSlice.reducer;
