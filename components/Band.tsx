"use client";
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BAND_MEMBERS, BIO } from '@/lib/assets';

gsap.registerPlugin(ScrollTrigger);

interface BandMember {
    name: string;
    role: string;
    img: string;
}

// Six-member lineup description
const LINEUP_DESCRIPTION = `The richness of Cremain's widescreen sound is the result of a robust six-member lineup that functions as a single, breathing entity. This is not a standard rock outfit; it is a collective designed for maximum atmospheric depth.

The architecture is anchored by the "tectonic" percussion of Irad and the grounding bass of Siam, while Shadman's keys provide the essential atmospheric glue. The dual guitars of Labib and Ayman create the vast, "widescreen" scale that defines their crescendos. At the center of this wall of sound is Sakib, whose vocals and "lyrics that haunt" provide the human anchor to their "elegiac melodies." Together, they move from pin-drop minimalism to thunderous finales with a synchronicity that is rare for such a young ensemble.`;

const Band: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const textPart1Ref = useRef<HTMLSpanElement>(null);
    const textPart2Ref = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        // Hero Text Reveal Animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#band', // Trigger element
                start: 'top top',
                end: '+=300%', // Pin for 3 screens
                pin: true,
                scrub: 1,
            },
        });

        tl.to(textPart1Ref.current, {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'none',
        })
            .to(textPart2Ref.current, {
                clipPath: 'inset(0% 0% 0% 0%)',
                ease: 'none',
            });

        // Paragraph Reveals
        gsap.from('.reveal-text', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.reveal-text',
                start: 'top 80%',
            }
        });
    }, { scope: containerRef });

    const bandMembers: BandMember[] = [...BAND_MEMBERS].map(member => ({
        name: member.name,
        role: member.role,
        img: member.img,
    }));

    return (
        <div ref={containerRef} className="bg-black text-white font-inter">
            {/* Hero Section */}
            <section
                id="band"
                className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-0"></div>

                <div className="relative z-10 w-full px-4 text-center">
                    {/* Layer 1: Base Text (Dimmed) */}
                    <h1 className="text-[12vw] md:text-[15vw] lg:text-[18vw] font-space font-semibold uppercase tracking-tighter leading-none text-white/20 select-none">
                        <span>We Are </span>
                        <span>Cremain</span>
                    </h1>

                    {/* Layer 2: Overlay Text (White Fill) - Revealed via clip-path */}
                    <h1
                        className="absolute top-0 left-0 right-0 mx-auto text-[12vw] md:text-[15vw] lg:text-[18vw] font-space font-semibold uppercase tracking-tighter leading-none text-white pointer-events-none select-none"
                    >
                        <span ref={textPart1Ref} style={{ clipPath: 'inset(0% 100% 0% 0%)' }}>
                            We Are{' '}
                        </span>
                        <span ref={textPart2Ref} style={{ clipPath: 'inset(0% 100% 0% 0%)' }}>
                            Cremain
                        </span>
                    </h1>
                </div>
            </section>

            {/* Intro Content */}
            <section className="py-15 px-6 lg:px-24" id="epk">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl lg:text-5xl font-space font-medium uppercase leading-tight italic">
                            Shadows and<br />Soundscapes
                        </h2>
                    </div>
                    <div className="lg:w-1/2 flex flex-col gap-8 text-neutral-400 font-light leading-relaxed">
                        <p className="reveal-text">
                            {BIO.main}
                        </p>
                        <p className="reveal-text">
                            {BIO.sound}
                        </p>
                    </div>
                </div>
            </section>

            {/* Lineup Description */}
            <section className="py-16 px-6 lg:px-24 bg-neutral-900/30">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-xl font-space uppercase tracking-[0.2em] text-white/40 mb-8">
                        The Architecture of Sound
                    </h3>
                    <p className="text-neutral-400 font-light leading-relaxed text-lg">
                        {LINEUP_DESCRIPTION}
                    </p>
                </div>
            </section>

            {/* Member Grid */}
            <section className="py-32 px-6 lg:px-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-20 gap-y-32">
                    {bandMembers.map((member, i) => (
                        <div key={i} className="flex flex-col gap-6">
                            <div className="aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                                <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-space uppercase">{member.name}</h3>
                                <p className="text-neutral-500 uppercase tracking-widest text-sm mt-1">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Narrative Sections */}
            <section className="py-32 px-6 lg:px-24 bg-neutral-900/20">
                <div className="max-w-7xl mx-auto flex flex-col gap-40">
                    {/* Origins */}
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2 flex flex-col gap-8">
                            <h2 className="text-xl font-space uppercase tracking-[0.3em] text-neutral-500">Origins & Evolution</h2>
                            <p className="text-neutral-400 font-light leading-relaxed">
                                {BIO.origins}
                            </p>
                        </div>
                        <div className="lg:w-1/2 aspect-video overflow-hidden bg-neutral-800">
                            <img src="/Photos/IMG_2892.png" alt="Cremain Origins" className="w-full h-full object-cover opacity-60" />
                        </div>
                    </div>

                    {/* Music & Influence */}
                    <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
                        <div className="lg:w-1/2 flex flex-col gap-8">
                            <h2 className="text-xl font-space uppercase tracking-[0.3em] text-neutral-500">Music & Influence</h2>
                            <p className="text-neutral-400 font-light leading-relaxed">
                                {BIO.influence}
                            </p>
                        </div>
                        <div className="lg:w-1/2 aspect-video overflow-hidden bg-neutral-800">
                            <img src="/Photos of Cremain /TIS03398.JPG" alt="Cremain Live" className="w-full h-full object-cover opacity-60" />
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-20 text-center border-t border-white/5">
                <p className="text-neutral-600 font-space uppercase tracking-widest">© 2026 Cremain</p>
            </footer>
        </div>
    );
};

export default Band;
