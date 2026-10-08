import { normalizePost } from "@/utils/blog";
import PostMetadata from "./PostMetadata";
import PostAuthorBadge from "./PostAuthorBadge";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export default function BlogPostCard({ post }) {
  const {
    id,
    title,
    description,
    dateTextShort,
    authorName,
    authorAvatar,
    authorRole,
    imageUrl,
    tags,
  } = normalizePost(post);
  return (
    <article className="border-dark-green bg-light-green/40 flex flex-col items-start justify-between rounded-3xl border-2 p-3">
      <FeaturedImage title={title} imageUrl={imageUrl} />
      <div className="mt-2.5 flex w-full max-w-xl grow flex-col justify-between rounded-xl">
        <PostMetadata dateTextShort={dateTextShort} description={description} />
        <BlogContent title={title} description={description} />
        <div className="mt-1.5 flex w-full items-center justify-between">
          <PostAuthorBadge
            authorName={authorName}
            authorAvatar={authorAvatar}
            authorRole={authorRole}
            id={id}
            className="flex-1"
          />
          <Button
            as={Link}
            href={`/blog/${id}`}
            icon={FiArrowUpRight}
            iconClassName="size-6 text-white mr-0.5 opacity-70"
            variant="readMore"
            label="Read More"
          />
        </div>
      </div>
    </article>
  );
}

function FeaturedImage({ title, imageUrl }) {
  return (
    <div className="relative w-full">
      <img
        alt={title}
        src={imageUrl}
        className="aspect-video w-full rounded-xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
      />
      <div className="inset-ring inset-ring-gray-900/30 absolute inset-0 rounded-xl" />
    </div>
  );
}

function BlogContent({ title, description }) {
  return (
    <div className="relative grow">
      <h2 className="ellipsis-overflow group-hover:text-light-green text-dark-green mt-2.5 line-clamp-1 min-h-6 text-xl/tight font-bold transition-all">
        {title}
      </h2>
      <p className="ellipsis-overflow min-h-19 text-dark-green/70 mt-0.5 line-clamp-3 text-sm/6 font-medium">
        {description}
      </p>
    </div>
  );
}

function Tags({ tags }) {
  return (
    <>
      {tags.length > 0 && (
        <>
          <span
            aria-hidden
            className="bg-dark-green mx-1 inline-block size-1 rounded-full"
          />
          <ul className="flex flex-wrap items-center gap-0.5">
            {tags.slice(0, 3).map((tag) => (
              <li
                key={tag}
                className="border-dark-green/70 bg-dark-green inline-flex items-center rounded-full border-2 px-2 py-0.5 font-normal text-white"
              >
                {/* truncate tag text figure out how to make it work */}
                <span className="line-clamp-1 max-w-[20ch] truncate text-wrap text-white">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
