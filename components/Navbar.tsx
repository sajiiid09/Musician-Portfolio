'use client';

import React, { useContext, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { NavbarColorContext, NavbarContext } from '@/app/context/NavContext';
import { motion } from 'framer-motion';
import { LOGOS } from '@/lib/assets';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

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
                    <a href="/" className='flex items-center gap-5 cursor-pointer font-space hover:opacity-70 transition-opacity'>
                        <img
                            src={LOGOS.symbolWhite}
                            alt="Cremain Logo"
                            className="h-16 lg:h-20 w-auto object-contain"
                        />
                        <h1 className='text-2xl lg:text-3xl font-medium tracking-tighter'> </h1>
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
                        href="https://www.instagram.com/cremainremain/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='cursor-pointer hover:scale-110 transition-transform hover:text-[#D7AF7E]'
                        aria-label="Instagram"
                    >
                        <FaInstagram className="w-6 h-6" />
                    </a>
                    <a
                        href="https://www.facebook.com/cremain"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='cursor-pointer hover:scale-110 transition-transform hover:text-[#D7AF7E]'
                        aria-label="Facebook"
                    >
                        <FaFacebook className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;