'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GALLERY_PHOTOS } from '@/lib/assets';

// Split gallery photos into two rows
const ROW_1_IMAGES = GALLERY_PHOTOS.slice(0, 5);
const ROW_2_IMAGES = GALLERY_PHOTOS.slice(5, 10);

const ImageGrid = ({ images }: { images: string[] }) => (
  <div className="flex w-full gap-4 px-4 overflow-visible">
    {images.map((src, idx) => (
      <div
        key={idx}
        className="relative flex-none w-[80vw] md:w-[35vw] lg:w-[25vw] aspect-[4/5] overflow-hidden group bg-neutral-900"
      >
        <img
          src={src}
          alt="Gallery"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>
    ))}
  </div>
);

export default function GalleryMarquee() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // --- PARALLAX LOGIC ---
  // Optimized ranges for smooth single-line movement
  const x1 = useTransform(scrollYProgress, [0, 1], ["-25%", "5%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["5%", "-25%"]);

  return (
    <section
      ref={containerRef}
      className="w-full bg-black overflow-hidden py-0"
    >

      {/* 1. TOP ROW (Moves Left -> Right) */}
      <motion.div
        style={{ x: x1 }}
        className="w-full will-change-transform"
      >
        <ImageGrid images={ROW_1_IMAGES} />
      </motion.div>

      {/* 2. INFINITE MARQUEE STRIP */}
      <div className="w-full border-y border-white/10 bg-black py-6 md:py-12 overflow-hidden z-10 my-8">
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
                className="mx-8 text-6xl md:text-8xl lg:text-9xl font-semibold uppercase tracking-tighter text-transparent select-none"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}
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
                className="mx-8 text-6xl md:text-8xl lg:text-9xl font-semibold uppercase tracking-tighter text-transparent select-none"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}
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
        className="w-full will-change-transform"
      >
        <ImageGrid images={ROW_2_IMAGES} />
      </motion.div>

    </section>
  );
}