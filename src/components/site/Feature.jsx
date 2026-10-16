import Editable from "@/components/edit/Editable";
import EditablePhoto from "@/components/edit/EditablePhoto";

// Headline + paragraph beside a taped photo. Used on Home and About.
// Text and photo come from the site content under `prefix` (e.g. "home.about"),
// so admins can edit them in place.
export default function Feature({ c, prefix, label, emphasize, alt, dark = false, reverse = false, children, id }) {
  const key = (s) => `${prefix}.${s}`;
  const labelKey = c[key("label")] !== undefined ? key("label") : null;
  return (
    <section className={`feature${dark ? " on-dark" : ""}${reverse ? " rev" : ""}`} id={id}>
      <div className="wrap">
        <div className="copy">
          {labelKey ? (
            <Editable k={labelKey} v={c[labelKey]} className="label" data-reveal="" />
          ) : (
            label && (
              <span className="label" data-reveal>
                {label}
              </span>
            )
          )}
          <Editable k={key("title")} v={c[key("title")]} as="h2" emphasize={emphasize} data-reveal="" style={{ "--d": ".08s" }} />
          <Editable k={key("text")} v={c[key("text")]} as="p" multiline data-reveal="" style={{ "--d": ".16s" }} />
          {children && (
            <div data-reveal style={{ "--d": ".24s" }}>
              {children}
            </div>
          )}
        </div>
        <div className="media" data-reveal={reverse ? "left" : "right"}>
          <figure className={`photo ${reverse ? "tilt-l" : "tilt-r"}`} data-speed={reverse ? "0.04" : "-0.04"}>
            <div className="ph">
              <EditablePhoto k={key("photo")} src={c[key("photo")]} alt={alt} sizes="(max-width: 820px) 100vw, 50vw" />
            </div>
            <Editable k={key("caption")} v={c[key("caption")]} as="figcaption" />
          </figure>
        </div>
      </div>
    </section>
  );
}
