import { Router } from "express";
import {
    createNotification,
    getNotifications,
    updateNotification,
    deleteNotification,
} from "./notifications.controller";
import validateRequest from "../../middlewares/validateRequest.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
    createNotificationValidation,
    updateNotificationValidation,
} from "./notifications.validation";

const router = Router();

/**
 * @route   POST /api/notifications
 * @desc    Create a new notification (usually internal)
 * @access  Private (Admin or internal use)
 */
router.post(
    "/",
    authMiddleware,
    createNotificationValidation,
    validateRequest,
    createNotification
);

/**
 * @route   GET /api/notifications
 * @desc    Get all notifications for logged-in user
 * @access  Private
 */
router.get("/", authMiddleware, getNotifications);

/**
 * @route   PATCH /api/notifications/:id/read
 * @desc    Mark a notification as read/unread
 * @access  Private
 */
router.patch(
    "/:id/read",
    authMiddleware,
    updateNotificationValidation,
    validateRequest,
    updateNotification
);

/**
 * @route   DELETE /api/notifications/:id
 * @desc    Delete a notification
 * @access  Private
 */
router.delete("/:id", authMiddleware, deleteNotification);

export default router;
