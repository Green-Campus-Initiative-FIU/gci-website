"use client";

import { useRef } from "react";
import { clamp, useScrollFrame } from "./useScrollProgress";
import Editable from "@/components/edit/Editable";

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
          <Editable k="home.levels.label" v={c["home.levels.label"]} className="label" data-reveal="" />
          <Editable k="home.levels.title" v={c["home.levels.title"]} as="h2" data-reveal="" style={{ "--d": ".08s" }} />
          <Editable k="home.levels.text" v={c["home.levels.text"]} as="p" multiline data-reveal="" style={{ "--d": ".16s" }} />
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
