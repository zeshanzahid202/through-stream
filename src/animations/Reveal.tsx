import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "./motion";

export const Reveal = ({ children, className, delay = 0 }) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} transition={{ delay }}>
      {children}
    </motion.div>
  );
};

export const Stagger = ({ children, className }) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } } }}>
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className }) => (
  <motion.div className={className} variants={fadeUp}>{children}</motion.div>
);
