import app from "./app.js";
import dotenv from "dotenv";
import {connectDatabase} from "./config/database.js";
dotenv.config({ path: "backend/config/config.env" });
import {v2 as cloudinary} from "cloudinary";
import Razorpay from "razorpay";

// connect to databae
connectDatabase();

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// handle uncaught exceptions error
process.on("uncaughtException", (error) => {
  console.log("Error: ", error.message);
  console.log("Shutting down the server due to Uncaught Exception");
  process.exit(1);
});

const PORT = process.env.PORT || 8001;
export const instance = new Razorpay({
  key_id: process.env.RAZOR_PAY_API_KEY,
  key_secret: process.env.RAZOR_PAY_API_SECRET,
});


const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (error) => {
    console.log("Error: ", error.message);
    console.log("Shutting down the server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
});
