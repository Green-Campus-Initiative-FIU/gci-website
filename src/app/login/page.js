"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { loginWithEmail } from "@/services/auth.client";
import { createSession } from "./actions";
import Login from "@/features/login/components/Login";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState("login"); // "login" | "reset"
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const handleLogin = async (formData) => {
    setBusy(true);
    setError("");
    try {
      const { idToken } = await loginWithEmail(formData.get("email"), formData.get("password"));
      const result = await createSession(idToken);
      if (result?.success) {
        router.push("/dashboard");
        router.refresh();
        return;
      }
      setError(result?.error || "Login failed.");
    } catch (e) {
      setError(e.message || "Login failed.");
    }
    setBusy(false);
  };

  const handleReset = async (formData) => {
    setBusy(true);
    setError("");
    const email = String(formData.get("email") || "").trim();
    try {
      if (auth) await sendPasswordResetEmail(auth, email, { url: `${location.origin}/login` }).catch(() => sendPasswordResetEmail(auth, email));
    } catch {
      // Same message either way, so this page can't be used to check who has an account.
    }
    setBusy(false);
    setMode("login");
    setNotice("If that email has an account, we've sent a link to reset the password. Check your spam folder too.");
  };

  return (
    <Login
      mode={mode}
      setMode={(m) => {
        setMode(m);
        setError("");
        setNotice("");
      }}
      error={error}
      notice={notice}
      busy={busy}
      onSubmit={mode === "login" ? handleLogin : handleReset}
    />
  );
}
