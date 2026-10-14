import Image from "next/image";

export default function Login({ mode, setMode, error, notice, busy, onSubmit }) {
  const signingUp = mode === "signup";
  return (
    <div className="wrap auth">
      <div className="auth-card">
        <Image className="logo" src="/gci-transparent.webp" alt="" width={84} height={84} />
        <h1>{signingUp ? "Create account" : "Officer login"}</h1>

        <div className="tabs" role="tablist" aria-label="Log in or sign up">
          <button type="button" role="tab" aria-selected={!signingUp} onClick={() => setMode("login")}>
            Log in
          </button>
          <button type="button" role="tab" aria-selected={signingUp} onClick={() => setMode("signup")}>
            Sign up
          </button>
        </div>

        <form className="form" action={onSubmit}>
          {notice && <p className="ok" role="status">{notice}</p>}
          <label htmlFor="email">
            FIU email
            <input id="email" name="email" type="email" autoComplete="email" placeholder="you@fiu.edu" required />
          </label>
          <label htmlFor="password">
            Password
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={signingUp ? "new-password" : "current-password"}
              placeholder={signingUp ? "At least 6 characters" : "••••••••"}
              minLength={signingUp ? 6 : undefined}
              required
            />
          </label>
          {error && (
            <p className="err" role="alert">
              {error}
            </p>
          )}
          <button className="btn btn-forest" type="submit" disabled={busy}>
            {busy ? "One moment…" : signingUp ? "Create account" : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
