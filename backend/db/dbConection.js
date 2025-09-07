// here we will setup the connection to MongoDB using mongoose

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect using the MONGODB_URI from .env file
    await mongoose.connect(process.env.MONGODB_URI);
    
    // If successful, log a friendly success message
    console.log(`MongoDB connected at ${process.env.PORT} `);
  } catch (error) {
    // If there is an error, log it and exit the process
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit with failure code
  }
};

// Export the function so it can be used in other files
export default connectDB;
