"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/firebase/admin";
import { createPost, getPostById, updatePostById, togglePublishStatusById, deletePostById } from "@/services/posts.server";
import { requireEditor } from "@/services/auth.server";
import { uploadImage } from "@/lib/cloudinary.server";
import { parseTags } from "@/utils/tags";
import { ALLOWED_CATEGORIES } from "@/features/dashboard/blog/constants/categories";

// Posting is limited to admins: anyone can create an account, so a plain
// login isn't enough to publish on the club's site.

function readPostForm(formData) {
  const title = String(formData.get("title") || "").trim().slice(0, 140);
  const description = String(formData.get("description") || "").trim().slice(0, 20000);
  const category = String(formData.get("category") || "").trim();
  const featuredImageUrl = String(formData.get("featuredImageUrl") || "").trim() || null;
  const featured = formData.get("featured") === "on";
  const intent = formData.get("intent"); // "publish" | "draft"

  if (!title) return { error: "Add a title." };
  if (!description) return { error: "Write the post before saving." };
  if (!ALLOWED_CATEGORIES.has(category)) return { error: "Pick a category." };
  if (featuredImageUrl && !featuredImageUrl.startsWith("https://res.cloudinary.com/")) {
    return { error: "Upload the cover photo with the photo button." };
  }
  return { data: { title, description, category, featuredImageUrl, featured, tags: parseTags(formData) }, intent };
}

// Only one post is featured at a time.
async function clearOtherFeatured(keepId) {
  const snap = await db.collection("posts").where("featured", "==", true).get();
  await Promise.all(snap.docs.filter((d) => d.id !== keepId).map((d) => d.ref.update({ featured: false })));
}

function refreshBlog(id) {
  revalidatePath("/", "layout");
  if (id) revalidatePath(`/blog/${id}`);
}

// ** Create **
export async function createPostAction(prevState, formData) {
  const { user, error } = await requireEditor();
  if (error) return { error };
  const form = readPostForm(formData);
  if (form.error) return form;

  const published = form.intent !== "draft";
  const { id } = await createPost({
    ...form.data,
    published,
    authorId: user.uid,
    authorName: user.profile?.name || user.email,
    authorRole: user.profile?.title || "GCI",
    authorAvatarUrl: user.profile?.avatarUrl || null,
  });
  if (form.data.featured) await clearOtherFeatured(id);
  refreshBlog(id);
  redirect(`/dashboard/view-posts?saved=${published ? "published" : "draft"}`);
}

// ** Update **
export async function updatePostByIdAction(id, prevState, formData) {
  const { error } = await requireEditor();
  if (error) return { error };
  const post = await getPostById(id);
  if (!post) return { error: "That post no longer exists." };
  const form = readPostForm(formData);
  if (form.error) return form;

  const patch = { ...form.data, featuredImageUrl: form.data.featuredImageUrl || post.featuredImageUrl || null };
  if (form.intent === "publish" && !post.published) Object.assign(patch, { published: true, publishedAt: new Date() });
  if (form.intent === "draft" && post.published) Object.assign(patch, { published: false, publishedAt: null });

  await updatePostById(id, patch);
  if (patch.featured) await clearOtherFeatured(id);
  refreshBlog(id);
  redirect("/dashboard/view-posts?saved=updated");
}

// ** Publish / unpublish **
export async function togglePublishStatusByIdAction(id) {
  const { error } = await requireEditor();
  if (error) return { error };
  const res = await togglePublishStatusById(id);
  if (res?.error) return res;
  refreshBlog(id);
  return { success: true, published: res.published };
}

// ** Delete **
export async function deletePostByIdAction(id) {
  const { error } = await requireEditor();
  if (error) return { error };
  const res = await deletePostById(id);
  if (res?.error) return res;
  refreshBlog(id);
  return { success: true };
}

// ** Upload a cover photo (Cloudinary) **
export async function uploadFeaturedImageAction(formData) {
  const { error } = await requireEditor();
  if (error) return { error };
  return uploadImage(formData.get("file"), {
    folder: "posts",
    transformation: [{ width: 1600, height: 900, crop: "fill", gravity: "auto" }],
  });
}
