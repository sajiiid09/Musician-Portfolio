"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePathname } from "next/navigation";

// Sophisticated palette based on #B48D5C
// We alternate slightly to create a "shimmer" or textured feel rather than a flat block
const COLORS = [
  "#7d6f5cff", // Base - Gold/Bronze
  "#7d6f5cff",
  "#7d6f5cff",
  "#7d6f5cff",
  "#7d6f5cff",
];

export default function StairTransition() {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      {/* Key is vital: it triggers the animation on route change.
        We wrap the "Stairs" in a fragment or container.
      */}
      <div key={pathname} className="fixed inset-0 z-[9999] pointer-events-none flex">
        <Stairs />
      </div>
    </AnimatePresence>
  );
}

const Stairs = () => {
  const columnCount = 5;

  return (
    <>
      {[...Array(columnCount)].map((_, index) => {
        return (
          <motion.div
            key={index}
            variants={stairVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={index} // Pass index directly for visual Left->Right order
            className="relative h-full w-full"
            style={{
              backgroundColor: COLORS[index % COLORS.length]
            }}
          />
        );
      })}
    </>
  );
};

// --- Animation Settings ---

// The transition config controls the "feel".
const transitionConfig = {
  duration: 0.6,
  ease: [0.76, 0, 0.24, 1] as const, // Custom Bezier for snappy, premium feel
};

const stairVariants: Variants = {
  initial: {
    height: "100%", // Start fully covering the screen
  },
  animate: (i: number) => ({
    height: "0%", // Slide up/shrink to reveal content
    transition: {
      ...transitionConfig,
      delay: 0.1 * i, // Stagger: Left col moves first, then next...
    },
  }),
  exit: (i: number) => ({
    height: "100%",
    transition: {
      ...transitionConfig,
      delay: 0.05 * i, // Also stagger the exit slightly for specific feel
    },
  }),
};
