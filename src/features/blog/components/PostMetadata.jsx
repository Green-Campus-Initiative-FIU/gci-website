import { CalendarIcon } from "@heroicons/react/24/outline";
import { estimateReadTime } from "@/utils/blog";
import { cn } from "@/utils/cn";
import Dot from "@/components/ui/Dot";

export default function PostMetadata({
  dateTextShort,
  description,
  className,
  variant = "default",
  author = false,
  category = false,
}) {
  const VARIANTS = {
    default: {
      text: "text-dark-green",
      chipBorder: "border-dark-green",
      chipIcon: "text-dark-green",
      dot: "bg-dark-green",
    },
    light: {
      text: "text-white",
      chipBorder: "border-white/70",
      chipIcon: "text-white",
      dot: "bg-white",
    },
  };

  const v = VARIANTS[variant] || VARIANTS.default;

  return (
    <div
      className={cn(
        "text-dark-green relative flex items-center gap-x-0.5 text-xs",
        v.text,
        className
      )}
    >
      <div
        className={cn(
          "flex w-fit items-center gap-x-1 rounded-full border px-2 py-0.5",
          v.chipBorder
        )}
      >
        <CalendarIcon className={cn("size-4", v.chipIcon)} />
        <time>{dateTextShort}</time>
      </div>
      {/* <div className="bg-dark-green/70 h-5.5 mx-1 w-px" /> */}
      <Dot className={v.dot} />
      <div className="flex w-fit items-center gap-x-1 px-0.5 py-0.5">
        <span>{estimateReadTime(description)}</span>
      </div>
      {author && (
        <>
          <Dot className={v.dot} />
          <div className="flex w-fit items-center gap-x-1 px-0.5 py-0.5">
            <span>{author}</span>
          </div>
        </>
      )}
    </div>
  );
}
