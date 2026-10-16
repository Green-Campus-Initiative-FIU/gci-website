import { cache } from "react";
import { cookies } from "next/headers";
import { admin, db, isFirebaseConfigured } from "@/lib/firebase/admin";

// ** Get Current User ** (memoized per request: the layout, pages and actions all ask)
export const getCurrentUser = cache(async function getCurrentUser() {
  if (!isFirebaseConfigured) return null;
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);
    const authUser = await admin.auth().getUser(decoded.uid);
    const userDoc = await db.collection("users").doc(authUser.uid).get();
    const profileData = userDoc.exists ? userDoc.data() : null;

    return {
      uid: authUser.uid,
      email: authUser.email,
      auth: authUser, // raw user record (check what we need from it)
      profile: profileData, // data from users collection
    };
  } catch (e) {
    if (e?.code !== "auth/session-cookie-expired" && e?.code !== "auth/session-cookie-revoked") {
      console.error("getCurrentUser error:", e);
    }
    return null;
  }
});

export const isAdmin = (user) => user?.profile?.role === "admin";

// ** Guards for server actions ** — return { user } or { error } (never trust a uid from the browser)
export async function requireUser() {
  const user = await getCurrentUser();
  return user ? { user } : { error: "Your session ended. Please log in again." };
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) return { error: "Your session ended. Please log in again." };
  if (!isAdmin(user)) return { error: "Only admins can do this. Ask an admin to give you access." };
  return { user };
}

// ** Get User by UID **
export async function getUserById(uid, { includeAuth = false } = {}) {
  const doc = await db.collection("users").doc(uid).get();
  const profile = doc.exists ? doc.data() : null;

  if (!includeAuth) {
    return { uid, profile };
  }
  const authUser = await admin.auth().getUser(uid);
  return {
    uid,
    email: authUser.email ?? null,
    displayName: authUser.displayName ?? null,
    photoURL: authUser.photoURL ?? null,
    profile,
  };
}

// ** Get Users by IDs (array of uids) **
export async function getUsersByIds(uids, options) {
  const uniqueUids = Array.from(new Set(uids.filter(Boolean)));
  const results = await Promise.all(
    uniqueUids.map(async (uid) => [uid, await getUserById(uid, options)])
  );
  return new Map(results); // Map of uid -> user data
}

// TODO: Add validation for the data
// ** Update User Profile **
export async function updateUserProfile(uid, data) {
  try {
    await db
      .collection("users")
      .doc(uid)
      .set({ ...data, updatedAt: new Date() }, { merge: true });
    return { success: true };
  } catch (e) {
    console.error("updateUserProfile error:", e);
    return { success: false, error: e.message };
  }
}
