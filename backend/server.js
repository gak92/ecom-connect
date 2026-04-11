import dotenv from "dotenv";
dotenv.config({ path: "config/config.env" });

// Handle uncaught exceptions FIRST — before any other code runs
process.on("uncaughtException", (error) => {
  console.error("UNCAUGHT EXCEPTION! Shutting down...");
  console.error(error.name, error.message);
  process.exit(1);
});

import app from "./app.js";
import { connectDatabase } from "./config/database.js";
import { v2 as cloudinary } from "cloudinary";

// Connect to database
connectDatabase();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error("UNHANDLED REJECTION! Shutting down...");
  console.error(error.name, error.message);
  server.close(() => {
    process.exit(1);
  });
});
