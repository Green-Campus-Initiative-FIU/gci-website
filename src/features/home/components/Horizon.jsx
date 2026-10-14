// Sawgrass and water strip between the hero and the green "Who we are" band.
// Blades grow in as the strip scrolls into view.
const DARK = [
  "M60 96 L48 40", "M70 96 L78 30", "M82 96 L104 52",
  "M300 86 L290 24", "M312 86 L322 40", "M290 88 L262 46",
  "M560 92 L552 46", "M572 92 L590 34",
  "M860 80 L846 20", "M872 80 L884 36", "M850 82 L826 48",
  "M1130 74 L1122 28", "M1142 74 L1166 40",
  "M1360 82 L1350 34", "M1372 82 L1384 22", "M1348 84 L1324 50",
];
const LIGHT = [
  "M180 88 L174 50", "M190 88 L206 58",
  "M700 86 L694 52", "M712 86 L728 46",
  "M990 86 L980 48", "M1002 86 L1016 54",
  "M1250 72 L1244 36",
];

export default function Horizon() {
  return (
    <svg className="horizon" viewBox="0 0 1440 150" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 150 L0 96 C 120 70, 240 100, 360 82 C 480 64, 600 98, 720 84 C 840 70, 960 96, 1080 78 C 1200 62, 1320 92, 1440 76 L1440 150 Z" fill="#0F4D2B" />
      <g stroke="#0F4D2B" strokeWidth="5" strokeLinecap="round" fill="none">
        {DARK.map((d, i) => (
          <path key={d} className="blade" data-reveal="grow" style={{ "--d": `${0.05 * (i + 1)}s` }} d={d} />
        ))}
      </g>
      <g stroke="#B8DAAE" strokeWidth="4" strokeLinecap="round" fill="none">
        {LIGHT.map((d, i) => (
          <path key={d} className="blade" data-reveal="grow" style={{ "--d": `${0.3 + 0.08 * i}s` }} d={d} />
        ))}
      </g>
      <g stroke="#9CC9C2" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M120 128 q20 -10 40 0 t40 0" />
        <path d="M520 122 q20 -10 40 0 t40 0 t40 0" />
        <path d="M940 130 q20 -10 40 0 t40 0" />
        <path d="M1240 124 q20 -10 40 0 t40 0 t40 0" />
      </g>
    </svg>
  );
}
