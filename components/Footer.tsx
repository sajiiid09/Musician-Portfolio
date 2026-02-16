import React from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/assets";

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10 pt-20 pb-12 mb-4">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
          {/* Column 1: Sitemap */}
          <div className="flex flex-col space-y-5">
            <h4 className="text-lg font-heading font-normal uppercase tracking-[0.2em] text-white/40 mb-2">
              Sitemap
            </h4>
            <Link
              href="/"
              className="text-base font-body font-normal uppercase tracking-wider hover:text-white/50 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-base font-body font-normal uppercase tracking-wider hover:text-white/50 transition-colors"
            >
              About
            </Link>
            <Link
              href="/music"
              className="text-base font-body font-normal uppercase tracking-wider hover:text-white/50 transition-colors"
            >
              Music
            </Link>
            <Link
              href="/contact"
              className="text-base font-body font-normal uppercase tracking-wider hover:text-white/50 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Column 2: Updates */}
          <div className="flex flex-col space-y-5">
            <h4 className="text-lg font-heading font-normal uppercase tracking-[0.2em] text-white/40 mb-2">
              Updates
            </h4>
            <Link
              href="/events"
              className="text-base font-body font-normal uppercase tracking-wider hover:text-white/50 transition-colors"
            >
              Events
            </Link>
            <Link
              href="/news"
              className="text-base font-body font-normal uppercase tracking-wider hover:text-white/50 transition-colors"
            >
              News
            </Link>
            <Link
              href="/store"
              className="text-base font-body font-normal uppercase tracking-wider hover:text-white/50 transition-colors"
            >
              Store
            </Link>
          </div>

          {/* Column 3: Utilities */}
          <div className="flex flex-col space-y-5">
            <h4 className="text-lg font-heading font-normal uppercase tracking-[0.2em] text-white/40 mb-2">
              Utilities
            </h4>
            <Link
              href="/about#epk"
              className="text-base font-body font-normal uppercase tracking-wider hover:text-white/50 transition-colors"
            >
              EPK
            </Link>
            <Link
              href="/instructions"
              className="text-base font-body font-normal uppercase tracking-wider hover:text-white/50 transition-colors"
            >
              Instructions
            </Link>
            <Link
              href="/styleguide"
              className="text-base font-body font-normal uppercase tracking-wider hover:text-white/50 transition-colors"
            >
              Styleguide
            </Link>
            <Link
              href="/licensing"
              className="text-base font-body font-normal uppercase tracking-wider hover:text-white/50 transition-colors"
            >
              Licensing
            </Link>
            <Link
              href="/changelog"
              className="text-base font-body font-normal uppercase tracking-wider hover:text-white/50 transition-colors"
            >
              Change Log
            </Link>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col space-y-6">
            <h4 className="text-lg font-heading font-normal uppercase tracking-[0.2em] text-white/40 mb-2">
              Newsletter
            </h4>
            <form className="w-full">
              <div className="relative border-b border-white/30 pb-2">
                <input
                  type="email"
                  placeholder="YOUR EMAIL"
                  className="w-full bg-transparent text-white text-base font-body font-normal uppercase tracking-widest placeholder-white/30 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-base font-body font-normal uppercase tracking-[0.15em] hover:text-white/60 transition-colors"
                >
                  Submit
                </button>
              </div>
              <p className="mt-4 text-base font-body font-normal text-white/30 leading-relaxed">
                Join our newsletter for the latest updates. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-12">
          <div className="flex flex-col space-y-6 mb-12 md:mb-0">
            {/* Social Icons Placeholder */}
            <div className="flex space-x-6">
              <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:border-white transition-all duration-300 group cursor-pointer">
                <div className="w-2 h-2 bg-white group-hover:bg-black rounded-full" />
              </div>
              <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:border-white transition-all duration-300 group cursor-pointer">
                <div className="w-2 h-2 bg-white group-hover:bg-black rounded-full" />
              </div>
              <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:border-white transition-all duration-300 group cursor-pointer">
                <div className="w-2 h-2 bg-white group-hover:bg-black rounded-full" />
              </div>
            </div>

            <div className="flex flex-col space-y-1 text-base font-body font-normal text-white/40 uppercase tracking-[0.15em]">
              <span>©2026 Cremain. All rights reserved.</span>
            </div>
          </div>

          {/* Large Brand Name */}
          <div className="text-6xl md:text-8xl lg:text-9xl font-heading font-semibold uppercase tracking-tighter leading-none select-none text-white/90">
            Cremain
          </div>
        </div>
      </div>
    </footer>
  );
}
