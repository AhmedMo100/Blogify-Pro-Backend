import BlogModel from "./blog.model";
import ApiError from "../../utils/apiError";
import cloudinary from "../../config/cloudinary";
import {
    ICreateBlog,
    IUpdateBlog,
    IAddComment,
    IBlogQuery,
    IAddShare,
} from "./blog.types";
import slugify from "slugify";
import mongoose from "mongoose";

/* =========================
   Helpers
========================= */

const generateUniqueSlug = async (title: string) => {
    const baseSlug = slugify(title, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    while (await BlogModel.exists({ slug })) {
        slug = `${baseSlug}-${count++}`;
    }

    return slug;
};

const calculateReadingTime = (content: string) => {
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
};

/* =========================
   Cloudinary upload from buffer
========================= */

const uploadFromBuffer = (buffer: Buffer) => {
    return new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "blogs" },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        stream.end(buffer);
    });
};

/* =========================
   Create Blog
========================= */

export const createBlog = async (
    authorId: string,
    data: ICreateBlog,
    file?: Express.Multer.File
) => {
    const slug = await generateUniqueSlug(data.title);
    const readingTime = calculateReadingTime(data.content);

    let publishedAt: Date | undefined;
    if (data.status === "published") publishedAt = new Date();

    let featuredImage;
    if (file) {
        const uploadResult = await uploadFromBuffer(file.buffer);
        featuredImage = {
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id,
        };
    }

    const blog = await BlogModel.create({
        title: data.title,
        slug,
        content: data.content,
        excerpt: data.excerpt,
        featuredImage,
        seo: data.seo,
        author: authorId,
        readingTime,
        status: data.status || "draft",
        publishedAt,
        likes: [],
        comments: [],
        shares: [],
        views: 0,
        savedBy: [],
    });

    return blog;
};

/* =========================
   Update Blog
========================= */

export const updateBlog = async (
    blogId: string,
    userId: string,
    data: IUpdateBlog,
    file?: Express.Multer.File
) => {
    const blog = await getBlogById(blogId);

    if (blog.author._id.toString() !== userId)
        throw new ApiError("Not authorized", 403);

    if (data.title !== undefined) blog.title = data.title;
    if (data.content !== undefined) {
        blog.content = data.content;
        blog.readingTime = calculateReadingTime(data.content);
    }
    if (data.excerpt !== undefined) blog.excerpt = data.excerpt;

    if (file) {
        if (blog.featuredImage?.publicId) {
            await cloudinary.uploader.destroy(blog.featuredImage.publicId);
        }

        const uploadResult = await uploadFromBuffer(file.buffer);
        blog.featuredImage = {
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id,
        };
    }

    if (data.status !== undefined) {
        blog.status = data.status;
        if (data.status === "published" && !blog.publishedAt)
            blog.publishedAt = new Date();
    }

    if (data.seo) {
        blog.seo = data.seo;
    }

    await blog.save();
    return blog;
};

/* =========================
   Delete Blog
========================= */

export const deleteBlog = async (blogId: string, userId: string) => {
    const blog = await getBlogById(blogId);

    if (blog.author._id.toString() !== userId)
        throw new ApiError("Not authorized", 403);

    if (blog.featuredImage?.publicId) {
        await cloudinary.uploader.destroy(blog.featuredImage.publicId);
    }

    await blog.deleteOne();
    return { message: "Blog deleted successfully" };
};

/* =========================
   Query
========================= */

export const getAllBlogs = async (query: IBlogQuery) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: any = { status: query.status || "published" };

    if (query.search) filter.$text = { $search: query.search };
    if (query.author) filter.author = query.author;

    const blogs = await BlogModel.find(filter)
        .populate("author", "username avatar")
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await BlogModel.countDocuments(filter);

    return {
        page,
        totalPages: Math.ceil(total / limit),
        totalBlogs: total,
        blogs,
    };
};

export const getBlogBySlug = async (slug: string) => {
    const blog = await BlogModel.findOne({ slug, status: "published" })
        .populate("author", "username avatar")
        .populate("comments.user", "username avatar");

    if (!blog) throw new ApiError("Blog not found", 404);

    blog.views += 1;
    await blog.save();

    return blog;
};

export const getBlogById = async (blogId: string) => {
    if (!mongoose.Types.ObjectId.isValid(blogId))
        throw new ApiError("Invalid blog ID", 400);

    const blog = await BlogModel.findById(blogId)
        .populate("author", "username avatar")
        .populate("comments.user", "username avatar");

    if (!blog) throw new ApiError("Blog not found", 404);

    return blog;
};

export const toggleLike = async (blogId: string, userId: string) => {
    const blog = await getBlogById(blogId);
    const index = blog.likes.findIndex((id) => id.toString() === userId);
    const liked = index === -1;

    if (liked) blog.likes.push(userId as any);
    else blog.likes.splice(index, 1);

    await blog.save();
    return { liked, likesCount: blog.likes.length };
};

export const addComment = async (
    blogId: string,
    userId: string,
    data: IAddComment
) => {
    const blog = await getBlogById(blogId);
    const comment = { user: userId as any, text: data.text, createdAt: new Date() };
    blog.comments.push(comment as any);
    await blog.save();
    return blog.comments[blog.comments.length - 1];
};

export const addShare = async (blogId: string, data: IAddShare) => {
    const blog = await BlogModel.findById(blogId);
    if (!blog) throw new ApiError("Blog not found", 404);

    const share = { platform: data.platform, user: data.userId, createdAt: new Date() };
    blog.shares.push(share as any);
    await blog.save();
    return share;
};
