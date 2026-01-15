import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/* =========================
   Create Blog
========================= */
export const createBlogValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(150).required(),
        content: Joi.string().min(50).required(),
        excerpt: Joi.string().max(300).optional(),

        seo: Joi.object({
            metaTitle: Joi.string().max(70).optional(),
            metaDescription: Joi.string().max(160).optional(),
            keywords: Joi.array().items(Joi.string().min(2)).optional(),
        }).optional(),

        status: Joi.string().valid("draft", "published", "scheduled").optional(),
        scheduledFor: Joi.date().greater("now").optional(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const message = error.details.map((d) => d.message).join(", ");
        return res.status(400).json({ success: false, message });
    }

    if (req.body.status === "scheduled" && !req.body.scheduledFor) {
        return res.status(400).json({
            success: false,
            message: "scheduledFor is required when status is 'scheduled'",
        });
    }

    next();
};

/* =========================
   Update Blog
========================= */
export const updateBlogValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(150).optional(),
        content: Joi.string().min(50).optional(),
        excerpt: Joi.string().max(300).optional(),

        seo: Joi.object({
            metaTitle: Joi.string().max(70).optional(),
            metaDescription: Joi.string().max(160).optional(),
            keywords: Joi.array().items(Joi.string().min(2)).optional(),
        }).optional(),

        status: Joi.string()
            .valid("draft", "published", "scheduled", "archived")
            .optional(),

        scheduledFor: Joi.date().greater("now").optional(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const message = error.details.map((d) => d.message).join(", ");
        return res.status(400).json({ success: false, message });
    }

    if (req.body.status === "scheduled" && !req.body.scheduledFor) {
        return res.status(400).json({
            success: false,
            message: "scheduledFor is required when status is 'scheduled'",
        });
    }

    next();
};

/* =========================
   Add Comment
========================= */
export const addCommentValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        text: Joi.string().min(1).max(1000).required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const message = error.details.map((d) => d.message).join(", ");
        return res.status(400).json({ success: false, message });
    }

    next();
};

/* =========================
   Add Share
========================= */
export const addShareValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        platform: Joi.string()
            .valid("facebook", "twitter", "linkedin", "whatsapp", "other")
            .required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const message = error.details.map((d) => d.message).join(", ");
        return res.status(400).json({ success: false, message });
    }

    next();
};

/* =========================
   List Blogs (Query)
========================= */
export const listBlogsValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        page: Joi.number().min(1).optional(),
        limit: Joi.number().min(1).max(50).optional(),
        search: Joi.string().min(1).optional(),
        status: Joi.string()
            .valid("draft", "published", "scheduled", "archived")
            .optional(),
        author: Joi.string().hex().length(24).optional(),
    });

    const { error } = schema.validate(req.query, { abortEarly: false });

    if (error) {
        const message = error.details.map((d) => d.message).join(", ");
        return res.status(400).json({ success: false, message });
    }

    next();
};
