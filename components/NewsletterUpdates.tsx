import React from 'react';
import Link from 'next/link';

export default function NewsletterUpdates() {
  return (
    <>
      {/* Newsletter Section */}
      <section className="w-full py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <h2 className="text-4xl md:text-6xl font-display font-semibold uppercase tracking-tighter leading-none">
              Never miss <br /> what's next
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
                  By submitting your email, you’ll be the first to know about upcoming updates. You can unsubscribe at any time.
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
                Explore <br /> Our Updates
              </h2>
            </div>
            <Link 
              href="/news" 
              className="mt-8 md:mt-0 px-6 py-2 border border-white text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
            >
              More News
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* News Item 1 */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] bg-neutral-800 mb-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-neutral-700 animate-pulse group-hover:scale-105 transition-transform duration-700"></div>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                <span>Update</span>
                <span>4.10.2025</span>
              </div>
              <h3 className="text-xl font-display font-semibold uppercase tracking-wide group-hover:text-white/70 transition-colors">
                Headz Values Fan Feedback
              </h3>
            </div>

            {/* News Item 2 */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] bg-neutral-800 mb-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-neutral-700 animate-pulse group-hover:scale-105 transition-transform duration-700"></div>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                <span>Music</span>
                <span>4.7.2025</span>
              </div>
              <h3 className="text-xl font-display font-semibold uppercase tracking-wide group-hover:text-white/70 transition-colors">
                The Legacy of Headz in Metal Music
              </h3>
            </div>

            {/* News Item 3 */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] bg-neutral-800 mb-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-neutral-700 animate-pulse group-hover:scale-105 transition-transform duration-700"></div>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                <span>Live</span>
                <span>4.10.2025</span>
              </div>
              <h3 className="text-xl font-display font-semibold uppercase tracking-wide group-hover:text-white/70 transition-colors">
                What to Expect on the Headz Tour
              </h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
