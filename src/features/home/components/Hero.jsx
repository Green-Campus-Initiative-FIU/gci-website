import { motion } from "framer-motion";
import ScrollIndicator from "./ScrollIndicator";
import HeroButtons from "./HeroButtons";

export default function Hero() {
  return (
    <div className="bg-light-green relative flex min-h-[70dvh] w-full flex-col justify-center overflow-hidden">
      {/* Background Overlay & Image */}
      <div className="absolute top-0 h-full w-full bg-[url('/turtle.jpg')] bg-cover bg-center" />
      <div className="bg-linear-to-b absolute top-0 z-10 h-full w-full from-black to-transparent opacity-70" />
      <div className="bg-dots absolute inset-0 z-[11] opacity-20" />

      {/* Hero Content */}
      <div className="max-container z-20 flex w-full">
        <div className="padding-container mt-16 flex flex-col self-start p-4 lg:mt-0">
          <HeroChip />
          <HeroTitle />
          <HeroDescription />
          <HeroButtons />
        </div>
      </div>
      <ScrollIndicator />
    </div>
  );
}

function HeroChip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-2 inline-block w-fit"
    >
      <div className="bg-dark-green/40 border-cream/30 inline-block rounded-full border-2 px-4 py-1.5 backdrop-blur-sm">
        <span className="font-satoshi text-sm font-semibold text-white">
          An @fiuhonors Organization
        </span>
      </div>
    </motion.div>
  );
}

function HeroTitle() {
  return (
    <>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-staatliches text-celadon/90 w-fit text-xl"
      >
        we are
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-staatliches 3xl:text-8xl relative w-fit text-5xl font-extrabold uppercase tracking-wide sm:text-6xl"
      >
        <span className="block text-white drop-shadow-lg">
          <span className="text-celadon">Green</span> Campus
        </span>
        <span className="text-cream block drop-shadow-lg">Initiative</span>
        <motion.span
          animate={{
            rotate: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-cream absolute -right-4 -top-4 text-3xl md:right-[-20px] md:top-[-20px]"
        >
          ✦
        </motion.span>
      </motion.h1>
    </>
  );
}

function HeroDescription() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="font-satoshi mb-6 max-w-md break-normal text-base font-medium leading-relaxed text-white lg:max-w-lg"
    >
      Cultivating a culture of sustainability at FIU and beyond
    </motion.p>
  );
}
