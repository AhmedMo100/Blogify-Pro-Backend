import { Router } from "express";
import {
    getProfile,
    updateProfile,
    deleteAccount,
    getNotifications,
    markNotificationRead,
    deleteNotification,
} from "./user.controller";
import validateRequest from "../../middlewares/validateRequest.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { updateProfileValidation } from "./user.validation";

const router = Router();

/**
 * ---------------- Profile Routes ----------------
 */

/**
 * @route   GET /api/users/profile
 * @desc    Get logged-in user's profile
 * @access  Private
 */
router.get("/profile", authMiddleware, getProfile);

/**
 * @route   PATCH /api/users/profile
 * @desc    Update logged-in user's profile
 * @access  Private
 */
router.patch(
    "/profile",
    authMiddleware,
    updateProfileValidation,
    validateRequest,
    updateProfile
);

/**
 * @route   DELETE /api/users/profile
 * @desc    Delete logged-in user's account
 * @access  Private
 */
router.delete("/profile", authMiddleware, deleteAccount);

/**
 * ---------------- Notifications Routes ----------------
 */

/**
 * @route   GET /api/users/notifications
 * @desc    Get logged-in user's notifications
 * @access  Private
 */
router.get("/notifications", authMiddleware, getNotifications);

/**
 * @route   PATCH /api/users/notifications/:id/read
 * @desc    Mark a notification as read
 * @access  Private
 */
router.patch("/notifications/:id/read", authMiddleware, markNotificationRead);

/**
 * @route   DELETE /api/users/notifications/:id
 * @desc    Delete a notification
 * @access  Private
 */
router.delete("/notifications/:id", authMiddleware, deleteNotification);

export default router;
