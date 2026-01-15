import { Request, Response, NextFunction } from "express";
import * as UserService from "./user.service";
import ApiResponse from "../../utils/apiResponse";
import { INotification } from "./user.types";

// ---------------- Get Profile ----------------
export const getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user.id; // from auth.middleware
        const user = await UserService.getProfile(userId);

        return ApiResponse.success({
            res,
            message: "Profile fetched successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

// ---------------- Update Profile ----------------
export const updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user.id;
        const updatedUser = await UserService.updateProfile(userId, req.body);

        return ApiResponse.success({
            res,
            message: "Profile updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};

// ---------------- Delete Account ----------------
export const deleteAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user.id;
        const result = await UserService.deleteAccount(userId);

        return ApiResponse.success({
            res,
            message: result.message,
        });
    } catch (error) {
        next(error);
    }
};

// ---------------- Notifications ----------------
// Dummy implementations (replace with actual logic later)
export const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notifications: INotification[] = []; // type specified
        return ApiResponse.success({
            res,
            message: "Notifications fetched successfully",
            data: notifications,
        });
    } catch (error) {
        next(error);
    }
};

export const markNotificationRead = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notificationId = req.params.id;
        // mark notification as read in DB
        return ApiResponse.success({
            res,
            message: `Notification ${notificationId} marked as read`,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notificationId = req.params.id;
        // delete notification in DB
        return ApiResponse.success({
            res,
            message: `Notification ${notificationId} deleted successfully`,
        });
    } catch (error) {
        next(error);
    }
};
