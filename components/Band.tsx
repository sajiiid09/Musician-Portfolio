"use client";
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const member1 = '/assets/member1.png';
const member2 = '/assets/member2.jpg';
const member3 = '/assets/member3.jpg';
const member4 = '/assets/member4.png';

gsap.registerPlugin(ScrollTrigger);

interface BandMember {
    name: string;
    role: string;
    img: string; 
}

const Band: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
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

    const bandMembers: BandMember[] = [
        { name: 'Sofia Ericsson', role: 'Guitar / Vocals', img: member2 },
        { name: 'Nick Talbot', role: 'Bass', img: member1 },
        { name: 'John Blackstone', role: 'Lead Guitar', img: member3 },
        { name: 'Tom Braxley', role: 'Drums', img: member4 },
    ];

    return (
        <div ref={containerRef} className="bg-black text-white font-inter">
            {/* Hero Section */}
            <section id="band" className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
                
                <h1 className="relative z-10 text-[15vw] font-space font-semibold uppercase tracking-tighter leading-none pointer-events-none opacity-90">
                    Islam Manik
                </h1>
            </section>

            {/* Intro Content */}
            <section className="py-15 px-6 lg:px-24">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl lg:text-5xl font-space font-medium uppercase leading-tight italic">
                            Fueling Sound With<br />Cutting-Edge Intensity
                        </h2>
                    </div>
                    <div className="lg:w-1/2 flex flex-col gap-8 text-neutral-400 font-light leading-relaxed">
                        <p className="reveal-text">
                            Hailing from the underground rock scene, Headz is an indie metal rock band that blends raw power, haunting melodies, and unapologetic energy. With their unique fusion of heavy riffs, electrifying solos, and emotionally charged lyrics, Headz has carved a distinct sound that bridges the gap between classic metal and modern rock.
                        </p>
                        <p className="reveal-text">
                            Their music is a sonic assault of blistering guitar work, thunderous drumming, and deep, pulsating basslines, all intertwined with powerful vocal performances that evoke both rage and vulnerability.
                        </p>
                    </div>
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
                                Formed in the late 2010s, Headz began as a passion project among four musicians seeking to channel their diverse influences into something fresh and explosive. Nick Talbot, with his gritty yet melodic vocal style and high-energy bass playing, became the driving force behind the band's creative direction.
                            </p>
                        </div>
                        <div className="lg:w-1/2 aspect-video overflow-hidden bg-neutral-800">
                             {/* Placeholder for Origins image */}
                        </div>
                    </div>

                    {/* Music & Influence */}
                    <div className="flex flex-col lg:flex-row-reverse gap-20 items-center">
                        <div className="lg:w-1/2 flex flex-col gap-8">
                            <h2 className="text-xl font-space uppercase tracking-[0.3em] text-neutral-500">Music & Influence</h2>
                            <p className="text-neutral-400 font-light leading-relaxed">
                                Drawing inspiration from legendary acts like Metallica, Alice in Chains, and Mastodon, Headz infuses their songs with a mix of hard-hitting aggression and haunting melodies. Their lyrics often explore themes of struggle, self-discovery, and rebellion, reflecting their journey as independent musicians navigating the ever-evolving rock landscape.
                            </p>
                        </div>
                        <div className="lg:w-1/2 aspect-video overflow-hidden bg-neutral-800">
                             {/* Placeholder for Music & Influence image */}
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-20 text-center border-t border-white/5">
                <p className="text-neutral-600 font-space uppercase tracking-widest">© 2026 Headz Band</p>
            </footer>
        </div>
    );
};

export default Band;
