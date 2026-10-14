"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithEmail } from "@/services/auth.client";
import { signup, createSession } from "./actions";
import Login from "@/features/login/components/Login";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState("login");
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

  const handleSignup = async (formData) => {
    setBusy(true);
    setError("");
    const result = await signup(formData);
    setBusy(false);
    if (result?.error) {
      setError(result.error);
      return;
    }
    setMode("login");
    setNotice("Account created. Log in below. An admin can then give you editing access.");
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
      onSubmit={mode === "login" ? handleLogin : handleSignup}
    />
  );
}
