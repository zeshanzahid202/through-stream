import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { pageTransition } from "./motion";

export const PageTransition = ({ pageKey, children, className }: { pageKey: string; children: React.ReactNode; className?: string }) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pageKey} className={className} initial={pageTransition.initial} animate={pageTransition.animate} exit={pageTransition.exit}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
