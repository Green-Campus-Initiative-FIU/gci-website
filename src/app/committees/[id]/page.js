import Image from "@/components/site/SiteImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import JoinBand from "@/components/site/JoinBand";
import { JOIN_URL } from "@/constants";
import { getCommittee, getCommittees } from "@/services/committees.server";

const FALLBACK_PHOTOS = ["/bamboo.jpeg", "/turtle.jpg", "/greenhouse.jpg", "/outdoor.jpg", "/library.jpg", "/pantherflags.jpg"];

export async function generateMetadata({ params }) {
  const { id } = await params;
  const com = await getCommittee(id);
  return { title: com ? `${com.name} | Green Campus Initiative` : "Committee not found" };
}

export default async function CommitteePage({ params }) {
  const { id } = await params;
  const [com, all] = await Promise.all([getCommittee(id), getCommittees()]);
  if (!com) notFound();

  const photo = com.image || FALLBACK_PHOTOS[Math.max(0, all.findIndex((c) => c.id === com.id)) % FALLBACK_PHOTOS.length];
  const goals = (com.goals || []).filter(Boolean);

  return (
    <>
      <section className="block">
        <div className="wrap">
          <Link className="back" href="/committees">
            ← Back to all committees
          </Link>
          <div className="head">
            <h1 className="page-title" data-reveal>
              {com.name}
            </h1>
          </div>
          <div className="bento">
            <div className="tile tile-dark wide" data-reveal>
              <span className="label" style={{ color: "var(--mint)" }}>
                About
              </span>
              <p style={{ fontSize: 18 }}>{com.description}</p>
            </div>
            <div className="tile" data-reveal="pop" style={{ "--d": ".1s", padding: 12 }}>
              <div className="photo-tile">
                <Image src={photo} alt="" fill sizes="(max-width: 820px) 100vw, 33vw" style={{ objectFit: "cover" }} />
              </div>
            </div>
            {goals.length > 0 && (
              <div className="tile wide" data-reveal style={{ "--d": ".15s" }}>
                <h3>Goals</h3>
                <ol className="goals">
                  {goals.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ol>
              </div>
            )}
            <div className={`tile${goals.length ? "" : " wide"}`} data-reveal style={{ "--d": ".2s" }}>
              <h3>Meetings</h3>
              <p>
                <b>When:</b> {com.meetingTime || "To be announced"}
              </p>
              <p>
                <b>Where:</b> {com.meetingLocation || "To be announced"}
              </p>
              {com.contactEmail && (
                <p>
                  <b>Contact:</b> <a href={`mailto:${com.contactEmail}`}>{com.contactEmail}</a>
                </p>
              )}
              <a className="btn btn-gold btn-small" href={JOIN_URL} target="_blank" rel="noopener" style={{ justifySelf: "start", marginTop: 6 }}>
                Join GCI
              </a>
            </div>
          </div>
        </div>
      </section>
      <JoinBand />
    </>
  );
}
