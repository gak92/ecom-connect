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

// Load User
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/profile");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while trying to load user"
      );
    }
  }
);

// Logout User
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/logout", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while trying to logout"
      );
    }
  }
);

// Update Profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      console.log("Update Profile request: ", formData);
      const { data } = await axios.put(
        "/api/v1/profile/update",
        formData,
        config
      );
      console.log("Update Profile response: ", data);
      return data;
    } catch (error) {
      console.log("Update Profile error: ", error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to update profile" }
      );
    }
  }
);

// update Password
export const updateUserPassword = createAsyncThunk(
  "user/updatePassword",
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        "/api/v1/password/update",
        formData,
        config
      );
      console.log("Update Password response: ", data);
      return data;
    } catch (error) {
      console.log("Update Password error: ", error);
      return rejectWithValue(
        error.response?.data || "Failed to update password"
      );
    }
  }
);

// Forgot Password
export const forgotUserPassword = createAsyncThunk(
  "user/forgotUserPassword",
  async (email, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/password/forgot",
        email,
        config
      );
      console.log("Forgot Password Request response: ", data);
      return data;
    } catch (error) {
      console.log("Forgot Password error: ", error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to send email" }
      );
    }
  }
);

// Reset Password
export const resetUserPassword = createAsyncThunk(
  "user/resetUserPassword",
  async ({token, userData}, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/v1/reset/${token}`,
        userData,
        config
      );
      console.log("Forgot Password Request response: ", data);
      return data;
    } catch (error) {
      console.log("Forgot Password error: ", error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to send email" }
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

    // Load User
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "User details fetching failed , please try again later";
        state.success = false;
        state.user = null;
        state.isAuthenticated = false;
      });

    // Logout User
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "Failed to logout , please try again later";
      });

    // Update Profile User
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload?.user || null;
        state.success = action.payload?.success;
        state.message = action.payload?.message;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "Failed to update profile , please try again later";
      });

    // Update Password
    builder
      .addCase(updateUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
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
        state.error = null;
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
        state.error = null;
        state.success = action.payload?.success;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "Password Reset failed, please try again later";
      });

    
  },
});

export const { removeErrors, removeSuccess } = userSlice.actions;
export default userSlice.reducer;
