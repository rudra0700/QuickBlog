import mongoose from "mongoose";

const connectDB = async () => {
  console.log("mongo string", process.env.MONGO_URI);
  
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    await mongoose.connect(`${process.env.MONGO_URI}/QuickBlog`);

    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // important
  }
};

export default connectDB;
