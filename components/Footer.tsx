"use client";
import React from "react";
import Link from "next/link";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaSpotify,
  FaArrowRight,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative w-full bg-black pt-20 pb-0 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col gap-20 md:gap-32">
        {/* --- Top Footer Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Column 1: Navigation (Span 3) */}
          <div className="md:col-span-3 flex flex-col space-y-8">
            <h4 className="text-xs font-heading font-medium uppercase tracking-[0.3em] text-white/30">
              Menu
            </h4>
            <div className="flex flex-col space-y-3">
              {["Home", "About", "Music", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="w-fit text-sm font-body font-light uppercase tracking-widest text-white/60 hover:text-white transition-all duration-300 hover:tracking-[0.2em]"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Updates (Span 3) */}
          <div className="md:col-span-3 flex flex-col space-y-8">
            <h4 className="text-xs font-heading font-medium uppercase tracking-[0.3em] text-white/30">
              Explore
            </h4>
            <div className="flex flex-col space-y-3">
              {["Events", "News", "Store", "EPK"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace("epk", "about#epk")}`}
                  className="w-fit text-sm font-body font-light uppercase tracking-widest text-white/60 hover:text-white transition-all duration-300 hover:tracking-[0.2em]"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Newsletter (Span 6) */}
          <div className="md:col-span-6 flex flex-col space-y-8 md:pl-20">
            <h4 className="text-xs font-heading font-medium uppercase tracking-[0.3em] text-white/30">
              Stay Connected
            </h4>
            <form className="w-full max-w-md group">
              <div className="relative flex items-center pb-4 transition-colors duration-500">
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  className="w-full bg-transparent text-white text-sm font-body font-light uppercase tracking-widest placeholder-white/20 focus:outline-none border-b border-white/10 focus:border-white transition-colors duration-300 pb-2"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 bottom-4 text-white/40 hover:text-white transition-colors duration-300"
                >
                  <FaArrowRight className="w-4 h-4 transform -rotate-45 group-focus-within:rotate-0 transition-transform duration-500" />
                </button>
              </div>
              <p className="mt-4 text-[10px] font-body text-white/20 uppercase tracking-wider leading-relaxed">
                Join our newsletter for the latest updates. Unsubscribe anytime.
              </p>
            </form>

            {/* Social Icons */}
            <div className="flex gap-6 mt-8">
              {[
                { icon: FaInstagram, href: "https://instagram.com" },
                { icon: FaFacebook, href: "https://facebook.com" },
                { icon: FaYoutube, href: "https://youtube.com" },
                { icon: FaSpotify, href: "https://spotify.com" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-[#BE8118] transition-colors duration-300 transform hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* --- Bottom Footer Section --- */}
        <div className="w-full flex flex-col gap-12">
          {/* Metadata Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end px-2">
            <div className="flex flex-col gap-2 mb-8 md:mb-0">
              <span className="text-[10px] font-body text-white/30 uppercase tracking-[0.2em]">
                Dhaka, Bangladesh
              </span>
            </div>

            <div className="flex gap-8">
              <span className="text-[10px] font-body text-white/30 uppercase tracking-[0.2em]">
                © 2026 Cremain. All rights reserved.
              </span>
            </div>
          </div>

          {/* Massive Animated Text - Resized to fit screen */}
          <div className="block relative w-full overflow-hidden group select-none">
            <div className="relative">
              <div
                className="relative whitespace-nowrap leading-[0.8] tracking-tighter font-body font-bold text-white/90 transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-[100%] text-center"
                style={{ fontSize: "16vw" }}
              >
                {/* Default State */}
                <div className="block origin-bottom transition-opacity duration-500 group-hover:opacity-20">
                  CREMAIN
                </div>

                {/* Hover Reveal State - Color Updated to Darker Shade */}
                {/* Adjusted 'top' to allow a peek from the bottom */}
                <div className="absolute top-[85%] left-0 w-full flex items-center justify-center transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-full">
                  <span className="text-[#9C6B13] tracking-tighter opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                    REMAINS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
