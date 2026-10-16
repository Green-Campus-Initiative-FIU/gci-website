"use client";

import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { inviteAction, newSetupLinkAction, removePersonAction, setRoleAction } from "@/app/(protected)/dashboard/people/actions";

const ROLE_OPTIONS = [
  { value: "editor", label: "Editor" },
  { value: "admin", label: "Admin" },
  { value: "none", label: "No access" },
];

// Ask Firebase to email the setup link (comes from noreply@…firebaseapp.com; may land in spam).
async function emailSetupLink(email) {
  if (!auth) return false;
  try {
    await sendPasswordResetEmail(auth, email, { url: `${location.origin}/login` });
    return true;
  } catch {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch {
      return false;
    }
  }
}

export default function PeopleManager({ people }) {
  const router = useRouter();
  const [invite, inviteFormAction] = useActionState(inviteAction, null);
  const [sent, setSent] = useState(null); // { email, link, emailed }
  const formRef = useRef(null);

  useEffect(() => {
    if (!invite?.ok) return;
    formRef.current?.reset();
    emailSetupLink(invite.email).then((emailed) => setSent({ email: invite.email, link: invite.link, emailed }));
    router.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invite?.at]);

  return (
    <>
      <form ref={formRef} className="form panel" action={inviteFormAction}>
        <h2 className="dash-sub">Invite someone</h2>
        <div className="row">
          <label>
            Email
            <input name="email" type="email" required placeholder="name@fiu.edu" autoComplete="off" />
          </label>
          <label>
            <span>
              Name <span className="hint">(optional)</span>
            </span>
            <input name="name" maxLength={80} autoComplete="off" />
          </label>
        </div>
        <fieldset className="roles">
          <legend>Access</legend>
          <label className="check">
            <input type="radio" name="role" value="editor" defaultChecked /> <b>Editor</b>
            <span className="hint">edit the website, posts and lists</span>
          </label>
          <label className="check">
            <input type="radio" name="role" value="admin" /> <b>Admin</b>
            <span className="hint">everything, plus invite and remove people</span>
          </label>
        </fieldset>
        {invite?.error && (
          <p className="err" role="alert">
            {invite.error}
          </p>
        )}
        <div className="actions">
          <SubmitInvite />
        </div>
      </form>

      {sent && <SetupLinkNotice {...sent} onClose={() => setSent(null)} />}

      <ul className="mylist">
        {people.map((p) => (
          <Person key={p.uid} p={p} onLink={(info) => setSent(info)} />
        ))}
      </ul>
    </>
  );
}

function SubmitInvite() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-gold btn-small" type="submit" disabled={pending}>
      {pending ? "Inviting…" : "Send invite"}
    </button>
  );
}

function SetupLinkNotice({ email, link, emailed, onClose }) {
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  return (
    <div className="panel notice" role="status">
      <p>
        <b>{email}</b> is invited.{" "}
        {emailed
          ? "We emailed them a link to set their password (tell them to check spam). You can also send them this link yourself:"
          : "Send them this link so they can set their password:"}
      </p>
      <div className="linkbox">
        <input ref={ref} readOnly value={link} onFocus={(e) => e.target.select()} aria-label="Password setup link" />
        <button
          type="button"
          className="btn btn-small"
          onClick={() =>
            navigator.clipboard
              .writeText(link)
              .then(() => setCopied(true))
              .catch(() => ref.current?.select())
          }
        >
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
      <p className="hint">The link works once and expires after about an hour. You can make a new one anytime.</p>
      <button type="button" className="small-link" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

function Person({ p, onLink }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState(null);
  const [confirm, setConfirm] = useState(false);

  const run = (fn, after) =>
    start(async () => {
      setMsg(null);
      const res = await fn().catch(() => ({ error: "Couldn't reach the server. Try again." }));
      if (res?.error) return setMsg({ error: res.error });
      after?.(res);
      router.refresh();
    });

  return (
    <li className="myrow person">
      <span className="avatar">{(p.name || p.email)[0].toUpperCase()}</span>
      <div>
        <h3>
          {p.name || p.email}
          {p.isMe && <span className="status live">You</span>}
        </h3>
        <span className="date">
          {p.name ? `${p.email} · ` : ""}
          {p.lastLogin ? `last logged in ${p.lastLogin}` : "hasn't logged in yet"}
        </span>
        {msg?.error && <p className="err">{msg.error}</p>}
      </div>
      <div className="btns">
        {p.isMe ? (
          <span className={`status ${p.role === "admin" ? "featured" : "live"}`}>{ROLE_OPTIONS.find((r) => r.value === p.role)?.label}</span>
        ) : confirm ? (
          <span className="confirm">
            Remove {p.name || p.email}?
            <button className="btn btn-small btn-danger" disabled={pending} onClick={() => run(() => removePersonAction(p.uid))}>
              Yes, remove
            </button>
            <button className="btn btn-small" onClick={() => setConfirm(false)}>
              Cancel
            </button>
          </span>
        ) : (
          <>
            <select
              aria-label={`Access for ${p.email}`}
              value={p.role}
              disabled={pending}
              onChange={(e) => run(() => setRoleAction(p.uid, e.target.value))}
            >
              {ROLE_OPTIONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
            {!p.lastLogin && (
              <button
                className="btn btn-small"
                disabled={pending}
                onClick={() => run(() => newSetupLinkAction(p.uid), (res) => emailSetupLink(res.email).then((emailed) => onLink({ email: res.email, link: res.link, emailed })))}
              >
                Resend invite
              </button>
            )}
            <button className="btn btn-small btn-danger" disabled={pending} onClick={() => setConfirm(true)}>
              Remove
            </button>
          </>
        )}
      </div>
    </li>
  );
}
