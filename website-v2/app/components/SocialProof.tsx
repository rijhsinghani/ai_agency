"use client";

import React from "react";
import { motion } from "framer-motion";

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    text: "Sameer built us a system that responds to every lead before I even see the notification. We've closed 47 new patients in 60 days.",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Dr. M.",
    role: "Dental practice",
  },
  {
    text: "Our reviews went from 12 to 87 in three months. All automated. I didn't lift a finger and the phone is ringing.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150",
    name: "K.S.",
    role: "Salon owner",
  },
  {
    text: "I was skeptical about AI. Now I can't imagine running my business without it. The text-back alone paid for the build in two weeks.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "J.R.",
    role: "HVAC contractor",
  },
  {
    text: "We used to post whenever someone remembered. Now content goes out 3x a week like clockwork and leads are coming from Instagram for the first time.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "A.P.",
    role: "Gym owner",
  },
  {
    text: "Consultation requests went up 40% the month after we launched the new site. My paralegal isn't buried in voicemail anymore.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "R.D.",
    role: "Immigration attorney",
  },
  {
    text: "I stopped losing bids to bigger firms. The automated follow-up keeps me top of mind even when I'm on a roof all day.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "T.B.",
    role: "Roofing contractor",
  },
  {
    text: "Every missed call now gets a text within 30 seconds. I booked $4,200 extra last month from leads I would've lost before.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "L.C.",
    role: "Med spa",
  },
  {
    text: "The brand and website finally match the quality of my work. First impressions matter and mine was costing me clients.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "D.N.",
    role: "Real estate agent",
  },
  {
    text: "Enrollment inquiries doubled. Parents are getting responses in under a minute and they sign up before they have second thoughts.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "P.G.",
    role: "Tutoring center",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <motion.li
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    boxShadow:
                      "0 25px 50px -12px rgba(123, 47, 190, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(123, 47, 190, 0.2)",
                    transition: { type: "spring", stiffness: 400, damping: 17 },
                  }}
                  whileFocus={{
                    scale: 1.03,
                    y: -8,
                    boxShadow:
                      "0 25px 50px -12px rgba(123, 47, 190, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(123, 47, 190, 0.2)",
                    transition: { type: "spring", stiffness: 400, damping: 17 },
                  }}
                  className="p-10 rounded-3xl border border-neutral-800 shadow-lg shadow-black/30 max-w-xs w-full bg-neutral-900/60 backdrop-blur-sm transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-[#7B2FBE]/40"
                >
                  <blockquote className="m-0 p-0">
                    <p className="text-neutral-300 leading-relaxed font-normal m-0 transition-colors duration-300">
                      {text}
                    </p>
                    <footer className="flex items-center gap-3 mt-6">
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={`Avatar of ${name}`}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-neutral-800 group-hover:ring-[#7B2FBE]/40 transition-all duration-300 ease-in-out"
                      />
                      <div className="flex flex-col">
                        <cite className="font-semibold not-italic tracking-tight leading-5 text-white transition-colors duration-300">
                          {name}
                        </cite>
                        <span className="text-sm leading-5 tracking-tight text-neutral-500 mt-0.5 transition-colors duration-300">
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

export default function SocialProof() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-[#0A0A0A] py-24 relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1] as const,
          opacity: { duration: 0.8 },
        }}
        className="container px-4 z-10 mx-auto"
      >
        <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16">
          <div className="flex justify-center">
            <div className="border border-neutral-700 py-1 px-4 rounded-full text-xs font-semibold tracking-wide uppercase text-neutral-400 bg-neutral-800/50 transition-colors">
              [ Social Proof ]
            </div>
          </div>

          <h2
            id="testimonials-heading"
            className="text-4xl md:text-5xl font-semibold font-display tracking-tight mt-6 text-center text-white transition-colors"
          >
            What business owners say
          </h2>
          <p className="text-center mt-5 text-neutral-400 text-lg leading-relaxed max-w-sm transition-colors">
            Real operators. Real results. The systems run. The phone rings. The
            calendar fills.
          </p>
        </div>

        <div
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </motion.div>
    </section>
  );
}
