import asyncHandler from "../utils/asyncHandler.js";
import { sendToken } from "../utils/jwtToken.js";
import * as userService from "../services/userService.js";

// ================================================================
// User Controller — HTTP only, no business logic
// All logic lives in userService.js
// ================================================================

export const registerUser = asyncHandler(async (req, res, next) => {
  const user = await userService.registerUser(req.body);
  sendToken(user, 201, res);
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const user = await userService.loginUser(req.body.email, req.body.password);
  sendToken(user, 200, res);
});

export const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true, secure: true, sameSite: "none" });
  res.status(200).json({ success: true, message: "Logout successful" });
});

export const requestPasswordReset = asyncHandler(async (req, res, next) => {
  const email = await userService.requestPasswordReset(
    req.body.email,
    req.protocol,
    req.get("host"),
  );
  res
    .status(200)
    .json({ success: true, message: `Password reset email sent to ${email}` });
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const user = await userService.resetPassword(
    req.params.token,
    req.body.password,
    req.body.confirmPassword,
  );
  sendToken(user, 200, res);
});

export const getUserDetails = asyncHandler(async (req, res, next) => {
  const user = await userService.getUserById(req.user.id);
  res.status(200).json({ success: true, user });
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await userService.updatePassword(
    req.user.id,
    req.body.currentPassword,
    req.body.newPassword,
    req.body.confirmPassword,
  );
  sendToken(user, 200, res);
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  const user = await userService.updateProfile(req.user.id, req.body);
  res
    .status(200)
    .json({
      success: true,
      message: "User details updated successfully",
      user,
    });
});

export const getUsersList = asyncHandler(async (req, res, next) => {
  const users = await userService.getAllUsers();
  res.status(200).json({ success: true, count: users.length, users });
});

export const getSingleUser = asyncHandler(async (req, res, next) => {
  const user = await userService.getSingleUser(req.params.id);
  res.status(200).json({ success: true, user });
});

export const updateUserRole = asyncHandler(async (req, res, next) => {
  const user = await userService.updateUserRole(req.params.id, req.body.role);
  res.status(200).json({ success: true, user });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  await userService.deleteUser(req.params.id);
  res.status(200).json({ success: true, message: "User deleted successfully" });
});
