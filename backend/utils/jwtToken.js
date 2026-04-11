export const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // Cookie options for cross-origin (Render backend + Vercel frontend)
  const options = {
    expires: new Date(
      Date.now() + process.env.EXPIRE_COOKIE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true, // Prevents client-side JS from reading the cookie
    secure: true,   // Required for cross-origin cookies (must be HTTPS)
    sameSite: "none", // Required to send cookies across domains (Vercel -> Render)
  };

  // Token is stored in httpOnly cookie only — NOT returned in body (prevents XSS)
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
  });
};
