import { Router } from "express";
import multer from "multer";
import { authMiddleware } from "../../middlewares/auth.middleware";
import validateRequest from "../../middlewares/validateRequest.middleware";

import {
   createBlog,
   getAllBlogs,
   getBlogBySlug,
   updateBlog,
   deleteBlog,
   toggleLike,
   addComment,
   addShare,
} from "./blog.controller";

import {
   createBlogValidation,
   updateBlogValidation,
   addCommentValidation,
   addShareValidation,
   listBlogsValidation,
} from "./blog.validation";

/* =========================
   Multer Setup
========================= */
const storage = multer.memoryStorage(); // هنرفع الصور على Cloudinary مباشرة
const upload = multer({ storage });

/* =========================
   Router
========================= */
const router = Router();

/* =========================
   Create Blog
========================= */
router.post(
   "/",
   authMiddleware,
   upload.single("featuredImage"), // اسم الحقل في الـ form-data
   createBlogValidation,
   validateRequest,
   createBlog
);

/* =========================
   Get All Blogs (public)
========================= */
router.get("/", listBlogsValidation, validateRequest, getAllBlogs);

/* =========================
   Get Blog by Slug (public)
========================= */
router.get("/:slug", getBlogBySlug);

/* =========================
   Update Blog
========================= */
router.patch(
   "/:id",
   authMiddleware,
   upload.single("featuredImage"), // لو عايزين نغير الصورة
   updateBlogValidation,
   validateRequest,
   updateBlog
);

/* =========================
   Delete Blog
========================= */
router.delete("/:id", authMiddleware, deleteBlog);

/* =========================
   Toggle Like
========================= */
router.post("/:id/like", authMiddleware, toggleLike);

/* =========================
   Add Comment
========================= */
router.post(
   "/:id/comment",
   authMiddleware,
   addCommentValidation,
   validateRequest,
   addComment
);

/* =========================
   Add Share (optional auth)
========================= */
router.post(
   "/:id/share",
   authMiddleware, // optional, controller بيتعامل مع المستخدم المجهول
   addShareValidation,
   validateRequest,
   addShare
);

export default router;
