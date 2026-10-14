"use client";

export default function LearnMoreButton() {
  return (
    <button
      className="btn"
      onClick={() => {
        const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.getElementById("about")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      }}
    >
      Learn more
    </button>
  );
}
