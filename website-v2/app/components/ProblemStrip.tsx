"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Clock, CalendarX } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  {
    title: "Your brand is invisible online",
    icon: Eye,
    stat: "73%",
    desc: "of consumers judge a business by its website before calling. If you don't show up polished, you don't show up at all.",
  },
  {
    title: "Leads go cold in minutes",
    icon: Clock,
    stat: "40%",
    desc: "of inbound leads go cold because nobody follows up fast enough. Every hour without a response is money left on the table.",
  },
  {
    title: "You're posting when you remember",
    icon: CalendarX,
    stat: "2.5x",
    desc: "more leads for businesses posting 3x/week vs monthly. Consistency wins. Sporadic posting loses.",
  },
];

export default function ProblemStrip() {
  return (
    <div className="w-full bg-[#0E0E0E] text-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs tracking-widest text-zinc-500">[ THE PROBLEM ]</p>
        <h2 className="mt-3 text-4xl font-semibold font-display tracking-tight sm:text-5xl">
          Most businesses are leaving money on the table
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {items.map(({ title, icon: Icon, stat, desc }) => (
            <Card
              key={title}
              className="group relative overflow-visible border-zinc-800 bg-gradient-to-b from-zinc-950/60 to-zinc-950/30 p-0 transition-colors duration-300 hover:border-zinc-700"
            >
              {/* subtle gradient on hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
              </div>

              {/* faint inner glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 to-white/0 transition-colors group-hover:from-white/[0.03] group-hover:to-white/[0.06]" />

              {/* corner squares on hover */}
              <div className="pointer-events-none absolute inset-0 hidden group-hover:block">
                <div className="absolute -left-2 -top-2 h-3 w-3 bg-white" />
                <div className="absolute -right-2 -top-2 h-3 w-3 bg-white" />
                <div className="absolute -bottom-2 -left-2 h-3 w-3 bg-white" />
                <div className="absolute -bottom-2 -right-2 h-3 w-3 bg-white" />
              </div>

              <CardHeader className="relative z-10 flex flex-row items-start gap-3 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900/70 text-zinc-200">
                  <Icon className="h-5 w-5 text-zinc-200" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg font-medium text-zinc-100">
                    {title}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="relative z-10 px-6 pb-6">
                <div className="mb-3 text-5xl font-bold bg-gradient-to-r from-[#7B2FBE] to-[#4DD9E8] bg-clip-text text-transparent">
                  {stat}
                </div>
                <p className="text-sm text-zinc-400">{desc}</p>
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
