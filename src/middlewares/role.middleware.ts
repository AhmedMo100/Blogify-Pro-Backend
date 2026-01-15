import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";

/**
 * Middleware to check if the user has the required role(s)
 * @param roles Array of allowed roles, e.g., ["admin"]
 */
export const roleMiddleware = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // @ts-ignore
        const userRole = req.user?.role;

        if (!userRole) {
            return next(new ApiError("User role not found", 403));
        }

        if (!roles.includes(userRole)) {
            return next(new ApiError("Access denied: insufficient permissions", 403));
        }

        next();
    };
};

/**
 * Shortcut for admin-only routes
 */
export const adminMiddleware = roleMiddleware(["admin"]);
