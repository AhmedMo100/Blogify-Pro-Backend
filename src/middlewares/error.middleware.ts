import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";

const errorHandler = (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (err instanceof ApiError) {
        return ApiResponse.error({
            res,
            statusCode: err.statusCode,
            message: err.message,
        });
    }

    return ApiResponse.error({
        res,
        statusCode: 500,
        message: "Internal Server Error",
        errors: err,
    });
};

export default errorHandler;
