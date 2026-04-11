import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";
import * as userRepository from "../repositories/userRepository.js";
import HandleError from "../utils/handleError.js";
import { sendEmail } from "../utils/sendEmail.js";

// ============================================================
// User Service — all user-related business logic
// Calls userRepository for data access, never the model directly
// ============================================================

// 1 - Register a new user (upload avatar, create user)
export const registerUser = async ({ name, email, password, avatar }) => {
  const myCloudinary = await cloudinary.uploader.upload(avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const user = await userRepository.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloudinary.public_id,
      url: myCloudinary.secure_url,
    },
  });

  return user;
};

// 2 - Login — verify email + password
export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new HandleError("Email and password are required", 400);
  }

  const user = await userRepository.findByEmailWithPassword(email);
  if (!user) {
    throw new HandleError("Invalid email or password", 401);
  }

  const isPasswordValid = await user.verifyPassword(password);
  if (!isPasswordValid) {
    throw new HandleError("Invalid email or password", 401);
  }

  return user;
};

// 3 - Request password reset — generate token and send email
export const requestPasswordReset = async (email, protocol, host) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new HandleError("User does not exist", 400);
  }

  const resetToken = user.generateResetPasswordToken();
  await userRepository.saveUser(user, { validateBeforeSave: false });

  const resetPasswordURL = `${protocol}://${host}/reset/${resetToken}`;
  const message = `Use the following link to reset your password: ${resetPasswordURL}.\n\nThis link will expire in 30 minutes.\n\nIf you did not request a password reset, please ignore this email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });
    return user.email;
  } catch (error) {
    // Clean up token if email fails
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await userRepository.saveUser(user, { validateBeforeSave: false });
    throw new HandleError("Email could not be sent, try again later", 500);
  }
};

// 4 - Reset password with valid token
export const resetPassword = async (token, password, confirmPassword) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await userRepository.findByResetToken(hashedToken);
  if (!user) {
    throw new HandleError(
      "Reset password token is invalid or has expired",
      400,
    );
  }

  if (password !== confirmPassword) {
    throw new HandleError("Passwords do not match", 400);
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await userRepository.saveUser(user);

  return user;
};

// 5 - Get user profile
export const getUserById = async (id) => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new HandleError("User not found", 404);
  }
  return user;
};

// 6 - Update password
export const updatePassword = async (
  userId,
  currentPassword,
  newPassword,
  confirmPassword,
) => {
  if (!currentPassword || !newPassword || !confirmPassword) {
    throw new HandleError("All fields are required", 400);
  }

  const user = await userRepository.findByIdWithPassword(userId);
  if (!user) {
    throw new HandleError("User not found", 404);
  }

  const isCurrentPasswordValid = await user.verifyPassword(currentPassword);
  if (!isCurrentPasswordValid) {
    throw new HandleError("Current password is incorrect", 401);
  }

  if (newPassword !== confirmPassword) {
    throw new HandleError("Passwords do not match", 400);
  }

  user.password = newPassword;
  await userRepository.saveUser(user);

  return user;
};

// 7 - Update user profile (name, email, optional avatar)
export const updateProfile = async (userId, { name, email, avatar }) => {
  const updateData = { name, email };

  if (avatar && avatar !== "") {
    const user = await userRepository.findById(userId);
    // Delete old avatar from Cloudinary
    await cloudinary.uploader.destroy(user.avatar.public_id);
    // Upload new avatar
    const myCloudinary = await cloudinary.uploader.upload(avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    updateData.avatar = {
      public_id: myCloudinary.public_id,
      url: myCloudinary.secure_url,
    };
  }

  const updatedUser = await userRepository.updateById(userId, updateData);
  return updatedUser;
};

// 8 - Admin: Get all users
export const getAllUsers = async () => {
  return await userRepository.findAll();
};

// 9 - Admin: Get single user
export const getSingleUser = async (id) => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new HandleError(`User does not exist with ID: ${id}`, 404);
  }
  return user;
};

// 10 - Admin: Update user role
export const updateUserRole = async (id, role) => {
  const user = await userRepository.updateById(id, { role });
  if (!user) {
    throw new HandleError(`User does not exist with ID: ${id}`, 404);
  }
  return user;
};

// 11 - Admin: Delete user and clean up Cloudinary avatar
export const deleteUser = async (id) => {
  const user = await userRepository.deleteById(id);
  if (!user) {
    throw new HandleError(`User does not exist with ID: ${id}`, 404);
  }
  await cloudinary.uploader.destroy(user.avatar.public_id);
  return user;
};
