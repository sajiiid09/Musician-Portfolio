import React from 'react';
import Link from 'next/link';
import { GALLERY_PHOTOS } from '@/lib/assets';

export default function NewsletterUpdates() {
  return (
    <>
      {/* Newsletter Section */}
      <section className="w-full py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <h2 className="text-4xl md:text-6xl font-display font-semibold uppercase tracking-tighter leading-none">
              Join The <br /> Journey
            </h2>

            <div className="w-full">
              <form className="w-full max-w-md">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="YOUR EMAIL"
                    className="w-full bg-transparent border-b border-white text-white py-4 text-sm font-semibold uppercase tracking-wider placeholder-white/50 focus:outline-none focus:border-b-4 focus:border-white transition-all duration-200"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-sm font-semibold uppercase tracking-widest hover:text-white/70 transition-colors"
                  >
                    Submit
                  </button>
                </div>
                <p className="mt-4 text-xs text-white/40">
                  Get notified about album releases, shows, and exclusive content. Unsubscribe anytime.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid Section */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <div className="text-sm font-semibold uppercase tracking-widest text-white/50 mb-2">News</div>
              <h2 className="text-4xl md:text-6xl font-display font-semibold uppercase tracking-tighter leading-none">
                Latest <br /> Updates
              </h2>
            </div>
            <Link
              href="/news"
              className="mt-8 md:mt-0 px-6 py-2 border border-white text-sm font-semibold uppercase tracking-wider hover:bg-[#B48D5C] hover:text-black transition-all duration-300"
            >
              More News
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* News Item 1 - Single Release */}
            <Link href="/music" className="group cursor-pointer">
              <div className="aspect-[4/3] bg-neutral-800 mb-6 overflow-hidden relative">
                <img src="/Dear Melancholia track artworks /4. Sinner.jpg" alt="Sinner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                <span>Single</span>
                <span>1.23.2026</span>
              </div>
              <h3 className="text-xl font-display font-semibold uppercase tracking-wide group-hover:text-white/70 transition-colors">
                "Sinner" - New Single Available Now
              </h3>
            </Link>

            {/* News Item 2 - Album Announcement */}
            <Link href="/music" className="group cursor-pointer">
              <div className="aspect-[4/3] bg-neutral-800 mb-6 overflow-hidden relative">
                <img src="/Dear Melancholia (Album Cover)/Cremain - Dear Melancholia Cover Artwork 2025 - Updated version 8.png" alt="Dear Melancholia" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                <span>Album</span>
                <span>Coming Soon</span>
              </div>
              <h3 className="text-xl font-display font-semibold uppercase tracking-wide group-hover:text-white/70 transition-colors">
                Dear Melancholia - Debut Album
              </h3>
            </Link>

            {/* News Item 3 - Live Shows */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] bg-neutral-800 mb-6 overflow-hidden relative">
                <img src={GALLERY_PHOTOS[0]} alt="Live" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                <span>Live</span>
                <span>TBA 2026</span>
              </div>
              <h3 className="text-xl font-display font-semibold uppercase tracking-wide group-hover:text-white/70 transition-colors">
                Album Launch Shows Announced
              </h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
 }
