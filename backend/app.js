import express from "express";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import errorHandlerMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cookieParser()); // To parse Cookies
app.use(fileUpload()); // To handle file uploads

// Routes
app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);

// Error handling middleware
app.use(errorHandlerMiddleware);

export default app;
