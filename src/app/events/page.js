import JoinBand from "@/components/site/JoinBand";
import Editable from "@/components/edit/Editable";
import { ManageLink } from "@/components/edit/AdminBar";
import { social } from "@/constants";
import { getSiteContent } from "@/content/site";
import { getEvents } from "@/content/collections";

export const metadata = { title: "Events | Green Campus Initiative" };

export default async function EventsPage() {
  const [c, events] = await Promise.all([getSiteContent(), getEvents()]);

  return (
    <>
      <section className="block">
        <div className="wrap">
          <div className="head">
            <h1 className="page-title" data-reveal>
              Events {events[0]?.isSample && <span className="draft">sample events</span>}
            </h1>
            <Editable k="events.text" v={c["events.text"]} as="p" data-reveal="" style={{ "--d": ".1s" }} />
          </div>
          <ManageLink href="/dashboard/events">Manage events in the dashboard</ManageLink>
          {events.length ? (
            <div className="events">
              {events.map((e, i) => {
                const d = new Date(`${e.date}T12:00:00Z`);
                return (
                  <article key={e.id ?? e.date + e.title} className="event" data-reveal="left" style={{ "--d": `${i * 0.1}s` }}>
                    <div className="cal">
                      <div className="m">{d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" })}</div>
                      <div className="d">{d.getUTCDate()}</div>
                    </div>
                    <div>
                      <h3>{e.title}</h3>
                      <p>{[e.time, e.where].filter(Boolean).join(" · ")}</p>
                      {e.description && <p style={{ marginTop: 4 }}>{e.description}</p>}
                    </div>
                    <a className="btn btn-small" href={e.link || social.instagram.href} target="_blank" rel="noopener">
                      Details
                    </a>
                  </article>
                );
              })}
            </div>
          ) : (
            <p data-reveal style={{ fontSize: 18 }}>
              No upcoming events right now. Follow{" "}
              <a href={social.instagram.href} target="_blank" rel="noopener">
                {social.instagram.handle}
              </a>{" "}
              to hear about the next one.
            </p>
          )}
        </div>
      </section>
      <JoinBand />
    </>
  );
}
