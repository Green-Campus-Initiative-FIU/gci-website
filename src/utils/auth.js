import { getCurrentUser } from "@/services/auth.server";
import { toMillis } from "./date";

// ** Check if user is authenticated and return user object **
export async function checkAuth() {
  const user = await getCurrentUser();
  if (!user) return { error: "Not authenticated", user: null };
  return { user: user };
}

// ** Sanitize user data for client-side use **
export function sanitizeUserData(user) {
  if (!user) return null;
  const profile = user.profile ?? {};
  return {
    uid: user.uid,
    email: user.email ?? null,
    profile: {
      email: profile.email ?? null,
      role: profile.role ?? null,
      name: profile.name ?? null,
      avatarUrl: profile.avatarUrl ?? null,
      createdAt: toMillis(profile.createdAt),
      updatedAt: toMillis(profile.updatedAt),
    },
  };
}
