import mongoose, { Schema, Document } from "mongoose";

// Interface
export interface IUser extends Document {
    name: string;
    username: string;   // ✅ new
    email: string;
    password: string;
    role: "user" | "admin";
    notificationsEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        username: {                  // ✅ new
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minlength: 3,
            index: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        notificationsEnabled: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;
