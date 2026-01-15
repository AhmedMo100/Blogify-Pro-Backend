interface EnvConfig {
    PORT: number;
    MONGO_URI: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    OPENROUTER_API_KEY_GPTOSS: string;

    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
}

const env: EnvConfig = {
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 5000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/blogify_pro",
    JWT_SECRET: process.env.JWT_SECRET || "defaultsecret",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
    OPENROUTER_API_KEY_GPTOSS: process.env.OPENROUTER_API_KEY_GPTOSS || "",

    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
};

export default env;
