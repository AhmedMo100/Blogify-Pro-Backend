import mongoose, { Schema, Document } from "mongoose";

/* =========================
   Sub Documents
========================= */

// Single comment
export interface IBlogComment {
    user: mongoose.Types.ObjectId;
    text: string;
    createdAt: Date;
}

// Single share
export interface IBlogShare {
    platform: "facebook" | "twitter" | "linkedin" | "whatsapp" | "other";
    user?: mongoose.Types.ObjectId;
    createdAt: Date;
}

// Cloudinary image
export interface IBlogImage {
    url: string;
    publicId: string;
}

/* =========================
   Blog Interface
========================= */

export interface IBlog extends Document {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;

    featuredImage?: IBlogImage; // Cloudinary image

    status: "draft" | "published" | "scheduled" | "archived";
    author: mongoose.Types.ObjectId;

    likes: mongoose.Types.ObjectId[];
    savedBy: mongoose.Types.ObjectId[];
    comments: IBlogComment[];
    shares: IBlogShare[];

    seo: {
        metaTitle?: string;
        metaDescription?: string;
        keywords?: string[];
    };

    views: number;
    readingTime: number;

    publishedAt?: Date;
    scheduledFor?: Date;

    createdAt: Date;
    updatedAt: Date;
}

/* =========================
   Schemas
========================= */

const commentSchema = new Schema<IBlogComment>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        text: { type: String, required: true, maxlength: 1000, trim: true },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

const shareSchema = new Schema<IBlogShare>(
    {
        platform: {
            type: String,
            enum: ["facebook", "twitter", "linkedin", "whatsapp", "other"],
            required: true,
        },
        user: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

const imageSchema = new Schema<IBlogImage>(
    {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
    },
    { _id: false }
);

/* =========================
   Blog Schema
========================= */

const blogSchema = new Schema<IBlog>(
    {
        title: { type: String, required: true, trim: true, maxlength: 150 },
        slug: { type: String, required: true, unique: true, lowercase: true, index: true },
        content: { type: String, required: true },
        excerpt: { type: String, maxlength: 300 },

        featuredImage: {
            type: imageSchema,
            required: false, // drafts ممكن تكون بدون صورة
        },

        status: {
            type: String,
            enum: ["draft", "published", "scheduled", "archived"],
            default: "draft",
            index: true,
        },

        author: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },

        likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
        savedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
        comments: [commentSchema],
        shares: [shareSchema],

        seo: {
            metaTitle: { type: String, maxlength: 70 },
            metaDescription: { type: String, maxlength: 160 },
            keywords: [{ type: String, trim: true }],
        },

        views: { type: Number, default: 0 },
        readingTime: { type: Number, default: 1 },

        publishedAt: { type: Date },
        scheduledFor: { type: Date },
    },
    { timestamps: true }
);

/* =========================
   Indexes
========================= */

blogSchema.index({ title: "text", content: "text", excerpt: "text", "seo.keywords": "text" });
blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ author: 1, createdAt: -1 });

/* =========================
   Model
========================= */

const BlogModel = mongoose.model<IBlog>("Blog", blogSchema);
export default BlogModel;
