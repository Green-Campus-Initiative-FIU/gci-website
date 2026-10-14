import Image from "next/image";
import { Emphasize } from "@/components/site/Emphasize";

// Headline + paragraph beside a taped photo. Used on Home and About.
export default function Feature({ label, title, emphasize, text, image, alt, caption, dark = false, reverse = false, children, id }) {
  return (
    <section className={`feature${dark ? " on-dark" : ""}${reverse ? " rev" : ""}`} id={id}>
      <div className="wrap">
        <div className="copy">
          {label && (
            <span className="label" data-reveal>
              {label}
            </span>
          )}
          <h2 data-reveal style={{ "--d": ".08s" }}>
            <Emphasize text={title} word={emphasize} />
          </h2>
          <p data-reveal style={{ "--d": ".16s" }}>
            {text}
          </p>
          {children && (
            <div data-reveal style={{ "--d": ".24s" }}>
              {children}
            </div>
          )}
        </div>
        <div className="media" data-reveal={reverse ? "left" : "right"}>
          <figure className={`photo ${reverse ? "tilt-l" : "tilt-r"}`} data-speed={reverse ? "0.04" : "-0.04"}>
            <div className="ph">
              <Image src={image} alt={alt} fill sizes="(max-width: 820px) 100vw, 50vw" style={{ objectFit: "cover" }} />
            </div>
            {caption && <figcaption>{caption}</figcaption>}
          </figure>
        </div>
      </div>
    </section>
  );
}
