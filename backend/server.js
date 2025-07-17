import app from "./app.js";
import dotenv from "dotenv";
import {connectDatabase} from "./config/database.js";

dotenv.config({ path: "backend/config/config.env" });
connectDatabase();
const PORT = process.env.PORT || 8001;

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
