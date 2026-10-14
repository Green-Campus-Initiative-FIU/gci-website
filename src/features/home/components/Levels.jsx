"use client";

import { useRef } from "react";
import { clamp, useScrollFrame } from "./useScrollProgress";

// FIU → Miami-Dade → Florida rings that grow outward as you scroll.
export default function Levels({ c }) {
  const ringsRef = useRef(null);

  useScrollFrame(ringsRef, (r) => {
    const p = clamp((innerHeight - r.top) / (innerHeight * 0.9));
    ringsRef.current.querySelectorAll(".lvl-ring").forEach((el) => {
      const n = Number(el.dataset.ring);
      const local = clamp((p - (n - 1) * 0.18) / 0.5);
      el.style.transform = `scale(${(0.35 + 0.65 * local).toFixed(3)})`;
      el.style.opacity = (0.25 + 0.75 * local).toFixed(2);
    });
  });

  return (
    <section className="levels">
      <div className="wrap">
        <div className="copy">
          <span className="label" data-reveal>
            {c["home.levels.label"]}
          </span>
          <h2 data-reveal style={{ "--d": ".08s" }}>
            {c["home.levels.title"]}
          </h2>
          <p data-reveal style={{ "--d": ".16s" }}>
            {c["home.levels.text"]}
          </p>
        </div>
        <div className="rings" ref={ringsRef} role="img" aria-label="FIU inside Miami-Dade County inside Florida">
          <div className="lvl-ring r3" data-ring="3">
            <b>Florida</b>
          </div>
          <div className="lvl-ring r2" data-ring="2">
            <b>Miami-Dade</b>
          </div>
          <div className="lvl-ring r1" data-ring="1">
            <div>
              <b>FIU</b>
              <small>start here</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
