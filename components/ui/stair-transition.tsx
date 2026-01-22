"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePathname } from "next/navigation";

// Sophisticated palette based on #B48D5C
// We alternate slightly to create a "shimmer" or textured feel rather than a flat block
const COLORS = [
  "#B48D5C", // Base - Gold/Bronze
  "#C69E6D", // Lighter
  "#A37B4A", // Darker
  "#D7AF7E", // Lightest
  "#926939", // Darkest
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
  // Total columns. 5 is standard for a clean look.
  // On mobile, 5 still works fine, but you could reduce to 3 if desired.
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
            custom={columnCount - index - 1} // Reverse index for bottom-up or specific stagger direction
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
// ease: "easeInOut" is classic, but [0.76, 0, 0.24, 1] is a popular "premium" bezier.
const transitionConfig = {
  duration: 0.8,
  ease: [0.76, 0, 0.24, 1] as const, // Custom Bezier for snappy, premium feel
  delay: 0.05, // Stagger delay
};

const stairVariants: Variants = {
  initial: {
    height: "100%", // Start fully covering the screen
  },
  animate: {
    height: "0%", // Slide up/shrink to reveal content
    transition: transitionConfig,
  },
  exit: {
    height: ["0%", "100%"], // Optional: If used in a mode="wait" context
  },
};
