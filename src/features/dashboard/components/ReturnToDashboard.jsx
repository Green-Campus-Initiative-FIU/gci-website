import React from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function ReturnToDashboard() {
  return (
    <div className="flex justify-end px-4">
      <Link
        href="/dashboard"
        className="text-dark-green hover:text-dark-green/80 font-satoshi text-sm font-bold uppercase"
      >
        <div className="flex items-center gap-2">
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="text-dark-green hover:text-dark-green/80">
            Return to Dashboard
          </span>
        </div>
      </Link>
    </div>
  );
}
