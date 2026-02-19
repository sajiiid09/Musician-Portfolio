"use client";

import React, { useContext, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NavbarColorContext, NavbarContext } from "@/app/context/NavContext";
import { motion, AnimatePresence } from "framer-motion";
import { LOGOS } from "@/lib/assets";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import Image from "next/image";

// Define types for your Context
type NavbarContextType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
];
type NavbarColorContextType = [
  string,
  React.Dispatch<React.SetStateAction<string>>,
];

const Navbar = () => {
  const pathname = usePathname();

  const navbarContext = useContext(NavbarContext);
  const navbarColorContext = useContext(NavbarColorContext);

  if (!navbarContext || !navbarColorContext) {
    throw new Error("Navbar must be used within a NavProvider");
  }

  const [navOpen, setNavOpen] = navbarContext;
  const [navColor, setNavColor] = navbarColorContext;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/music", label: "Music" },
    { href: "/contact", label: "Contact" },
    { href: "/events", label: "Events" },
    { href: "/store", label: "Store" },
  ];

  // Scroll Lock for Mobile Menu
  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [navOpen]);

  return (
    <>
      {/* --- MAIN HEADER --- */}
      <div className="z-[100] fixed top-0 w-full flex items-center justify-between px-6 py-4 lg:px-10 lg:py-6 mix-blend-difference text-white">
        <div className="flex items-center gap-10 lg:gap-20 w-full justify-between">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <a
              href="/"
              className="flex items-center gap-5 cursor-pointer hover:opacity-70 transition-opacity"
            >
              <Image
                src={LOGOS.symbolWhite}
                alt="Cremain Logo"
                width={80}
                height={80}
                className="h-16 lg:h-20 w-auto object-contain"
              />
              <h1 className="text-2xl lg:text-3xl font-heading font-medium tracking-tighter">
                {" "}
              </h1>
            </a>
          </motion.div>

          {/* Nav Links Section - DESKTOP ONLY */}
          <nav className="hidden lg:flex items-center gap-10 text-[0.9rem] font-body font-medium tracking-[0.2em] uppercase">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative hover:opacity-70 transition-opacity ${pathname === link.href ? "text-white" : "text-white/60"}`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#B48D5C]"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right Section: Icons + Mobile Trigger */}
          <div className="flex items-center gap-5 lg:gap-8">
            <a
              href="https://www.instagram.com/cremainremain/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:scale-110 transition-transform hover:text-[#D7AF7E]"
              aria-label="Instagram"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.facebook.com/cremainremain/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:scale-110 transition-transform hover:text-[#D7AF7E]"
              aria-label="Facebook"
            >
              <FaFacebook className="w-6 h-6" />
            </a>

            {/* --- MOBILE HAMBURGER (Hidden on lg) --- */}
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 z-50 focus:outline-none"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={navOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-6 h-[2px] bg-white block transition-transform"
              />
              <motion.span
                animate={navOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-[2px] bg-white block transition-opacity"
              />
              <motion.span
                animate={navOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-6 h-[2px] bg-white block transition-transform"
              />
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[90] bg-black text-white flex flex-col justify-center items-center lg:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setNavOpen(false)}
                    className={`text-4xl font-heading uppercase font-bold tracking-tighter hover:text-[#B48D5C] transition-colors ${
                      pathname === link.href ? "text-white" : "text-white/50"
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
