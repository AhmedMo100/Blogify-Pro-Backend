import { Request, Response, NextFunction } from "express";
import * as NotificationService from "./notifications.service";
import ApiResponse from "../../utils/apiResponse";

// ---------------- Create Notification ----------------
// Usually called internally, not directly by frontend
export const createNotification = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const notification = await NotificationService.createNotification(req.body);

        return ApiResponse.success({
            res,
            message: "Notification created successfully",
            data: notification,
        });
    } catch (error) {
        next(error);
    }
};

// ---------------- Get Notifications for a User ----------------
export const getNotifications = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user.id; // from auth.middleware
        const notifications = await NotificationService.getUserNotifications(userId);

        return ApiResponse.success({
            res,
            message: "Notifications fetched successfully",
            data: notifications,
        });
    } catch (error) {
        next(error);
    }
};

// ---------------- Update Notification (mark as read/unread) ----------------
export const updateNotification = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const notificationId = req.params.id;
        const updatedNotification = await NotificationService.updateNotification(notificationId, req.body);

        return ApiResponse.success({
            res,
            message: "Notification updated successfully",
            data: updatedNotification,
        });
    } catch (error) {
        next(error);
    }
};

// ---------------- Delete Notification ----------------
export const deleteNotification = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const notificationId = req.params.id;
        const result = await NotificationService.deleteNotification(notificationId);

        return ApiResponse.success({
            res,
            message: result.message,
        });
    } catch (error) {
        next(error);
    }
};
