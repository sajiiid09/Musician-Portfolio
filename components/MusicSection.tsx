'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import VinylCard from './VinylCard';

// Real Data
const albums = [
  { 
    id: 1, 
    title: "এ কোন মায়া", 
    cover: "https://img.youtube.com/vi/aV75Q8L2pkI/maxresdefault.jpg" 
  },
  { 
    id: 2, 
    title: "মেয়ে তোমার আমি বন্ধু হবো", 
    cover: "https://img.youtube.com/vi/yjhjzoS6Xj4/maxresdefault.jpg" 
  },
  { 
    id: 3, 
    title: "নারী তুমি জেগে ওঠো", 
    cover: "https://img.youtube.com/vi/65mZJyKiwE8/maxresdefault.jpg" 
  },
];

export default function MusicSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- SCROLL ANIMATIONS ---
  // 1. Scale: Starts at 1, shrinks slightly as you scroll deep
  const scrollScale = useTransform(scrollYProgress, [0, 0.2, 1], [1, 1, 0.9]);
  
  // 2. Opacity: 
  // 0% - 20% Scroll: Opacity 1 (Solid White - The "Pop Off" phase)
  // 20% - 50% Scroll: Fades down to 0.1 (Becomes background)
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [1, 1, 0.1]);
  
  // 3. Progress Bar Height
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-black text-white"
      // Height calculation: Buffer + (Card Height * Count)
      style={{ height: `${(albums.length * 90) + 80}vh` }} 
    >
      
      {/* --- LAYER 0: STICKY TITLE --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          
          {/* Wrapper div handles the "Pop Off" Entry Animation.
             The h1 inside handles the Scroll Animation.
          */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.h1 
              style={{ scale: scrollScale, opacity: scrollOpacity }}
              className="text-[25vw] font-semibold leading-none tracking-tighter text-white select-none will-change-transform"
            >
              MUSIC
            </motion.h1>
          </motion.div>

        </div>
      </div>

      {/* --- LAYER 1: CONTENT GRID --- */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto grid grid-cols-[80px_1fr] md:grid-cols-[150px_1fr] h-full">
        
        {/* Left Sidebar (Sticky) */}
        <div className="hidden md:flex flex-col h-screen sticky top-0 justify-center items-center border-r border-white/10">
          <div className="relative h-[60vh] w-[1px] bg-white/10 overflow-hidden">
             <motion.div 
               style={{ height: progressHeight }} 
               className="absolute top-0 left-0 w-full bg-white" 
             />
             <div className="absolute top-1/2 -left-12 -translate-y-1/2 -rotate-90 origin-center whitespace-nowrap">
               <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/50">
                 Featured Releases
               </span>
             </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col px-4 md:px-20">
          
          {/* THE BUFFER: 
              This ensures the user sees ONLY the 'MUSIC' text for the first 60vh of scrolling. 
          */}
          <div className="h-[100vh] w-full" />

          <div className="flex flex-col gap-40 pb-80">
            {albums.map((album) => (
              <div key={album.id} className="flex flex-col items-center">
                  <VinylCard 
                    title={album.title} 
                    coverImage={album.cover} 
                  />
                  <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-16 text-3xl md:text-5xl font-semibold uppercase tracking-tight text-center"
                  >
                    {album.title}
                  </motion.h2>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}