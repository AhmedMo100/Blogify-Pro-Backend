import mongoose from "mongoose";
import env from "./env";

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(env.MONGO_URI);
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }

    // Log connection events
    mongoose.connection.on("disconnected", () => {
        console.warn("⚠️ MongoDB Disconnected!");
    });

    mongoose.connection.on("reconnected", () => {
        console.log("🔄 MongoDB Reconnected");
    });
};

export default connectDB;
