import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected");
    console.log("CONNECTED TO DB:", mongoose.connection.name);
  } catch (error) {
    console.error("DB error", error);
    process.exit(1);
  }
};

export default connectDB;
