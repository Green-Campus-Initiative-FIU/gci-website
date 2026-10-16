"use client";

import { useActionState, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { EmailAuthProvider, reauthenticateWithCredential, signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import Image from "@/components/site/SiteImage";
import { auth } from "@/lib/firebase/client";
import { logoutClient } from "@/services/auth.client";
import { updateAvatarAction, updateProfileAction } from "@/app/(protected)/dashboard/actions";
import { prepareUpload } from "@/utils/compressImage";

export default function AccountForms({ email, name, bio, avatarUrl, role }) {
  return (
    <div className="settings">
      <ProfileForm email={email} name={name} bio={bio} avatarUrl={avatarUrl} role={role} />
      <div style={{ display: "grid", gap: 18, alignContent: "start" }}>
        <PasswordForm email={email} />
        <div className="panel">
          <h2 className="dash-sub">Log out</h2>
          <p className="hint" style={{ marginBottom: 14 }}>
            Logging out on a shared computer keeps the site safe.
          </p>
          <button className="btn btn-small" onClick={() => logoutClient({ redirectTo: "/" })}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileForm({ email, name, bio, avatarUrl, role }) {
  const [state, action] = useActionState(updateProfileAction, null);
  return (
    <form className="form panel" action={action}>
      <h2 className="dash-sub">Profile</h2>
      <Avatar initial={avatarUrl} letter={(name || email)[0].toUpperCase()} />
      <label>
        Name <span className="hint">Shown as the author on your posts</span>
        <input name="name" defaultValue={name} maxLength={80} required />
      </label>
      <label>
        Email
        <input value={email} readOnly disabled />
      </label>
      <label>
        Bio
        <textarea name="bio" defaultValue={bio} maxLength={500} rows={3} placeholder="You don't have a bio yet" />
      </label>
      <p className="hint">Access: {role}</p>
      {state?.error && <p className="err">{state.error}</p>}
      {state?.ok && <p className="ok">{state.ok}</p>}
      <div className="actions">
        <Submit label="Save profile" />
      </div>
    </form>
  );
}

function Avatar({ initial, letter }) {
  const router = useRouter();
  const input = useRef(null);
  const [url, setUrl] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  async function pick(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setMsg(null);
    const prepared = await prepareUpload(file, { maxSide: 800 });
    if (prepared.error) {
      setBusy(false);
      return setMsg({ error: prepared.error });
    }
    const fd = new FormData();
    fd.append("file", prepared.file);
    const res = await updateAvatarAction(fd).catch(() => ({ error: "Upload failed. Try again." }));
    setBusy(false);
    if (res?.error) return setMsg({ error: res.error });
    setUrl(`${res.url}?v=${Date.now()}`);
    setMsg({ ok: res.ok });
    router.refresh();
  }

  return (
    <div className="usercard">
      <span className="avatar avatar-lg">{url ? <Image src={url} alt="" fill sizes="72px" style={{ objectFit: "cover" }} /> : letter}</span>
      <div style={{ display: "grid", gap: 6 }}>
        <button type="button" className="btn btn-small" disabled={busy} onClick={() => input.current?.click()}>
          {busy ? "Uploading…" : "Change photo"}
        </button>
        {msg?.error && <span className="err">{msg.error}</span>}
        {msg?.ok && <span className="hint">{msg.ok}</span>}
      </div>
      <input ref={input} type="file" accept="image/*" hidden onChange={pick} />
    </div>
  );
}

function PasswordForm({ email }) {
  const [state, setState] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submit(formData) {
    const current = formData.get("current");
    const next = formData.get("next");
    if (String(next).length < 8) return setState({ error: "Use at least 8 characters for the new password." });
    setBusy(true);
    setState(null);
    try {
      let user = auth?.currentUser;
      if (user) await reauthenticateWithCredential(user, EmailAuthProvider.credential(email, current));
      else user = (await signInWithEmailAndPassword(auth, email, current)).user;
      await updatePassword(user, next);
      setState({ ok: "Password updated." });
    } catch (e) {
      const code = e?.code || "";
      setState({
        error:
          code.includes("wrong-password") || code.includes("invalid-credential")
            ? "Your current password isn't right."
            : code.includes("weak-password")
              ? "That password is too weak. Try a longer one."
              : code.includes("too-many-requests")
                ? "Too many tries. Wait a few minutes and try again."
                : "Couldn't update the password. Try again.",
      });
    }
    setBusy(false);
  }

  return (
    <form className="form panel" action={submit}>
      <h2 className="dash-sub">Change password</h2>
      <label>
        Current password
        <input name="current" type="password" autoComplete="current-password" required />
      </label>
      <label>
        New password
        <input name="next" type="password" autoComplete="new-password" minLength={8} required placeholder="At least 8 characters" />
      </label>
      {state?.error && <p className="err">{state.error}</p>}
      {state?.ok && <p className="ok">{state.ok}</p>}
      <div className="actions">
        <button className="btn btn-small" type="submit" disabled={busy}>
          {busy ? "Updating…" : "Update password"}
        </button>
      </div>
    </form>
  );
}

function Submit({ label }) {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-gold btn-small" type="submit" disabled={pending}>
      {pending ? "Saving…" : label}
    </button>
  );
}
