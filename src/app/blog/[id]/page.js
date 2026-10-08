import PostPage from "@/features/blog/components/PostPage";

export default async function BlogPostPage({ params}) {
  const { id } = await params;
  return (
    <>
      <PostPage id={id} />
    </>
  );
}
