"use client";

import { track } from "@/lib/analytics";
import { WhatsappLogo } from "@/components/ui/icons";

/** Entrance and the two attention pulses are CSS keyframes (.rise-in, .pulse-ring in globals.css). */
export default function FloatingWhatsApp({ whatsapp }: { whatsapp: string }) {
  return (
    <a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { location: "floating" })}
      aria-label="Написать в WhatsApp"
      className="floating-whatsapp rise-in fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-toast flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-brand-contrast shadow-lg transition-[background-color,translate,scale] duration-200 ease-out hover:-translate-y-[3px] hover:scale-[1.03] hover:bg-brand-700 active:scale-[0.97] sm:bottom-6 sm:right-6"
    >
      <span aria-hidden className="pulse-ring absolute inset-0 rounded-full bg-brand-500 opacity-0" />
      <WhatsappLogo className="relative h-7 w-7" weight="fill" />
    </a>
  );
}
