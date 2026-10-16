"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEdit } from "./EditProvider";
import { logoutClient } from "@/services/auth.client";

// Floating toolbar for logged-in admins on the public pages.
export default function AdminBar() {
  const pathname = usePathname();
  const { canEdit, editing, setEditing, dirty, discard, save, saving, toast } = useEdit();
  if (!canEdit) return null;

  const onDashboard = pathname.startsWith("/dashboard") || pathname === "/login";

  return (
    <>
      {toast && (
        <div className={`toast ${toast.tone}`} role="status">
          {toast.text}
        </div>
      )}
      {!onDashboard && (
        <div className="adminbar" data-adminbar="">
          {editing ? (
            <>
              <span className="who">
                <i /> {dirty ? `${dirty} unsaved change${dirty > 1 ? "s" : ""}` : "Editing this page"}
              </span>
              <button className="btn btn-light btn-small" onClick={discard} disabled={!dirty || saving}>
                Discard
              </button>
              <button className="btn btn-gold btn-small" onClick={save} disabled={!dirty || saving}>
                {saving ? "Saving…" : "Save"}
              </button>
              <button className="btn btn-light btn-small" onClick={() => setEditing(false)} disabled={dirty > 0 || saving} title={dirty ? "Save or discard first" : undefined}>
                Done
              </button>
            </>
          ) : (
            <>
              <span className="who">
                <i /> Admin
              </span>
              <button className="btn btn-gold btn-small" onClick={() => setEditing(true)}>
                Edit this page
              </button>
              <Link className="btn btn-light btn-small" href="/dashboard/create-post">
                New post
              </Link>
              <Link className="btn btn-light btn-small" href="/dashboard">
                Dashboard
              </Link>
              <button className="btn btn-light btn-small" onClick={() => logoutClient({ redirectTo: "/" })}>
                Log out
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

// Shows a shortcut to the dashboard next to lists that are managed there.
export function ManageLink({ href, children }) {
  const { editing } = useEdit();
  if (!editing) return null;
  return (
    <a className="manage-link" href={href} data-adminbar="">
      ✎ {children}
    </a>
  );
}
