import multer from "multer";

/**
 * We store files in memory, not on disk.
 * Cloudinary will handle the real storage.
 */
const storage = multer.memoryStorage();

/**
 * Allow only image files
 */
const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"));
    }
};

/**
 * Limit file size (5MB)
 */
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});

export default upload;
