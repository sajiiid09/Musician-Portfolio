"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Link from "next/link";
import { EPK_ASSETS, SITE_CONFIG } from "@/lib/assets";

// Animation variants
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function EPKSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="w-full bg-gradient-to-b from-black via-neutral-950 to-black text-white py-24 lg:py-32 px-6 md:px-12 relative overflow-hidden"
      id="epk"
    >
      {/* Background accent */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="block text-[10px] font-medium uppercase tracking-[0.3em] text-white/40 mb-6">
            For Promoters, Venues, and Media
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold uppercase tracking-tighter leading-[0.9]">
            Electronic
            <br />
            <span className="text-white/60">Press Kit</span>
          </h2>
        </motion.div>

        {/* EPK Description */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          className="max-w-2xl mx-auto text-center text-neutral-400 text-base lg:text-lg font-light leading-relaxed mb-16 lg:mb-20"
        >
          <p>
            Everything you need, in one place. Download high-resolution press
            photos, the official EPK, stage plot, and tech rider. For booking
            inquiries, please contact{" "}
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-white/70 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white/60 transition-all"
            >
              {SITE_CONFIG.email}
            </a>
            .
          </p>
        </motion.div>

        {/* EPK Downloads Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto"
        >
          {Object.entries(EPK_ASSETS).map(([key, asset]) => (
            <motion.a
              key={key}
              href={asset.url}
              download
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative p-6 lg:p-8 bg-white/[0.02] border border-white/10 rounded-xl hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300"
            >
              {/* File Icon */}
              <div className="w-12 h-12 mb-5 flex items-center justify-center rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                <svg
                  className="w-6 h-6 text-white/50 group-hover:text-white/80 transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>

              {/* File Name */}
              <h4 className="text-sm lg:text-base font-semibold uppercase tracking-wide text-white/90 mb-2 group-hover:text-white transition-colors leading-tight">
                {asset.name}
              </h4>

              {/* File Size */}
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/30">
                {asset.size}
              </span>

              {/* Download Indicator */}
              <div className="absolute top-6 right-6 lg:top-8 lg:right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-1">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Additional Links */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          className="max-w-3xl mx-auto mt-16 lg:mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 px-8 py-6 bg-white/[0.02] border border-white/10 rounded-2xl">
            <p className="text-neutral-400 text-sm font-light">
              Looking for something specific?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/20 text-white text-xs font-medium uppercase tracking-wider rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300"
            >
              Contact Us
              <svg
                className="w-3 h-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
