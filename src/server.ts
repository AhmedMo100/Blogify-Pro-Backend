import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./config/db";
import env from "./config/env";

const PORT = env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Server failed to start", error);
        process.exit(1);
    }
};

startServer();
