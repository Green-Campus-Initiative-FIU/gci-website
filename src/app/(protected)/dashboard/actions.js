"use server";

import { cloudinary } from "@/lib/cloudinary.server";
import { revalidatePath } from "next/cache";
import { updateUserProfile } from "@/services/auth.server";

// ** Update User Display Name **
export async function updateName(uid, name) {
  if (!name || name.trim() === "") {
    return { success: false, error: "Name is required" };
  }
  const result = await updateUserProfile(uid, { name });
  if (result.success) {
    revalidatePath("/dashboard");
  }
  return result;
}

// ** Update Avatar (File Upload) | (Cloudinary) **
export async function updateAvatar(file, uid) {
  if (!file || !uid) {
    return { success: false, error: "File and user ID required" };
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Upload to Cloudinary
  const uploadRes = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "avatars", public_id: uid, overwrite: true },
        (err, res) => (err ? reject(err) : resolve(res))
      )
      .end(buffer);
  });

  // ** Update User Profile with Cloudinary URL **
  const result = await updateUserProfile(uid, {
    avatarUrl: uploadRes.secure_url,
    updatedAt: new Date(),
  });

  if (result.success) {
    revalidatePath("/dashboard");
  }

  return { success: true, url: uploadRes.secure_url };
}

// ** Update User Personal Info **
export async function updatePersonalInfo(uid, formData) {
  if (!uid) return { success: false, error: "Missing user ID" };

  const name = formData.get("name");
  const email = formData.get("email");
  const bio = formData.get("bio");

  const result = await updateUserProfile(uid, {
    name,
    email,
    bio,
    updatedAt: new Date(),
  });

  if (result.success) revalidatePath("/dashboard/settings");

  return result;
}

// ADD TO FIREBASE RULES TO PREVENT ROLE ESCALATION**

// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /users/{userId} {
//       allow read: if true; // profiles are public to read
//       allow update: if request.auth != null && request.auth.uid == userId
//         && !("role" in request.resource.data); // 🚫 prevent role escalation
//     }
//   }
// }
