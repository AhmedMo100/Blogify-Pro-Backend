import { Request, Response, NextFunction } from "express";
import * as AuthService from "./auth.service";
import ApiResponse from "../../utils/apiResponse";
import ApiError from "../../utils/apiError";

// ---------------- Register ----------------
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const user = await AuthService.register(name, email, password);

        return ApiResponse.success({
            res,
            message: "User registered successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

// ---------------- Login ----------------
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await AuthService.login(email, password);

        return ApiResponse.success({
            res,
            message: "Login successful",
            data: { user, token },
        });
    } catch (error) {
        next(error);
    }
};

// ---------------- Logout ----------------
export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw new ApiError("Not authorized", 401);

        const result = await AuthService.logout(userId);
        return ApiResponse.success({ res, message: result.message });
    } catch (error) {
        next(error);
    }
};

// ---------------- Get Authenticated User ----------------
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw new ApiError("Not authorized", 401);

        const user = await AuthService.getMe(userId);
        return ApiResponse.success({ res, message: "User fetched successfully", data: user });
    } catch (error) {
        next(error);
    }
};

// ---------------- Change Password ----------------
export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) throw new ApiError("Not authorized", 401);

        const { currentPassword, newPassword } = req.body;
        const result = await AuthService.changePassword(userId, currentPassword, newPassword);

        return ApiResponse.success({ res, message: result.message });
    } catch (error) {
        next(error);
    }
};
