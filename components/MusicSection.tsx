'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import VinylCard from './VinylCard';
import { ALBUM_DEAR_MELANCHOLIA, STREAMING_LINKS } from '@/lib/assets';

// Show album with vinyl card
const album = {
  id: 1,
  title: ALBUM_DEAR_MELANCHOLIA.title,
  cover: ALBUM_DEAR_MELANCHOLIA.cover,
};

// SVG icons for streaming platforms
const STREAMING_ICONS = {
  spotify: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.483-1.09.483-.369 0-.705-.19-.877-.483-.171-.29-.214-.68-.214-1.062 0-1.005.5-1.956 1.315-2.504.65-.55 1.326-.996 1.949-1.317l-.647-.381a.525.525 0 01-.195-.412c-.004-.004-.063-.015-.063-.016l-1.018-.418c-.031-.013-.065-.02-.1-.02-.617 0-1.269.447-1.865.936-.736.575-1.435.818-1.931.354-.897.515-1.418.945-1.852.522-.622.937-1.25 1.252-1.889.615-.637 1.083-1.287 1.378-1.962l.013-.01c.045-.005.09-.012.134-.02.516-.09.995-.18 1.408-.252.414-.072.793-.157 1.125-.252l.689-.205c.086-.026.168-.071.244-.139l.002-.001c.017-.009.033-.018.05-.026.072-.037.142-.076.21-.114.048-.025.093-.054.134-.086l-.001-.001c-.053-.025-.108-.046-.166-.062l-1.013-.295c-.357-.104-.724-.17-1.1-.196-.025-.004-.05-.005-.076-.005-.543 0-1.076.123-1.587.36-.512.244-.994.57-1.44.98-.446.415-.858.88-1.238 1.402-.379.521-.704 1.069-.971 1.65-.267.58-.471 1.192-.609 1.836l-.006.019c-.004.011-.009.023-.013.035l-.402 1.082c-.007.019-.015.038-.022.058l-.001.004c-.02.058-.041.113-.062.169l-.001.001c-.009.029-.018.058-.026.088-.037.057-.025.11-.053.162-.083l-.001.001c-.058-.027-.12-.05-.184-.068l-.99-.459c-.061-.029-.123-.054-.188-.077l-.017-.007c-.546-.206-1.104-.351-1.678-.433l-.667-.096c-.282-.041-.568-.063-.857-.063-1.064 0-2.109-.354-4.06-1.059-5.556-.704-1.496-1.077-2.302-1.077-1.529 0-2.908.434-4.075 1.292-1.166.858-1.998 1.89-2.504 2.578-.506.688-.836 1.277-1.006 1.648l-.006.014c-.001.002-.002.004-.003.006-.005l-.253.577c-.013.031-.026.061-.04.093l-.001.001c-.006.014-.012.028-.017.043l-.252.578c-.026.058-.052.114-.078.171l-.002.002c-.018.045-.036.09-.055.136l-.003.009c-.006.017-.011.033-.018.049l-.078.171c-.013.027-.025.053-.038.08-.076.162l-.001.001c-.015.032-.03.063-.045.096l-.002.006c-.01.019-.019.038-.029.058l-.069.166c-.014.03-.028.061-.043.091l-.002.005c-.007.014-.014.029-.021.044l-.045.096c-.011.024-.022.048-.033.072l-.003.007c-.009.019-.019.037-.028.056l-.033.072c-.008.019-.017.038-.025.057l-.006.013c-.023.048-.045.094-.067.14l-.014.03c-.046.099-.092.197-.139.295l-.014.029c-.024.053-.048.106-.073.159l-.005.011c-.012.028-.024.055-.036.083l-.045.095c-.01.021-.02.042-.029.063l-.007.014c-.018.037-.035.073-.053.109l-.032.067c-.005.011-.01.022-.015.033l-.045.096c-.018.04-.037.079-.056.119l-.006.011c-.013.028-.027.057-.041.086l-.032.067c-.008.018-.017.036-.025.054l-.014.029c-.023.049-.045.097-.068.146l-.014.029c-.012.025-.024.051-.035.076l-.056.119c-.009.019-.019.039-.028.058l-.007.015c-.014.029-.027.058-.04.087l-.024.051c-.007.015-.014.03-.022.045l-.028.058c-.008.018-.016.036-.024.054l-.014.029c-.013.027-.025.053-.038.08l-.024.051c-.006.012-.012.024-.019.037l-.014.029c-.012.025-.025.051-.037.076l-.024.05c-.006.012-.012.023-.018.035l-.038.08c-.009.019-.018.037-.027.056l-.007.015c-.012.025-.024.049-.035.074l-.024.05c-.007.015-.015.03-.022.045l-.014.029c-.014.029-.027.057-.041.086l-.035.074c-.009.02-.018.039-.028.059l-.007.014c-.013.026-.025.052-.038.078l-.035.074c-.007.015-.014.029-.021.044l-.007.015c-.014.029-.027.058-.041.087l-.035.074c-.008.018-.016.035-.025.053l-.014.029c-.013.026-.025.051-.038.076l-.024.05c-.007.014-.014.027-.021.041l-.014.029c-.014.029-.027.057-.041.086l-.024.05c-.008.018-.016.036-.025.053l-.014.029c-.013.026-.025.051-.038.076l-.024.05c-.006.012-.012.024-.019.036l-.014.029c-.013.026-.025.051-.038.076z"/>
    </svg>
  ),
  bandcamp: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.033 12.388c-.057-1.714-1.414-2.966-2.696-2.966-.593 0-1.09.234-1.483.626-.396.393-.614 1.064-.614 1.839 0 1.615.503 2.982 1.507 4.101.954 1.074 1.688 2.481 1.688 4.284 0 2.545-1.043 4.667-2.743 5.865-.639.445-1.35.678-2.111.678-.911 0-1.672-.303-2.285-.911-.614-.608-.906-1.568-.906-2.673 0-.851.297-1.601.89-2.164-.591-.562-.89-1.391-.89-2.331 0-1.647.657-3.036 1.97-4.165.961-.88 1.617-1.967 1.617-3.286 0-1.489-.606-2.753-1.81-3.747-.923-.761-1.484-1.892-1.484-3.265 0-1.048.42-1.94 1.126-2.613.705-.673 1.127-1.627 1.127-2.676 0-.862-.352-1.604-1.058-2.197l-1.025-1.043c-1.406-1.406-3.066-2.048-4.814-2.048-1.933 0-3.695.609-5.077 1.826-1.383 1.217-1.874 2.939-1.874 4.623 0 2.344.952 4.34 2.834 6.08.852.719 1.386.852 2.963.852 4.676 0 1.428-.58 2.634-1.741 3.594-1.161.959-1.741 2.174-1.741 3.584 0 .922-.376 1.708-1.129 2.354-.754.646-1.129 1.398-1.129 2.354 0 .777-.317 1.435-.951 1.973-.634.538-.951 1.197-.951 1.973z"/>
    </svg>
  ),
  apple: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.08 2.45-1.83 0-3.16-1.35-3.16-1.35 0-1.35 1.33-2.85 3.16-2.85 1.37 0 2.85 1.5 3.16 2.85 0 1.35-1.33 2.85-3.16 2.85zm-5.42-2.12c-.29-2.05.83-3.78 2.83-4.88 2.83-1.66 0-3.16-.96-3.16-.96 0-2.01 2.06-2.76 4.42-3.25 1.85-.31 3.43 1.15 4.36 1.7l2.58-1.53c.32-.19.64-.35 1.05-.19 1.05-.43 0-.86-.6-1.32-.6-1.95v-2.32c0-1.32-.88-2.53-2.32-2.53h-3.06v-6.25h3.06c1.44 0 2.32-1.21 2.32-2.53v-2.32c0-1.32-.88-2.53-2.32-2.53h-3.06z"/>
    </svg>
  ),
  youtube: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.246 11.631.245 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8-4z"/>
    </svg>
  ),
  soundcloud: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.175 12.225c-.051 0-.094.046-.101.1l0 4.751c0 .033.025.066.055.066h.471c.033 0 .06-.029.06-.066v-3.194c1.258-.094 2.873-1.412 3.543-1.526.335-.094.696-.146 1.059-.146l0-2.625c0-.035-.026-.066-.06-.066h-.485c-.033 0-.06.031-.06.066l0 2.606c0 .427.363.795.836.795h3.078c.433 0 .768-.382.768-.803l0-1.587c0-.041-.028-.075-.069-.075h-.475c-.041 0-.076.032-.076.075l0 1.576c0 .037-.028.066-.066.066h-3.068c-.037 0-.066-.029-.066-.066l0-5.605c0-1.519-.852-2.796-1.994-2.821l-.007-.003c-1.322-.236-2.361-1.699-2.361-1.699 0-1.515.823-2.799 1.993-3.343 1.17-.543 1.796-.965 2.415-.965.638 0 1.219.169 1.735.475.249.075.503.143.771.143l0 2.975c0 .038.029.066.066.066h.461c.038 0 .066-.028.066-.066l0-2.976c0-.356-.308-.615-.694-.615h-2.896c-.388 0-.711.318-.711.71l0 2.965c0 .042.029.071.066.071h2.896c.386 0 .684-.313.684-.704l0-2.957c0-.361-.309-.641-.716-.641l-.531 0c-.426 0-.732.304-.732.709l0 2.976c0 .039.029.071.066.071h.449c.039 0 .066-.028.066-.066l0-2.975c0-.283-.23-.508-.543-.508h-2.825c-.312 0-.536.254-.536.573l0 2.975c0 .037.029.066.066.066h2.807c.312 0 .535-.254.535-.573l0-2.976c0-.283-.23-.508-.508-.508l-.469 0c-.415 0-.732.306-.732.711l0 2.975c0 .039.029.071.066.071h.453c.039 0 .066-.028.066-.066l0-2.976c0-.283-.229-.508-.508-.508l-2.788 0c-.312 0-.536.254-.536.573l0 2.975c0 .037.029.066.066.066h2.765c.313 0 .536-.254.536-.573l0-2.975c0-.283-.229-.508-.508-.508z"/>
    </svg>
  ),
};

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
      // Height calculation: Buffer + (Card Height * 1)
      style={{ height: `${(1 * 90) + 120}vh` }}
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
              DISCOGRAPHY
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
                 Featured Release
               </span>
             </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col px-4 md:px-20">

          {/* THE BUFFER:
              This ensures the user sees ONLY the 'DISCOGRAPHY' text for the first 60vh of scrolling.
          */}
          <div className="h-[100vh] w-full" />

          <div className="flex flex-col gap-40 pb-80">
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

            {/* Tracklist */}
            <div className="max-w-2xl mx-auto mt-16 space-y-6">
              <h3 className="text-xl font-space uppercase tracking-[0.2em] text-white/60 mb-8 text-center">
                Tracklist
              </h3>
              {ALBUM_DEAR_MELANCHOLIA.tracks.map((track) => (
                <div
                  key={track.id}
                  className="flex items-center gap-6 py-4 border-b border-white/10 group hover:bg-white/5 transition-colors"
                >
                  <span className="text-white/40 font-mono text-sm w-8">
                    {track.id.toString().padStart(2, '0')}
                  </span>
                  <span className="text-white/80 font-medium tracking-wide group-hover:text-white transition-colors">
                    {track.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Streaming Links */}
            <div className="max-w-2xl mx-auto mt-12">
              <h3 className="text-xl font-space uppercase tracking-[0.2em] text-white/60 mb-8 text-center">
                Stream Now
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {STREAMING_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 p-4 border border-white/20 rounded-lg hover:bg-white hover:text-black transition-all duration-300 group"
                  >
                    <span className="text-white/80 group-hover:text-black transition-colors">
                      {STREAMING_ICONS[link.icon as keyof typeof STREAMING_ICONS]}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}