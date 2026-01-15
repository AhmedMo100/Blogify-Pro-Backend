import { Router } from "express";
import {
    register,
    login,
    logout,
    getMe,
    changePassword,
} from "./auth.controller";
import {
    registrationValidation,
    loginValidation,
    changePasswordValidation,
} from "./auth.validation";
import validateRequest from "../../middlewares/validateRequest.middleware";
import authMiddleware from "../../middlewares/auth.middleware";

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", registrationValidation, validateRequest, register);

/**
 * @route   POST /api/auth/login
 * @desc    Login a user
 * @access  Public
 */
router.post("/login", loginValidation, validateRequest, login);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout a user
 * @access  Private
 */
router.post("/logout", authMiddleware, logout);

/**
 * @route   GET /api/auth/me
 * @desc    Get authenticated user info
 * @access  Private
 */
router.get("/me", authMiddleware, getMe);

/**
 * @route   PATCH /api/auth/change-password
 * @desc    Change authenticated user's password
 * @access  Private
 */
router.patch(
    "/change-password",
    authMiddleware,
    changePasswordValidation,
    validateRequest,
    changePassword
);

export default router;
