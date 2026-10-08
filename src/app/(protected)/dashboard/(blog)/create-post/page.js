import ReturnToDashboard from "@/features/dashboard/components/ReturnToDashboard";
import PostForm from "@/features/dashboard/blog/components/PostForm";
import { createPostAction } from "../actions";

export default function CreateBlogPost() {
  return (
    <div className="mx-auto">
      <ReturnToDashboard />
      <h2 className="text-dark-green px-4 text-2xl font-black">
        Create Blog Post
      </h2>
      <PostForm action={createPostAction} />
    </div>
  );
}
