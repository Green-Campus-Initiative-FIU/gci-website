"use client";

import { useRef, useState } from "react";
import Image from "@/components/site/SiteImage";
import { useEdit } from "./EditProvider";
import { uploadSiteImageAction } from "@/content/actions";
import { prepareUpload } from "@/utils/compressImage";

/*
 * A page photo an admin can replace. Renders a `fill` image, so the parent must
 * be positioned (the site's photo frames already are).
 */
export default function EditablePhoto({ k, src, alt = "", sizes, priority, style }) {
  const { editing, changes, setChange, say } = useEdit();
  const input = useRef(null);
  const [busy, setBusy] = useState(false);
  const shown = changes?.[k] ?? src;

  async function pick(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    const prepared = await prepareUpload(file);
    if (prepared.error) {
      setBusy(false);
      return say(prepared.error, "error");
    }
    const fd = new FormData();
    fd.append("file", prepared.file);
    fd.append("folder", "site");
    const res = await uploadSiteImageAction(fd).catch(() => ({ error: "Upload failed. Check your connection." }));
    setBusy(false);
    if (res?.error) return say(res.error, "error");
    setChange(k, res.url);
    say("Photo uploaded. Press Save to publish it.");
  }

  return (
    <>
      <Image src={shown} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover", ...style }} />
      {editing && (
        <button type="button" className="photo-edit" onClick={() => input.current?.click()} disabled={busy}>
          {busy ? "Uploading…" : "Change photo"}
          <input ref={input} type="file" accept="image/*" hidden onChange={pick} />
        </button>
      )}
    </>
  );
}
