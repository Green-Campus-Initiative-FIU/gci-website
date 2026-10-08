import { formatTextDate, toDate } from "./date";

// ** Normalizes blog post data for client-side use **
export function normalizePost(post) {
  const createdAtDate = post.createdAt;
  const publishedAtDate = toDate(post?.publishedAt ?? null);
  const dateTextShort = formatTextDate(publishedAtDate, { shortMonths: true });
  const dateTextLong = formatTextDate(publishedAtDate);
  const tags = Array.isArray(post.tags) ? post.tags : [];
  const authorName = post.authorName || "Unknown author";
  const authorRole = post.authorRole || "no role specified";
  const authorAvatar = post.authorAvatarUrl || "/default-pfp.png";
  const imageUrl = post.featuredImageUrl || "/placeholder.jpg";
  const category = post.category || "uncategorized";
  return {
    id: post.id,
    title: post.title,
    description: post.description,
    published: post.published,
    createdAtDate,
    publishedAtDate,
    dateTextShort,
    dateTextLong,
    authorName,
    authorAvatar,
    authorRole,
    imageUrl,
    tags,
    category,
  };
}

// ** Simple read-time estimator **
// export function estimateReadTime(text) {
//   const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
//   return Math.max(1, Math.round(words / 200));
// }

// ** Read-time estimator with seconds and minutes **
export function estimateReadTime(text) {
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
  // 200 words/min ≈ 3.333 words/sec
  const seconds = Math.max(1, Math.round(words / (200 / 60)));

  if (seconds <= 59) return `less than 1 min read`;
  const minutes = Math.round(seconds / 60);
  return `${minutes} min read`;
}
