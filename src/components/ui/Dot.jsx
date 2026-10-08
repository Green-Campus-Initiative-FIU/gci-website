import { cn } from "@/utils/cn";

export default function Dot({ className }) {
  return (
    <span
      aria-hidden
      className={cn("mx-1 inline-block size-1 rounded-full", className)}
    />
  );
}
