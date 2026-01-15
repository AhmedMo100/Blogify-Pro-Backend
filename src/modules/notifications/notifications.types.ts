//! ========================= Request DTOs =========================

// Data needed to create a notification
export interface ICreateNotification {
    user: string;                 // Recipient user ID
    blog?: string;                // Optional related blog ID
    title: string;                // Notification title
    message: string;              // Notification message/content
    type: "like" | "share" | "comment" | "register" | "new_blog"; // Type of notification
}

// Data allowed to be updated (mark as read)
export interface IUpdateNotification {
    isRead: boolean;              // Mark notification as read/unread
}



//! ========================= Response Models =========================

// Full notification returned to frontend
export interface INotificationResponse {
    id: string;
    user: string;                 // Recipient user ID
    blog?: string;                // Related blog ID (if any)
    title: string;                // Notification title
    message: string;              // Notification message/content
    type: "like" | "share" | "comment" | "register" | "new_blog"; // Type of notification
    isRead: boolean;              // Read status
    createdAt: string;
    updatedAt: string;
}

// Response for GET /notifications
export interface IGetNotificationsResponse {
    notifications: INotificationResponse[];
}

// Response for PATCH /notifications/:id/read
export interface IUpdateNotificationResponse {
    message: string;
    notification: INotificationResponse;
}

// Response for DELETE /notifications/:id
export interface IDeleteNotificationResponse {
    message: string;
}
