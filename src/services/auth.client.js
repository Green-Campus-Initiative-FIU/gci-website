import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";

export async function loginWithEmail(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = await userCredential.user.getIdToken();
    return { user: userCredential.user, idToken };
  } catch (e) {
    const code = e?.code || "auth/unknown";
    let message = e?.message || "Login failed.";
    if (code === "auth/invalid-credential" || code === "auth/wrong-password")
      message = "Invalid email or password.";
    else if (code === "auth/user-not-found") message = "User not found.";
    const err = new Error(message);
    err.code = code;
    throw err;
  }
}

export async function logoutClient(options = {}) {
  const { redirectTo = "/login" } = options;
  try {
    await signOut(auth);
    const res = await fetch("/api/auth/signout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      console.warn("Server session clear failed, continuing anyway...");
    }
    window.location.href = redirectTo;
  } catch (e) {
    console.error("Logout error:", e);
    window.location.href = redirectTo;
  }
}
