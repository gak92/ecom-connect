import HandleError from "../utils/handleError.js";

const errorHandlerMiddleware = (err, req, res, next) => {
  // Log full error only in development
  if (process.env.NODE_ENV !== "production") {
    console.error("Error:", err);
  }

  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    const message = `Resource Not Found. Invalid: ${err.path}`;
    err = new HandleError(message, 400);
  }

  // Duplicate key error (E11000)
  if (err.code === 11000) {
    const message = `This ${Object.keys(err.keyValue)} already exists`;
    err = new HandleError(message, 400);
  }

  // JWT expired
  if (err.name === "TokenExpiredError") {
    err = new HandleError("Session expired. Please login again.", 401);
  }

  // JWT invalid
  if (err.name === "JsonWebTokenError") {
    err = new HandleError("Invalid token. Please login again.", 401);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorHandlerMiddleware;
