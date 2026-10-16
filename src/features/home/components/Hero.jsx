import Image from "next/image";
import { JOIN_URL } from "@/constants";
import Editable from "@/components/edit/Editable";
import EditablePhoto from "@/components/edit/EditablePhoto";
import LearnMoreButton from "./LearnMoreButton";

export default function Hero({ c }) {
  return (
    <section className="hero">
      <div className="wrap">
        <div>
          <Editable k="home.hero.weare" v={c["home.hero.weare"]} className="weare" />
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
          <Editable k="home.hero.lede" v={c["home.hero.lede"]} as="p" className="lede" multiline />
          <div className="ctas">
            <LearnMoreButton />
            <a className="btn btn-gold" href={JOIN_URL} target="_blank" rel="noopener">
              Join GCI
            </a>
          </div>
        </div>

        <div className="collage" aria-label="Photo collage">
          <div className="sun" data-speed="-0.06" aria-hidden="true" />
          <Sticker c={c} n={1} alt="Campus photo" speed="0.03" priority />
          <Sticker c={c} n={2} alt="Campus photo" speed="-0.04" />
          <Sticker c={c} n={3} alt="Campus photo" speed="0.05" />
          <div className="logo-badge" data-spin aria-hidden="true">
            <Image src="/gci-transparent.webp" alt="" fill sizes="180px" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Sticker({ c, n, alt, speed, priority }) {
  return (
    <figure className={`sticker s${n}`} style={{ "--i": n - 1 }} data-speed={speed}>
      <div className="ph">
        <EditablePhoto k={`home.hero.photo${n}`} src={c[`home.hero.photo${n}`]} alt={alt} sizes="(max-width: 860px) 60vw, 30vw" priority={priority} />
      </div>
      <Editable k={`home.hero.caption${n}`} v={c[`home.hero.caption${n}`]} as="figcaption" />
    </figure>
  );
}
