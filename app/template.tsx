"use client";

import { motion } from "framer-motion";
import StairTransition from "@/components/ui/stair-transition";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StairTransition />

      {/* We also fade in the actual page content slightly
        so it doesn't just "pop" into existence behind the stairs.
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        {children}
      </motion.div>
    </>
  );
}
