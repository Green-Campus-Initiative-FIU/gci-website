import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { BiSolidLeaf } from "react-icons/bi";

const scrollToAbout = () => {
  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  }
};
export default function HeroButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="flex w-fit flex-col gap-4 sm:flex-row"
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="secondary"
          onClick={scrollToAbout}
          label="Learn More"
          iconPosition="end"
          iconClassName="size-6 text-dark-green ml-1"
        />
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="secondary"
          as={Link}
          href="https://forms.office.com/pages/responsepage.aspx?id=qOV5rOTgS0OikiyJtcKDZlFwPc-zH7ZOuhVHiekwalNUMElNVldDRVJXME5NRlBEVEJQWDM3WVBNRi4u"
          icon={BiSolidLeaf}
          label="Join GCI"
          iconPosition="end"
          iconClassName="size-6 text-dark-green ml-1"
        />
      </motion.div>
    </motion.div>
  );
}
