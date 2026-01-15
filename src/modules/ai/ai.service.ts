import { v4 as uuidv4 } from "uuid";
import ApiError from "../../utils/apiError";
import { generateGPTOSSText } from "../../config/ai";
import { 
    IAIContent, 
    IAIRequest,
    AIModel,
    AIActionType,
    IGenerateBlogRequest,
    IGenerateOutlineRequest,
    IRewriteRequest,
    IImproveRequest,
    ISEORequest
} from "./ai.types";

/**
 * Helper: Core AI call for GPT-OSS 20B
 */
const callGPTOSS = async (prompt: string, temperature: number): Promise<string> => {
    try {
        return await generateGPTOSSText(prompt, temperature);
    } catch (err: any) {
        console.error("❌ AI GPT-OSS Error:", err.response?.data || err.message || err);
        throw new ApiError("AI generation failed", 500);
    }
};

/**
 * Generic AI content generator
 */
const generateAI = async (
    data: IAIRequest, 
    actionType: AIActionType
): Promise<IAIContent> => {
    if (!data.prompt || data.prompt.trim() === "") {
        throw new ApiError("Prompt is required", 400);
    }

    const model: AIModel = data.model || "gpt-oss"; // internal name
    const temperature = data.temperature ?? 0.7;

    let generatedText: string;

    if (model === "gpt-oss") {
        generatedText = await callGPTOSS(data.prompt, temperature);
    } else {
        throw new ApiError(`Model "${model}" not supported yet`, 400);
    }

    const content: IAIContent = {
        id: uuidv4(),
        model,
        actionType,
        prompt: data.prompt,
        generatedText,
        temperature,
        createdAt: new Date().toISOString(),
    };

    return content;
};

/**
 * Generate full blog
 */
export const generateBlog = async (data: IGenerateBlogRequest): Promise<IAIContent> => {
    const prompt = `Write a full detailed blog post based on: ${data.prompt}`;
    return await generateAI({ ...data, prompt }, "generate-blog");
};

/**
 * Generate blog outline
 */
export const generateOutline = async (data: IGenerateOutlineRequest): Promise<IAIContent> => {
    const prompt = `Create a detailed outline for a blog based on: ${data.prompt}`;
    return await generateAI({ ...data, prompt }, "generate-outline");
};

/**
 * Rewrite content
 */
export const rewriteContent = async (data: IRewriteRequest): Promise<IAIContent> => {
    const prompt = `Rewrite the following content clearly and concisely: ${data.prompt}`;
    return await generateAI({ ...data, prompt }, "rewrite");
};

/**
 * Improve tone & clarity
 */
export const improveContent = async (data: IImproveRequest): Promise<IAIContent> => {
    const prompt = `Improve the tone and clarity of this content: ${data.prompt}`;
    return await generateAI({ ...data, prompt }, "improve");
};

/**
 * Generate SEO metadata
 */
export const generateSEO = async (data: ISEORequest): Promise<IAIContent> => {
    const prompt = `Generate SEO-friendly title, description, and keywords for: ${data.prompt}`;
    return await generateAI({ ...data, prompt }, "seo");
};
