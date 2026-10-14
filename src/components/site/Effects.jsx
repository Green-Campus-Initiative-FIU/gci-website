"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/*
 * Site-wide scroll effects, driven by data attributes so server components can use them:
 *   data-reveal[="left"|"right"|"pop"|"grow"|"wipe"]  slides/fades in when scrolled into view
 *   style="--d: .2s"                                   delays a reveal
 *   data-speed="-0.05"                                 parallax (fraction of distance from screen center)
 *   data-spin                                          rotates slowly as the page scrolls
 * Plus the gold reading-progress bar. Everything is skipped for "reduce motion" users,
 * and without JavaScript nothing is ever hidden.
 */
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function Effects() {
  const pathname = usePathname();
  const progressRef = useRef(null);
  const firstLoad = useRef(true);

  useIsoLayoutEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("anim");

    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.setAttribute("data-shown", "");
            io.unobserve(en.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    // On the first load, whatever is already on screen stays put (it was painted by the server).
    // After a client-side navigation, on-screen elements animate in.
    const instant = firstLoad.current;
    firstLoad.current = false;
    const arm = (el) => {
      if (el.hasAttribute("data-shown") || el.dataset.armed) return;
      el.dataset.armed = "1";
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.95 && r.bottom > 0) {
        if (instant) el.setAttribute("data-shown", "");
        else requestAnimationFrame(() => el.setAttribute("data-shown", ""));
      } else io.observe(el);
    };
    document.querySelectorAll("[data-reveal]").forEach(arm);

    // Catch content that streams in or is rendered later (lists, filters).
    const mo = new MutationObserver((muts) => {
      for (const m of muts)
        m.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return;
          if (n.matches?.("[data-reveal]")) arm(n);
          n.querySelectorAll?.("[data-reveal]").forEach(arm);
        });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      if (reduced) return;
      document.querySelectorAll("[data-speed]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > innerHeight + 200) return;
        const off = (r.top + r.height / 2 - innerHeight / 2) * parseFloat(el.dataset.speed);
        el.style.translate = `0 ${off.toFixed(1)}px`;
      });
      document.querySelectorAll("[data-spin]").forEach((el) => {
        el.style.rotate = `${(scrollY * 0.08).toFixed(1)}deg`;
      });
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return <div className="progress" ref={progressRef} aria-hidden="true" />;
}
