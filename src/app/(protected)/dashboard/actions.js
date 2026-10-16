"use server";

import { revalidatePath } from "next/cache";
import { requireUser, updateUserProfile } from "@/services/auth.server";
import { uploadImage } from "@/lib/cloudinary.server";

// All profile actions act on the logged-in account only. The uid always comes
// from the session cookie, never from the browser.

// ** Update name + bio **
export async function updateProfileAction(prevState, formData) {
  const { user, error } = await requireUser();
  if (error) return { error };

  const name = String(formData.get("name") || "").trim().slice(0, 80);
  const bio = String(formData.get("bio") || "").trim().slice(0, 500);
  if (!name) return { error: "Add your name." };

  const result = await updateUserProfile(user.uid, { name, bio });
  if (!result.success) return { error: "Couldn't save. Try again." };
  revalidatePath("/dashboard", "layout");
  return { ok: "Profile saved." };
}

// ** Update profile photo (Cloudinary) **
export async function updateAvatarAction(formData) {
  const { user, error } = await requireUser();
  if (error) return { error };

  const upload = await uploadImage(formData.get("file"), {
    folder: "avatars",
    public_id: user.uid,
    overwrite: true,
    transformation: [{ width: 400, height: 400, crop: "fill", gravity: "face" }],
  });
  if (upload.error) return upload;

  const result = await updateUserProfile(user.uid, { avatarUrl: upload.url });
  if (!result.success) return { error: "Couldn't save the photo. Try again." };
  revalidatePath("/dashboard", "layout");
  return { ok: "Photo updated.", url: upload.url };
}
