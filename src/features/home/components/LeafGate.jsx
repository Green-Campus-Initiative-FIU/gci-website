"use client";

import { useEffect, useRef } from "react";

/*
 * The home page opens covered in leaves. As you scroll, the hero stays pinned
 * while the leaves fly outward (center ones first) to reveal it.
 * Leaves are generated deterministically so server and client render the same.
 */
const COLORS = [
  ["#0F4D2B", "#0A3820"],
  ["#145A33", "#0B3D22"],
  ["#1B6B3E", "#0F4D2B"],
  ["#0A3820", "#062614"],
  ["#2E7D4F", "#1B5E37"],
  ["#B8DAAE", "#86B67C"],
  ["#8FBF84", "#5E9A57"],
];

function makeLeaves() {
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const cols = 8;
  const rows = 6;
  const spots = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      spots.push([((c + 0.5) / cols) * 100 + (rnd() - 0.5) * 10, ((r + 0.5) / rows) * 100 + (rnd() - 0.5) * 12]);
  for (let i = 0; i < 34; i++) spots.push([rnd() * 100, rnd() * 100]);

  return spots.map(([x, y], i) => {
    const color = COLORS[i % 11 === 5 ? 5 : i % 13 === 6 ? 6 : Math.floor(rnd() * 5)];
    const w = 19 + rnd() * 13; // vmax
    let dx = x - 50;
    let dy = y - 50;
    const len = Math.hypot(dx, dy) || 1;
    if (len < 6) {
      const a = rnd() * Math.PI * 2;
      dx = Math.cos(a);
      dy = Math.sin(a);
    } else {
      dx /= len;
      dy /= len;
    }
    return {
      x,
      y,
      w,
      dx,
      dy,
      z: Math.floor(rnd() * 10),
      monstera: rnd() < 0.72,
      color,
      rot: rnd() * 360,
      spin: (rnd() < 0.5 ? -1 : 1) * (40 + rnd() * 90),
      delay: Math.min(len / 70, 1) * 0.3,
      sway: (4 + rnd() * 3).toFixed(2),
      swayDelay: (-rnd() * 4).toFixed(2),
    };
  });
}

const LEAVES = makeLeaves();
const clamp = (v) => Math.max(0, Math.min(1, v));

function Monstera({ fill, shade }) {
  return (
    <svg viewBox="0 0 100 112">
      <path d="M50 108 L50 96" stroke={shade} strokeWidth="4" strokeLinecap="round" />
      <path d="M50 96 C 20 82, 2 58, 6 34 C 10 13, 30 2, 48 10 C 53 3, 72 2, 84 13 C 99 28, 96 60, 74 81 C 66 88, 58 93, 50 96 Z" fill={fill} />
      <g stroke={shade} strokeWidth="4.5" strokeLinecap="round">
        <path d="M7 38 L30 45" />
        <path d="M11 61 L34 57" />
        <path d="M24 80 L40 68" />
        <path d="M93 36 L70 44" />
        <path d="M90 60 L67 57" />
        <path d="M77 80 L60 68" />
      </g>
      <g fill={shade}>
        <ellipse cx="34" cy="30" rx="3.2" ry="5" transform="rotate(-30 34 30)" />
        <ellipse cx="66" cy="30" rx="3.2" ry="5" transform="rotate(30 66 30)" />
        <ellipse cx="38" cy="58" rx="2.6" ry="4" />
        <ellipse cx="62" cy="58" rx="2.6" ry="4" />
      </g>
      <path d="M50 96 Q 51 52 48 11" stroke={shade} strokeWidth="2.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function LongLeaf({ fill, shade }) {
  return (
    <svg viewBox="0 0 100 112">
      <path d="M50 4 C 82 30, 82 78, 50 108 C 18 78, 18 30, 50 4 Z" fill={fill} />
      <path d="M50 106 L50 8" stroke={shade} strokeWidth="2.6" strokeLinecap="round" />
      <g stroke={shade} strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M50 30 L32 22" />
        <path d="M50 30 L68 22" />
        <path d="M50 48 L28 40" />
        <path d="M50 48 L72 40" />
        <path d="M50 66 L30 60" />
        <path d="M50 66 L70 60" />
        <path d="M50 84 L36 80" />
        <path d="M50 84 L64 80" />
      </g>
    </svg>
  );
}

export default function LeafGate({ children }) {
  const gateRef = useRef(null);
  const leavesRef = useRef(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const gate = gateRef.current;
    const layer = leavesRef.current;
    const els = [...layer.querySelectorAll(".leaf")];
    const hero = gate.querySelector(".hero > .wrap");
    let ticking = false;

    const update = () => {
      ticking = false;
      const navh = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--navh")) || 68;
      const g = gate.getBoundingClientRect();
      const span = Math.max(1, g.height - (innerHeight - navh));
      const p = clamp(-g.top / (span * 0.85));
      const travel = Math.max(innerWidth, innerHeight) * 1.15;
      els.forEach((el, i) => {
        const L = LEAVES[i];
        const local = clamp((p - L.delay) / (1 - L.delay));
        const e = local * local * (3 - 2 * local);
        el.style.transform = `translate(${(L.dx * travel * e).toFixed(1)}px, ${(L.dy * travel * e).toFixed(1)}px) rotate(${(L.rot + L.spin * e).toFixed(1)}deg) scale(${(1 + 0.3 * e).toFixed(3)})`;
      });
      if (hero) hero.style.transform = `scale(${(0.93 + 0.07 * clamp(p * 1.4)).toFixed(3)})`;
      layer.style.visibility = p >= 1 ? "hidden" : "visible";
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
  }, []);

  return (
    <div className="gate" ref={gateRef}>
      <div className="gate-stick">
        {children}
        <div className="leaves" ref={leavesRef} aria-hidden="true">
          {LEAVES.map((L, i) => (
            <div
              key={i}
              className="leaf"
              style={{
                left: `${L.x}%`,
                top: `${L.y}%`,
                width: `${L.w}vmax`,
                marginLeft: `${-L.w / 2}vmax`,
                marginTop: `${-L.w * 0.56}vmax`,
                zIndex: L.z,
                transform: `rotate(${L.rot.toFixed(1)}deg)`,
              }}
            >
              <div className="sway" style={{ "--sd": `${L.sway}s`, "--sdl": `${L.swayDelay}s` }}>
                {L.monstera ? <Monstera fill={L.color[0]} shade={L.color[1]} /> : <LongLeaf fill={L.color[0]} shade={L.color[1]} />}
              </div>
            </div>
          ))}
        </div>
        {/* Without JavaScript the leaves could never open, so don't show them at all. */}
        <noscript>
          <style>{`.leaves{display:none}`}</style>
        </noscript>
      </div>
    </div>
  );
}
