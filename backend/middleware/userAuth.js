import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "./handleAsyncError.js";
import jwt from "jsonwebtoken";

export const verifyUserAuth = handleAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  // console.log("TOKEN: ", token);

  if (!token) {
    return next(
      new HandleError(
        "Authentication is missing. Please login to access the resources",
        401
      )
    );
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // console.log("Decoded Token: ", decodedToken);

  req.user = await User.findById(decodedToken.id);
  next();
});
