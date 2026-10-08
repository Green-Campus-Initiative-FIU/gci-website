import BlogPostCard from "./BlogPostCard";

export default async function FeaturedPosts({ posts }) {
  return (
    <div className="max-container padding-container pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-staatliches text-dark-green text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Green Initiatives and Ideas
          </h2>
          <p className="text-light-green mt-2 text-lg/8">
            Student-led ideas for a greener campus.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <div
              key={post.id}
              className="hover:scale-103 transition-all duration-300"
            >
              <BlogPostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
