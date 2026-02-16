"use client";
import React, { useRef } from "react";
import HomeHeroText from "./HomeHeroText";
import HomeBottomText from "./HomeBottomText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SINGLE_SINNER } from "@/lib/assets";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(bgRef.current, {
        scale: 1.15,
        y: "15%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="text-white min-h-screen w-full bg-black relative overflow-hidden"
    >
      {/* Background Video with Next.js Image fallback for better performance */}
      <div
        ref={bgRef}
        className="absolute inset-0 overflow-hidden will-change-transform"
      >
        <video
          src={SINGLE_SINNER.video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="h-screen w-full relative overflow-hidden flex flex-col justify-between z-10">
        <HomeHeroText />

        <HomeBottomText />

        {/* Floating Video Widget with Premium Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-10 right-6 lg:bottom-16 lg:right-16 flex flex-col gap-3 p-3
            bg-white/5 backdrop-blur-2xl border border-white/10 rounded-xl
            shadow-[0_8px_32px_rgba(0,0,0,0.5)]
            transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]
            will-change-transform z-50"
        >
          {/* Video Container */}
          <div className="w-64 h-36 lg:w-80 lg:h-44 overflow-hidden rounded-lg relative border border-white/5 shadow-inner">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/biy2TAAGe6A?si=8X5Z5Z5Z5Z5Z5Z5Z&controls=0&autoplay=1&loop=1&playlist=biy2TAAGe6A"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Interaction Overlay (optional, prevents clicking video directly if desired, but allows play) */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
          </div>

          {/* Info Section */}
          <div className="flex items-center gap-3 px-1">
            <div className="relative flex items-center justify-center w-8 h-8 bg-[#7c550f] rounded-full text-black shadow-[0_0_10px_rgba(211,253,80,0.3)]">
              <svg className="w-3 h-3 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <p className="text-[0.65rem] font-heading font-bold tracking-[0.2em] uppercase text-[#9c6b13] mb-0.5 drop-shadow-sm">
                Latest Release
              </p>
              <p className="text-[0.75rem] font-body font-medium tracking-wide uppercase text-white/90 drop-shadow-md">
                Sinner - Official Video
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
