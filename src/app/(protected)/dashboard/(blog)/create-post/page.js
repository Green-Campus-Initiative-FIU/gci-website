import Link from "next/link";
import PostEditor from "@/features/dashboard/blog/PostEditor";
import NoAccess from "@/features/dashboard/NoAccess";
import { canEdit, getCurrentUser } from "@/services/auth.server";
import { createPostAction } from "../actions";

export default async function CreatePostPage() {
  if (!canEdit(await getCurrentUser())) return <NoAccess />;
  return (
    <>
      <Link className="back" href="/dashboard/view-posts">
        ← All posts
      </Link>
      <h1 className="dash-title">Write a post</h1>
      <PostEditor action={createPostAction} />
    </>
  );
}
