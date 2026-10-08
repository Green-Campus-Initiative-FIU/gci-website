"use client";

import { useState, useRef, useEffect, useId } from "react";
import { cn } from "@/utils/cn";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";

export default function TagInput({
  name = "tagsJson",
  initialTags = [],
  placeholder = "Add tags...",
  maxTags = 10,
  className,
}) {
  // Keep tags exactly as provided; trim and dedupe only
  const [tags, setTags] = useState(
    initialTags
      .map((t) => String(t).trim())
      .filter(Boolean)
      .filter((t, i, a) => a.indexOf(t) === i)
  );
  const [value, setValue] = useState("");
  const inputId = useId();
  const chipsContainerRef = useRef(null);

  useEffect(() => {
    const el = chipsContainerRef.current;
    if (!el) return;
    // queue after DOM paints so width is updated
    requestAnimationFrame(() => {
      el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    });
  }, [tags]);

  function commit() {
    const v = value.trim();
    if (!v) return;
    if (tags.includes(v)) {
      setValue("");
      return;
    }
    if (tags.length >= maxTags) return;
    setTags((prev) => [...prev, v]);
    setValue("");
  }

  function removeTag(tag) {
    setTags((prev) => prev.filter((t) => t !== tag));
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      commit();
    }
    if (e.key === "Backspace" && !value && tags.length) {
      e.preventDefault();
      setTags((prev) => prev.slice(0, -1));
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <input type="hidden" name={name} value={JSON.stringify(tags)} />

      {/* Tag Input Container */}
      <div
        className={cn(
          "flex min-h-[52px] items-center whitespace-nowrap",
          tags.length > 0 && "gap-2"
        )}
        aria-label="Tag input"
      >
        <div
          ref={chipsContainerRef}
          // Todo: Add gradient mask to the container
          className={cn(
            "max-w-[367px] space-x-0.5 overflow-x-auto overflow-y-hidden scroll-smooth",
            tags.length > 0 && "outline"
          )}
        >
          {tags.map((tag) => (
            <TagItem key={tag} tag={tag} onRemove={removeTag} />
          ))}{" "}
        </div>
        {tags.length < maxTags ? (
          <div className="flex flex-none items-center gap-2">
            <input
              id={inputId}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={placeholder}
              className="input flex-none"
            />

            <button
              type="button"
              onClick={commit}
              className="border-dark-green bg-light-green hover:bg-dark-green inline-flex size-12 items-center justify-center rounded-md border-2 text-white"
              aria-label="Add tag"
              title="Add tag"
            >
              <PlusIcon className="size-5" />
            </button>
          </div>
        ) : (
          <div className="flex-none items-center justify-end gap-2">
            <p className="text-dark-green text-lg font-medium">
              Max {maxTags} tags reached.
            </p>
          </div>
        )}
      </div>

      {/* <p className="mt-1 text-xs text-white/70">
        Press Enter to add. Max {maxTags} tags. No duplicates.
      </p> */}
    </div>
  );
}

function TagItem({ tag, onRemove }) {
  return (
    <span className="bg-dark-green my-0.5 inline-flex flex-none items-center gap-2 rounded-full px-3.5 py-2.5 font-semibold text-white">
      {tag}
      <button
        type="button"
        className="hover:bg-light-green rounded-full"
        onClick={() => onRemove(tag)}
      >
        <XMarkIcon className="size-5" />
      </button>
    </span>
  );
}
