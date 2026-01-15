// src/modules/ai/ai.validation.ts
import Joi from "joi";
import { Request, Response, NextFunction } from "express";

//! ========================= Generate AI Content =========================
export const generateAIValidation = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        prompt: Joi.string().min(5).max(5000).required(), // prompt is required
        model: Joi.string().valid("gemeni").optional(),   // currently only gemeni
        temperature: Joi.number().min(0).max(1).optional(), // creativity level
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const message = error.details.map(d => d.message).join(", ");
        return res.status(400).json({ success: false, message });
    }

    next();
};
