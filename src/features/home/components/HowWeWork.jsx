"use client";

import { useRef, useState } from "react";
import { clamp, useScrollFrame } from "./useScrollProgress";
import Editable from "@/components/edit/Editable";

// Pinned section: Research → Advocate → Implement take turns as you scroll.
export default function HowWeWork({ c }) {
  const pinRef = useRef(null);
  const barRef = useRef(null);
  const [stage, setStage] = useState(0);

  useScrollFrame(pinRef, (r) => {
    const p = clamp(-r.top / (r.height - innerHeight));
    barRef.current.style.transform = `scaleX(${p.toFixed(3)})`;
    setStage(Math.min(2, Math.floor(p * 3 * 0.999)));
  });

  const stages = [1, 2, 3];

  return (
    <section className="pin" ref={pinRef}>
      <div className="pin-inner">
        <div className="wrap pin-grid">
          <div>
            <Editable k="home.work.label" v={c["home.work.label"]} className="label" />
            <Editable k="home.work.title" v={c["home.work.title"]} as="h2" />
            <ol className="stagelist">
              {stages.map((n, i) => (
                <li key={n} className={`stage${i === stage ? " on" : ""}`}>
                  <span className="n">{n}</span>
                  <div>
                    <Editable k={`home.work.${n}.title`} v={c[`home.work.${n}.title`]} as="h3" />
                    <Editable k={`home.work.${n}.text`} v={c[`home.work.${n}.text`]} as="p" multiline />
                  </div>
                </li>
              ))}
            </ol>
            <div className="pin-bar" aria-hidden="true">
              <i ref={barRef} />
            </div>
          </div>
          <div className="scene" aria-hidden="true">
            <ResearchScene on={stage === 0} />
            <AdvocateScene on={stage === 1} />
            <ImplementScene on={stage === 2} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ResearchScene({ on }) {
  return (
    <svg viewBox="0 0 300 300" className={on ? "on" : undefined}>
      <circle cx="150" cy="150" r="140" fill="#B8DAAE" stroke="#13261B" strokeWidth="3" />
      <rect x="96" y="96" width="56" height="120" rx="14" fill="#9CC9C2" stroke="#13261B" strokeWidth="3" />
      <rect x="108" y="78" width="32" height="22" rx="5" fill="#E3A72F" stroke="#13261B" strokeWidth="3" />
      <path d="M96 140 H152 M96 170 H152" stroke="#13261B" strokeWidth="3" />
      <circle cx="186" cy="150" r="44" fill="rgba(251,252,247,.55)" stroke="#13261B" strokeWidth="7" />
      <path d="M218 182 L252 216" stroke="#13261B" strokeWidth="12" strokeLinecap="round" />
    </svg>
  );
}

function AdvocateScene({ on }) {
  return (
    <svg viewBox="0 0 300 300" className={on ? "on" : undefined}>
      <circle cx="150" cy="150" r="140" fill="#9CC9C2" stroke="#13261B" strokeWidth="3" />
      <path d="M74 126 L170 88 V212 L74 174 Z" fill="#E3A72F" stroke="#13261B" strokeWidth="3" strokeLinejoin="round" />
      <rect x="52" y="122" width="26" height="56" rx="6" fill="#B6862C" stroke="#13261B" strokeWidth="3" />
      <path d="M96 176 L106 226 H128 L122 184" fill="#FBFCF7" stroke="#13261B" strokeWidth="3" strokeLinejoin="round" />
      <path d="M192 120 q16 30 0 60 M212 102 q30 48 0 96 M232 86 q42 64 0 128" stroke="#0F4D2B" strokeWidth="7" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function ImplementScene({ on }) {
  return (
    <svg viewBox="0 0 300 300" className={on ? "on" : undefined}>
      <circle cx="150" cy="150" r="140" fill="#E3A72F" stroke="#13261B" strokeWidth="3" />
      <rect x="112" y="70" width="76" height="150" rx="20" fill="#0F4D2B" stroke="#13261B" strokeWidth="3" />
      <rect x="126" y="56" width="48" height="22" rx="6" fill="#B8DAAE" stroke="#13261B" strokeWidth="3" />
      <path d="M112 130 H188" stroke="#B8DAAE" strokeWidth="3" />
      <path d="M132 166 L146 182 L172 150" stroke="#FBFCF7" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M60 236 C 100 220, 200 220, 240 236" stroke="#13261B" strokeWidth="3" fill="none" />
    </svg>
  );
}
