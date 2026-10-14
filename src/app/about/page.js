import Image from "@/components/site/SiteImage";
import Feature from "@/components/site/Feature";
import JoinBand from "@/components/site/JoinBand";
import { EmailIcon, LinkedInIcon } from "@/components/site/icons";
import { getSiteContent } from "@/content/site";
import { getFaq, getTeam } from "@/content/collections";

export const metadata = { title: "About | Green Campus Initiative" };

export default async function AboutPage() {
  const [c, team, faq] = await Promise.all([getSiteContent(), getTeam(), getFaq()]);

  return (
    <>
      <Feature
        label="About"
        title={c["about.what.title"]}
        text={c["about.what.text"]}
        image="/outdoor.jpg"
        alt="Garden walkway on campus"
        caption={c["about.what.caption"]}
      />
      <Feature
        dark
        reverse
        label="Our message"
        title={c["about.message.title"]}
        emphasize="necessary"
        text={c["about.message.text"]}
        image="/bamboo.jpeg"
        alt="Looking up through a bamboo grove"
        caption={c["about.message.caption"]}
      />

      {team.length > 0 && (
        <section className="block on-dark" style={{ background: "var(--forest-deep)" }}>
          <div className="wrap">
            <div className="head">
              <h2 data-reveal>
                {c["about.team.title"]} {team[0].isSample && <span className="draft">sample officers</span>}
              </h2>
              <p data-reveal style={{ "--d": ".1s" }}>
                {c["about.team.text"]}
              </p>
            </div>
            <div className="team">
              {team.map((m, i) => (
                <Member key={m.id ?? i} m={m} i={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="block">
        <div className="wrap">
          <div className="head">
            <h2 data-reveal>Frequently asked</h2>
          </div>
          <div className="faq">
            {faq.map((f, i) => (
              <details key={f.id ?? f.question} data-reveal style={{ "--d": `${i * 0.06}s` }}>
                <summary>
                  <span>{f.question}</span>
                  <span className="pm" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <JoinBand />
    </>
  );
}

function Member({ m, i }) {
  return (
    <div className="member" data-reveal="pop" style={{ "--d": `${i * 0.1}s` }}>
      <div className="pic">
        {m.photoUrl ? (
          <Image src={m.photoUrl} alt={m.name} fill sizes="260px" style={{ objectFit: "cover" }} />
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14z" fill="#B8DAAE" />
            <path d="M6 18c3-5 6-8 10-10" stroke="#0F4D2B" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </svg>
        )}
      </div>
      <h3>{m.name}</h3>
      <span className="role">{m.role}</span>
      {m.bio && <p>{m.bio}</p>}
      {(m.linkedin || m.email) && (
        <span className="soc">
          {m.linkedin && (
            <a href={m.linkedin} target="_blank" rel="noopener" aria-label={`${m.name} on LinkedIn`}>
              <LinkedInIcon />
            </a>
          )}
          {m.email && (
            <a href={`mailto:${m.email}`} aria-label={`Email ${m.name}`}>
              <EmailIcon />
            </a>
          )}
        </span>
      )}
    </div>
  );
}
