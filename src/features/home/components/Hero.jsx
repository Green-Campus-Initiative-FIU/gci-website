import Image from "next/image";
import { JOIN_URL } from "@/constants";
import LearnMoreButton from "./LearnMoreButton";

export default function Hero({ c }) {
  return (
    <section className="hero">
      <div className="wrap">
        <div>
          <span className="weare">{c["home.hero.weare"]}</span>
          <h1>
            <span className="w" style={{ "--i": 0 }}>
              Green
            </span>{" "}
            <span className="w g" style={{ "--i": 1 }}>
              Campus
              <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 14 C 40 4, 80 18, 120 9 S 180 6, 198 12" stroke="#E3A72F" strokeWidth="6" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            <br />
            <span className="w" style={{ "--i": 2 }}>
              Initiative
              <span className="spark" aria-hidden="true">
                ✦
              </span>
            </span>
          </h1>
          <p className="lede">{c["home.hero.lede"]}</p>
          <div className="ctas">
            <LearnMoreButton />
            <a className="btn btn-gold" href={JOIN_URL} target="_blank" rel="noopener">
              Join GCI
            </a>
          </div>
        </div>

        <div className="collage" aria-label="Photo collage">
          <div className="sun" data-speed="-0.06" aria-hidden="true" />
          <Sticker n={1} src="/turtle.jpg" alt="Two turtles sunning on a rock beside a pond" caption={c["home.hero.caption1"]} speed="0.03" priority />
          <Sticker n={2} src="/outdoor.jpg" alt="Tree-lined garden walkway with shaded benches" caption={c["home.hero.caption2"]} speed="-0.04" />
          <Sticker n={3} src="/pantherflags.jpg" alt="Roary the FIU panther mascot under hanging flags" caption={c["home.hero.caption3"]} speed="0.05" />
          <div className="logo-badge" data-spin aria-hidden="true">
            <Image src="/gci-transparent.webp" alt="" fill sizes="180px" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Sticker({ n, src, alt, caption, speed, priority }) {
  return (
    <figure className={`sticker s${n}`} style={{ "--i": n - 1 }} data-speed={speed}>
      <div className="ph">
        <Image src={src} alt={alt} fill sizes="(max-width: 860px) 60vw, 30vw" style={{ objectFit: "cover" }} priority={priority} />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
