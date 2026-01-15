import express, { Application } from "express";
import cors from "cors";
import errorHandler from "./middlewares/error.middleware";

// ----------------- Routes Imports -----------------
import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/users/user.routes";
import blogRoutes from "./modules/blogs/blog.routes";
import aiRoutes from "./modules/ai/ai.routes";
import notificationRoutes from "./modules/notifications/notifications.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";

const app: Application = express();

// ----------------- Middleware -----------------
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true,
  })
);
app.use(express.json());

// ----------------- Routes -----------------
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard", dashboardRoutes); // Dashboard routes

// ----------------- Health Check -----------------
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// ----------------- Error Handler -----------------
app.use(errorHandler);

export default app;
