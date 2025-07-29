import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post("/api/v1/new/order", order, config);
      console.log("Order data: ", data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occured while creating an order"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    success: false,
    loading: false,
    error: null,
    orders: [],
    order: null,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.order = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "An error occured while creating an order";
        state.success = false;
        state.order = null;
      });
  },
});

export const { removeErrors, removeSuccess } = orderSlice.actions;

export default orderSlice.reducer;
