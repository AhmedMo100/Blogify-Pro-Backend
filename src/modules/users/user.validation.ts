import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// ---------------- Update Profile Validation ----------------
export const updateProfileValidation = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).optional(),
        email: Joi.string().email().optional(),
        password: Joi.string().min(6).optional(),
        notificationsEnabled: Joi.boolean().optional(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const message = error.details.map((d) => d.message).join(", ");
        return res.status(400).json({ success: false, message });
    }

    next();
};
