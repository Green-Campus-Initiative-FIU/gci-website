"use client";

import { useRef } from "react";
import { clamp, useScrollFrame } from "./useScrollProgress";

const PHRASES = ["Cultivating a culture", "of sustainability", "at FIU and beyond"];

// A giant line of text that slides sideways as you scroll past it.
export default function ScrollMarquee() {
  const boxRef = useRef(null);
  const trackRef = useRef(null);

  useScrollFrame(boxRef, (r) => {
    const p = clamp((innerHeight - r.top) / (innerHeight + r.height));
    trackRef.current.style.transform = `translateX(${(-p * 40).toFixed(2)}%)`;
  });

  const items = [...PHRASES, ...PHRASES.slice(0, 2)];
  return (
    <div className="bigline" ref={boxRef} aria-hidden="true">
      <div className="track" ref={trackRef}>
        {items.flatMap((t, i) => [
          <span key={`t${i}`}>{t}</span>,
          i < items.length - 1 ? <i key={`s${i}`}>✦</i> : null,
        ])}
      </div>
    </div>
  );
}
