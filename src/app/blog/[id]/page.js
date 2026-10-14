import Image from "@/components/site/SiteImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicPost } from "@/services/posts.server";
import { categoryLabel, estimateReadTime, normalizePost } from "@/utils/blog";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getPublicPost(id);
  return {
    title: post ? `${post.title} | Green Campus Initiative` : "Post not found",
    description: post?.description?.split("\n")[0],
  };
}

export default async function PostPage({ params }) {
  const { id } = await params;
  const post = await getPublicPost(id);
  if (!post) notFound();
  const p = normalizePost(post);

  return (
    <section className="block">
      <div className="wrap">
        <article className="article">
          <Link className="back" href="/blog">
            ← Back to blog
          </Link>
          <div className="meta" data-reveal>
            <span className={`cat ${p.category}`}>{categoryLabel(p.category)}</span>
            <span className="date">{p.dateTextLong}</span>
            <span className="date">· {estimateReadTime(p.description)}</span>
          </div>
          <h1 data-reveal style={{ "--d": ".08s" }}>
            {p.title}
          </h1>
          <div className="author" data-reveal style={{ "--d": ".14s" }}>
            <span className="avatar">
              {post.authorAvatarUrl ? (
                <Image src={post.authorAvatarUrl} alt="" fill sizes="44px" style={{ objectFit: "cover" }} />
              ) : (
                p.authorName.trim()[0]
              )}
            </span>
            <div>
              <b>{p.authorName}</b>
              <div className="date">{post.authorRole || "Green Campus Initiative"}</div>
            </div>
          </div>
          <figure className="cover" data-reveal="pop" style={{ "--d": ".2s" }}>
            <Image src={p.imageUrl} alt="" fill sizes="(max-width: 800px) 100vw, 760px" style={{ objectFit: "cover" }} priority />
          </figure>
          <div className="body">{p.description}</div>
          {p.tags.length > 0 && (
            <div className="tags">
              {p.tags.map((t) => (
                <span key={t} className="tag">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
