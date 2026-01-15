import BlogModel from "../blogs/blog.model";
import UserModel from "../users/user.model";
import { IDashboardStats, IActivityLog, IAdminBlogItem } from "./dashboard.types";
import mongoose from "mongoose";

interface IPopulatedBlog {
    _id: mongoose.Types.ObjectId;
    title: string;
    status: "draft" | "published" | "scheduled";
    author: { _id: mongoose.Types.ObjectId; username: string };
    createdAt: Date;
    updatedAt: Date;
    likes: { _id: mongoose.Types.ObjectId; username: string }[];
    comments: {
        user: { _id: mongoose.Types.ObjectId; username: string };
        createdAt: Date;
    }[];
    shares: {
        user?: { _id: mongoose.Types.ObjectId; username: string };
        createdAt: Date;
    }[];
}

/**
 * ================= Dashboard Stats =================
 */
export const getDashboardStats = async (): Promise<IDashboardStats> => {
    const totalUsers = await UserModel.countDocuments();
    const totalBlogs = await BlogModel.countDocuments({ status: { $ne: "archived" } });
    const totalPublishedBlogs = await BlogModel.countDocuments({ status: "published" });
    const totalDraftBlogs = await BlogModel.countDocuments({ status: "draft" });

    const blogs = await BlogModel.find({ status: { $ne: "archived" } })
        .select("likes comments shares")
        .lean();

    let totalLikes = 0;
    let totalComments = 0;
    let totalShares = 0;

    blogs.forEach(blog => {
        totalLikes += blog.likes?.length || 0;
        totalComments += blog.comments?.length || 0;
        totalShares += blog.shares?.length || 0;
    });

    return {
        totalUsers,
        totalBlogs,
        totalPublishedBlogs,
        totalDraftBlogs,
        totalLikes,
        totalComments,
        totalShares,
    };
};

/**
 * ================= Activity Logs =================
 */
export const getActivityLogs = async (): Promise<IActivityLog[]> => {
    const recentUsers = await UserModel.find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();

    const userActivities: IActivityLog[] = recentUsers.map(user => ({
        type: "new_user",
        user: user.username,
        date: user.createdAt.toISOString(),
    }));

    const recentBlogs = await BlogModel.find({ status: { $ne: "archived" } })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("author", "username")
        .populate("likes", "username")
        .populate("comments.user", "username")
        .populate("shares.user", "username")
        .lean<IPopulatedBlog[]>();

    const blogActivities: IActivityLog[] = recentBlogs.map(blog => ({
        type: "new_blog",
        blog: blog.title,
        user: blog.author.username,
        date: blog.createdAt.toISOString(),
    }));

    const engagementActivities: IActivityLog[] = [];

    recentBlogs.forEach(blog => {
        blog.likes?.forEach(user => {
            engagementActivities.push({
                type: "like",
                blog: blog.title,
                user: user.username,
                date: blog.updatedAt.toISOString(),
            });
        });

        blog.comments?.forEach(comment => {
            engagementActivities.push({
                type: "comment",
                blog: blog.title,
                user: comment.user.username,
                date: comment.createdAt.toISOString(),
            });
        });

        blog.shares?.forEach(share => {
            if (share.user) {
                engagementActivities.push({
                    type: "share",
                    blog: blog.title,
                    user: share.user.username,
                    date: share.createdAt.toISOString(),
                });
            }
        });
    });

    const allActivities = [...userActivities, ...blogActivities, ...engagementActivities];
    allActivities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return allActivities.slice(0, 20); // limit noise
};

/**
 * ================= Admin Blogs =================
 */
export const getAdminBlogs = async (): Promise<IAdminBlogItem[]> => {
    const blogs = await BlogModel.find({ status: { $ne: "archived" } })
        .populate("author", "username")
        .sort({ createdAt: -1 })
        .lean<IPopulatedBlog[]>();

    return blogs.map(blog => ({
        id: blog._id.toString(),
        title: blog.title,
        status: blog.status,
        author: blog.author.username,
        createdAt: blog.createdAt.toISOString(),
        updatedAt: blog.updatedAt.toISOString(),
    }));
};
