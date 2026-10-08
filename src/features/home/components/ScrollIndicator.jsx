import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="absolute bottom-0 left-1/2 z-20 hidden -translate-x-1/2 transform cursor-pointer lg:block"
      onClick={scrollToAbout}
    >
      <ChevronDown className="box-shadow-xl size-12 animate-bounce text-white" />
    </motion.div>
  );
}
