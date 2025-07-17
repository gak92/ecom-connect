import HandleError from "../utils/handleError.js";

const errorHandlerMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // cast error for invalid ObjectId
  if(err.name === "CastError") {
    const message = `Resource Not Found. Invalid: ${err.path}`;
    err = new HandleError(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorHandlerMiddleware;
