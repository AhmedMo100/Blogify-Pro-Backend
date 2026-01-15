import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import validateRequest from "../../middlewares/validateRequest.middleware";
import {
    generateBlog,
    generateOutline,
    rewriteContent,
    improveContent,
    generateSEO,
} from "./ai.controller";
import { generateAIValidation } from "./ai.validation";

const router = Router();

/**
 * @route   POST /api/ai/generate-blog
 * @desc    Generate full blog post
 * @access  Private (Admin)
 */
router.post(
    "/generate-blog",
    authMiddleware,
    generateAIValidation,
    validateRequest,
    generateBlog
);

/**
 * @route   POST /api/ai/generate-outline
 * @desc    Generate blog outline
 */
router.post(
    "/generate-outline",
    authMiddleware,
    generateAIValidation,
    validateRequest,
    generateOutline
);

/**
 * @route   POST /api/ai/rewrite
 * @desc    Rewrite content
 */
router.post(
    "/rewrite",
    authMiddleware,
    generateAIValidation,
    validateRequest,
    rewriteContent
);

/**
 * @route   POST /api/ai/improve
 * @desc    Improve tone & clarity
 */
router.post(
    "/improve",
    authMiddleware,
    generateAIValidation,
    validateRequest,
    improveContent
);

/**
 * @route   POST /api/ai/seo
 * @desc    Generate SEO metadata
 */
router.post(
    "/seo",
    authMiddleware,
    generateAIValidation,
    validateRequest,
    generateSEO
);

export default router;
