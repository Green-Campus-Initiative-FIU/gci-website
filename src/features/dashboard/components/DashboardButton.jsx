"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

export default function DashboardButton({ href, title, textSize = "" }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "border-dark-green hover:bg-dark-green bg-light-green block rounded-lg border-2 font-medium text-white hover:font-bold",
        isActive && "bg-dark-green"
      )}
    >
      <span className={cn("block p-5 text-center", textSize)}>{title}</span>
    </Link>
  );
}
