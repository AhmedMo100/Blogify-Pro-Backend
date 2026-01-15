//! ========================= Request DTOs =========================
export interface IUpdateProfile {
    name?: string;
    email?: string;
    password?: string;
    notificationsEnabled?: boolean;
}

//! ========================= Response Models =========================
export interface IUserProfile {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    notificationsEnabled: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IGetProfileResponse {
    user: IUserProfile;
}

export interface IUpdateProfileResponse {
    message: string;
    user: IUserProfile;
}

export interface IDeleteAccountResponse {
    message: string;
}

// ---------------- Notifications ----------------
export interface INotification {
    id: string;
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
}
