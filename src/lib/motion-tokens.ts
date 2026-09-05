import type { Transition, Variants } from "motion/react";

export const easeEditorial: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const easeSmooth: [number, number, number, number] = [0.4, 0, 0.2, 1];

export const durations = {
  reveal: 0.7,
  headline: 0.9,
  image: 1.0,
  card: 0.65,
  hero: 1.4,
  cta: 0.8,
  hover: 0.28,
} as const;

export const staggers = {
  hero: 0.1,
  text: 0.1,
  cards: 0.08,
  process: 0.12,
  team: 0.12,
  cta: 0.1,
} as const;

export const viewportOnce = { once: true, amount: 0.2 } as const;

export const transition = (
  duration: number,
  delay = 0,
  ease: [number, number, number, number] = easeEditorial,
): Transition => ({ duration, delay, ease });

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
