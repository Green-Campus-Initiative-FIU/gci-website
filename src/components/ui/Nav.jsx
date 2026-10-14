"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { JOIN_URL, navigation } from "@/constants";

export default function Nav() {
  const user = useUser();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const links = user ? [...navigation, { name: "Dashboard", href: "/dashboard" }] : navigation;
  const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="nav">
      <div className="wrap">
        <Link className="brand" href="/" aria-label="Green Campus Initiative home">
          <Image src="/gci-transparent.webp" alt="" width={46} height={46} priority />
          <span>
            Green Campus
            <br />
            Initiative
          </span>
        </Link>
        <nav className="links" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? "page" : undefined}>
              {l.name}
            </Link>
          ))}
          <a className="btn btn-gold btn-small" href={JOIN_URL} target="_blank" rel="noopener">
            Join GCI
          </a>
        </nav>
        <button
          className="menu-btn"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <div className="mobile-menu" id="mobile-menu">
          <div className="wrap">
            <Link href="/">Home</Link>
            {links.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.name}
              </Link>
            ))}
            <a href={JOIN_URL} target="_blank" rel="noopener">
              Join GCI ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
