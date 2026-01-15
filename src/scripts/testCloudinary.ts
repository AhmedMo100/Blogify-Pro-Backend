import dotenv from "dotenv";
dotenv.config();

console.log(process.env.CLOUDINARY_CLOUD_NAME);
console.log(process.env.CLOUDINARY_API_KEY);
console.log(process.env.CLOUDINARY_API_SECRET);

import cloudinary from "../config/cloudinary";

(async () => {
    const res = await cloudinary.uploader.upload(
        "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        { folder: "test" }
    );

    console.log(res.secure_url);
})();
