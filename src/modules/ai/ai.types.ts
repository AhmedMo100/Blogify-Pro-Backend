//! ========================= Core AI Types =========================

// Model name/type for AI
export type AIModel = "gemeni" | "gpt-oss" | "other-models";

// Action types for AI
export type AIActionType = "generate-blog" | "generate-outline" | "rewrite" | "improve" | "seo";

// Main AI generation result returned to frontend
export interface IAIContent {
    id: string;           // generated id for tracking
    model: AIModel;
    actionType: AIActionType; // type of AI action
    prompt: string;
    generatedText: string;
    temperature: number;   // creativity level (0-1)
    createdAt: string;
}

//! ========================= Request DTOs =========================

// Generic AI request
export interface IAIRequest {
    prompt: string;
    model?: AIModel;       // default "gemeni"
    temperature?: number;  // default 0.7
}

// Specific AI requests for each endpoint
export interface IGenerateBlogRequest extends IAIRequest {}
export interface IGenerateOutlineRequest extends IAIRequest {}
export interface IRewriteRequest extends IAIRequest {}
export interface IImproveRequest extends IAIRequest {}
export interface ISEORequest extends IAIRequest {}

//! ========================= Response Models =========================

// Response for AI generation endpoints
export interface IGenerateAIResponse {
    message: string;
    content: IAIContent;
}

// Optional: Response for listing previous AI generations (if we store them)
export interface IGetAIGenerationsResponse {
    generations: IAIContent[];
    page: number;
    totalPages: number;
    totalGenerations: number;
}
