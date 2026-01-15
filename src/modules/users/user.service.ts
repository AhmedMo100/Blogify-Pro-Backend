import UserModel from "./user.model";
import ApiError from "../../utils/apiError";
import { IUpdateProfile } from "./user.types";

/**
 * Get authenticated user profile
 */
export const getProfile = async (userId: string) => {
    const user = await UserModel.findById(userId);

    if (!user) {
        throw new ApiError("User not found", 404);
    }

    return user;
};

/**
 * Update user profile
 */
export const updateProfile = async (
    userId: string,
    data: IUpdateProfile
) => {
    const user = await UserModel.findById(userId);

    if (!user) {
        throw new ApiError("User not found", 404);
    }

    // Update only allowed fields
    if (data.name !== undefined) user.name = data.name;
    if (data.email !== undefined) user.email = data.email;
    if (data.password !== undefined) user.password = data.password; // لو عندك hashing لازم تعملها هنا
    if (data.notificationsEnabled !== undefined) user.notificationsEnabled = data.notificationsEnabled;

    await user.save();

    return user;
};

/**
 * Delete user account (hard delete)
 * You can later change to soft delete if needed
 */
export const deleteAccount = async (userId: string) => {
    const user = await UserModel.findByIdAndDelete(userId);

    if (!user) {
        throw new ApiError("User not found", 404);
    }

    return {
        message: "Account deleted successfully",
    };
};
