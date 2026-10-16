import Link from "next/link";
import { notFound } from "next/navigation";
import PostEditor from "@/features/dashboard/blog/PostEditor";
import NoAccess from "@/features/dashboard/NoAccess";
import { getCurrentUser, isAdmin } from "@/services/auth.server";
import { getPostById } from "@/services/posts.server";
import { updatePostByIdAction } from "../../actions";

export default async function EditPostPage({ params }) {
  if (!isAdmin(await getCurrentUser())) return <NoAccess />;
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <>
      <Link className="back" href="/dashboard/view-posts">
        ← All posts
      </Link>
      <h1 className="dash-title">Edit post</h1>
      <PostEditor
        mode="edit"
        action={updatePostByIdAction.bind(null, id)}
        post={{
          title: post.title ?? "",
          description: post.description ?? "",
          category: post.category ?? "",
          tags: Array.isArray(post.tags) ? post.tags : [],
          featuredImageUrl: post.featuredImageUrl ?? "",
          featured: Boolean(post.featured),
          published: Boolean(post.published),
        }}
      />
    </>
  );
}
