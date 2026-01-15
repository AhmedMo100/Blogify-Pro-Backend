import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import ApiResponse from "../utils/apiResponse";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return ApiResponse.validation({
            res,
            statusCode: 400,
            message: "Validation errors",
            errors: errors.array(),
        });
    }

    next();
};

export default validateRequest;
