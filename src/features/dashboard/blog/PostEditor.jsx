"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import PhotoField from "@/features/dashboard/PhotoField";
import { BLOG_CATEGORIES } from "./constants/categories";

export default function PostEditor({ action, post = {}, mode = "create" }) {
  const [state, formAction] = useActionState(action, null);
  return (
    <form className="form panel editor" action={formAction}>
      <label>
        Title
        <input name="title" defaultValue={post.title} maxLength={140} required placeholder="e.g. Clothing swap this Friday" />
      </label>
      <div className="row">
        <label>
          Category
          <select name="category" defaultValue={post.category || ""} required>
            <option value="" disabled>
              Pick one…
            </option>
            {BLOG_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <TagsField initial={post.tags || []} />
      </div>
      <PhotoField name="featuredImageUrl" label="Cover photo" defaultUrl={post.featuredImageUrl} kind="post" />
      <label>
        Post
        <span className="hint">The first line is used as the summary on the homepage and blog. Leave a blank line between paragraphs.</span>
        <textarea name="description" defaultValue={post.description} required rows={12} />
      </label>
      <label className="check">
        <input type="checkbox" name="featured" defaultChecked={post.featured} /> Feature this post at the top of the blog
      </label>
      {state?.error && (
        <p className="err" role="alert">
          {state.error}
        </p>
      )}
      <div className="actions">
        <Link className="btn btn-small" href="/dashboard/view-posts">
          Cancel
        </Link>
        <Submit intent="draft" label={mode === "edit" && !post.published ? "Save draft" : "Save as draft"} />
        <Submit intent="publish" label={mode === "edit" && post.published ? "Save changes" : "Publish"} gold />
      </div>
    </form>
  );
}

function Submit({ intent, label, gold }) {
  const { pending, data } = useFormStatus();
  const mine = pending && data?.get("intent") === intent;
  return (
    <button className={`btn btn-small${gold ? " btn-gold" : ""}`} type="submit" name="intent" value={intent} disabled={pending}>
      {mine ? "Saving…" : label}
    </button>
  );
}

function TagsField({ initial }) {
  const [tags, setTags] = useState(initial);
  const [value, setValue] = useState("");
  const add = () => {
    const v = value.trim().replace(/^#/, "");
    if (v && !tags.includes(v) && tags.length < 10) setTags([...tags, v]);
    setValue("");
  };
  return (
    <div className="fieldlabel">
      <span>
        Tags <span className="hint">Press Enter to add</span>
      </span>
      <input type="hidden" name="tagsJson" value={JSON.stringify(tags)} />
      <div className="taginput">
        {tags.map((t) => (
          <span key={t} className="tag">
            #{t}
            <button type="button" aria-label={`Remove tag ${t}`} onClick={() => setTags(tags.filter((x) => x !== t))}>
              ×
            </button>
          </span>
        ))}
        <input
          value={value}
          aria-label="Add a tag"
          placeholder={tags.length ? "" : "e.g. plastics"}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              add();
            } else if (e.key === "Backspace" && !value && tags.length) setTags(tags.slice(0, -1));
          }}
          onBlur={add}
        />
      </div>
    </div>
  );
}
