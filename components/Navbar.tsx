'use client';

import React, { useContext, useRef } from 'react';
import { NavbarColorContext, NavbarContext } from '@/app/context/NavContext';
import Link from 'next/link'; // Using Next.js Link instead of react-router-dom

// Define types for your Context if not already defined in NavContext
// Adjust these based on your actual context implementation
type NavbarContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
type NavbarColorContextType = [string, React.Dispatch<React.SetStateAction<string>>];

const Navbar = () => {
    const navGreenRef = useRef<HTMLDivElement>(null);
    
    // Consuming contexts with type assertion if necessary, 
    // ideally your Context Provider should already be typed.
    const navbarContext = useContext(NavbarContext);
    const navbarColorContext = useContext(NavbarColorContext);

    if (!navbarContext || !navbarColorContext) {
        throw new Error("Navbar must be used within a NavProvider");
    }

    const [navOpen, setNavOpen] = navbarContext;
    const [navColor, setNavColor] = navbarColorContext;

    return (
        <div className='z-[100] fixed top-0 w-full flex items-center justify-between px-6 py-4 lg:px-10 lg:py-6 mix-blend-difference text-white'>
            <div className='flex items-center gap-10 lg:gap-20 w-full justify-between'>
                {/* Logo Section */}
                <Link href="/" className='cursor-pointer font-space'>
                   <h1 className='text-3xl lg:text-4xl font-medium tracking-tighter'>ISLAM MANIK</h1>
                </Link>

                {/* Nav Links Section - Hidden on Mobile */}
                <div className='hidden lg:flex items-center gap-10 text-[0.9rem] font-space font-medium tracking-[0.2em] uppercase'>
                    <Link href="/" className='hover:opacity-70 transition-opacity'>Home</Link>
                    <Link href="/about" className='hover:opacity-70 transition-opacity'>About</Link>
                    <Link href="/music" className='hover:opacity-70 transition-opacity'>Music</Link>
                    <Link href="/contact" className='hover:opacity-70 transition-opacity'>Contact</Link>
                    <Link href="/events" className='hover:opacity-70 transition-opacity'>Events</Link>
                    <Link href="/store" className='hover:opacity-70 transition-opacity'>Store</Link>
                </div>

                {/* Icons Section */}
                <div className='flex items-center gap-5 lg:gap-8'>
                    <div className='cursor-pointer hover:scale-110 transition-transform'>
                        <svg className='w-4 h-4' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <div onClick={() => setNavOpen(true)} className='cursor-pointer hover:scale-110 transition-transform relative'>
                        <svg className='w-4 h-4' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;