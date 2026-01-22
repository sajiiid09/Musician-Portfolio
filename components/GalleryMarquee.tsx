'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GALLERY_PHOTOS } from '@/lib/assets';

// Split gallery photos into two rows
const ROW_1_IMAGES = GALLERY_PHOTOS.slice(0, 5);
const ROW_2_IMAGES = GALLERY_PHOTOS.slice(5, 10);

const ImageGrid = ({ images }: { images: string[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full min-w-[100vw] lg:min-w-full">
    {images.map((src, idx) => (
      <div key={idx} className="relative aspect-[4/5] overflow-hidden group w-full bg-neutral-900">
        <img 
          src={src} 
          alt="Gallery" 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
  const x1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section 
      ref={containerRef} 
      className="w-full bg-black overflow-hidden py-0"
    >
      
      {/* 1. TOP ROW (Moves Left -> Right) */}
      <motion.div style={{ x: x1 }} className="w-full">
        <ImageGrid images={ROW_1_IMAGES} />
      </motion.div>

      {/* 2. INFINITE MARQUEE STRIP */}
      <div className="w-full border-y border-white/10 bg-black py-4 md:py-10 overflow-hidden z-10 my-6">
        <motion.div 
          className="flex whitespace-nowrap"
          // We animate x to -50% because the container holds 2 copies. 
          // Moving -50% means the second copy perfectly replaces the first.
          animate={{ x: "-100%" }} 
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          
          {/* Loop Set 1: ADDED 'flex-none' to prevent shrinking */}
          <div className="flex min-w-full items-center flex-none">
            {[1, 2, 3, 4].map((item) => (
              <span
                key={item}
                className="mx-8 text-6xl md:text-8xl lg:text-9xl font-semibold uppercase tracking-tighter text-transparent"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}
              >
                Cremain
              </span>
            ))}
          </div>

          {/* Loop Set 2: ADDED 'flex-none' to prevent shrinking */}
          <div className="flex min-w-full items-center flex-none">
            {[1, 2, 3, 4].map((item) => (
              <span
                key={item}
                className="mx-8 text-6xl md:text-8xl lg:text-9xl font-semibold uppercase tracking-tighter text-transparent"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}
              >
                Cremain
              </span>
            ))}
          </div>

        </motion.div>
      </div>

      {/* 3. BOTTOM ROW (Moves Right -> Left) */}
      <motion.div style={{ x: x2 }} className="w-full">
        <ImageGrid images={ROW_2_IMAGES} />
      </motion.div>

    </section>
  );
}