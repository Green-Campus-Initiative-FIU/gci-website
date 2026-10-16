"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { saveSiteContentAction } from "@/content/actions";

/*
 * "Edit this page" for admins. While editing, every <Editable> and
 * <EditablePhoto> on the page can be changed in place; Save sends only the
 * changed fields to the server (saveSiteContentAction), which checks the
 * user is an admin before writing to Firestore.
 */
const EditContext = createContext({ canEdit: false, editing: false });
export const useEdit = () => useContext(EditContext);

export default function EditProvider({ canEdit, children }) {
  const router = useRouter();
  const [editing, setEditingState] = useState(false);
  const [changes, setChanges] = useState({});
  const [version, setVersion] = useState(0); // bump to reset every editable to its saved value
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef();

  const dirty = Object.keys(changes).length;

  const say = useCallback((text, tone = "ok") => {
    setToast({ text, tone });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4200);
  }, []);

  const setEditing = useCallback(
    (on) => {
      setEditingState(on);
      setVersion((v) => v + 1);
      if (on) say("Click any outlined text to change it, or click a photo to replace it.");
    },
    [say]
  );

  const setChange = useCallback((key, value) => setChanges((c) => ({ ...c, [key]: value })), []);

  const discard = useCallback(() => {
    setChanges({});
    setVersion((v) => v + 1);
    say("Changes discarded.");
  }, [say]);

  const save = useCallback(async () => {
    if (!dirty) return;
    setSaving(true);
    const res = await saveSiteContentAction(changes).catch(() => ({ error: "Couldn't reach the server. Check your connection and try again." }));
    setSaving(false);
    if (res?.error) return say(res.error, "error");
    setChanges({});
    setEditingState(false);
    setVersion((v) => v + 1);
    router.refresh();
    say(res.ok);
  }, [changes, dirty, router, say]);

  // Visual mode + keep the leaves/reveals out of the way while editing.
  useEffect(() => {
    document.documentElement.classList.toggle("editing", editing);
  }, [editing]);

  // Open in edit mode from the dashboard's "Edit the website" link (/#edit).
  useEffect(() => {
    if (canEdit && location.hash === "#edit") {
      history.replaceState(null, "", location.pathname + location.search);
      setEditing(true);
    }
  }, [canEdit, setEditing]);

  // Don't navigate away mid-edit.
  useEffect(() => {
    if (!editing) return;
    const onClick = (e) => {
      const a = e.target.closest?.("a[href]");
      if (!a || a.closest("[data-adminbar]")) return;
      e.preventDefault();
      say(dirty ? "Save or discard your changes first." : "Press Done to leave edit mode.", "warn");
    };
    const onBeforeUnload = (e) => {
      if (dirty) e.preventDefault();
    };
    document.addEventListener("click", onClick, true);
    addEventListener("beforeunload", onBeforeUnload);
    return () => {
      document.removeEventListener("click", onClick, true);
      removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [editing, dirty, say]);

  const value = useMemo(
    () => ({ canEdit, editing: canEdit && editing, setEditing, changes, setChange, dirty, discard, save, saving, version, say, toast }),
    [canEdit, editing, setEditing, changes, setChange, dirty, discard, save, saving, version, say, toast]
  );
  return <EditContext.Provider value={value}>{children}</EditContext.Provider>;
}
