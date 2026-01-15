//! ========================= Core Blog Types =========================

export type BlogStatus = "draft" | "published" | "scheduled" | "archived";

// Comment model
export interface IComment {
    id: string;
    user: {
        id: string;
        username: string;
        avatar?: string;
    };
    text: string;
    createdAt: string;
}

// Share model
export interface IShare {
    id: string;
    platform: "facebook" | "twitter" | "linkedin" | "whatsapp" | "other";
    user?: {
        id: string;
        username: string;
    };
    createdAt: string;
}

// Cloudinary image
export interface IFeaturedImage {
    url: string;
    publicId: string;
}

// Main Blog model (returned to frontend)
export interface IBlog {
    id: string;

    title: string;
    slug: string;
    content: string;
    excerpt?: string;

    featuredImage?: IFeaturedImage;

    status: BlogStatus;

    author: {
        id: string;
        username: string;
        avatar?: string;
    };

    seo: {
        metaTitle?: string;
        metaDescription?: string;
        keywords?: string[];
    };

    views: number;
    readingTime: number;

    comments: IComment[];
    likes: string[];
    shares: IShare[];

    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
}

//! ========================= Request DTOs =========================

// 🚫 image لا تأتي من body
export interface ICreateBlog {
    title: string;
    content: string;
    excerpt?: string;
    status?: "draft" | "published" | "scheduled";
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        keywords?: string[];
    };
}

// 🚫 image لا تأتي من body
export interface IUpdateBlog {
    title?: string;
    content?: string;
    excerpt?: string;
    status?: BlogStatus;
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        keywords?: string[];
    };
}

// Add comment
export interface IAddComment {
    text: string;
}

// Toggle like
export interface IToggleLike {
    userId: string;
}

// Add share
export interface IAddShare {
    platform: "facebook" | "twitter" | "linkedin" | "whatsapp" | "other";
    userId?: string;
}

// Query
export interface IBlogQuery {
    page?: number;
    limit?: number;
    search?: string;
    tag?: string;
    author?: string;
    status?: BlogStatus;
}

//! ========================= Responses =========================

export interface IGetBlogsResponse {
    blogs: IBlog[];
    page: number;
    totalPages: number;
    totalBlogs: number;
}

export interface IGetBlogResponse {
    blog: IBlog;
}

export interface ICreateBlogResponse {
    message: string;
    blog: IBlog;
}

export interface IUpdateBlogResponse {
    message: string;
    blog: IBlog;
}

export interface IDeleteBlogResponse {
    message: string;
}

export interface IAddCommentResponse {
    message: string;
    comment: IComment;
}

export interface IToggleLikeResponse {
    message: string;
    liked: boolean;
    likesCount: number;
}

export interface IAddShareResponse {
    message: string;
    share: IShare;
}
