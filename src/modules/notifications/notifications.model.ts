import mongoose, { Schema, Document, Types } from "mongoose";

// Interface for Notification
export interface INotification extends Document {
    user: Types.ObjectId; // The recipient of the notification
    blog?: Types.ObjectId; // Optional: related blog
    title: string;         // Notification title
    message: string;       // Notification message/content
    type: "like" | "share" | "comment" | "register" | "new_blog"; // Type of notification
    isRead: boolean;       // Whether the notification has been read
    createdAt: Date;
    updatedAt: Date;
}

const notificationSchema: Schema<INotification> = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            comment: "The recipient of the notification",
        },

        blog: {
            type: Schema.Types.ObjectId,
            ref: "Blog",
            required: false,
            comment: "Optional reference to a related blog",
        },

        title: {
            type: String,
            required: true,
            trim: true,
            comment: "Notification title",
        },

        message: {
            type: String,
            required: true,
            trim: true,
            comment: "Notification message content",
        },

        type: {
            type: String,
            enum: ["like", "share", "comment", "register", "new_blog"],
            required: true,
            comment: "Type of notification",
        },

        isRead: {
            type: Boolean,
            default: false,
            comment: "Flag indicating if the notification has been read",
        },
    },
    { timestamps: true } // Automatically manage createdAt & updatedAt
);

const NotificationModel = mongoose.model<INotification>(
    "Notification",
    notificationSchema
);

export default NotificationModel;
