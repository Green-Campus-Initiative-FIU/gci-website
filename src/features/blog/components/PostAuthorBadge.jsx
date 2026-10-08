import Link from "next/link";
import { cn } from "@/utils/cn";

export default function PostAuthorBadge({
  authorName,
  authorAvatar,
  authorRole,
  id,
  className,
  variant = "default",
}) {
  const VARIANTS = {
    default: {
      authorNameText: "text-dark-green/90",
      authorRoleText: "text-gray-600",
    },
    light: {
      authorNameText: "text-white",
      authorRoleText: "text-white/70",
    },
  };

  const v = VARIANTS[variant] || VARIANTS.default;

  return (
    <div className={cn("relative flex items-center gap-x-1.5", className)}>
      <img
        alt={authorName}
        src={authorAvatar}
        className="size-7 rounded-full bg-gray-100 object-cover"
      />
      <div className="flex flex-col">
        <p className={cn("text-sm/4 font-bold", v.authorNameText)}>
          <Link href={`/blog/${id}`}>
            <span className="absolute inset-0" />
            {authorName}
          </Link>
        </p>
        <p className={cn("px-px text-xs/3 lowercase", v.authorRoleText)}>
          {authorRole}
        </p>
      </div>
    </div>
  );
}
