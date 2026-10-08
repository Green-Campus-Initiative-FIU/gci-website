"use client";

import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

export default function ContentLayout({
  title,
  description,
  image,
  className,
  reverse = false,
}) {
  return (
    <section id="about" className={cn("max-container padding-container", className)}>
      <div
        className={cn(
          "flex w-full flex-col flex-wrap gap-5 py-5 md:gap-0 md:py-0",
          reverse
            ? "flex-col-reverse md:flex-row-reverse"
            : "flex-col md:flex-row"
        )}
      >
        {/* Text Container */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex w-full basis-1/2 flex-col justify-center space-y-5 md:px-10 lg:items-start"
        >
          <div className="inline-block mb-2">
            <span className="text-light-green font-satoshi uppercase tracking-wider text-sm font-bold">
              Our Message
            </span>
          </div>

          <h2 className="font-staatliches text-dark-green text-4xl font-black sm:text-3xl md:text-5xl">
            {title}
          </h2>
          <p className="max-w-lg text-lg/8 font-satoshi font-medium sm:text-base md:text-xl/8 text-gray-text-color">
            {description}
          </p>

          {/* Interactive Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-celadon p-4 rounded-lg border-2 border-dark-green shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl font-bold text-dark-green mb-1 font-staatliches">
                50+
              </div>
              <p className="text-xs text-dark-green font-satoshi font-medium">Active Members</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-celadon p-4 rounded-lg border-2 border-dark-green shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl font-bold text-dark-green mb-1 font-staatliches">
                15+
              </div>
              <p className="text-xs text-dark-green font-satoshi font-medium">Events/Year</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Image Container */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex w-full basis-1/2 items-center justify-end md:px-10 relative"
        >
          <div className="relative">
            <img
              src={image}
              alt="GCI members working together"
              className="max-h-[550px] min-h-[350px] w-full rounded-xl object-cover md:max-w-full shadow-xl border-4 border-white"
            />

            {/* Floating Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 md:p-6 border-2 border-celadon shadow-xl rounded-lg"
            >
              <p className="text-sm md:text-base text-gray-text-color font-satoshi">
                "GCI has been celebrated for <span className="text-dark-green font-bold">actually doing something</span> and taking action rather than dreaming about what could be done."
              </p>
            </motion.div>

            {/* Decorative Organic Shapes */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-cream rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-celadon rounded-full opacity-60"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
