import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/site/icons";
import PostCard from "@/features/blog/components/PostCard";
import Feature from "@/components/site/Feature";

// Server-rendered home page sections (the scroll-driven ones live in their own client files).

export function WhoWeAre({ c }) {
  return (
    <Feature
      id="about"
      dark
      label={c["home.about.label"]}
      title={c["home.about.title"]}
      emphasize="changemakers"
      text={c["home.about.text"]}
      image="/outdoor.jpg"
      alt="Tree-lined garden walkway on campus"
      caption={c["home.about.caption"]}
    >
      <Link className="btn btn-light" href="/about">
        More about GCI
      </Link>
    </Feature>
  );
}

export function GetInvolved({ c, committeeCount }) {
  const cards = [
    { href: "/events", img: "/turtle.jpg", title: "Events", text: c["home.involved.events"], go: "See events" },
    {
      href: "/committees",
      img: "/bamboo.jpeg",
      title: "Committees",
      text: `Find your place in one of our ${committeeCount} active committees.`,
      go: "Find yours",
    },
    { href: "/blog", img: "/greenhouse.jpg", title: "Blog", text: c["home.involved.blog"], go: "Read the blog" },
  ];
  return (
    <section className="block" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="head">
          <h2 data-reveal>{c["home.involved.title"]}</h2>
          <p data-reveal style={{ "--d": ".1s" }}>
            {c["home.involved.text"]}
          </p>
        </div>
        <div className="cards3">
          {cards.map((card, i) => (
            <Link key={card.href} className="icard" href={card.href} data-reveal style={{ "--d": `${i * 0.12}s` }}>
              <Image src={card.img} alt="" fill sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: "cover" }} />
              <span className="num">0{i + 1}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
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
          <h2 data-reveal>{c["home.join.title"]}</h2>
          <p data-reveal style={{ "--d": ".1s" }}>
            {c["home.join.text"]}
          </p>
        </div>
        <ol className="steps">
          <li className="steps-line" data-reveal="wipe" aria-hidden="true" />
          {[1, 2, 3, 4].map((n) => (
            <li key={n} className="step" data-reveal style={{ "--d": `${0.1 + (n - 1) * 0.15}s` }}>
              <div className="n">{n}</div>
              <h3>{c[`home.join.${n}.title`]}</h3>
              <p>{c[`home.join.${n}.text`]}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function LatestPosts({ posts }) {
  if (!posts.length) return null;
  return (
    <section className="block">
      <div className="wrap">
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
      </div>
    </section>
  );
}
