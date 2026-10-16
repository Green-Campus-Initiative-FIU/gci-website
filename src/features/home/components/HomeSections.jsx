import Link from "next/link";
import { ArrowRight } from "@/components/site/icons";
import PostCard from "@/features/blog/components/PostCard";
import Feature from "@/components/site/Feature";
import Editable from "@/components/edit/Editable";
import EditablePhoto from "@/components/edit/EditablePhoto";
import { ManageLink } from "@/components/edit/AdminBar";

// Server-rendered home page sections (the scroll-driven ones live in their own client files).

export function WhoWeAre({ c }) {
  return (
    <Feature id="about" dark c={c} prefix="home.about" emphasize="changemakers" alt="Campus photo">
      <Link className="btn btn-light" href="/about">
        More about GCI
      </Link>
    </Feature>
  );
}

export function GetInvolved({ c, committeeCount }) {
  const cards = [
    { href: "/events", key: "events", title: "Events", text: <Editable k="home.involved.events" v={c["home.involved.events"]} as="p" />, go: "See events" },
    {
      href: "/committees",
      key: "committees",
      title: "Committees",
      text: <p>Find your place in one of our {committeeCount} active committees.</p>,
      go: "Find yours",
    },
    { href: "/blog", key: "blog", title: "Blog", text: <Editable k="home.involved.blog" v={c["home.involved.blog"]} as="p" />, go: "Read the blog" },
  ];
  return (
    <section className="block" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="head">
          <Editable k="home.involved.title" v={c["home.involved.title"]} as="h2" data-reveal="" />
          <Editable k="home.involved.text" v={c["home.involved.text"]} as="p" data-reveal="" style={{ "--d": ".1s" }} />
        </div>
        <div className="cards3">
          {cards.map((card, i) => (
            <Link key={card.href} className="icard" href={card.href} data-reveal style={{ "--d": `${i * 0.12}s` }}>
              <EditablePhoto k={`home.involved.${card.key}.photo`} src={c[`home.involved.${card.key}.photo`]} sizes="(max-width: 900px) 100vw, 33vw" />
              <span className="num">0{i + 1}</span>
              <h3>{card.title}</h3>
              {card.text}
              <span className="go">
                {card.go} <ArrowRight />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowToJoin({ c }) {
  return (
    <section className="block loop">
      <div className="wrap">
        <div className="head">
          <Editable k="home.join.title" v={c["home.join.title"]} as="h2" data-reveal="" />
          <Editable k="home.join.text" v={c["home.join.text"]} as="p" data-reveal="" style={{ "--d": ".1s" }} />
        </div>
        <ol className="steps">
          <li className="steps-line" data-reveal="wipe" aria-hidden="true" />
          {[1, 2, 3, 4].map((n) => (
            <li key={n} className="step" data-reveal style={{ "--d": `${0.1 + (n - 1) * 0.15}s` }}>
              <div className="n">{n}</div>
              <Editable k={`home.join.${n}.title`} v={c[`home.join.${n}.title`]} as="h3" />
              <Editable k={`home.join.${n}.text`} v={c[`home.join.${n}.text`]} as="p" multiline />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function LatestPosts({ posts }) {
  return (
    <section className="block">
      <div className="wrap">
        <ManageLink href="/dashboard/view-posts">Manage posts in the dashboard</ManageLink>
        {posts.length > 0 && (
          <>
            <div className="head">
              <h2 data-reveal>
                Latest from the blog {posts[0].isSample && <span className="draft">sample posts</span>}
              </h2>
              <Link className="btn btn-small" href="/blog" data-reveal style={{ "--d": ".1s" }}>
                All posts
              </Link>
            </div>
            <div className="news">
              {posts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} sizes={i === 0 ? "(max-width: 900px) 100vw, 45vw" : "(max-width: 560px) 100vw, 30vw"} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
