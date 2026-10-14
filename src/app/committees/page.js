import Link from "next/link";
import JoinBand from "@/components/site/JoinBand";
import { CommitteeIcon } from "@/components/site/icons";
import { getSiteContent } from "@/content/site";
import { getCommittees } from "@/services/committees.server";

export const metadata = { title: "Committees | Green Campus Initiative" };

export default async function CommitteesPage() {
  const [c, committees] = await Promise.all([getSiteContent(), getCommittees()]);

  return (
    <>
      <section className="block">
        <div className="wrap">
          <div className="head">
            <h1 className="page-title" data-reveal>
              {c["committees.title"]}
            </h1>
            <p data-reveal style={{ "--d": ".1s" }}>
              {c["committees.text"]}
            </p>
          </div>
          <div className="comgrid">
            {committees.map((com, i) => (
              <Link key={com.id} className="com" href={`/committees/${com.id}`} data-reveal style={{ "--d": `${(i % 3) * 0.1}s` }}>
                <span className="icon">
                  <CommitteeIcon name={com.icon} />
                </span>
                <h3>{com.name}</h3>
                <p>{com.description}</p>
                <span className="readmore">View committee →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <JoinBand />
    </>
  );
}
