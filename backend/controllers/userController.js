import handleAsyncError from "../middleware/handleAsyncError.js";
import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

// ================================================================
//            1- Registering a User
// ================================================================
export const registerUser = handleAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is temp id",
      url: "This is temp url",
    },
  });

  sendToken(user, 201, res);
});

// ================================================================
//            2- login a User
// ================================================================
export const loginUser = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new HandleError("Email or password cannot be empty", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new HandleError("Invalid email or password", 401));
  }

  const isPasswordValid = await user.verifyPassword(password);
  if (!isPasswordValid) {
    return next(new HandleError("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// ================================================================
//            3- Logout a User
// ================================================================
export const logout = handleAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: `Logout successfully`,
  });
});

// ================================================================
//            4- Request Password Reset (Forgot Password)
// ================================================================
export const requestPasswordReset = handleAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new HandleError("User does not exists", 400));
  }

  let resetToken;
  try {
    resetToken = user.generateResetPasswordToken();
    // console.log("RESET TOKEN: ", resetToken);
    await user.save({ validateBeforeSave: false });
  } catch (error) {
    console.log(error);
    return next(
      new HandleError("Could not save reset token, please try again later", 500)
    );
  }

  const resetPasswordURL = `http://localhost:8000/api/v1/reset/${resetToken}`;
  const message = `Use the following link to reset your password: ${resetPasswordURL}.\n\nThis link will expire in 5 minutes.\n\nIf you did not request a password reset, please ignore this email.`;
  //   console.log("MESSAGE: ", message);

  try {
    // send email
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email is sent to ${user.email} successfully.`,
    });
  } catch (error) {
    console.log("ERROR: ", error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new HandleError("Email could not be sent, try again later", 500)
    );
  }
});

// ================================================================
//            5- Reset Password
// ================================================================
export const resetPassword = handleAsyncError(async (req, res, next) => {
  //   console.log(req.params.token);

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  //   console.log(resetPasswordToken);

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new HandleError("Reset password token is invalid or expired", 400)
    );
  }

  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return next(new HandleError("Password does not match", 400));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

// ================================================================
//            6- Get User Details
// ================================================================
export const getUserDetails = handleAsyncError(async (req, res, next) => {
//   console.log(req.user.id);
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});
