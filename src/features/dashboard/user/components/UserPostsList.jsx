import { getUserPostsByUid } from "@/services/posts.server";
import Link from "next/link";
import { getCurrentUser } from "@/services/auth.server";
import { redirect } from "next/navigation";
import PostListCard from "./PostListCard";

export default async function UserPostsList() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const posts = await getUserPostsByUid(user.uid);

  if (posts.length === 0) {
    return (
      <div>
        No posts found. <Link href="/dashboard/create-post">Create a post</Link>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 p-4 md:grid-cols-1">
      {posts.map((post) => (
        <PostListCard key={post.id} post={post} />
      ))}
    </ul>
  );
}
