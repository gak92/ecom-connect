import express from "express";
import productRoutes from "./routes/productRoutes.js";
import errorHandlerMiddleware from "./middleware/error.js";

const app = express();

// Middleware
app.use(express.json()); // To parse JSON bodies

// Routes
app.use("/api/v1", productRoutes);

// Error handling middleware
app.use(errorHandlerMiddleware);

export default app;
