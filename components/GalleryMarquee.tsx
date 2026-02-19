"use client";

import React, { useRef } from "react";
import Image from "next/image"; // 1. Use Next.js Image for performance
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { GALLERY_PHOTOS } from "@/lib/assets";

// Split gallery photos into two rows
const ROW_1_IMAGES = GALLERY_PHOTOS.slice(0, 5);
const ROW_2_IMAGES = GALLERY_PHOTOS.slice(5, 10);

// Physics settings for the scroll smoothing
// stiness: higher = more responsive, damping: higher = less oscillation
const SPRING_OPTIONS = { stiffness: 100, damping: 30, restDelta: 0.001 };

const ImageGrid = ({
  images,
}: {
  images: string[];
}) => (
  <div className="flex w-full gap-4 px-4 overflow-visible">
    {images.map((src, idx) => (
      <div
        key={idx}
        // Added transform-gpu and backface-visibility for smoother compositing
        className="relative flex-none w-[80vw] md:w-[35vw] lg:w-[25vw] aspect-[4/5] overflow-hidden group bg-neutral-900 transform-gpu"
      >
        <Image
          src={src}
          alt={`Gallery image ${idx + 1}`}
          fill
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 35vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
      </div>
    ))}
  </div>
);

export default function GalleryMarquee() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 2. SMOOTHING: Wrap the raw scroll input in a spring
  // This removes the "steppy" / "jittery" feel of raw scroll wheels
  const smoothProgress = useSpring(scrollYProgress, SPRING_OPTIONS);

  // --- PARALLAX LOGIC ---
  // Using the smoothProgress instead of raw scrollYProgress
  const x1 = useTransform(smoothProgress, [0, 1], ["-25%", "5%"]);
  const x2 = useTransform(smoothProgress, [0, 1], ["5%", "-25%"]);

  return (
    <section
      ref={containerRef}
      className="w-full bg-black overflow-hidden py-0"
    >
      {/* 1. TOP ROW (Moves Left -> Right) */}
      <motion.div
        style={{ x: x1 }}
        className="w-full will-change-transform transform-gpu" // GPU force
      >
        <ImageGrid images={ROW_1_IMAGES} />
      </motion.div>

      {/* 2. INFINITE MARQUEE STRIP */}
      {/* Added transform-gpu to the container to isolate painting */}
      <div className="w-full border-y border-white/10 bg-black py-6 md:py-12 overflow-hidden z-10 my-8 transform-gpu">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: "-50%" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {/* Loop Set 1 */}
          <div className="flex min-w-full items-center flex-none justify-around">
            {[1, 2, 3, 4].map((item) => (
              <span
                key={item}
                className="mx-8 text-6xl md:text-8xl lg:text-9xl font-heading font-semibold uppercase tracking-tighter text-transparent select-none will-change-transform"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.8)" }}
              >
                CREMAIN REMAINS
              </span>
            ))}
          </div>

          {/* Loop Set 2 */}
          <div className="flex min-w-full items-center flex-none justify-around">
            {[1, 2, 3, 4].map((item) => (
              <span
                key={item}
                className="mx-8 text-6xl md:text-8xl lg:text-9xl font-heading font-semibold uppercase tracking-tighter text-transparent select-none will-change-transform"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.8)" }}
              >
                CREMAIN REMAINS
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 3. BOTTOM ROW (Moves Right -> Left) */}
      <motion.div
        style={{ x: x2 }}
        className="w-full will-change-transform transform-gpu"
      >
        <ImageGrid images={ROW_2_IMAGES} />
      </motion.div>
    </section>
  );
}
