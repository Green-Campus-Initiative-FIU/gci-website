"use client";

import { motion } from "framer-motion";
import { Calendar, Users, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import Card from "@/components/ui/Card";

const cards = [
  {
    title: "Events",
    description: "Join our sustainability events and make a real impact",
    backgroundImage: "pantherart.jpg",
    icon: Calendar,
    color: "bg-dark-green",
    href: "/events",
  },
  {
    title: "Committees",
    description: "Find your place in one of our four active committees",
    icon: Users,
    color: "bg-dark-green",
    href: "/committees",
  },
  {
    title: "Blog",
    description: "Read about our latest achievements and insights",
    icon: BookOpen,
    color: "bg-light-green",
    href: "/blog",
  },
];

export default function InfoCards() {
  return (
    <section className="max-container padding-container gap-10 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="font-staatliches text-dark-green mb-4 text-4xl md:text-5xl">
          Get Involved
        </h2>
        <p className="font-satoshi text-gray-text-color mx-auto max-w-2xl text-lg">
          Explore opportunities to make a difference in our community
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={card.href}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`${card.color} group relative aspect-square w-full cursor-pointer overflow-hidden rounded-3xl border-2 border-white shadow-lg transition-shadow hover:shadow-2xl`}
                style={
                  card.backgroundImage
                    ? {
                        backgroundImage: `url(${card.backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : {}
                }
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-300 group-hover:from-black/90" />

                {/* Content */}
                <div className="relative flex h-full flex-col justify-between p-8">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex h-16 w-16 items-center justify-center self-start rounded-2xl bg-white/20 backdrop-blur-sm"
                  >
                    <card.icon className="h-8 w-8 text-white" />
                  </motion.div>

                  {/* Text */}
                  <div className="space-y-3">
                    <h3 className="font-staatliches text-4xl font-extrabold uppercase text-white">
                      {card.title}
                    </h3>
                    <p className="font-satoshi translate-y-2 transform text-sm leading-relaxed text-white/90 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {card.description}
                    </p>

                    {/* Arrow */}
                    <motion.div
                      className="text-celadon flex items-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span className="font-satoshi text-sm font-bold">
                        Explore
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div className="bg-cream/20 absolute right-0 top-0 h-24 w-24 rounded-bl-full opacity-50 transition-opacity group-hover:opacity-70" />
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
