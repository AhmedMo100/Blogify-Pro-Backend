//! ========================= Dashboard Types =========================

// -------------------- Stats --------------------
export interface IDashboardStats {
    totalUsers: number;       // Total registered users
    totalBlogs: number;       // Total blogs in the platform
    totalPublishedBlogs: number; // Number of published blogs
    totalDraftBlogs: number;     // Number of drafts
    totalLikes: number;       // Total likes on all blogs
    totalComments: number;    // Total comments on all blogs
    totalShares: number;      // Total shares on all blogs
}

// Response for GET /dashboard/stats
export interface IGetDashboardStatsResponse {
    stats: IDashboardStats;
}

// -------------------- Activity Logs --------------------
export type ActivityType =
    | "new_user"
    | "new_blog"
    | "like"
    | "comment"
    | "share";

export interface IActivityLog {
    type: ActivityType;
    user?: string;           // Username who triggered the action
    blog?: string;           // Blog title related to the action
    date: string;            // ISO string of the event date
}

// Response for GET /dashboard/activity
export interface IGetActivityResponse {
    activities: IActivityLog[];
}

// -------------------- Admin Blogs List --------------------
export interface IAdminBlogItem {
    id: string;
    title: string;
    status: "draft" | "published" | "scheduled";
    author: string;
    createdAt: string;
    updatedAt: string;
}

export interface IGetAdminBlogsResponse {
    blogs: IAdminBlogItem[];
}
