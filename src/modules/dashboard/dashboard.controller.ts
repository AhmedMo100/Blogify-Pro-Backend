import { Request, Response, NextFunction } from "express";
import * as DashboardService from "./dashboard.service";
import ApiResponse from "../../utils/apiResponse";

// ---------------- Get Dashboard Statistics ----------------
export const getStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stats = await DashboardService.getDashboardStats();
        return ApiResponse.success({
            res,
            message: "Dashboard statistics fetched successfully",
            data: stats,
        });
    } catch (error) {
        next(error);
    }
};

// ---------------- Get Recent Activity Logs ----------------
export const getActivityLogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const activities = await DashboardService.getActivityLogs();
        return ApiResponse.success({
            res,
            message: "Recent activity logs fetched successfully",
            data: activities,
        });
    } catch (error) {
        next(error);
    }
};

// ---------------- Get Admin Blogs ----------------
export const getAdminBlogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogs = await DashboardService.getAdminBlogs();
        return ApiResponse.success({
            res,
            message: "Admin blogs fetched successfully",
            data: blogs,
        });
    } catch (error) {
        next(error);
    }
};
