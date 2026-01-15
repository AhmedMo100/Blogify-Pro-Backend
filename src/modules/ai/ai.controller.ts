import { Request, Response, NextFunction } from "express";
import * as AIService from "./ai.service";
import ApiResponse from "../../utils/apiResponse";
import {
    IGenerateBlogRequest,
    IGenerateOutlineRequest,
    IRewriteRequest,
    IImproveRequest,
    ISEORequest,
} from "./ai.types";

/**
 * POST /api/ai/generate-blog
 */
export const generateBlog = async (
    req: Request<{}, {}, IGenerateBlogRequest>,
    res: Response,
    next: NextFunction
) => {
    try {
        const content = await AIService.generateBlog(req.body);

        return ApiResponse.success({
            res,
            message: "Blog generated successfully",
            data: content,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/ai/generate-outline
 */
export const generateOutline = async (
    req: Request<{}, {}, IGenerateOutlineRequest>,
    res: Response,
    next: NextFunction
) => {
    try {
        const content = await AIService.generateOutline(req.body);

        return ApiResponse.success({
            res,
            message: "Outline generated successfully",
            data: content,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/ai/rewrite
 */
export const rewriteContent = async (
    req: Request<{}, {}, IRewriteRequest>,
    res: Response,
    next: NextFunction
) => {
    try {
        const content = await AIService.rewriteContent(req.body);

        return ApiResponse.success({
            res,
            message: "Content rewritten successfully",
            data: content,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/ai/improve
 */
export const improveContent = async (
    req: Request<{}, {}, IImproveRequest>,
    res: Response,
    next: NextFunction
) => {
    try {
        const content = await AIService.improveContent(req.body);

        return ApiResponse.success({
            res,
            message: "Content improved successfully",
            data: content,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/ai/seo
 */
export const generateSEO = async (
    req: Request<{}, {}, ISEORequest>,
    res: Response,
    next: NextFunction
) => {
    try {
        const content = await AIService.generateSEO(req.body);

        return ApiResponse.success({
            res,
            message: "SEO metadata generated successfully",
            data: content,
        });
    } catch (err) {
        next(err);
    }
};
