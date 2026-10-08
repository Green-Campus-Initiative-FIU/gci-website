"use client";

import { BLOG_CATEGORIES } from "../constants/categories";
import { useFormStatus } from "react-dom";
import TagInput from "./TagInput";
import { cn } from "@/utils/cn";
import ImageUploader from "./ImageUploader";
import CategorySelector from "./CategorySelector";

export default function PostForm({
  action,
  defaultValues = {
    title: "",
    description: "",
    tags: [],
    featuredImageUrl: "",
    category: "",
  },
  mode = "create", // else edit
  className,
  postId = null,
}) {
  const {
    title = "",
    description = "",
    tags = [],
    featuredImageUrl = "",
    category = "",
  } = defaultValues;

  // Potential problem in the future in posts/tmp folder
  // (multiple users concurrently uploading images)
  const folder = postId ? `posts/${postId}` : "posts/tmp";

  return (
    <form action={action} className={cn("flex flex-col px-4", className)}>
      <input
        id="title"
        type="text"
        name="title"
        placeholder="Title"
        defaultValue={title}
        className="input mt-1.5"
        required
      />

      <div className="mt-1.5 flex gap-1.5">
        <CategorySelector
          name="category"
          defaultCategory={category}
          categories={BLOG_CATEGORIES}
        />
        <TagInput
          name="tagsJson"
          initialTags={Array.isArray(tags) ? tags : []}
        />
      </div>

      <div className="flex gap-1.5">
        <ImageUploader defaultUrl={featuredImageUrl} folder={folder} />

        <textarea
          id="description"
          name="description"
          defaultValue={description}
          placeholder="Write a short summary…"
          className="input mt-1.5 min-h-64 w-full resize-y whitespace-pre-wrap break-words"
          required
        />
      </div>
      <SubmitButton mode={mode} />
    </form>
  );
}

export function SubmitButton({ mode }) {
  const status = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-light-green hover:bg-dark-green active:bg-celadon active:text-dark-green active:border-dark-green mt-5 self-end rounded border-2 border-transparent px-8 py-3 font-medium text-white transition-all active:border-2"
    >
      {status.pending
        ? mode === "create"
          ? "Posting..."
          : "Saving..."
        : mode === "create"
          ? "Post Blog"
          : "Save Changes"}
    </button>
  );
}
