"use client";

import Hero from "@/features/home/components/Hero";
import Introduction from "@/features/home/components/Introduction";
import OffsetGrid from "@/features/home/components/OffsetGrid";
import MissionStatement from "@/features/home/components/MissionStatement";
import InfoCards from "@/features/home/components/InfoCards";
import Stories from "@/features/home/components/Stories";
import ContentLayout from "@/components/ui/ContentLayout";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Animated Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-gradient-to-r from-light-green via-celadon to-light-green h-1 w-full origin-center"
      />

      {/* <Introduction /> */}
      <div id="about">
        <ContentLayout
          className="pb-8 pt-16"
          title="Join a community of changemakers"
          description="As a member of GCI, you will join a community of passionate individuals committed to taking meaningful actions that contribute to a greener, more environmentally conscious world. We're not just talking about sustainability—we're actively researching, advocating, and implementing real solutions at FIU and across Florida."
          image="/outdoor.jpg"
        />
      </div>

      {/* <OffsetGrid /> */}
      {/* <MissionStatement /> */}
      <InfoCards />
      {/* <Stories /> */}
    </>
  );
}
