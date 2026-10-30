export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
};
export const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: EASE_OUT } },
};
