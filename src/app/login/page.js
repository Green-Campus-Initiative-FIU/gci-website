"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithEmail } from "@/services/auth.client";
import { signup, createSession } from "./actions";
import Login from "@/features/login/components/Login";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const { idToken } = await loginWithEmail(email, password);
      const result = await createSession(idToken);

      if (result?.success) {
        router.push("/dashboard");
      } else {
        setError(result?.error || "Login failed.");
      }
    } catch (e) {
      console.error("Login error:", e);
      setError(e.message || "Login failed.");
    }
  };

  const handleSignup = async (formData) => {
    const result = await signup(formData);
    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <Login
      error={error}
      handleLogin={handleLogin}
      handleSignup={handleSignup}
    />
  );
}
