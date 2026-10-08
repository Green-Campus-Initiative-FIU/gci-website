import { getPublishedPostById } from "@/services/posts.server";
import { normalizePost } from "@/utils/blog";
import PostMetadata from "./PostMetadata";
import PostAuthorBadge from "./PostAuthorBadge";
import ReturnToBlog from "./ReturnToBlog";

export default async function PostPage({ id }) {
  const post = await getPublishedPostById(id);
  if (!post) return <div className="p-6">Post not found</div>;
  console.log({ post });
  const {
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
    <article className="min-h-[70vh]">
      {/* Green Header */}
      <header className="bg-dark-green relative overflow-hidden">
        {/* Header content - Title and Author Container */}
        <div className="relative z-10 mx-auto mb-24 flex max-w-4xl py-8">
          <div className="flex flex-1 items-center gap-x-8">
            <div className="flex flex-1 flex-col">
              <ReturnToBlog />
              <h1 className="font-staatliches max-h-30 line-clamp-2 text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl">
                {title}
              </h1>
            </div>
          </div>
          {/* Author and Date Container */}
          <div className="flex flex-col items-end justify-end gap-3 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <PostAuthorBadge
                variant="light"
                authorName={authorName}
                authorAvatar={authorAvatar}
                authorRole={authorRole}
                id={id}
              />
            </div>
            <PostMetadata
              variant="light"
              dateTextShort={dateTextShort}
              description={description}
            />
          </div>
        </div>
      </header>

      <FeaturedImage title={title} imageUrl={imageUrl} />

      {/* Body / description */}
      <div className="mx-auto max-w-4xl pb-8">
        <section className="prose prose-invert prose-headings:text-dark-green prose-p:text-gray-800 prose-a:text-dark-green mx-auto mt-8">
          <p className="whitespace-pre-line text-base font-medium leading-7 text-gray-700">
            {description}
          </p>
        </section>
      </div>
    </article>
  );
}

function FeaturedImage({ title, imageUrl }) {
  return (
    <div className="relative mx-auto -mt-24 max-w-5xl px-6 sm:px-8">
      <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
        <img
          src={imageUrl}
          alt={title}
          className="aspect-[16/9] w-full object-cover"
        />
      </div>
    </div>
  );
}
