import { Router } from "express";
import {
    getStats,
    getActivityLogs,
    getAdminBlogs,
} from "./dashboard.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/role.middleware";

const router = Router();

/**
 * @route   GET /api/dashboard/stats
 * @desc    Get platform statistics
 * @access  Private/Admin
 */
router.get("/stats", authMiddleware, adminMiddleware, getStats);

/**
 * @route   GET /api/dashboard/activity
 * @desc    Get recent activity logs
 * @access  Private/Admin
 */
router.get("/activity", authMiddleware, adminMiddleware, getActivityLogs);

/**
 * @route   GET /api/dashboard/blogs
 * @desc    Get all blogs for admin
 * @access  Private/Admin
 */
router.get("/blogs", authMiddleware, adminMiddleware, getAdminBlogs);

export default router;
