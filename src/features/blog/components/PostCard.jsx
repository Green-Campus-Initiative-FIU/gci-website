import Image from "next/image";
import Link from "next/link";
import { categoryLabel, normalizePost } from "@/utils/blog";

// Card used on the home page and the blog list.
export default function PostCard({ post, index = 0, sizes = "(max-width: 560px) 100vw, 33vw" }) {
  const p = normalizePost(post);
  const summary = p.description?.split("\n")[0];
  return (
    <Link className="post" href={`/blog/${p.id}`} data-reveal style={{ "--d": `${(index % 3) * 0.1}s` }}>
      <div className="ph">
        <Image src={p.imageUrl} alt="" fill sizes={sizes} style={{ objectFit: "cover" }} />
      </div>
      <div className="meta">
        <span className={`cat ${p.category}`}>{categoryLabel(p.category)}</span>
        <span className="date">{p.dateTextShort}</span>
      </div>
      <h3>{p.title}</h3>
      {summary && <p>{summary}</p>}
      <span className="readmore">Read more →</span>
    </Link>
  );
}
