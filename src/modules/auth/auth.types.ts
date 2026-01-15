//! ========================= Request DTOs =========================

// Interface for user registration data
export interface IRegister {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

// Interface for user login data
export interface ILogin {
    email: string;
    password: string;
}

// Interface for changing password
export interface IChangePassword {
    currentPassword: string;
    newPassword: string;
    confirmPassword?: string;
}

// Interface for authenticated user info
export interface IGetMe {}

//! ========================= Response Models =========================

// Interface for user data returned in responses
export interface IUserData {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
}

// Interface for successful authentication response
export interface IAuthResponse {
    token: string;
    user: IUserData;
}

// Interface for change password response
export interface IChangePasswordResponse {
    message: string;
}

// Interface for logout response
export interface ILogoutResponse {
    message: string;
}
