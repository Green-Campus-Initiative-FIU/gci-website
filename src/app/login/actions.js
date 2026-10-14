"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { admin, db, isFirebaseConfigured } from "@/lib/firebase/admin";

const NOT_CONNECTED =
  "Logins aren't available yet: the site isn't connected to Firebase.";

// Create new user in Firebase Auth

export async function signup(formData) {
  if (!isFirebaseConfigured) return { error: NOT_CONNECTED };
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      emailVerified: false,
    });

    await db.collection("users").doc(userRecord.uid).set({
      email: userRecord.email,
      role: "viewer",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (e) {
    if (e.code === "auth/email-already-exists") {
      return { error: "Email already exists" };
    }
    console.error("Error creating user:", e);
    return { error: e.message };
  }
  // After a user is created, they need to log in to create a session
  return { success: true };
}

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
