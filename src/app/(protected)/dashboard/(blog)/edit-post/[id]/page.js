import { getPostById } from "@/services/posts.server";
import ReturnToDashboard from "@/features/dashboard/components/ReturnToDashboard";
import PostForm from "@/features/dashboard/blog/components/PostForm";
import { updatePostByIdAction } from "@/app/(protected)/dashboard/(blog)/actions";

export default async function EditPostPage({ params }) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div className="mx-auto flex flex-col">
      <ReturnToDashboard />
      <h2 className="text-dark-green px-4 text-2xl font-black">
        Edit Blog Post
      </h2>

      <PostForm
        action={updatePostByIdAction.bind(null, id)}
        defaultValues={{
          title: post.title ?? "",
          description: post.description ?? "",
          tags: Array.isArray(post.tags) ? post.tags : [],
          featuredImageUrl: post.featuredImageUrl ?? "",
          category: post.category ?? "",
        }}
        mode="edit"
      />
    </div>
  );
}
