import { Response } from "express";

interface IApiResponse {
    res: Response;
    statusCode?: number;
    message?: string;
    data?: any;
    errors?: any;
}

class ApiResponse {
    // Success response
    static success({ res, statusCode = 200, message = "Success", data = {} }: IApiResponse) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }

    // Error response
    static error({ res, statusCode = 500, message = "Internal Server Error", errors = null }: IApiResponse) {
        return res.status(statusCode).json({
            success: false,
            message,
            errors,
        });
    }

    // Validation error response
    static validation({ res, statusCode = 400, message = "Validation Error", errors = null }: IApiResponse) {
        return res.status(statusCode).json({
            success: false,
            message,
            errors,
        });
    }
}

export default ApiResponse;
