"use client";

import { useId, useState } from "react";
import { uploadFeaturedImageAction } from "@/app/(protected)/dashboard/(blog)/actions";

export default function ImageUploader({
  defaultUrl = "",
  folder = "posts/tmp",
  name = "featuredImageUrl",
  label = "Featured Image",
}) {
  const [url, setUrl] = useState(defaultUrl);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const inputId = useId();

  async function upload(file) {
    if (!file) return;
    setError("");
    setPending(true);
    try {
      const res = await uploadFeaturedImageAction(file, folder);
      if (res?.success) {
        setUrl(res.url);
      } else {
        setError(res?.error || "Failed to upload image");
      }
    } catch (e) {
      setError(e.message || "Failed to upload image");
    } finally {
      setPending(false);
    }
  }

  function onPick(e) {
    if (e.target.files) {
      const file = e.target.files?.[0];
      upload(file);
    } else {
      const el = document.getElementById(inputId);
      if (el) el.click();
    }
  }

  function onDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    upload(file);
  }

  function onPaste(e) {
    e.preventDefault();
    const file = e.clipboardData.files?.[0];
    upload(file);
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  function onReplace(e) {
    const file = e.target.files?.[0];
    upload(file);
  }

  return (
    <div className="mt-1.5">
      {/* Hidden input to submit the image URL to the server action */}
      <input type="hidden" name={name} value={url} />
      {/* Feedback */}
      {pending && <p className="mt-2 text-xs text-white/70">Uploading…</p>}
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      {url ? (
        <Preview url={url} inputId={inputId} onReplace={onReplace} />
      ) : (
        <DropZone
          inputId={inputId}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onPaste={onPaste}
          onPick={onPick}
        />
      )}
    </div>
  );
}

function DropZone({ inputId, onDrop, onDragOver, onPaste, onPick }) {
  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onPaste={onPaste}
      className="border-dark-green bg-light-green/40 flex size-64 flex-col items-center justify-center rounded-3xl border-2 border-dashed p-3 text-center"
    >
      <span onClick={onPick} className="cursor-pointer text-7xl" aria-hidden>
        🖼️
      </span>
      <div className="mt-4 flex flex-col items-center justify-center">
        <input
          id={inputId}
          type="file"
          accept="image/*"
          onChange={(e) => onPick(e)}
          className="sr-only"
        />

        {/* Visible, stylable trigger + helper text */}
        <p className="text-sm text-white/80">
          <label
            htmlFor={inputId}
            className="cursor-pointer underline decoration-white/60 underline-offset-2 hover:decoration-white"
          >
            Click to upload
          </label>
        </p>
        {/* <p className="text-sm text-white/80">or drag and drop</p> */}
      </div>
    </div>
  );
}

function Preview({ url, inputId, onReplace }) {
  return (
    <div className="group relative">
      <img
        src={url}
        alt="Preview"
        className="h-64 w-full rounded-3xl object-cover transition-opacity duration-200 group-hover:opacity-80"
      />

      {/* optional: darker overlay for stronger effect */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-black/0 transition-colors duration-200 group-hover:bg-black/40" />

      <div className="absolute inset-0 flex items-center justify-center">
        <input
          id={inputId}
          type="file"
          accept="image/*"
          onChange={onReplace}
          className="sr-only"
        />

        <label
          htmlFor={inputId}
          className="hidden cursor-pointer text-sm text-white/90 underline decoration-white/60 underline-offset-2 hover:decoration-white group-hover:block"
        >
          Replace image
        </label>
      </div>
    </div>
  );
}
