import express from "express";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import errorHandlerMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";

const app = express();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cookieParser()); // To parse Cookies
app.use(fileUpload()); // To handle file uploads

// Routes
app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoutes);

// Error handling middleware
app.use(errorHandlerMiddleware);
dotenv.config({ path: "backend/config/config.env" });

export default app;
