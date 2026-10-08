import React from "react";
import { normalizePost } from "@/utils/blog";
import { formatTextDate } from "@/utils/date";
import PostActions from "./PostActions";
import Dot from "@/components/ui/Dot";

export default function PostListCard({ post }) {
  const {
    id,
    title,
    description,
    createdAtDate,
    publishedAtDate,
    published,
    imageUrl,
    tags,
  } = normalizePost(post);
  return (
    <li
      key={id}
      className="border-dark-green bg-light-green flex w-full items-stretch gap-2 rounded-2xl border-2 p-4"
    >
      {imageUrl && <FeaturedImage imageUrl={imageUrl} title={title} />}
      <div className="flex min-w-0 grow flex-col">
        <div className="flex items-start gap-2">
          <div className="min-w-0 grow">
            <h1 className="line-clamp-1 truncate text-xl font-bold text-white">
              {title}
            </h1>
            <div className="flex items-center gap-1">
              <p className="text-sm text-white/80">
                Created: {formatTextDate(createdAtDate)}
              </p>
              <Dot className="bg-white/80" />
              {post.publishedAt && (
                <p className="text-sm text-white/80">
                  Published: {formatTextDate(publishedAtDate)}
                </p>
              )}
            </div>
          </div>
          <PostActions id={id} published={published} />
        </div>
        {Array.isArray(tags) && tags.length > 0 && <Tags tags={tags} />}

        <div className="bg-dark-green mt-2 grow rounded-lg p-3.5">
          <p className="line-clamp-3 text-sm text-white/80">{description}</p>
        </div>
      </div>
    </li>
  );
}

function FeaturedImage({ imageUrl, title }) {
  return (
    <div className="h-44 w-44 flex-none">
      <img
        src={imageUrl}
        alt={title}
        className="h-full w-full rounded-lg object-cover"
        loading="lazy"
      />
    </div>
  );
}

function Tags({ tags }) {
  return (
    <ul className="mt-1 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="inline-flex items-center rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-white"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
