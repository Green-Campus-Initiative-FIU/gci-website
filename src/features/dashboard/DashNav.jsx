"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutClient } from "@/services/auth.client";

const ADMIN_LINKS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/#edit", label: "Edit the website", hl: true },
  { href: "/dashboard/view-posts", label: "Posts", also: ["/dashboard/create-post", "/dashboard/edit-post"] },
  { href: "/dashboard/committees", label: "Committees" },
  { href: "/dashboard/team", label: "Officers" },
  { href: "/dashboard/events", label: "Events" },
  { href: "/dashboard/faq", label: "FAQ" },
  { href: "/dashboard/people", label: "People & access", adminOnly: true },
  { href: "/dashboard/settings", label: "My account" },
];
const MEMBER_LINKS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/settings", label: "My account" },
];

export default function DashNav({ editor, admin }) {
  const pathname = usePathname();
  const links = editor ? ADMIN_LINKS.filter((l) => admin || !l.adminOnly) : MEMBER_LINKS;
  const active = (l) =>
    l.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(l.href) || l.also?.some((p) => pathname.startsWith(p));

  return (
    <nav className="dash-nav" aria-label="Dashboard">
      {links.map((l) =>
        l.href.startsWith("/#") ? (
          // Full page load so the site opens straight into edit mode.
          <a key={l.href} href={l.href} className={l.hl ? "hl" : undefined}>
            {l.label}
          </a>
        ) : (
          <Link key={l.href} href={l.href} aria-current={active(l) ? "page" : undefined} className={l.hl ? "hl" : undefined}>
            {l.label}
          </Link>
        )
      )}
      <button type="button" onClick={() => logoutClient({ redirectTo: "/" })}>
        Log out
      </button>
    </nav>
  );
}
