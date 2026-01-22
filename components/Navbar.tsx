'use client';

import React, { useContext, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { NavbarColorContext, NavbarContext } from '@/app/context/NavContext';
import { motion } from 'framer-motion';

// Define types for your Context if not already defined in NavContext
type NavbarContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
type NavbarColorContextType = [string, React.Dispatch<React.SetStateAction<string>>];

const Navbar = () => {
    const pathname = usePathname();
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

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/music', label: 'Music' },
        { href: '/contact', label: 'Contact' },
        { href: '/events', label: 'Events' },
        { href: '/store', label: 'Store' },
    ];

    return (
        <div className='z-[100] fixed top-0 w-full flex items-center justify-between px-6 py-4 lg:px-10 lg:py-6 mix-blend-difference text-white'>
            <div className='flex items-center gap-10 lg:gap-20 w-full justify-between'>
                {/* Logo Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    <a href="/" className='cursor-pointer font-space hover:opacity-70 transition-opacity'>
                       <h1 className='text-3xl lg:text-4xl font-medium tracking-tighter'>CREMAIN</h1>
                    </a>
                </motion.div>

                {/* Nav Links Section - Hidden on Mobile */}
                <nav className='hidden lg:flex items-center gap-10 text-[0.9rem] font-space font-medium tracking-[0.2em] uppercase'>
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={`relative hover:opacity-70 transition-opacity ${pathname === link.href ? 'text-white' : 'text-white/60'}`}
                        >
                            {link.label}
                            {pathname === link.href && (
                                <motion.div
                                    layoutId="active-indicator"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#B48D5C]"
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                />
                            )}
                        </a>
                    ))}
                </nav>

                {/* Icons Section */}
                <div className='flex items-center gap-5 lg:gap-8'>
                    <a
                        href="https://instagram.com/cremainband"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='cursor-pointer hover:scale-110 transition-transform hover:text-[#D7AF7E]'
                        aria-label="Instagram"
                    >
                        <svg className='w-4 h-4' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1-1.63 9.163l3.409 3.409a1 1 0 0 1-1.63 9.163 9.163h-1.432A6 6 0 0 1-3.858 4.925V17a6 6 0 0 1-3.858 4.925h-1.432A6 6 0 0 1 3.858 4.925H4.362z"></path>
                        </svg>
                    </a>
                    <div onClick={() => setNavOpen(true)} className='cursor-pointer hover:scale-110 transition-transform'>
                        <svg className='w-4 h-4' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2V6l-3-4Z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 11.37A4 4 0 0 1 1.63 9.163l3.409 3.409a1 1 0 0 1-1.63 9.163 9.163h-1.432A6 6 0 0 1-3.858 4.925V17a6 6 0 0 1 3.858 4.925h-1.432A6 6 0 0 1 3.858 4.925H4.362z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;