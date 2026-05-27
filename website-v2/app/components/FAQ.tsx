"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What does this actually cost?",
    a: "Growth Starter: $200\u2013500/mo. Full Partner: revenue share (10% of growth-attributed sales). No large upfront fees. You see results before committing more.",
  },
  {
    q: "What if the systems don\u2019t work?",
    a: "The free growth audit proves the concept first. I build a core system, you see it working, then we expand. Zero risk.",
  },
  {
    q: "Who owns the systems?",
    a: "You do. Everything lives in your accounts \u2014 your domain, your email, your tools. If we part ways, you keep everything.",
  },
  {
    q: "How fast can you build this?",
    a: "Core systems: 3\u20135 business days. Full growth package: 2\u20133 weeks. You\u2019ll have a working system before most agencies finish their onboarding call.",
  },
  {
    q: "What happens if I want to leave?",
    a: "30 days notice. You keep everything I built. No lock-in, no hostage data, no \u201Cproprietary platform\u201D you can\u2019t access without me.",
  },
  {
    q: "Do you serve my industry?",
    a: "Dental, salon, trades, gym, law, cleaning, real estate, tutoring \u2014 any service business where leads and reputation drive growth.",
  },
  {
    q: "What\u2019s the revenue share based on?",
    a: "Growth-attributed sales only \u2014 tracked transparently via your booking system or CRM. You see exactly what I see. No black boxes.",
  },
  {
    q: "Is this just another marketing agency?",
    a: "No. Agencies run campaigns. I build systems. Campaigns stop when you stop paying. Systems run 24/7 without my involvement.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative w-full overflow-hidden bg-[#0E0E0E] text-white"
    >
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24">
        <p className="text-xs tracking-widest text-zinc-500 uppercase">
          [ QUESTIONS ]
        </p>
        <h2 className="mt-3 text-4xl font-semibold font-display tracking-tight sm:text-5xl">
          Everything you need to know
        </h2>

        <div className="mt-16 space-y-0">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="border-b border-zinc-800">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between py-6 text-left transition-colors duration-300"
                >
                  <span
                    className={`text-lg font-medium transition-colors duration-300 ${
                      isOpen ? "text-white" : "text-zinc-500"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 flex-shrink-0 text-2xl text-zinc-600"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] as const }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-zinc-400 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
