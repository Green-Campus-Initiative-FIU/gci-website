"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deletePostByIdAction, togglePublishStatusByIdAction } from "@/app/(protected)/dashboard/(blog)/actions";

export default function PostRowActions({ id, published }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");

  const run = (fn) =>
    start(async () => {
      setError("");
      const res = await fn().catch(() => ({ error: "Couldn't reach the server. Try again." }));
      if (res?.error) setError(res.error);
      else router.refresh();
    });

  if (confirming) {
    return (
      <div className="btns confirm">
        <span>Delete this post for good?</span>
        <button className="btn btn-small btn-danger" disabled={pending} onClick={() => run(() => deletePostByIdAction(id))}>
          {pending ? "Deleting…" : "Yes, delete"}
        </button>
        <button className="btn btn-small" disabled={pending} onClick={() => setConfirming(false)}>
          Keep it
        </button>
      </div>
    );
  }

  return (
    <div className="btns">
      {published && (
        <Link className="btn btn-small" href={`/blog/${id}`}>
          View
        </Link>
      )}
      <Link className="btn btn-small" href={`/dashboard/edit-post/${id}`}>
        Edit
      </Link>
      <button className="btn btn-small" disabled={pending} onClick={() => run(() => togglePublishStatusByIdAction(id))}>
        {pending ? "…" : published ? "Unpublish" : "Publish"}
      </button>
      <button className="btn btn-small btn-danger" disabled={pending} onClick={() => setConfirming(true)}>
        Delete
      </button>
      {error && <p className="err">{error}</p>}
    </div>
  );
}
