import Image from "next/image";

export default function Login({ mode, setMode, error, notice, busy, onSubmit }) {
  const resetting = mode === "reset";
  return (
    <div className="wrap auth">
      <div className="auth-card">
        <Image className="logo" src="/gci-transparent.webp" alt="" width={84} height={84} />
        <h1>{resetting ? "Reset password" : "Officer login"}</h1>
        <p className="hint" style={{ textAlign: "center" }}>
          {resetting
            ? "Enter your email and we'll send you a link to choose a new password."
            : "For GCI officers. Accounts are by invite: ask a GCI admin if you need one."}
        </p>

        <form className="form" action={onSubmit} key={mode}>
          {notice && (
            <p className="ok" role="status">
              {notice}
            </p>
          )}
          <label htmlFor="email">
            Email
            <input id="email" name="email" type="email" autoComplete="email" placeholder="you@fiu.edu" required />
          </label>
          {!resetting && (
            <label htmlFor="password">
              Password
              <input id="password" name="password" type="password" autoComplete="current-password" placeholder="••••••••" required />
            </label>
          )}
          {error && (
            <p className="err" role="alert">
              {error}
            </p>
          )}
          <button className="btn btn-forest" type="submit" disabled={busy}>
            {busy ? "One moment…" : resetting ? "Send reset link" : "Log in"}
          </button>
        </form>

        <button type="button" className="small-link" style={{ justifySelf: "center" }} onClick={() => setMode(resetting ? "login" : "reset")}>
          {resetting ? "Back to log in" : "Forgot your password?"}
        </button>
      </div>
    </div>
  );
}
