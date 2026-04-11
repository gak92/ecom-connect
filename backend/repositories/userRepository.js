import User from "../models/userModel.js";

// ============================================================
// User Repository — ALL Mongoose queries for the User model
// No business logic here, only database operations
// ============================================================

// Find user by ID (without password)
export const findById = (id) => User.findById(id);

// Find user by ID and include password field (for auth)
export const findByIdWithPassword = (id) =>
  User.findById(id).select("+password");

// Find user by email (without password)
export const findByEmail = (email) => User.findOne({ email });

// Find user by email and include password field (for login)
export const findByEmailWithPassword = (email) =>
  User.findOne({ email }).select("+password");

// Find user by hashed reset token that has not expired
export const findByResetToken = (hashedToken) =>
  User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

// Get all users
export const findAll = () => User.find();

// Create a new user
export const create = (data) => User.create(data);

// Update user by ID — returns updated document
export const updateById = (
  id,
  data,
  options = { new: true, runValidators: true },
) => User.findByIdAndUpdate(id, data, options);

// Delete user by ID — returns the deleted document
export const deleteById = (id) => User.findByIdAndDelete(id);

// Save a modified user document instance (for reset token operations)
export const saveUser = (user, options = {}) => user.save(options);
