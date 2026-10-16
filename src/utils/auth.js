import { toMillis } from "./date";

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
      bio: profile.bio ?? "",
      createdAt: toMillis(profile.createdAt),
      updatedAt: toMillis(profile.updatedAt),
    },
  };
}
