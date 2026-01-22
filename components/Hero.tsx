"use client";
import React, { useRef } from 'react';
import Video from './Video';
import HomeHeroText from './HomeHeroText';
import HomeBottomText from './HomeBottomText';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
const back = '/assets/a.avif';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const bgRef = useRef<HTMLImageElement>(null);
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
        scrub: 1.5 // Added lag for gentle movement
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className='text-white min-h-screen w-full bg-black relative overflow-hidden'>
      <div className='absolute inset-0 overflow-hidden'>
        <img 
          ref={bgRef}
          src={back}
          alt="" 
          className='w-full h-full object-cover opacity-60'
        />
        <div className='absolute inset-0 bg-black/20'></div>
      </div>

      <div className='h-screen w-full relative overflow-hidden flex flex-col justify-between z-10'>
        <HomeHeroText />
        
        <HomeBottomText />

        <div className='absolute bottom-10 right-10 lg:bottom-16 lg:right-16 flex flex-col gap-3 p-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all hover:border-white/20'>
            <div className='w-80 h-44 lg:w-[28rem] lg:h-64 overflow-hidden border border-white/10 rounded-md'>
                <Video />
            </div>
            <div className='flex items-center gap-3 px-2 pb-1'>
                <div className='bg-white/10 p-1.5 rounded-full'>
                    <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                        <path d="/assets/video.mp4" />
                    </svg>
                </div>
                <div className='flex flex-col'>
                    <p className='text-[0.7rem] font-[font2] font-black tracking-[0.3em] uppercase text-[#D3FD50]'>Video</p>
                    <p className='text-[0.8rem] font-[font1] tracking-widest uppercase opacity-80'>মেয়ে তোমার আমি বন্ধু হবো</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
