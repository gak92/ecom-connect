import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import errorHandlerMiddleware from "./middleware/error.js";

const app = express();

// ── Security Middleware ───────────────────────────────────────────────────────

// Set secure HTTP headers
app.use(helmet());

// Enable CORS — only allow requests from the frontend URL
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true, // Allow cookies to be sent
  }),
);

// Sanitize request data against NoSQL injection attacks
// NOTE: express-mongo-sanitize is incompatible with Express 5 (req.query is read-only)
// This custom sanitizer strips $ and . keys from objects in-place
const sanitizeObject = (obj) => {
  if (obj && typeof obj === "object") {
    for (const key of Object.keys(obj)) {
      if (key.startsWith("$") || key.includes(".")) {
        delete obj[key];
      } else {
        sanitizeObject(obj[key]);
      }
    }
  }
};
app.use((req, _res, next) => {
  sanitizeObject(req.body);
  sanitizeObject(req.params);
  // req.query is read-only in Express 5 — sanitize its values directly
  if (req.query && typeof req.query === "object") {
    sanitizeObject(req.query);
  }
  next();
});

// Rate limiter: max 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// ── Core Middleware ───────────────────────────────────────────────────────────

// Parse JSON bodies with a 10mb limit
app.use(express.json({ limit: "10mb" }));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Parse cookies
app.use(cookieParser());

// Handle file uploads
app.use(fileUpload());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoutes);

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use(errorHandlerMiddleware);

export default app;
