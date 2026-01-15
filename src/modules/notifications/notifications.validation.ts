import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// ---------------- Create Notification Validation ----------------
export const createNotificationValidation = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        user: Joi.string().required().label("Recipient User ID"),
        blog: Joi.string().optional().label("Related Blog ID"),
        title: Joi.string().min(3).max(100).required().label("Notification Title"),
        message: Joi.string().min(3).max(300).required().label("Notification Message"),
        type: Joi.string()
            .valid("like", "share", "comment", "register", "new_blog")
            .required()
            .label("Notification Type"),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        // Aggregate all error messages
        const message = error.details.map((d) => d.message).join(", ");
        return res.status(400).json({ success: false, message });
    }

    next();
};

// ---------------- Update Notification Validation ----------------
export const updateNotificationValidation = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        isRead: Joi.boolean().required().label("Read Status"),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const message = error.details.map((d) => d.message).join(", ");
        return res.status(400).json({ success: false, message });
    }

    next();
};
