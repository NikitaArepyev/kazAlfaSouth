"use client";

import { motion, useReducedMotion } from "motion/react";
import { track } from "@/lib/analytics";
import { WhatsappLogo } from "@/components/ui/icons";
import { DURATIONS, EASE_OUT, translate3d, translateScale } from "@/lib/motion";

export default function FloatingWhatsApp({ whatsapp }: { whatsapp: string }) {
  const reduce = useReducedMotion();
  const href = `https://wa.me/${whatsapp}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { location: "floating" })}
      aria-label="Написать в WhatsApp"
      initial={reduce ? false : { opacity: 0, transform: translateScale(0, 20, 0.94) }}
      animate={{ opacity: 1, transform: translateScale(0, 0, 1) }}
      transition={{ duration: DURATIONS.medium, ease: EASE_OUT, delay: 0.4 }}
      whileHover={reduce ? undefined : { transform: translateScale(0, -3, 1.03) }}
      whileTap={reduce ? undefined : { transform: translateScale(0, 0, 0.97) }}
      className="floating-whatsapp fixed bottom-6 right-6 z-toast flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-brand-contrast shadow-lg transition-colors duration-200 hover:bg-brand-700"
    >
      {!reduce && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-brand-500"
          animate={{ transform: [translateScale(0, 0, 1), translateScale(0, 0, 1.16), translateScale(0, 0, 1.34)], opacity: [0, 0.16, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: EASE_OUT, times: [0, 0.35, 1], repeatDelay: 1.1 }}
        />
      )}
      <motion.span
        className="relative flex items-center justify-center"
        animate={reduce ? undefined : { transform: [translate3d(0, 0), translate3d(0, -1), translate3d(0, 0)] }}
        transition={reduce ? undefined : { duration: 2.6, repeat: Infinity, ease: EASE_OUT, times: [0, 0.4, 1], repeatDelay: 1.4 }}
      >
        <WhatsappLogo className="h-7 w-7" weight="fill" />
      </motion.span>
    </motion.a>
  );
}
