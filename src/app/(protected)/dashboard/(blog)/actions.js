"use server";

import {
  createPost,
  getPostById,
  updatePostById,
  togglePublishStatusById,
  deletePostById,
} from "@/services/posts.server";
import { checkAuth } from "@/utils/auth";
import { cloudinary } from "@/lib/cloudinary.server";
import { parseTags } from "@/utils/tags";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ALLOWED_CATEGORIES } from "@/features/dashboard/blog/constants/categories";

// ** Create Blog Post **
export async function createPostAction(formData) {
  const { user, error } = await checkAuth();
  if (error) return { error };

  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();

  if (!title || !description) {
    return { error: "Title and description are required" };
  }

  const featuredImageUrl =
    String(formData.get("featuredImageUrl") || "").trim() || null;

  const category = String(formData.get("category") || "").trim();
  if (!ALLOWED_CATEGORIES.has(category)) {
    return { error: "Invalid category" };
  }

  const tags = parseTags(formData);
  const authorName = user.profile?.name || null;
  const authorAvatarUrl = user.profile?.avatarUrl || null;

  await createPost({
    title,
    description,
    category,
    tags,
    featuredImageUrl,
    authorId: user.uid,
    authorName,
    authorAvatarUrl,
    published: false,
  });

  revalidatePath("/dashboard/view-posts");
  revalidatePath("/blog");
  redirect("/dashboard/view-posts");
}

// ** Update Post by ID **
export async function updatePostByIdAction(id, formData) {
  const { user, error } = await checkAuth();
  if (error) return { error };

  const post = await getPostById(id);
  if (!post) return { error: "Not found" };
  if (post.authorId !== user.uid /* || !isAdmin(user) */) {
    return { error: "Forbidden" };
  }

  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();

  if (!title || !description) {
    return { error: "Title and description are required" };
  }

  const featuredImageUrl =
    String(formData.get("featuredImageUrl") || "").trim() ||
    post.featuredImageUrl ||
    null;

  const categoryRaw = String(formData.get("category") || "").trim();
  const category = ALLOWED_CATEGORIES.has(categoryRaw)
    ? categoryRaw
    : post.category || null;

  const tags = parseTags(formData);

  await updatePostById(id, {
    title,
    description,
    category,
    tags,
    featuredImageUrl,
  });

  revalidatePath("/dashboard/view-posts");
  revalidatePath("/blog");
  revalidatePath(`/blog/${id}`);
  redirect(`/dashboard/view-posts`);
}

// ** Toggle Publish Status by ID **
export async function togglePublishStatusByIdAction(id) {
  const { user, error } = await checkAuth();
  if (error) return { error };

  const post = await getPostById(id);
  if (!post) return { error: "Not found" };
  if (post.authorId !== user.uid) return { error: "Forbidden" };

  const res = await togglePublishStatusById(id);
  if (res?.error) return res;

  revalidatePath("/dashboard/view-posts");
  revalidatePath("/blog");
  revalidatePath(`/blog/${id}`);
  return { success: true, published: res.published };
}

// ** Delete Post by ID **
export async function deletePostByIdAction(id) {
  const { user, error } = await checkAuth();
  if (error) return { error };

  const post = await getPostById(id);
  if (!post) return { error: "Not found" };
  if (post.authorId !== user.uid) return { error: "Forbidden" };

  const res = await deletePostById(id);
  if (res?.error) return res;

  revalidatePath("/dashboard/view-posts");
  revalidatePath("/blog");
  revalidatePath(`/blog/${id}`);
  return { success: true };
}

// ** Upload to Cloudinary and return URL **
export async function uploadFeaturedImageAction(file, folder = "posts/tmp") {
  const { user, error } = await checkAuth();
  if (error) return { error };
  if (!file) return { error: "File is required" };

  // Image Validation
  if (!file.type.startsWith("image/"))
    return { error: "File must be an image" };
  if (file.size > 5 * 1024 * 1024)
    return { error: "File must be less than 5MB" };

  const buffer = Buffer.from(await file.arrayBuffer());

  const uploadRes = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          overwrite: true,
          transformation: [
            // reasonable default hero size
            { width: 1600, height: 900, crop: "fill", gravity: "auto" },
          ],
        },
        (err, res) => (err ? reject(err) : resolve(res))
      )
      .end(buffer);
  });

  return {
    success: true,
    url: uploadRes.secure_url,
    publicId: uploadRes.public_id,
  };
}
