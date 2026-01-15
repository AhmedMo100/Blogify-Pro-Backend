import UserModel from "../users/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiError from "../../utils/apiError";

// ---------------- Register ----------------
export const register = async (name: string, email: string, password: string) => {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) throw new ApiError("Email already exists", 400);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword,
    });

    const { password: _, ...userData } = newUser.toObject();
    return userData;
};

// ---------------- Login ----------------
export const login = async (email: string, password: string) => {
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) throw new ApiError("Invalid credentials", 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ApiError("Invalid credentials", 401);

    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1d" }
    );

    const { password: _, ...userData } = user.toObject();
    return { user: userData, token };
};

// ---------------- Logout ----------------
export const logout = async (userId: string) => {
    // ممكن نضيف token blacklist لو حابب حماية أقوى
    return { message: "Logout successful" };
};

// ---------------- Get Authenticated User ----------------
export const getMe = async (userId: string) => {
    const user = await UserModel.findById(userId);
    if (!user) throw new ApiError("User not found", 404);

    const { password: _, ...userData } = user.toObject();
    return userData;
};

// ---------------- Change Password ----------------
export const changePassword = async (
    userId: string,
    currentPassword: string,
    newPassword: string
) => {
    const user = await UserModel.findById(userId).select("+password");
    if (!user) throw new ApiError("User not found", 404);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new ApiError("Current password is incorrect", 400);

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return { message: "Password changed successfully" };
};
