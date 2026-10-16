"use client";

import { useRef, useState } from "react";
import Image from "@/components/site/SiteImage";
import { uploadFeaturedImageAction } from "@/app/(protected)/dashboard/(blog)/actions";
import { uploadSiteImageAction } from "@/content/actions";
import { prepareUpload } from "@/utils/compressImage";

// Photo picker for dashboard forms. Uploads to Cloudinary right away and keeps
// the resulting link in a hidden input named `name`.
export default function PhotoField({ name, label = "Photo", defaultUrl = "", folder = "site", square = false, kind = "site" }) {
  const [url, setUrl] = useState(defaultUrl || "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const input = useRef(null);

  async function upload(file) {
    if (!file) return;
    setBusy(true);
    setError("");
    const prepared = await prepareUpload(file);
    if (prepared.error) {
      setBusy(false);
      return setError(prepared.error);
    }
    const fd = new FormData();
    fd.append("file", prepared.file);
    fd.append("folder", folder);
    if (square) fd.append("square", "1");
    const action = kind === "post" ? uploadFeaturedImageAction : uploadSiteImageAction;
    const res = await action(fd).catch(() => ({ error: "Upload failed. Check your connection and try again." }));
    setBusy(false);
    if (res?.error) setError(res.error);
    else setUrl(res.url);
  }

  return (
    <div className="fieldlabel">
      <span>{label}</span>
      <input type="hidden" name={name} value={url} />
      <div
        className={`drop${square ? " drop-square" : ""}`}
        role="button"
        tabIndex={0}
        aria-label={url ? "Change photo" : "Add a photo"}
        onClick={() => !busy && input.current?.click()}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), input.current?.click())}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          upload(e.dataTransfer.files?.[0]);
        }}
      >
        {url ? (
          <span className="drop-preview">
            <Image src={url} alt="" fill sizes="400px" style={{ objectFit: "cover" }} />
          </span>
        ) : null}
        <span>{busy ? "Uploading…" : url ? "Click to change photo" : "Click or drop a photo here"}</span>
        <input
          ref={input}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            upload(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>
      {url && !busy && (
        <button type="button" className="small-link" onClick={() => setUrl("")} style={{ justifySelf: "start" }}>
          Remove photo
        </button>
      )}
      {error && <p className="err">{error}</p>}
    </div>
  );
}
