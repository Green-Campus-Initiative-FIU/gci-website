import Image from "@/components/site/SiteImage";
import Link from "next/link";
import JoinBand from "@/components/site/JoinBand";
import PostCard from "@/features/blog/components/PostCard";
import { getSiteContent } from "@/content/site";
import { getPublicPosts } from "@/services/posts.server";
import { categoryLabel, normalizePost } from "@/utils/blog";

export const metadata = { title: "Blog | Green Campus Initiative" };

export default async function BlogPage({ searchParams }) {
  const { category = "all" } = await searchParams;
  const [c, posts] = await Promise.all([getSiteContent(), getPublicPosts(60)]);

  const main = posts.find((p) => p.featured) ?? posts[0];
  const side = posts.filter((p) => p !== main).slice(0, 3);
  const used = [...new Set(posts.map((p) => p.category).filter(Boolean))];
  const list = category === "all" ? posts : posts.filter((p) => p.category === category);
  const isSample = posts[0]?.isSample;

  return (
    <>
      <section className="block" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <div className="head">
            <h1 className="page-title" data-reveal>
              Blog {isSample && <span className="draft">sample posts</span>}
            </h1>
            <p data-reveal style={{ "--d": ".1s" }}>
              {c["blog.text"]}
            </p>
          </div>
          {main ? (
            <div className="featured">
              <FeaturedMain post={main} />
              <div className="feat-side">
                {side.map((p, i) => (
                  <SidePost key={p.id} post={p} i={i} />
                ))}
              </div>
            </div>
          ) : (
            <p style={{ fontSize: 18 }}>No posts yet. Check back soon.</p>
          )}
        </div>
      </section>

      {posts.length > 0 && (
        <section className="block">
          <div className="wrap">
            <div className="head">
              <h2 data-reveal>All posts</h2>
            </div>
            <nav className="filters" aria-label="Filter by category">
              {["all", ...used].map((v) => (
                <Link key={v} href={v === "all" ? "/blog" : `/blog?category=${v}`} aria-current={category === v ? "true" : undefined} scroll={false}>
                  {v === "all" ? "All categories" : categoryLabel(v)}
                </Link>
              ))}
            </nav>
            {list.length ? (
              <div className="grid3">
                {list.map((p, i) => (
                  <PostCard key={p.id} post={p} index={i} />
                ))}
              </div>
            ) : (
              <p>No posts in this category yet.</p>
            )}
            <p className="endnote">You&apos;ve reached the end of the list.</p>
          </div>
        </section>
      )}
      <JoinBand />
    </>
  );
}

function FeaturedMain({ post }) {
  const p = normalizePost(post);
  return (
    <Link className="feat-main" href={`/blog/${p.id}`} data-reveal>
      <Image src={p.imageUrl} alt="" fill sizes="(max-width: 820px) 100vw, 60vw" style={{ objectFit: "cover" }} priority />
      <div className="meta">
        <span className={`cat ${p.category}`}>{categoryLabel(p.category)}</span>
        <span className="date" style={{ color: "var(--mint)" }}>
          {p.dateTextShort}
        </span>
      </div>
      <h3>{p.title}</h3>
      {p.description && <p>{p.description.split("\n")[0]}</p>}
    </Link>
  );
}

function SidePost({ post, i }) {
  const p = normalizePost(post);
  return (
    <Link className="post" href={`/blog/${p.id}`} data-reveal="right" style={{ "--d": `${i * 0.1}s` }}>
      <div className="ph">
        <Image src={p.imageUrl} alt="" fill sizes="160px" style={{ objectFit: "cover" }} />
      </div>
      <div style={{ display: "grid", gap: 6 }}>
        <div className="meta">
          <span className={`cat ${p.category}`}>{categoryLabel(p.category)}</span>
        </div>
        <h3>{p.title}</h3>
        <span className="date">{p.dateTextShort}</span>
      </div>
    </Link>
  );
}
