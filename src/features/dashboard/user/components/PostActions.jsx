"use client";

import {
  togglePublishStatusByIdAction,
  deletePostByIdAction,
} from "@/app/(protected)/dashboard/(blog)/actions";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useFormStatus } from "react-dom";

export default function PostActions({ id, published }) {
  return (
    <div className="flex gap-2">
      {/* Toggle */}
      <form
        action={togglePublishStatusByIdAction.bind(null, id)}
        className={cn(
          "boop hover:bg-light-green/80 hover:border-dark-green/80 group self-center justify-self-end rounded-md border-2 px-1.5 py-0.5 lowercase hover:cursor-pointer",
          published
            ? "bg-dark-green border-dark-green text-white"
            : "bg-light-green/20 border-dark-green/20 text-white"
        )}
      >
        <TogglePublishButton published={published} />
      </form>

      {/* Edit */}
      <div className="border-dark-green bg-dark-green self-center justify-self-end rounded-md border-2 px-1.5 py-0.5 lowercase">
        <Link href={`/dashboard/edit-post/${id}`} className="text-white">
          Edit
        </Link>
      </div>

      {/* Delete */}
      <form
        action={deletePostByIdAction.bind(null, id)}
        className="boop self-center justify-self-end rounded-md border-2 border-red-500 bg-red-500 px-1.5 py-0.5 lowercase hover:cursor-pointer"
      >
        <DeletePostButton />
      </form>
    </div>
  );
}

function TogglePublishButton({ published }) {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        "opacity-20 hover:cursor-pointer group-hover:opacity-50",
        published && "opacity-100"
      )}
      type="submit"
      aria-label={published ? "Unpublish" : "Publish"}
    >
      {pending ? <p className="animate-pulse">🔄</p> : "👁️"}
    </button>
  );
}

function DeletePostButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="text-white hover:cursor-pointer"
      aria-label="Delete post"
    >
      {pending ? "deleting..." : "delete"}
    </button>
  );
}
