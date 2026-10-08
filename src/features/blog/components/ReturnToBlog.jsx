import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function ReturnToBlog() {
  return (
    <div className="flex w-full items-start justify-start">
      <Link href="/blog" className="text-xs text-white/50">
        <div className="flex items-start justify-start gap-0.5">
          <ArrowLeftIcon className="h-4 w-4" />
          Back to blog
        </div>
      </Link>
    </div>
  );
}
