"use client";

import { motion } from "framer-motion";
import { Phone, Search, Wrench, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery call",
    time: "15 min",
    icon: Phone,
    description:
      "We map your lead leaks, review your existing tools, and identify the biggest growth opportunities hiding in your business.",
  },
  {
    number: "02",
    title: "Free growth audit",
    time: "48 hours",
    icon: Search,
    description:
      "You get a plain-English scope document — what to build, expected ROI, and a clear timeline. No mystery pricing, no upsells.",
  },
  {
    number: "03",
    title: "Build",
    time: "Days, not weeks",
    icon: Wrench,
    description:
      "Your systems are built and tested with real scenarios before going live. You see everything in action before launch.",
  },
  {
    number: "04",
    title: "Launch and grow",
    time: "Ongoing",
    icon: Rocket,
    description:
      "Loom walkthrough, runbook, and ongoing monitoring. Revenue share kicks in only after results are proven.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="w-full bg-[#0E0E0E] text-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs tracking-widest text-zinc-500 uppercase">
          [ HOW IT WORKS ]
        </p>
        <h2 className="mt-3 text-4xl font-semibold font-display tracking-tight sm:text-5xl">
          From first call to full system in days
        </h2>

        <div className="mt-16 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[39px] top-0 bottom-0 w-px bg-gradient-to-b from-[#7B2FBE] via-[#4DD9E8] to-transparent hidden md:block" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: [0.25, 0.4, 0.25, 1] as const,
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="flex gap-8 items-start group"
                >
                  {/* Number circle */}
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center group-hover:border-[#7B2FBE]/50 transition-colors duration-500">
                      <span className="text-2xl font-bold bg-gradient-to-r from-[#7B2FBE] to-[#4DD9E8] bg-clip-text text-transparent">
                        {step.number}
                      </span>
                    </div>
                    {/* Glow on hover */}
                    <div className="absolute inset-0 rounded-full bg-[#7B2FBE]/0 group-hover:bg-[#7B2FBE]/10 blur-xl transition-all duration-500" />
                  </div>

                  {/* Content */}
                  <div className="pt-2 flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-xl font-semibold text-white">
                        {step.title}
                      </h3>
                      <span className="text-xs px-3 py-1 rounded-full border border-zinc-700 text-zinc-400">
                        {step.time}
                      </span>
                    </div>
                    <p className="text-zinc-400 leading-relaxed max-w-lg">
                      {step.description}
                    </p>
                  </div>

                  {/* Icon */}
                  <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-xl border border-zinc-800 bg-zinc-950 group-hover:border-[#4DD9E8]/30 transition-colors duration-500">
                    <Icon className="w-5 h-5 text-zinc-500 group-hover:text-[#4DD9E8] transition-colors duration-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
