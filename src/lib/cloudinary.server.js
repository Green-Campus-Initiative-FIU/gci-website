import "server-only";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET
);

const MAX_BYTES = 8 * 1024 * 1024;

// Validates and uploads an image File; returns { url, publicId } or { error }.
// Callers must check permissions first.
export async function uploadImage(file, options = {}) {
  if (!isCloudinaryConfigured) return { error: "Photo uploads aren't set up yet (Cloudinary keys missing)." };
  if (!file || typeof file.arrayBuffer !== "function" || !file.size) return { error: "Choose a photo first." };
  if (!file.type?.startsWith("image/")) return { error: "That file isn't an image. Use a JPG, PNG, or WebP photo." };
  if (file.size > MAX_BYTES) return { error: "That photo is over 8 MB. Try a smaller one." };

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const res = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "image", ...options }, (err, r) => (err ? reject(err) : resolve(r)))
        .end(buffer);
    });
    return { url: res.secure_url, publicId: res.public_id };
  } catch (e) {
    console.error("Cloudinary upload error:", e);
    return { error: "The upload failed. Check your connection and try again." };
  }
}

export { cloudinary };
