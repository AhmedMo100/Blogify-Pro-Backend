// src/config/ai.ts
import axios from "axios";
import env from "./env";

// --------- Validation ---------
if (!env.OPENROUTER_API_KEY_GPTOSS) {
    throw new Error("❌ OPENROUTER_API_KEY_GPTOSS is missing in .env");
}

// --------- OpenRouter Client ---------
const openRouterGPTOSS = axios.create({
    baseURL: "https://openrouter.ai/api/v1",
    headers: {
        Authorization: `Bearer ${env.OPENROUTER_API_KEY_GPTOSS}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5010",
        "X-Title": "Blogify Pro GPT-OSS",
    },
});

/**
 * Generate text using GPT-OSS 20B via OpenRouter
 */
export const generateGPTOSSText = async (
    prompt: string,
    temperature = 0.7
): Promise<string> => {
    try {
        const response = await openRouterGPTOSS.post("/chat/completions", {
            model: "openai/gpt-oss-20b:free",
            messages: [
                { role: "system", content: "You are a professional content writer and SEO expert." },
                { role: "user", content: prompt },
            ],
            temperature,
        });

        const content = response.data?.choices?.[0]?.message?.content;

        if (!content) {
            console.error("❌ OpenRouter GPT-OSS empty response:", response.data);
            throw new Error("Empty AI response");
        }

        return content;
    } catch (err: any) {
        console.error("❌ FULL OpenRouter GPT-OSS Error:", {
            status: err.response?.status,
            data: err.response?.data,
            headers: err.response?.headers,
            message: err.message,
        });
        throw err; // سيبه يطلع مش ApiError
    }
};

export default {
    generateGPTOSSText,
};
