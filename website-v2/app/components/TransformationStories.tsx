"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const stories = [
  {
    industry: "Dental Practice",
    before:
      "Invisible online — no website, word-of-mouth only. New patients trickled in unpredictably.",
    built:
      "Brand identity, website, Google review system, missed call text-back",
    after: "47 new patients in 60 days",
    metric: "47",
    metricLabel: "new patients",
    metricPeriod: "in 60 days",
    color: "#7B2FBE",
  },
  {
    industry: "Hair Salon",
    before:
      "Posting on Instagram when they remembered. Revenue plateaued despite great reviews.",
    built:
      "Content calendar, email sequences, lead magnet, automated review requests",
    after: "$4,200/mo additional revenue",
    metric: "$4,200",
    metricLabel: "per month",
    metricPeriod: "additional revenue",
    color: "#4DD9E8",
  },
  {
    industry: "HVAC Contractor",
    before:
      "Missing calls during jobs. Voicemail, call back tomorrow. Leads going to competitors.",
    built: "Instant text-back, quote form, automated follow-up sequence",
    after: "98% lead response rate in under 60 seconds",
    metric: "98%",
    metricLabel: "response rate",
    metricPeriod: "under 60 seconds",
    color: "#9B4FDE",
  },
];

export default function TransformationStories() {
  return (
    <section id="proof" className="w-full bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs tracking-widest text-zinc-500 uppercase">
          [ PROOF ]
        </p>
        <h2 className="mt-3 text-4xl font-semibold font-display tracking-tight sm:text-5xl">
          Real businesses. Real transformations.
        </h2>

        <div className="mt-16 space-y-6">
          {stories.map((story, index) => {
            const xOffset = index === 0 ? -40 : index === 2 ? 40 : 0;
            return (
              <motion.div
                key={story.industry}
                initial={{ opacity: 0, x: xOffset, y: 40 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.25, 0.4, 0.25, 1] as const,
                }}
                viewport={{ once: true, margin: "-80px" }}
                className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/50 hover:border-zinc-700 transition-colors duration-500"
              >
                <div className="grid md:grid-cols-[1fr_auto_1fr] items-stretch">
                  {/* Before */}
                  <div className="p-8 md:p-10">
                    <span className="text-xs uppercase tracking-widest text-zinc-600 mb-4 block">
                      Before
                    </span>
                    <p className="text-zinc-400 leading-relaxed">
                      {story.before}
                    </p>
                    <div className="mt-6">
                      <span
                        className="inline-block text-xs px-3 py-1.5 rounded-full border"
                        style={{
                          borderColor: `${story.color}40`,
                          color: story.color,
                        }}
                      >
                        {story.industry}
                      </span>
                    </div>
                  </div>

                  {/* Center metric + arrow */}
                  <div className="flex flex-col items-center justify-center px-6 py-8 md:py-0 md:border-x border-zinc-800/50 relative">
                    <ArrowRight className="w-5 h-5 text-zinc-600 mb-4 rotate-90 md:rotate-0" />
                    <div
                      className="text-5xl md:text-6xl font-bold"
                      style={{ color: story.color }}
                    >
                      {story.metric}
                    </div>
                    <div className="text-sm text-zinc-400 mt-1">
                      {story.metricLabel}
                    </div>
                    <div className="text-xs text-zinc-600 mt-0.5">
                      {story.metricPeriod}
                    </div>
                    {/* Glow behind metric */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${story.color}15, transparent 70%)`,
                      }}
                    />
                  </div>

                  {/* After */}
                  <div className="p-8 md:p-10">
                    <span className="text-xs uppercase tracking-widest text-zinc-600 mb-4 block">
                      What we built
                    </span>
                    <p className="text-zinc-300 leading-relaxed font-medium">
                      {story.built}
                    </p>
                    <div className="mt-6">
                      <span className="text-sm text-zinc-500">
                        Result: {story.after}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
