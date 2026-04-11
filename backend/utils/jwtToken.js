export const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // Cookie options
  const options = {
    expires: new Date(
      Date.now() + process.env.EXPIRE_COOKIE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true, // Prevents client-side JS from reading the cookie
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  };

  // Token is stored in httpOnly cookie only — NOT returned in body (prevents XSS)
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
  });
};
