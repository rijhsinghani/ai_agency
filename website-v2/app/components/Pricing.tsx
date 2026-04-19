"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const starterFeatures = [
  "Pick one: lead capture, review management, or email automation",
  "Loom walkthrough of your system",
  "Runbook so you understand everything",
  "Slack support for questions",
];

const partnerFeatures = [
  "Everything: brand, website, content, email, lead capture, reviews",
  "Full build from scratch",
  "Ongoing monitoring & optimization",
  "Monthly performance reviews",
  "I only win when you win",
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="w-full bg-[#0E0E0E] text-white overflow-hidden"
    >
      <div className="mx-auto max-w-5xl px-6 py-24">
        <p className="text-xs tracking-widest text-zinc-500 uppercase">
          [ PRICING ]
        </p>
        <h2 className="mt-3 text-4xl font-semibold font-display tracking-tight sm:text-5xl">
          Simple, aligned pricing
        </h2>

        <div className="mt-16 flex flex-col items-center gap-8 md:flex-row md:items-stretch md:gap-0">
          {/* Growth Starter */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const }}
            className="flex w-full flex-col rounded-2xl border border-zinc-800 bg-zinc-950/50 p-8 md:w-[45%]"
          >
            <p className="text-sm font-medium text-zinc-400 uppercase tracking-wide">
              Growth Starter
            </p>
            <p className="mt-2 text-lg text-zinc-300">Start with one system</p>
            <div className="mt-6">
              <span className="text-4xl font-bold text-white">$0</span>
              <span className="ml-2 text-zinc-500">upfront</span>
            </div>
            <p className="mt-2 text-sm text-zinc-500">
              $200\u2013500/mo retainer
            </p>

            <ul className="mt-8 flex-1 space-y-4">
              {starterFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-sm text-zinc-400"
                >
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-zinc-600" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="mt-8 inline-flex items-center justify-center rounded-lg border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
            >
              Start with one system
            </a>
          </motion.div>

          {/* Vertical divider with "or" */}
          <div className="hidden md:flex flex-col items-center justify-center px-6">
            <div className="h-full w-px bg-zinc-800" />
            <span className="my-4 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 text-xs text-zinc-500">
              or
            </span>
            <div className="h-full w-px bg-zinc-800" />
          </div>
          <div className="flex md:hidden items-center justify-center w-full">
            <div className="h-px w-16 bg-zinc-800" />
            <span className="mx-4 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 text-xs text-zinc-500">
              or
            </span>
            <div className="h-px w-16 bg-zinc-800" />
          </div>

          {/* Full Growth Partner — featured */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const }}
            className="relative flex w-full flex-col rounded-2xl p-8 md:w-[55%] md:scale-[1.03]"
            style={{
              background:
                "linear-gradient(#0E0E0E, #0E0E0E) padding-box, linear-gradient(135deg, #7B2FBE, #4DD9E8) border-box",
              border: "2px solid transparent",
            }}
          >
            {/* Pulsing glow */}
            <div
              className="pointer-events-none absolute -inset-1 rounded-2xl opacity-30 blur-xl"
              style={{
                background: "linear-gradient(135deg, #7B2FBE, #4DD9E8)",
                animation: "pricing-glow 3s ease-in-out infinite",
              }}
            />

            <style>{`
              @keyframes pricing-glow {
                0%, 100% { opacity: 0.2; }
                50% { opacity: 0.4; }
              }
            `}</style>

            {/* Internal brand wash */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[#7B2FBE]/10 via-transparent to-[#4DD9E8]/5" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-3">
                <p className="text-sm font-medium text-zinc-400 uppercase tracking-wide">
                  Full Growth Partner
                </p>
                <span className="rounded-full bg-gradient-to-r from-[#7B2FBE] to-[#9B4FDE] px-4 py-1 text-sm font-bold text-white shadow-lg shadow-[#7B2FBE]/40">
                  Recommended
                </span>
              </div>
              <p className="mt-2 text-lg text-zinc-300">
                Complete digital growth
              </p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="ml-2 text-zinc-500">upfront</span>
              </div>
              <p className="mt-2 text-sm text-zinc-500">
                Revenue share: 10% of growth-attributed sales
              </p>

              <ul className="mt-8 flex-1 space-y-4">
                {partnerFeatures.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm text-zinc-300"
                  >
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#4DD9E8]" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#7B2FBE] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#9B4FDE]"
              >
                Book a free growth audit
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
