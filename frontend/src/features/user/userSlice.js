import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Register API
export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      // const config = {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // };
      console.log("Register request: ", userData);

      // const tempUserData = {
      //   name: "three",
      //   email: "three@example.com",
      //   password: "123456789",
      // }

      const { data } = await axios.post("/api/v1/register", userData);
      // const {data} = await axios.postForm("/api/v1/register", userData);

      console.log("Register response: ", data);
      return data;
    } catch (error) {
      console.log("Register error: ", error);
      return rejectWithValue(
        error.response?.data || "Registration failed, please try again later"
      );
    }
  }
);

// Login API
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/login",
        { email, password },
        config
      );
      console.log("Login response: ", data);
      return data;
    } catch (error) {
      console.log("Login error: ", error);
      return rejectWithValue(
        error.response?.data || "Login failed, please check your credentials"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    error: null,
    loading: false,
    isAuthenticated: false,
    success: false,
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
    // Register Cases
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "Registration failed, please try again later";
        state.success = false;
        state.user = null;
        state.isAuthenticated = false;
      });

    // Login Cases
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload.success;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);
        console.log("Login success: ", state.user);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Login failed, please try again later";
        state.success = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { removeErrors, removeSuccess } = userSlice.actions;
export default userSlice.reducer;
