import LeafGate from "@/features/home/components/LeafGate";
import Hero from "@/features/home/components/Hero";
import Horizon from "@/features/home/components/Horizon";
import ScrollMarquee from "@/features/home/components/ScrollMarquee";
import HowWeWork from "@/features/home/components/HowWeWork";
import Levels from "@/features/home/components/Levels";
import { GetInvolved, HowToJoin, LatestPosts, WhoWeAre } from "@/features/home/components/HomeSections";
import JoinBand from "@/components/site/JoinBand";
import { getSiteContent } from "@/content/site";
import { getPublicPosts } from "@/services/posts.server";
import { getCommittees } from "@/services/committees.server";

export default async function Home() {
  const [c, posts, committees] = await Promise.all([getSiteContent(), getPublicPosts(3), getCommittees()]);

  return (
    <>
      <LeafGate>
        <Hero c={c} />
      </LeafGate>
      <Horizon />
      <WhoWeAre c={c} />
      <ScrollMarquee />
      <HowWeWork c={c} />
      <Levels c={c} />
      <GetInvolved c={c} committeeCount={committees.length} />
      <HowToJoin c={c} />
      <LatestPosts posts={posts} />
      <JoinBand />
    </>
  );
}
