"use client";

import { motion, useReducedMotion } from "motion/react";
import { track } from "@/lib/analytics";
import { WhatsappLogo } from "@/components/ui/icons";

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
      initial={reduce ? false : { opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.4 }}
      whileHover={reduce ? undefined : { y: -3, scale: 1.04 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      className="floating-whatsapp fixed bottom-6 right-6 z-toast flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-brand-contrast shadow-lg transition-colors duration-200 hover:bg-brand-700"
    >
      {!reduce && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-brand-500"
          animate={{ scale: [1, 1.18, 1.42], opacity: [0, 0.18, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", times: [0, 0.32, 1] }}
        />
      )}
      <motion.span
        className="relative flex items-center justify-center"
        animate={reduce ? undefined : { rotate: [0, -4, 0, 4, 0] }}
        transition={reduce ? undefined : { duration: 5.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.12, 0.4, 0.68, 1] }}
      >
        <WhatsappLogo className="h-7 w-7" weight="fill" />
      </motion.span>
    </motion.a>
  );
}
