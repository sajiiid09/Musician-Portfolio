"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { UPCOMING_EVENTS } from "@/lib/assets";

type Event = {
  id: number;
  date: string;
  venue: string;
  address: string;
  ticketLink: string;
};

const events: Event[] = [...UPCOMING_EVENTS];

// Animation Variants
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function UpcomingEvents() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      className="w-full bg-gradient-to-b from-black via-neutral-950/50 to-black text-white py-24 lg:py-32 px-6 md:px-12 overflow-hidden relative"
    >
      {/* Background accent */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
          className="mb-16 lg:mb-20"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium mb-4 block">
            Live Performances
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold uppercase tracking-tighter">
            Upcoming
            <br />
            <span className="text-white/50">Events</span>
          </h2>
        </motion.div>

        <motion.div
          className="flex flex-col w-full"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header Row (Desktop Only) */}
          <div className="hidden md:grid grid-cols-[1.5fr_2fr_3fr_auto] gap-6 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 border-b border-white/10 select-none">
            <div>Date</div>
            <div>Venue</div>
            <div>Location</div>
            <div className="text-right min-w-[140px]">Tickets</div>
          </div>

          {/* Event Rows */}
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              custom={index}
              className="group relative grid grid-cols-1 md:grid-cols-[1.5fr_2fr_3fr_auto] gap-4 md:gap-6 px-6 py-8 lg:py-10 border-b border-white/10 transition-all duration-500 hover:bg-white/[0.02] hover:border-white/20 items-center"
            >
              {/* Date */}
              <div className="flex flex-col gap-1">
                <span className="md:hidden text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">
                  Date
                </span>
                <div className="font-heading text-xl md:text-2xl font-medium tracking-wide text-white group-hover:text-white transition-colors">
                  {event.date}
                </div>
              </div>

              {/* Venue */}
              <div className="flex flex-col gap-1">
                <span className="md:hidden text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">
                  Venue
                </span>
                <div className="text-lg md:text-xl lg:text-2xl font-semibold uppercase tracking-tight text-white/90 group-hover:text-white transition-colors">
                  {event.venue}
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1">
                <span className="md:hidden text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">
                  Location
                </span>
                <div className="text-sm md:text-base text-white/40 font-light group-hover:text-white/60 transition-colors">
                  {event.address}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 md:mt-0 flex md:justify-end">
                <a
                  href={event.ticketLink}
                  className="relative inline-flex items-center justify-center gap-2 px-6 py-3 overflow-hidden font-medium text-white transition-all duration-300 bg-white/5 border border-white/20 rounded-full group-hover:bg-white group-hover:text-black group-hover:border-white w-full md:w-auto text-xs uppercase tracking-[0.15em]"
                >
                  <span>Get Tickets</span>
                  <svg
                    className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>

              {/* Hover line accent */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/0 group-hover:bg-white/20 transition-colors duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* 'More Events' Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 lg:mt-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <p className="text-neutral-500 text-sm font-light">
            More shows coming soon. Stay tuned for updates.
          </p>
          <button className="group inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/15 text-white/70 text-xs font-medium uppercase tracking-[0.15em] rounded-full hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-300">
            View All Events
            <svg
              className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
