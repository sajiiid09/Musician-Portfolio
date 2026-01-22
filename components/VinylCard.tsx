'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { VINYL_ASSETS } from '@/lib/assets';

interface VinylCardProps {
  title: string;
  coverImage: string;
}

export default function VinylCard({ title, coverImage }: VinylCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Mouse Physics for Custom Cursor ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.2 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Center the cursor (128px width / 2 = 64px offset)
    mouseX.set(e.clientX - rect.left - 64);
    mouseY.set(e.clientY - rect.top - 64);
  };

  // --- Asset URLs from centralized config ---
  const ASSETS = VINYL_ASSETS;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.9, y: 100 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Apple-style ease
      className="relative w-full max-w-[600px] aspect-square cursor-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="relative w-full h-full flex items-center justify-center perspective-1000">
        
        {/* --- LAYER 1: The Vinyl Record (Back) --- */}
        <motion.div
          className="absolute w-[94%] aspect-square rounded-full z-0"
          initial={{ x: 0, rotate: -90 }}
          animate={isHovered ? { x: "55%", rotate: 0 } : { x: 0, rotate: -90 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.25 }}
        >
          {/* Realistic Vinyl Image */}
          <img 
            src={ASSETS.vinyl} 
            alt="Vinyl Record" 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
          {/* Center Sticker Label Content */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-[30%] aspect-square bg-[#A7F3D0] rounded-full flex flex-col items-center justify-center text-center p-2 shadow-inner">
                <img src={ASSETS.logo} className="w-16 opacity-80 mb-1" alt="Logo" />
                <p className="text-[0.6rem] font-semibold uppercase leading-tight tracking-tighter text-black/80 line-clamp-2 max-w-[80%]">
                    {title}
                </p>
             </div>
          </div>
        </motion.div>

        {/* --- LAYER 2: The Sleeve (Middle) --- */}
        <div className="absolute inset-0 z-10 pointer-events-none">
             <img 
                src={ASSETS.sleeve} 
                alt="Sleeve Texture" 
                className="w-full h-full object-cover opacity-90 mix-blend-multiply"
             />
        </div>

        {/* --- LAYER 3: Album Art (Top) --- */}
        <div className="relative z-20 w-full h-full bg-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          <img 
            src={coverImage} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          
          {/* Subtle Glare/Texture Overlay for realism */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>

      </div>

      {/* --- LAYER 4: Magnetic Cursor (Top Most) --- */}
      {/* --- LAYER 4: Custom "Donut" Cursor --- */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute top-0 left-0 z-50 pointer-events-none"
            style={{ x: cursorX, y: cursorY }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* - w-32 h-32: Sets the overall size (128px)
                - -ml-16 -mt-16: Centers the div on the mouse tip exactly
            */}
            <div className="w-32 h-32 -ml-16 -mt-16 relative flex items-center justify-center">
                
                {/* Rotating Container */}
                <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                        {/* 1. The White Ring (Background) 
                           - r="34": Radius of the circle center
                           - strokeWidth="24": Thickness of the ring
                           - fill="none": Ensures the middle is a GAP (Transparent)
                        */}
                        <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="20" fill="none" />
                        
                        {/* 2. The Text Path Definition (Invisible) */}
                        <path id="textCurve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
                        
                        {/* 3. The Text itself */}
                        <text className="text-[10px] font-medium uppercase tracking-[0.18em] fill-black">
                            <textPath href="#textCurve" startOffset="0%">
                                View More Details • View More Details •
                            </textPath>
                        </text>
                    </svg>
                </div>
                
                {/* NO CENTER DOT HERE - Keeps the middle transparent */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}