"use client";
import React, { useRef } from 'react';
import HomeHeroText from './HomeHeroText';
import HomeBottomText from './HomeBottomText';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SINGLE_SINNER } from '@/lib/assets';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(bgRef.current, {
      scale: 1.15,
      y: '15%',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className='text-white min-h-screen w-full bg-black relative overflow-hidden'>
      {/* Background Video with Next.js Image fallback for better performance */}
      <div ref={bgRef} className='absolute inset-0 overflow-hidden will-change-transform'>
        <video
          src={SINGLE_SINNER.video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className='w-full h-full object-cover opacity-60'
        />
        <div className='absolute inset-0 bg-black/20' />
      </div>

      <div className='h-screen w-full relative overflow-hidden flex flex-col justify-between z-10'>
        <HomeHeroText />

        <HomeBottomText />

        {/* YouTube Video Widget */}
        <div className='absolute bottom-10 right-10 lg:bottom-16 lg:right-16 flex flex-col gap-3 p-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all hover:border-white/20 will-change-transform'>
          <div className='w-64 h-36 lg:w-80 lg:h-44 overflow-hidden border border-white/10 rounded-md relative'>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/biy2TAAGe6A?si=8X5Z5Z5Z5Z5Z5Z5Z&controls=0"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className='flex items-center gap-3 px-2 pb-1'>
            <div className='bg-white/10 p-1.5 rounded-full'>
              <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className='flex flex-col'>
              <p className='text-[0.7rem] font-body font-semibold tracking-[0.3em] uppercase text-[#D3FD50]'>Video</p>
              <p className='text-[0.8rem] font-body tracking-widest uppercase opacity-80'>Sinner - Official Video</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
