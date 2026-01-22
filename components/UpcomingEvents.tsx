'use client';

import React, { useRef } from 'react';
import { motion, useInView, easeInOut } from 'framer-motion';

type Event = {
  id: number;
  date: string;
  venue: string;
  address: string;
  ticketLink: string;
};

const events: Event[] = [
  {
    id: 1,
    date: 'FEB 10, 2026',
    venue: 'Brooklyn Steel',
    address: '319 Frost St, Brooklyn, NY',
    ticketLink: '#',
  },
  {
    id: 2,
    date: 'APR 07, 2026',
    venue: 'Astra Kulturhaus',
    address: 'Revaler Str. 99, Berlin',
    ticketLink: '#',
  },
  {
    id: 3,
    date: 'JUN 18, 2026',
    venue: 'Los Globos',
    address: '3040 W Sunset Blvd, Los Angeles',
    ticketLink: '#',
  },
  {
    id: 4,
    date: 'AUG 13, 2026',
    venue: 'The Independent',
    address: '628 Divisadero St, San Francisco',
    ticketLink: '#',
  },
  {
    id: 5,
    date: 'SEP 03, 2026',
    venue: 'Razzberry Rhinoceros',
    address: 'Juhu Hotel, Mumbai',
    ticketLink: '#',
  },
  {
    id: 6,
    date: 'SEP 09, 2026',
    venue: 'Nippon Budokan',
    address: '2-3 Kitanomarukoen, Tokyo',
    ticketLink: '#',
  },
];

// Animation Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // Staggers the entry of each row
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeInOut, // Smooth easing function
    },
  },
};

export default function UpcomingEvents() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section ref={ref} className="w-full bg-black text-white py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-display font-semibold uppercase mb-16 tracking-tighter"
        >
          Upcoming Events
        </motion.h2>
        
        <motion.div 
          className="flex flex-col w-full border-t border-white/10"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header Row (Desktop Only) */}
          <div className="hidden md:grid grid-cols-[1.5fr_2fr_3fr_auto] gap-6 px-6 py-4 text-xs font-semibold uppercase tracking-widest text-white/40 border-b border-white/10 select-none">
            <div>Date</div>
            <div>Venue</div>
            <div>Location</div>
            <div className="text-right min-w-[120px]">RSVP</div>
          </div>

          {/* Event Rows */}
          {events.map((event) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              className="group relative grid grid-cols-1 md:grid-cols-[1.5fr_2fr_3fr_auto] gap-4 md:gap-6 px-6 py-8 border-b border-white/10 transition-all duration-300 hover:bg-white/5 hover:border-white/20 items-center"
            >
              {/* Date */}
              <div className="font-display text-lg md:text-xl font-medium tracking-wide text-white group-hover:text-white transition-colors">
                {event.date}
              </div>

              {/* Venue */}
              <div className="text-xl md:text-2xl font-semibold uppercase tracking-tight text-white/90 group-hover:text-white transition-colors">
                {event.venue}
              </div>

              {/* Address */}
              <div className="text-sm md:text-base text-white/50 font-medium group-hover:text-white/70 transition-colors">
                {event.address}
              </div>

              {/* Action Button */}
              <div className="mt-6 md:mt-0 flex md:justify-end">
                <a
                  href={event.ticketLink}
                  className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-semibold text-white transition-all duration-300 border border-white/30 rounded-full group-hover:bg-white group-hover:text-black group-hover:border-transparent w-full md:w-[120px] text-xs uppercase tracking-widest"
                >
                  <span className="relative z-10">Tickets</span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* 'More Events' Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 flex justify-start"
        >
           <button className="px-8 py-3 border border-white/20 text-white/60 text-xs font-semibold uppercase tracking-widest rounded-full hover:border-white hover:text-white transition-all duration-300">
             More Events
           </button>
        </motion.div>
      </div>
    </section>
  );
}