import PostMetadata from "./PostMetadata";
import Link from "next/link";

export default function BlogPostListCard({ post }) {
  // Hack to make the date text short work
  // TODO Fix normalizePost function to handle this
  const publishedAtMillis = post.publishedAt._seconds * 1000;
  const publishedAtDateObject = new Date(publishedAtMillis);
  const localDateString = publishedAtDateObject.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div key={post.id} className="flex w-full max-w-xl flex-col gap-x-8 py-4">
      <PostMetadata
        dateTextShort={localDateString}
        description={post.description}
        author={post.authorName}
      />
      <Link
        className="hover:text-light-green text-dark-green transition-all duration-300"
        href={`/blog/${post.id}`}
      >
        <h3 className="mt-1.5 line-clamp-2 max-h-16 max-w-3xl overflow-ellipsis text-2xl/tight font-bold">
          {post.title}
        </h3>
      </Link>
      <p className="text-dark-green/70 mt-1.5 line-clamp-3 max-w-3xl text-sm font-medium">
        {post.description}
      </p>
    </div>
  );
}
