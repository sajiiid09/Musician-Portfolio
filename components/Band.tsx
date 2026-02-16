"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion } from "framer-motion";
import { BAND_MEMBERS, BIO } from "@/lib/assets";

gsap.registerPlugin(ScrollTrigger);

interface BandMember {
  name: string;
  role: string;
  img: string;
  bio: string;
}

// Six-member lineup description
const LINEUP_DESCRIPTION = `The richness of Cremain's widescreen sound is the result of a robust six-member lineup that functions as a single, breathing entity. This is not a standard rock outfit; it is a collective designed for maximum atmospheric depth.

The architecture is anchored by the "tectonic" percussion of Irad and the grounding bass of Siam, while Shadman's keys provide the essential atmospheric glue. The dual guitars of Labib and Ayman create the vast, "widescreen" scale that defines their crescendos. At the center of this wall of sound is Sakib, whose vocals and "lyrics that haunt" provide the human anchor to their "elegiac melodies." Together, they move from pin-drop minimalism to thunderous finales with a synchronicity that is rare for such a young ensemble.`;

// Animation variants for the whole grid
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
  },
};

// Variants for the hover details
const detailVariants = {
  initial: { opacity: 0, y: 15 },
  hover: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.1 },
  },
};

const accentVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const Band: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const textPart1Ref = useRef<HTMLSpanElement>(null);
  const textPart2Ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      // Hero Text Reveal Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#band",
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 0.8,
        },
      });

      tl.to(textPart1Ref.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
      }).to(
        textPart2Ref.current,
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
        "-=0.3",
      );
    },
    { scope: containerRef },
  );

  const bandMembers: BandMember[] = [...BAND_MEMBERS].map((member) => ({
    name: member.name,
    role: member.role,
    img: member.img,
    bio: member.bio,
  }));

  return (
    <div ref={containerRef} className="bg-black text-white font-body">
      {/* Hero Section */}
      <section
        id="band"
        className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black z-0" />
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 w-full px-4 text-center">
          <h1 className="text-[12vw] md:text-[14vw] lg:text-[16vw] font-heading font-semibold uppercase tracking-tighter leading-none text-white/10 select-none">
            <span>We Are </span>
            <span>Cremain</span>
          </h1>
          <h1 className="absolute top-0 left-0 right-0 mx-auto text-[12vw] md:text-[14vw] lg:text-[16vw] font-heading font-semibold uppercase tracking-tighter leading-none pointer-events-none select-none">
            <span
              ref={textPart1Ref}
              style={{ clipPath: "inset(0% 100% 0% 0%)" }}
              className="text-white"
            >
              We Are{" "}
            </span>
            <span
              ref={textPart2Ref}
              style={{ clipPath: "inset(0% 100% 0% 0%)", color: "#7c550f" }}
            >
              Cremain
            </span>
          </h1>
        </div>
      </section>

      {/* Intro Content */}
      <section className="py-24 lg:py-32 px-6 lg:px-24" id="epk">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={fadeInUp}
            className="lg:w-1/2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium mb-6 block">
              About The Band
            </span>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-medium uppercase leading-[0.95] italic">
              <span style={{ color: "#7c550f" }}>Shadows</span> and
              <br />
              <span className="text-white/60">Soundscapes</span>
            </h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={containerVariants}
            className="lg:w-1/2 flex flex-col gap-8 text-neutral-400 font-light leading-relaxed"
          >
            <motion.p variants={itemVariants} className="text-lg">
              {BIO.main}
            </motion.p>
            <motion.p variants={itemVariants} className="text-neutral-500">
              {BIO.sound}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Lineup Description */}
      <section className="py-20 lg:py-28 px-6 lg:px-24 bg-gradient-to-b from-neutral-900/20 to-neutral-900/40 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-heading uppercase tracking-[0.3em] text-white/30 mb-8 block"
          >
            The Architecture of <span style={{ color: "#7c550f" }}>Sound</span>
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-neutral-400 font-light leading-[1.8] text-lg lg:text-xl"
          >
            {LINEUP_DESCRIPTION}
          </motion.p>
        </div>
      </section>

      {/* Member Grid */}
      <section className="py-24 lg:py-32 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 lg:mb-24"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium block mb-4">
              The Lineup
            </span>
            <h3 className="text-3xl lg:text-4xl font-heading uppercase tracking-tight">
              Six Voices, <span style={{ color: "#7c550f" }}>One Sound</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {bandMembers.map((member, i) => (
              <motion.div
                key={i}
                initial="initial"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, margin: "-5%" }}
                variants={itemVariants}
                className="group relative flex flex-col gap-6"
              >
                {/* Image Container with Premium Interaction */}
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-950 rounded-sm z-10">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Subtle Gradient Overlay on hover */}
                  <motion.div
                    variants={{
                      initial: { opacity: 0 },
                      hover: { opacity: 1 },
                    }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-20 pointer-events-none"
                  />

                  {/* Corner anchored dynamic details - revealed on hover */}
                  <div
                    className={`absolute inset-0 p-8 flex flex-col z-30 pointer-events-none
                    ${i % 2 === 0 ? "items-end justify-start text-right" : "items-start justify-end text-left"}`}
                  >
                    <motion.p
                      variants={detailVariants}
                      className="text-[9px] lg:text-[10px] font-body uppercase tracking-[0.4em] text-white/90 leading-relaxed max-w-[220px]"
                    >
                      {member.bio}
                    </motion.p>
                  </div>

                  {/* Aesthetic Frame Accents on hover */}
                  <motion.div
                    variants={accentVariants}
                    className="absolute top-6 left-6 w-8 h-[1px] bg-white/40 z-30 origin-left"
                  />
                  <motion.div
                    variants={accentVariants}
                    className="absolute top-6 left-6 h-8 w-[1px] bg-white/40 z-30 origin-top"
                  />
                  <motion.div
                    variants={accentVariants}
                    className="absolute bottom-6 right-6 w-8 h-[1px] bg-white/40 z-30 origin-right"
                  />
                  <motion.div
                    variants={accentVariants}
                    className="absolute bottom-6 right-6 h-8 w-[1px] bg-white/40 z-30 origin-bottom"
                  />
                </div>

                {/* Base Info with refined typography */}
                <div className="flex flex-col gap-2 pl-1 relative z-10">
                  <div className="flex items-end justify-between">
                    <h3 className="text-2xl lg:text-3xl font-heading uppercase tracking-tighter transition-all duration-500 group-hover:tracking-normal group-hover:italic">
                      {member.name}
                    </h3>
                    <span className="text-[10px] text-white/20 font-body tracking-[0.3em] group-hover:text-white/60 transition-colors duration-500">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="h-[1px] w-full bg-white/5 relative overflow-hidden">
                    <motion.div
                      variants={{
                        initial: { x: "-100%" },
                        hover: { x: "0%" },
                      }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className="absolute inset-0 bg-white/20"
                    />
                  </div>
                  <p className="text-neutral-500 uppercase tracking-[0.25em] text-[10px] font-medium mt-1 group-hover:text-[#B48D5C] transition-colors duration-500">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Sections */}
      <section className="py-24 lg:py-32 px-6 lg:px-24 bg-gradient-to-b from-black via-neutral-900/30 to-black">
        <div className="max-w-7xl mx-auto flex flex-col gap-24 lg:gap-32">
          {/* Origins */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center"
          >
            <div className="lg:w-1/2 flex flex-col gap-6">
              <h2 className="text-2xl lg:text-3xl font-heading uppercase tracking-[0.15em] text-white/80">
                <span style={{ color: "#7c550f" }}>Origins</span> & Evolution
              </h2>
              <p className="text-neutral-400 font-light leading-[1.8] text-lg">
                {BIO.origins}
              </p>
            </div>
            <div className="lg:w-1/2 relative aspect-[16/10] overflow-hidden bg-neutral-900 group">
              <Image
                src="/Photos/IMG_2892.png"
                alt="Cremain Origins"
                fill
                className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Music & Influence */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-20 items-center"
          >
            <div className="lg:w-1/2 flex flex-col gap-6">
              <h2 className="text-2xl lg:text-3xl font-heading uppercase tracking-[0.15em] text-white/80">
                Music & <span style={{ color: "#7c550f" }}>Influence</span>
              </h2>
              <p className="text-neutral-400 font-light leading-[1.8] text-lg">
                {BIO.influence}
              </p>
            </div>
            <div className="lg:w-1/2 relative aspect-[16/10] overflow-hidden bg-neutral-900 group">
              <Image
                src="/Photos of Cremain /TIS03398.JPG"
                alt="Cremain Live"
                fill
                className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tl from-black/40 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 lg:py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-600 font-heading uppercase tracking-[0.2em] text-xs">
            © 2026 Cremain
          </p>
          <p className="text-neutral-700 text-xs">
            Post-Rock & Progressive Rock from Dhaka
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Band;
