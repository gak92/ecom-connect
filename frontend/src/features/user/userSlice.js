import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance.js";

export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/register", userData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Registration failed, please try again later",
      );
    }
  },
);

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/login", { email, password });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Login failed, please check your credentials",
      );
    }
  },
);

export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/profile");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while trying to load user",
      );
    }
  },
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/logout");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while trying to logout",
      );
    }
  },
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.put("/profile/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update profile" },
      );
    }
  },
);

export const updateUserPassword = createAsyncThunk(
  "user/updatePassword",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.put("/password/update", formData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update password",
      );
    }
  },
);

export const forgotUserPassword = createAsyncThunk(
  "user/forgotUserPassword",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/password/forgot", email);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to send email" },
      );
    }
  },
);

export const resetUserPassword = createAsyncThunk(
  "user/resetUserPassword",
  async ({ token, userData }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/reset/${token}`, userData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to reset password" },
      );
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    // No localStorage for auth — server is the source of truth
    // loadUser() on mount verifies the session cookie with the server
    user: null,
    error: null,
    loading: true, // start as true so ProtectedRoute shows Loader until loadUser settles
    isAuthenticated: false,
    success: false,
    message: null,
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
    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "Registration failed, please try again later";
        state.user = null;
        state.isAuthenticated = false;
      });

    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "Login failed, please check your credentials";
        state.user = null;
        state.isAuthenticated = false;
      });

    // Load User (runs on every app mount to verify session)
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);
      })
      .addCase(loadUser.rejected, (state) => {
        // Session invalid/expired — clear auth state silently
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      });

    // Logout
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to logout, please try again later";
      });

    // Update Profile
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || null;
        state.success = action.payload?.success;
        state.message = action.payload?.message;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "Failed to update profile, please try again later";
      });

    // Update Password
    builder
      .addCase(updateUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.success;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "Password update failed, please try again later";
      });

    // Forgot Password
    builder
      .addCase(forgotUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.success;
        state.message = action.payload?.message;
      })
      .addCase(forgotUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "Email send failed, please try again later";
      });

    // Reset Password
    builder
      .addCase(resetUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.success;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "Password reset failed, please try again later";
      });
  },
});

export const { removeErrors, removeSuccess } = userSlice.actions;
export default userSlice.reducer;
