"use client";

import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const },
};

export default function OriginStory() {
  return (
    <section
      id="origin"
      className="relative w-full bg-[#0A0A0A] text-white overflow-hidden"
    >
      {/* Left gutter accent line */}
      <div className="absolute left-8 top-24 bottom-24 w-px bg-gradient-to-b from-[#7B2FBE] via-[#4DD9E8] to-transparent opacity-40 hidden lg:block" />

      <div className="mx-auto max-w-2xl px-6 py-24">
        <motion.p
          {...fadeUp}
          className="text-xs tracking-widest text-zinc-500 uppercase mb-12"
        >
          [ ORIGIN ]
        </motion.p>

        <motion.div {...fadeUp} className="flex items-center gap-6 mb-12">
          <div className="relative flex-shrink-0">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#7B2FBE] via-[#9B4FDE] to-[#4DD9E8] opacity-60 blur-sm" />
            <img
              src="/sameer-headshot.jpg"
              alt="Sameer Rijhsinghani"
              className="relative h-20 w-20 md:h-24 md:w-24 rounded-full object-cover ring-2 ring-[#0A0A0A]"
            />
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-semibold font-display text-white leading-tight">
              Hi, I'm Sameer
            </h3>
            <p className="text-sm text-zinc-500 mt-1">
              Founder, Sameer Automations
            </p>
          </div>
        </motion.div>

        <motion.p
          {...fadeUp}
          className="text-xl leading-relaxed text-zinc-300 mb-8"
        >
          I ran a photography business in New Jersey.
        </motion.p>

        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="text-lg leading-relaxed text-zinc-400 mb-8"
        >
          Bookings came through Instagram DMs, emails, phone calls, and word of
          mouth. I was drowning in follow-up. Quotes sat unanswered. Reviews
          went unasked. I was too busy shooting to grow.
        </motion.p>

        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="text-lg leading-relaxed text-zinc-400 mb-16"
        >
          So I built systems. AI that responded to leads in 60 seconds.
          Automated review requests after every job. Email sequences that kept
          my calendar full without me touching it.
        </motion.p>
      </div>

      {/* Pull quote — breaks out of narrow column */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-5xl px-6 mb-16"
      >
        <p className="text-4xl md:text-6xl font-bold font-display leading-tight bg-gradient-to-r from-[#7B2FBE] to-[#4DD9E8] bg-clip-text text-transparent text-center">
          {"Revenue went up. Stress went down.".split(" ").map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.25, 0.4, 0.25, 1] as const,
              }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </p>
      </motion.div>

      <div className="mx-auto max-w-2xl px-6 pb-32">
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="text-lg leading-relaxed text-zinc-400"
        >
          Now I build those same systems for other businesses. Not as a vendor.
          As a growth partner who only wins when you win.
        </motion.p>
      </div>
    </section>
  );
}
