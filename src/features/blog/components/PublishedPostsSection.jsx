"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import BlogPostListCard from "./BlogPostListCard";
import Button from "@/components/ui/Button";
import { BLOG_CATEGORIES } from "@/features/dashboard/blog/constants/categories";
import { cn } from "@/utils/cn";
import { FaSpinner } from "react-icons/fa";

export default function PublishedPostsSection({ initialPosts }) {
  console.log("initialPosts", initialPosts);
  const [posts, setPosts] = useState(initialPosts ?? []);
  const [nextCursor, setNextCursor] = useState(null);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const PAGE_SIZE = 4;

  // Fetch initial cursor (even when using initialPosts)
  const initialized = useRef(false);

  async function loadPosts({ reset = false } = {}) {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("limit", String(PAGE_SIZE));
      if (category) params.set("category", category);
      if (!reset && nextCursor) params.set("cursor", nextCursor);

      const res = await fetch(`/api/posts?${params.toString()}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      const data = await res.json();

      setPosts((prev) => (reset ? data.items : [...prev, ...data.items]));
      setNextCursor(data.nextCursor);
    } finally {
      setIsLoading(false);
    }
  }
  // On mount, fetch first page to set both posts and cursor for current filters
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    loadPosts({ reset: true });
  }, []);

  // When filters change, reset and fetch from the beginning
  useEffect(() => {
    // Skip first render where we already did a reset
    if (!initialized.current) return;
    loadPosts({ reset: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div className="max-container padding-container pb-8 pt-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-staatliches text-dark-green text-balance text-start text-4xl font-semibold tracking-tight sm:text-5xl">
          Published Posts
        </h2>

        {/* Controls */}
        <div className="mx-auto flex flex-wrap items-center justify-start gap-3 py-2.5">
          <button
            key="__all__"
            role="option"
            aria-selected={!category}
            onClick={() => setCategory("")}
            className={cn(
              "category-btn",
              !category && "bg-light-green text-white"
            )}
          >
            <span>All Posts</span>
          </button>

          {BLOG_CATEGORIES.map((c) => {
            const Icon = c.icon;
            const active = c.value === category;
            return (
              <Button
                key={c.value}
                role="option"
                aria-selected={active}
                onClick={() => setCategory(c.value)}
                variant="category"
                active={active}
                iconClassName="opacity-70"
                icon={Icon}
                label={c.label}
              />
            );
          })}
        </div>
      </div>
      <div className="mx-auto mt-6 grid max-w-7xl grid-cols-1 gap-x-8 gap-y-0.5 divide-y divide-gray-800/20 lg:grid-cols-2">
        {posts.map((post) => (
          <BlogPostListCard key={post.id} post={post} />
        ))}
      </div>
      <div className="mt-16 flex justify-center">
        {(nextCursor || isLoading) && (
          <Button
            variant="loadMore"
            label={isLoading ? "" : "Load more posts"}
            icon={FaSpinner}
            iconClassName={`size-4  ${isLoading ? "block animate-spin" : "hidden"}`}
            onClick={() => loadPosts()}
            disabled={isLoading}
          />
        )}
        {!nextCursor && !isLoading && posts.length > 0 && (
          <div className="mt-4 flex flex-col items-center gap-y-2 text-sm text-gray-500">
            <span>You've reached the end of the list 🎉</span>
            <div className="hover:text-light-green text-sm font-black text-gray-500">
              {" "}
              <Link href="#top"> back to top </Link>{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
