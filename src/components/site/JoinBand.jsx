import { JOIN_URL, social } from "@/constants";
import { getSiteContent } from "@/content/site";

export default async function JoinBand() {
  const c = await getSiteContent();
  return (
    <section className="join">
      <svg className="rays" viewBox="0 0 200 200" aria-hidden="true" data-spin>
        <circle cx="100" cy="100" r="44" fill="#E3A72F" />
        <g stroke="#E3A72F" strokeWidth="6" strokeLinecap="round">
          <path d="M100 8v26M100 166v26M8 100h26M166 100h26M35 35l18 18M147 147l18 18M35 165l18-18M147 53l18-18" />
        </g>
      </svg>
      <div className="wrap">
        <div>
          <h2 data-reveal>
            Join the <span>green</span> team
          </h2>
          <p data-reveal style={{ "--d": ".1s" }}>
            {c["join.text"]}
          </p>
          <div className="ctas" data-reveal style={{ "--d": ".2s" }}>
            <a className="btn btn-gold" href={JOIN_URL} target="_blank" rel="noopener">
              Join GCI
            </a>
            <a className="btn btn-light" href={social.instagram.href} target="_blank" rel="noopener">
              {social.instagram.handle}
            </a>
          </div>
        </div>
        <div className="meet" data-reveal="right">
          <div>
            <span className="label">Next general meeting</span>
            <b>{c["join.meeting.when"]}</b>
          </div>
          <div>
            <span className="label">Where</span>
            <b>{c["join.meeting.where"]}</b>
          </div>
          <div>
            <span className="label">Bring</span>
            <b>{c["join.meeting.bring"]}</b>
          </div>
        </div>
      </div>
    </section>
  );
}
