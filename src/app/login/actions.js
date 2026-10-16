"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { admin, db, isFirebaseConfigured } from "@/lib/firebase/admin";

const NOT_CONNECTED =
  "Logins aren't available yet: the site isn't connected to Firebase.";

// Accounts are invite-only: admins create them from Dashboard → People & access.

export async function createSession(idToken) {
  if (!isFirebaseConfigured) return { error: NOT_CONNECTED };
  if (!idToken) {
    return { error: "ID token is required." };
  }

  // Session expires in 14 days.
  const expiresIn = 60 * 60 * 24 * 14 * 1000; // ms for firebase

  try {
    // Create the session cookie
    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });

    // Set the cookie in the browser - FIX: await cookies() first
    const cookieStore = await cookies();
    cookieStore.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: expiresIn / 1000, // seconds for cookies
    });

    revalidatePath("/", "layout");
    return { success: true };
  } catch (e) {
    console.error("createSession error:", e);
    return { error: e.message || "Failed to create session." };
  }
}
