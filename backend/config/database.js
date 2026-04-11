import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    const data = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`MongoDB connected with server: ${data.connection.host}`);
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
};
