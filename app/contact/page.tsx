'use client';

import React from 'react';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-black text-white flex flex-col">
      
      {/* --- BACKGROUND IMAGE LAYER --- */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://cdn.prod.website-files.com/67d04807565b2b5da857ce4c/67f6300a273f8b242256ba75_evgeniy-smersh--rbR4vpN-LU-unsplash.avif"
          alt="Concert Background"
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
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-6 h-6 hover:text-white/70 transition-colors text-white">
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-6 h-6 hover:text-white/70 transition-colors text-white">
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://threads.net" target="_blank" rel="noopener noreferrer" className="w-6 h-6 hover:text-white/70 transition-colors text-white">
                <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12.146 17.869c-2.617-.035-5.321-1.396-5.321-4.781 0-3.785 3.064-5.312 5.515-5.312 2.593 0 4.653 1.254 4.653 3.993 0 2.766-2.072 3.829-4.225 3.829-1.166 0-2.316-.395-2.316-1.579 0-1.077 1.002-1.378 1.96-1.378.834 0 1.956.237 1.956 1.154 0 .193-.035.49-.408.49-.757 0-.757-.962-.757-1.154 0-1.921 1.34-2.527 2.375-2.527 1.63 0 2.625.962 2.625 2.839 0 3.425-2.593 5.584-6.05 5.584-3.729 0-6.736-2.281-6.736-6.818 0-4.639 3.258-7.95 7.689-7.95 4.544 0 7.37 3.327 7.37 7.734v1.272h1.885v-1.272c0-5.696-3.86-9.619-9.255-9.619-5.676 0-9.574 4.24-9.574 9.835 0 5.372 3.693 8.703 8.621 8.703 2.923 0 5.434-1.203 6.953-3.14l-1.428-1.278c-1.123 1.353-3.058 2.532-5.526 2.375z"/></svg>
              </a>
            </div>

            {/* Email Links */}
            <div className="flex flex-col space-y-8">
              <div>
                <span className="block text-xs font-medium uppercase tracking-widest text-white/40 mb-2">
                  Contact
                </span>
                <a href="mailto:contact@headz.music" className="text-lg md:text-xl font-medium hover:text-white/70 transition-colors">
                  contact@headz.music
                </a>
              </div>
              <div>
                <span className="block text-xs font-medium uppercase tracking-widest text-white/40 mb-2">
                  Booking
                </span>
                <a href="mailto:booking@headz.music" className="text-lg md:text-xl font-medium hover:text-white/70 transition-colors">
                  booking@headz.music
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