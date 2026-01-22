'use client';

import React from 'react';
import Footer from '@/components/Footer';
import { CONTACT_INFO, SITE_CONFIG } from '@/lib/assets';

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-black text-white flex flex-col">
      
      {/* --- BACKGROUND IMAGE LAYER --- */}
      <div className="fixed inset-0 z-0">
        <img
          src="/Photos/IMG_1920.jpg"
          alt="Cremain Band"
          className="w-full h-full object-cover opacity-60"
        />
        {/* Gradient Overlay to darken the bottom/top for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 flex-grow flex items-center justify-center py-32 px-4 md:px-6">
        
        {/* Contact Card Container */}
        <div className="w-full max-w-6xl bg-black/50 backdrop-blur-sm border border-white/10 p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 rounded-sm shadow-2xl">
          
          {/* --- LEFT COLUMN: Info --- */}
          <div className="flex flex-col justify-between h-full">
            
            {/* Header */}
            <div className="mb-12">
              <span className="block text-xs font-medium uppercase tracking-[0.2em] text-white/60 mb-2">
                Reach Out
              </span>
              <h1 className="text-6xl md:text-7xl font-display font-medium uppercase tracking-tighter leading-none">
                Contact
              </h1>
            </div>

            {/* Social Icons */}
            <div className="flex gap-6 mb-12">
              <a href={SITE_CONFIG.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-6 h-6 hover:text-white/70 transition-colors text-white">
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href={SITE_CONFIG.socials.twitter} target="_blank" rel="noopener noreferrer" className="w-6 h-6 hover:text-white/70 transition-colors text-white">
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href={SITE_CONFIG.socials.youtube} target="_blank" rel="noopener noreferrer" className="w-6 h-6 hover:text-white/70 transition-colors text-white">
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
            </div>

            {/* Email Links */}
            <div className="flex flex-col space-y-8">
              <div>
                <span className="block text-xs font-medium uppercase tracking-widest text-white/40 mb-2">
                  Contact
                </span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-lg md:text-xl font-medium hover:text-white/70 transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div>
                <span className="block text-xs font-medium uppercase tracking-widest text-white/40 mb-2">
                  Booking
                </span>
                <a href={`mailto:${CONTACT_INFO.managementEmail}`} className="text-lg md:text-xl font-medium hover:text-white/70 transition-colors">
                  {CONTACT_INFO.managementEmail}
                </a>
              </div>
              <div>
                <span className="block text-xs font-medium uppercase tracking-widest text-white/40 mb-2">
                  Press
                </span>
                <a href={`mailto:${CONTACT_INFO.pressEmail}`} className="text-lg md:text-xl font-medium hover:text-white/70 transition-colors">
                  {CONTACT_INFO.pressEmail}
                </a>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Form --- */}
          <div className="flex flex-col">
            <h2 className="text-3xl font-medium mb-8">Say Hello</h2>
            <form className="flex flex-col space-y-6">
              
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-transparent border border-white/20 p-4 text-sm font-medium text-white placeholder-white/40 outline-none focus:border-white focus:bg-white/5 transition-all rounded-sm"
                required
              />
              
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-transparent border border-white/20 p-4 text-sm font-medium text-white placeholder-white/40 outline-none focus:border-white focus:bg-white/5 transition-all rounded-sm"
                required
              />
              
              <textarea
                placeholder="Your message"
                rows={6}
                className="w-full bg-transparent border border-white/20 p-4 text-sm font-medium text-white placeholder-white/40 outline-none focus:border-white focus:bg-white/5 transition-all resize-none rounded-sm"
                required
              />

              {/* Submit Button */}
              <button 
                type="submit"
                className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white hover:text-white/70 transition-colors w-fit mt-2"
              >
                <span className="text-lg">↳</span> Submit
              </button>

            </form>
          </div>

        </div>
      </div>

      {/* --- FOOTER --- */}
      <div className="relative z-10 bg-black">
        <Footer />
      </div>

    </main>
  );
}