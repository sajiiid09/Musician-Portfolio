"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import VinylCard from './VinylCard';
import { ALBUM_DEAR_MELANCHOLIA, SINGLE_SINNER } from '@/lib/assets';
import { FaSpotify, FaYoutube } from 'react-icons/fa';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

// --- CONFIGURATION ---
const RELEASES = [
  {
    type: "ALBUM",
    data: ALBUM_DEAR_MELANCHOLIA,
    links: {
      youtube: "https://www.youtube.com/@Cremainremain",
      spotify:
        "https://open.spotify.com/artist/5Z3tlDncw0rKyt7KKBz5ud?si=rxijmsOzQ2a0uPFdSH5jkg",
    },
  },
  {
    type: "SINGLE",
    data: SINGLE_SINNER,
    links: {
      youtube: "https://www.youtube.com/watch?v=biy2TAAGe6A",
      spotify:
        "https://open.spotify.com/track/2t6qyVyHwkXwkCuM66eI6c?si=gdCIH4WSTf-8NwCazfG6UQ",
    },
  },
];

// --- POLISHED ICONS ---
const ICONS = {
  spotify: (className = "w-5 h-5") => <FaSpotify className={className} />,
  youtube: (className = "w-5 h-5") => <FaYoutube className={className} />,
};

// --- OPTIMIZED BUTTON COMPONENT ---
const StreamButton = ({
  href,
  icon,
  label,
  primary = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`
      flex items-center justify-center gap-3 px-6 py-4 md:py-3 rounded-full border transition-all duration-300 group
      w-full md:w-auto flex-1 md:flex-none
      ${
        primary
          ? "bg-white text-black border-white hover:bg-black hover:text-white hover:border-white"
          : "bg-black/40 text-white border-white/30 hover:bg-white hover:text-black hover:border-white"
      }
    `}
  >
    <span className="shrink-0 transition-transform group-hover:scale-110">
      {icon}
    </span>
    <span className="text-xs font-body font-bold uppercase tracking-widest whitespace-nowrap">
      {label}
    </span>
  </a>
);

export default function MusicSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Adjusted transforms for smoother transition
  // Text fades out and recedes
  const scrollScale = useTransform(scrollYProgress, [0, 0.2, 0.5], [1, 1, 0.8]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]); // Fades out faster to avoid overlap

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black text-white"
      // Height allows for the full transition sequence
      style={{ minHeight: "350vh" }}
    >
      <div
        className="hidden md:block absolute inset-0 pointer-events-none"
        style={{ minHeight: "350vh" }}
      />

      {/* --- LAYER 0: STICKY TITLE --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div className="sticky top-0 h-[100dvh] flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.h1
              style={{ scale: scrollScale, opacity: scrollOpacity }}
              className="text-[12vw] md:text-[10vw] font-heading font-bold leading-none tracking-tighter text-white/90 select-none will-change-transform text-center whitespace-nowrap"
            >
              DISCOGRAPHY
            </motion.h1>
          </motion.div>
        </div>
      </div>

      {/* --- LAYER 1: CONTENT GRID --- */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-[150px_1fr] h-full">
        {/* Left Sidebar (Hidden on Mobile) */}
        <div className="hidden md:flex flex-col h-screen sticky top-0 justify-center items-center border-r border-white/10">
          <div className="relative h-[60vh] w-[1px] bg-white/10 overflow-hidden">
            <motion.div
              style={{ height: progressHeight }}
              className="absolute top-0 left-0 w-full bg-white"
            />
            <div className="absolute top-1/2 -left-12 -translate-y-1/2 -rotate-90 origin-center whitespace-nowrap">
              <span className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-white/50">
                Featured Releases
              </span>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col px-4 md:px-20 pb-20 md:pb-0">
          {/* Buffer: Massive buffer to ensure text fades out before content arrives */}
          <div className="h-[100vh] w-full" />

          {/* === RELEASE 1: DEAR MELANCHOLIA (ALBUM) === */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-24 items-center pb-32 md:pb-60">
            {/* Vinyl (Order 1 on Mobile: Visual first) */}
            <div className="order-1 lg:order-2 flex flex-col items-center">
              <a
                href={RELEASES[0].links.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition-transform hover:scale-[1.02] w-[80vw] md:w-full max-w-[500px]"
              >
                <VinylCard
                  title={ALBUM_DEAR_MELANCHOLIA.title}
                  coverImage={ALBUM_DEAR_MELANCHOLIA.cover}
                />
              </a>
            </div>

            {/* Tracklist (Order 2 on Mobile) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={staggerContainer}
              className="order-2 lg:order-1 space-y-6 md:space-y-8"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl md:text-5xl font-heading font-semibold uppercase tracking-tight text-center md:text-left"
              >
                {ALBUM_DEAR_MELANCHOLIA.title}
              </motion.h2>

              <motion.div
                variants={fadeInUp}
                className="space-y-2 md:space-y-4"
              >
                <h3 className="text-xs md:text-sm font-body uppercase tracking-[0.2em] text-white/60 mb-4 md:mb-6 text-center md:text-left">
                  Tracklist
                </h3>
                {ALBUM_DEAR_MELANCHOLIA.tracks.map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-4 md:gap-6 py-3 border-b border-white/10 group hover:bg-white/5 transition-colors cursor-default"
                  >
                    <span className="text-white/40 font-mono text-xs md:text-sm w-6">
                      {track.id.toString().padStart(2, "0")}
                    </span>
                    <span className="text-white/80 font-medium text-sm md:text-base tracking-wide group-hover:text-white transition-colors truncate">
                      {track.title}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Action Buttons: Full width on mobile */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col md:flex-row gap-3 pt-4 w-full"
              >
                <StreamButton
                  primary
                  href={RELEASES[0].links.spotify}
                  icon={ICONS.spotify("w-5 h-5 md:w-6 md:h-6")}
                  label="Listen on Spotify"
                />
                <StreamButton
                  href={RELEASES[0].links.youtube}
                  icon={ICONS.youtube("w-5 h-5 md:w-6 md:h-6")}
                  label="Watch on YouTube"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* === RELEASE 2: SINNER (SINGLE) === */}
          <div className="flex flex-col items-center pb-20 md:pb-60 border-t border-white/5 pt-24 md:pt-40">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={staggerContainer}
              className="flex flex-col items-center gap-8 md:gap-12 w-full max-w-3xl"
            >
              <motion.div
                variants={fadeInUp}
                className="text-center space-y-2 md:space-y-4"
              >
                <h3 className="text-xs md:text-sm font-body uppercase tracking-[0.3em] text-[#B48D5C]">
                  Latest Single
                </h3>
                <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tighter">
                  {SINGLE_SINNER.title}
                </h2>
              </motion.div>

              <motion.a
                variants={fadeInUp}
                href={RELEASES[1].links.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition-transform hover:scale-[1.02] w-[70vw] md:w-full max-w-[500px]"
              >
                <VinylCard
                  title={SINGLE_SINNER.title}
                  coverImage={SINGLE_SINNER.cover}
                />
              </motion.a>

              {/* Action Buttons */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col md:flex-row justify-center gap-3 w-full"
              >
                <StreamButton
                  primary
                  href={RELEASES[1].links.spotify}
                  icon={ICONS.spotify("w-5 h-5 md:w-6 md:h-6")}
                  label="Listen Now"
                />
                <StreamButton
                  href={RELEASES[1].links.youtube}
                  icon={ICONS.youtube("w-5 h-5 md:w-6 md:h-6")}
                  label="Watch Video"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
