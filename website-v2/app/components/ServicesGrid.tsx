"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Mail, FileText, MessageSquare, Star } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  {
    title: "Brand and digital presence",
    icon: Globe,
    color: "#7B2FBE",
    desc: "Logo, website, and digital identity that makes you look like the established business you are. First impressions happen online now.",
  },
  {
    title: "Email marketing automation",
    icon: Mail,
    color: "#4DD9E8",
    desc: "Lead nurturing, booking confirmations, and review requests — all on autopilot. Every touchpoint handled without you lifting a finger.",
  },
  {
    title: "Content creation",
    icon: FileText,
    color: "#7B2FBE",
    desc: "Social posts, video clips, and content published on schedule. 3x/week, every week — not just when you remember.",
  },
  {
    title: "Lead capture and follow-up",
    icon: MessageSquare,
    color: "#4DD9E8",
    desc: "Missed call text-back, form responses, and 24/7 follow-up sequences. Every lead gets a response in under 60 seconds.",
  },
  {
    title: "Review and reputation",
    icon: Star,
    color: "#9B4FDE",
    desc: "Automated review requests after every job, monitoring, and response management. Go from 12 reviews to 87 in three months.",
  },
];

export default function ServicesGrid() {
  return (
    <div id="services" className="w-full bg-[#0A0A0A] text-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs tracking-widest text-zinc-500">
          [ WHAT WE BUILD ]
        </p>
        <h2 className="mt-3 text-4xl font-semibold font-display tracking-tight sm:text-5xl">
          Five systems that run your growth
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ title, icon: Icon, color, desc }, index) => (
            <Card
              key={title}
              className={`group relative overflow-visible border-zinc-800 bg-gradient-to-b from-zinc-950/60 to-zinc-950/30 p-0 transition-all duration-300 hover:border-zinc-700 ${
                index === 2
                  ? "lg:scale-[1.04] lg:shadow-2xl lg:shadow-[#7B2FBE]/10 border-[#7B2FBE]/30"
                  : ""
              }`}
            >
              {index === 2 && (
                <div className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-br from-[#7B2FBE]/40 via-transparent to-[#4DD9E8]/30 opacity-60" />
              )}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 to-white/0 transition-colors group-hover:from-white/[0.03] group-hover:to-white/[0.06]" />

              <div className="pointer-events-none absolute inset-0 hidden group-hover:block">
                <div className="absolute -left-2 -top-2 h-3 w-3 bg-white" />
                <div className="absolute -right-2 -top-2 h-3 w-3 bg-white" />
                <div className="absolute -bottom-2 -left-2 h-3 w-3 bg-white" />
                <div className="absolute -bottom-2 -right-2 h-3 w-3 bg-white" />
              </div>

              <CardHeader className="relative z-10 flex flex-row items-start gap-3 p-6">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl border bg-zinc-900/70"
                  style={{ borderColor: `${color}40` }}
                >
                  <Icon className="h-5 w-5" style={{ color }} />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg font-medium text-zinc-100">
                    {title}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="relative z-10 px-6 pb-6 text-sm text-zinc-400">
                {desc}
              </CardContent>

              <motion.div
                className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-white/0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
