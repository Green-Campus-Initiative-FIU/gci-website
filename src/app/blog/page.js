import { getAllPublishedPosts } from "@/services/posts.server";
import FeaturedPosts from "@/features/blog/components/FeaturedPosts";
import PublishedPostsSection from "@/features/blog/components/PublishedPostsSection";
import { toMillis } from "@/utils/date";

export default async function BlogPage() {
  const posts = await getAllPublishedPosts();
  if (!posts?.length) return <div>No posts found</div>;
  console.log(posts[0]);
  const initialPosts = posts.map((post) => ({
    ...post,
    createdAt: toMillis(post.createdAt),
    publishedAt: toMillis(post.publishedAt),
    updatedAt: toMillis(post.updatedAt),
  }));

  return (
    <div className="mx-auto">
      <FeaturedPosts posts={posts} />
      <PublishedPostsSection initialPosts={initialPosts} />
    </div>
  );
}
