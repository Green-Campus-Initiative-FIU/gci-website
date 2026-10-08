import { cn } from "@/utils/cn";

export default function Card({ title, className }) {
  return (
    <div
      className={cn(
        "flex aspect-square w-full items-center justify-center rounded-3xl border-2 bg-cover bg-center",
        className
      )}
    >
      {title && (
        <span className="font-satoshi text-center text-4xl font-extrabold uppercase text-white">
          {title}
        </span>
      )}
    </div>
  );
}
