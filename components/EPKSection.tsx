'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { EPK_ASSETS, SITE_CONFIG } from '@/lib/assets';

export default function EPKSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="w-full bg-neutral-900/30 text-white py-24 px-6 md:px-12" id="epk">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="block text-xs font-medium uppercase tracking-[0.2em] text-white/60 mb-4">
            For Promoters, Venues, and Media
          </span>
          <h2 className="text-4xl md:text-6xl font-semibold uppercase tracking-tighter leading-none">
            Electronic<br />Press Kit
          </h2>
        </motion.div>

        {/* EPK Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl mx-auto text-center text-neutral-400 text-lg font-light leading-relaxed mb-16"
        >
          <p>
            Everything you need, in one place. Download high-resolution press photos, the official EPK,
            stage plot, and tech rider. For booking inquiries, please contact{' '}
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-white/80 hover:text-white underline underline-offset-2 transition-colors">
              {SITE_CONFIG.email}
            </a>.
          </p>
        </motion.div>

        {/* EPK Downloads Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {Object.entries(EPK_ASSETS).map(([key, asset], index) => (
            <a
              key={key}
              href={asset.url}
              download
              className="group relative p-8 border border-white/20 rounded-lg hover:bg-white/5 transition-all duration-300"
            >
              {/* File Icon */}
              <div className="w-12 h-12 mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white/60 group-hover:text-white transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 13h6m-3-3h6m-9-6h12m3 3h-6M19 19v-9M5 19v-9M12 15V4"
                  />
                </svg>
              </div>

              {/* File Name */}
              <h4 className="text-lg font-semibold uppercase tracking-wide text-white/90 mb-2 group-hover:text-white transition-colors">
                {asset.name}
              </h4>

              {/* File Size */}
              <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                {asset.size}
              </span>

              {/* Download Indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
            </a>
          ))}
        </motion.div>

        {/* Additional Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-3xl mx-auto mt-12 text-center"
        >
          <p className="text-neutral-500 text-sm font-medium uppercase tracking-wide mb-4">
            Looking for something specific?
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 border border-white/30 text-white font-semibold uppercase tracking-wider rounded-full hover:bg-white hover:text-black transition-all duration-300 text-xs"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
