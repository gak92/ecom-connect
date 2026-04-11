import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance.js";

// ── Async Thunks ────────────────────────────────────────────────

// Get Stripe publishable key from backend
export const getStripeKey = createAsyncThunk(
  "payment/getStripeKey",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/getKey");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to load payment key",
      );
    }
  },
);

// Create a Stripe PaymentIntent — returns client_secret
export const createPaymentIntent = createAsyncThunk(
  "payment/createPaymentIntent",
  async (amount, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/payment/process", { amount });
      return data; // { success, client_secret }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Payment processing failed",
      );
    }
  },
);

// Verify payment after Stripe confirmation
export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (paymentIntentId, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/paymentVerification", {
        paymentIntentId,
      });
      return data; // { success, reference, status }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Payment verification failed",
      );
    }
  },
);

// ── Slice ───────────────────────────────────────────────────────

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    error: null,
    stripeApiKey: null,
    clientSecret: null,
    paymentStatus: null,
    reference: null,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    clearPaymentState: (state) => {
      state.clientSecret = null;
      state.paymentStatus = null;
      state.reference = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get Stripe Key
    builder
      .addCase(getStripeKey.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStripeKey.fulfilled, (state, action) => {
        state.loading = false;
        state.stripeApiKey = action.payload.stripeApiKey;
      })
      .addCase(getStripeKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to load payment key";
      });

    // Create PaymentIntent
    builder
      .addCase(createPaymentIntent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.loading = false;
        state.clientSecret = action.payload.client_secret;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Payment processing failed";
      });

    // Verify Payment
    builder
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = action.payload.status;
        state.reference = action.payload.reference;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Payment verification failed";
      });
  },
});

export const { removeErrors, clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
