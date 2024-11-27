import mongoose from "mongoose";

const Connection = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error while connecting to the database:", error);
    process.exit(1);
  }
};

export default Connection;
