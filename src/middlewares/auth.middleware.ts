import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError";
import UserModel from "../modules/users/user.model"; // ضروري نجلب الـ UserModel

interface JwtPayload {
    userId: string;
    role: "user" | "admin";
    tokenVersion: number; // ✅ إضافة tokenVersion
}

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError("Not authorized, no token", 401);
        }

        const token = authHeader.split(" ")[1];

        // فك التوكن
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "secret"
        ) as JwtPayload;

        // جلب المستخدم من DB للتحقق من tokenVersion
        const user = await UserModel.findById(decoded.userId);
        if (!user) throw new ApiError("User not found", 404);

        if (user.tokenVersion !== decoded.tokenVersion) {
            throw new ApiError("Token expired, please login again", 401);
        }

        // Attach user to request
        req.user = {
            id: user._id.toString(),
            role: user.role,
        };

        next();
    } catch (error) {
        next(new ApiError("Not authorized, invalid token", 401));
    }
};

export default authMiddleware;
