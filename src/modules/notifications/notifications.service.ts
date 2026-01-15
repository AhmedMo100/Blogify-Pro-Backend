import NotificationModel from "./notifications.model";
import ApiError from "../../utils/apiError";
import {
    ICreateNotification,
    IUpdateNotification,
} from "./notifications.types";

/**
 * Create a new notification
 * This can be used internally when events happen (like, comment, share, new user register, new blog)
 */
export const createNotification = async (data: ICreateNotification) => {
    const notification = await NotificationModel.create(data);
    return notification;
};

/**
 * Get all notifications for a specific user
 */
export const getUserNotifications = async (userId: string) => {
    const notifications = await NotificationModel.find({ user: userId })
        .sort({ createdAt: -1 }); // latest first
    return notifications;
};

/**
 * Mark a notification as read/unread
 */
export const updateNotification = async (
    notificationId: string,
    data: IUpdateNotification
) => {
    const notification = await NotificationModel.findById(notificationId);

    if (!notification) {
        throw new ApiError("Notification not found", 404);
    }

    if (data.isRead !== undefined) notification.isRead = data.isRead;

    await notification.save();

    return notification;
};

/**
 * Delete a notification
 */
export const deleteNotification = async (notificationId: string) => {
    const notification = await NotificationModel.findByIdAndDelete(notificationId);

    if (!notification) {
        throw new ApiError("Notification not found", 404);
    }

    return {
        message: "Notification deleted successfully",
    };
};
