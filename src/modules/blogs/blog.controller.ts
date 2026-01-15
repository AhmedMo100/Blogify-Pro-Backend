import { Request, Response, NextFunction } from "express";
import * as BlogService from "./blog.service";
import ApiResponse from "../../utils/apiResponse";

export const createBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorId = req.user.id;
        const blog = await BlogService.createBlog(authorId, req.body, req.file);
        return ApiResponse.success({ res, message: "Blog created successfully", data: blog });
    } catch (err) {
        next(err);
    }
};

export const getAllBlogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogs = await BlogService.getAllBlogs(req.query);
        return ApiResponse.success({ res, message: "Blogs fetched successfully", data: blogs });
    } catch (err) {
        next(err);
    }
};

export const getBlogBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blog = await BlogService.getBlogBySlug(req.params.slug);
        return ApiResponse.success({ res, message: "Blog fetched successfully", data: blog });
    } catch (err) {
        next(err);
    }
};

export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updated = await BlogService.updateBlog(
            req.params.id,
            req.user.id,
            req.body,
            req.file
        );
        return ApiResponse.success({ res, message: "Blog updated successfully", data: updated });
    } catch (err) {
        next(err);
    }
};

export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await BlogService.deleteBlog(req.params.id, req.user.id);
        return ApiResponse.success({ res, message: result.message });
    } catch (err) {
        next(err);
    }
};

export const toggleLike = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await BlogService.toggleLike(req.params.id, req.user.id);
        return ApiResponse.success({ res, message: "Like toggled", data: result });
    } catch (err) {
        next(err);
    }
};

export const addComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await BlogService.addComment(req.params.id, req.user.id, req.body);
        return ApiResponse.success({ res, message: "Comment added", data: comment });
    } catch (err) {
        next(err);
    }
};

export const addShare = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const share = await BlogService.addShare(req.params.id, {
            platform: req.body.platform,
            userId: req.user?.id,
        });
        return ApiResponse.success({ res, message: "Blog shared", data: share });
    } catch (err) {
        next(err);
    }
};
