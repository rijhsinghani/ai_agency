"use client";

import { motion } from "framer-motion";
import LeadForm from "./LeadForm";

export default function FinalCTA() {
  return (
    <section
      id="audit"
      className="relative w-full overflow-hidden bg-[#0E0E0E] text-white"
    >
      {/* Radial gradient background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(123,47,190,0.22) 0%, rgba(77,217,232,0.10) 40%, transparent 70%)",
          animation: "cta-pulse 6s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes cta-pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        @keyframes cta-shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
      `}</style>

      <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-32 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const }}
          className="text-4xl font-semibold font-display tracking-tight sm:text-5xl md:text-6xl"
        >
          Ready to stop chasing and start growing?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.25, 0.4, 0.25, 1] as const,
          }}
          className="mt-6 text-lg text-zinc-400 leading-relaxed max-w-xl"
        >
          Book a free growth audit. 15 minutes. No pitch. Just a map of
          what&apos;s leaking and what to fix first.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: [0.25, 0.4, 0.25, 1] as const,
          }}
          className="w-full max-w-xl"
        >
          <LeadForm />
        </motion.div>

        <motion.a
          href="mailto:sameer@rajphotovideo.com"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
        >
          sameer@rajphotovideo.com
        </motion.a>
      </div>
    </section>
  );
}
