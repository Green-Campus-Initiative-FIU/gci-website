import Link from "next/link";
import Image from "@/components/site/SiteImage";
import NoAccess from "@/features/dashboard/NoAccess";
import PostRowActions from "@/features/dashboard/blog/PostRowActions";
import { getCurrentUser, isAdmin } from "@/services/auth.server";
import { getAllPosts } from "@/services/posts.server";
import { categoryLabel, normalizePost } from "@/utils/blog";
import { formatTextDate } from "@/utils/date";

const SAVED = {
  published: "Published. It's live on the blog.",
  draft: "Saved as a draft. Only admins can see it until you publish.",
  updated: "Changes saved.",
};

export default async function PostsPage({ searchParams }) {
  if (!isAdmin(await getCurrentUser())) return <NoAccess />;
  const { saved } = await searchParams;
  const posts = await getAllPosts(200);

  return (
    <>
      <div className="dash-head">
        <h1 className="dash-title">Posts</h1>
        <Link className="btn btn-gold btn-small" href="/dashboard/create-post">
          Write a post
        </Link>
      </div>
      {SAVED[saved] && (
        <p className="ok" role="status" style={{ marginBottom: 16 }}>
          {SAVED[saved]}
        </p>
      )}
      {posts.length === 0 ? (
        <div className="panel">
          <p>No posts yet. Write the first one and it will show up on the blog and the homepage.</p>
        </div>
      ) : (
        <ul className="mylist">
          {posts.map((post) => {
            const p = normalizePost(post);
            return (
              <li key={p.id} className="myrow">
                <span className="thumb">
                  <Image src={p.imageUrl} alt="" fill sizes="96px" style={{ objectFit: "cover" }} />
                </span>
                <div>
                  <div className="meta">
                    <span className={`status ${p.published ? "live" : "draft"}`}>{p.published ? "Published" : "Draft"}</span>
                    {p.featured && <span className="status featured">Featured</span>}
                    <span className={`cat ${p.category}`}>{categoryLabel(p.category)}</span>
                    <span className="date">{formatTextDate(p.published ? p.publishedAtDate : post.createdAt, { shortMonths: true })}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <span className="date">by {p.authorName}</span>
                </div>
                <PostRowActions id={p.id} published={p.published} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
