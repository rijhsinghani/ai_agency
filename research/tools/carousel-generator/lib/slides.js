"use strict";

/**
 * Slide content registry for all 5 automation guides.
 *
 * Each guide has:
 *   - keyword: DM trigger keyword for CTA slides
 *   - title: guide display title
 *   - slides: array of slide objects { type, headline, subtext }
 *
 * Slide types: hook, problem, math, fix, proof, flow, cta
 * No emojis in any slide content.
 * Dollar amounts and key numbers will be wrapped in accent spans by template.js.
 */
const SLIDE_DATA = {
  "missed-call-textback": {
    keyword: "MISSED",
    title: "The 30-Second Save",
    slides: [
      {
        type: "hook",
        headline: "You're losing $20,800 a year to your voicemail.",
        subtext:
          "Every missed call from a potential client is a booking lost forever. Most never call back.",
      },
      {
        type: "problem",
        headline: "When you're with a client, your phone goes unanswered.",
        subtext:
          "You can't stop a cut mid-session to answer a new caller. So they hang up. Then call your competitor.",
      },
      {
        type: "math",
        headline: "5 missed calls per week x $80 average = $20,800 per year.",
        subtext:
          "That's not a rough estimate. That's the conservative math on a single gap in your intake process.",
      },
      {
        type: "fix",
        headline: "A text goes out in 30 seconds. Automatically. Every time.",
        subtext:
          'When a call goes unanswered, the system fires a text: "Sorry we missed you — here\'s a link to book online." No staff. No manual follow-up.',
      },
      {
        type: "proof",
        headline: "Salons using this recover 2-3 bookings per week on average.",
        subtext:
          "That's $160-240 in recovered revenue every single week from one automation running in the background.",
      },
      {
        type: "flow",
        headline: "How the automation works.",
        subtext:
          "Phone rings. Missed call detected. Auto-text sent in 30 seconds. Client books appointment.",
      },
      {
        type: "cta",
        headline: "DM me MISSED",
        subtext:
          "I'll show you exactly how to set this up for your salon. Free 15-min call. No pitch, just the system. calendar.app.google/psycao3CrXjGnmk48",
      },
    ],
  },

  "review-automation": {
    keyword: "REVIEWS",
    title: "The Review Machine",
    slides: [
      {
        type: "hook",
        headline:
          "8 Google reviews versus 94. That gap costs you clients every day.",
        subtext:
          "Patients choose practices online before they ever call. If your review count is low, they move on.",
      },
      {
        type: "problem",
        headline:
          "You deliver great care. Then you hope the patient remembers to review.",
        subtext:
          "They never do. Not because they were unhappy — because life gets in the way. And you're too busy to follow up.",
      },
      {
        type: "math",
        headline:
          "More reviews = 25-30% more clicks from Google search results.",
        subtext:
          "Google Maps ranks practices with more reviews higher. More clicks means more new patient inquiries — from the same area you already serve.",
      },
      {
        type: "fix",
        headline:
          "The request goes out automatically, 2 hours after every appointment ends.",
        subtext:
          "A text or email with a direct link to your Google review page. One tap for the patient. Zero effort from your staff.",
      },
      {
        type: "proof",
        headline:
          "Dental practices using this go from 8 to 90+ reviews in under 90 days.",
        subtext:
          "The automation runs every day. Reviews accumulate. Google responds. New patients find you instead of your competitor.",
      },
      {
        type: "flow",
        headline: "How the automation works.",
        subtext:
          "Appointment ends. Auto review request sent. Client leaves 5-star review. Google ranking climbs.",
      },
      {
        type: "cta",
        headline: "DM me REVIEWS",
        subtext:
          "I'll walk you through the full setup for your practice. 15 minutes. No software to buy upfront. calendar.app.google/psycao3CrXjGnmk48",
      },
    ],
  },

  "monday-pipeline": {
    keyword: "PIPELINE",
    title: "The Monday Morning Pipeline",
    slides: [
      {
        type: "hook",
        headline: "Your best leads go cold over the weekend. Every week.",
        subtext:
          "By Monday morning, whoever submitted a quote request Friday has already gotten 3 responses from competitors who responded faster.",
      },
      {
        type: "problem",
        headline:
          "Leads arrive from 4 different places. None of them talk to each other.",
        subtext:
          "Email, phone, your website form, and Facebook DMs. Monday scramble means deciding which pile to dig through first.",
      },
      {
        type: "math",
        headline:
          "3 lost leads per month x $150 average job = $5,400 per year slipping away.",
        subtext:
          "For a cleaning service, losing 3 recurring clients a year from slow follow-up is a real revenue number — not a hypothetical.",
      },
      {
        type: "fix",
        headline: "Every Monday at 7AM, a ranked digest lands in your inbox.",
        subtext:
          "All leads from the past 7 days. Qualified, scored, and sorted by priority. Your team starts the week knowing exactly who to call first.",
      },
      {
        type: "proof",
        headline:
          "Cleaning services using this report closing 20-30% more leads within the first month.",
        subtext:
          "Not from more leads. From responding faster to the ones already coming in. Speed-to-response is the competitive edge.",
      },
      {
        type: "flow",
        headline: "How the automation works.",
        subtext:
          "Leads arrive all week. Auto-qualify and log. Monday 7AM digest sent. Team works the priority list.",
      },
      {
        type: "cta",
        headline: "DM me PIPELINE",
        subtext:
          "Tell me where your leads come from and I'll show you how to consolidate them into one system. Free call. No commitment. calendar.app.google/psycao3CrXjGnmk48",
      },
    ],
  },

  "quote-writer": {
    keyword: "QUOTE",
    title: "The Quote That Writes Itself",
    slides: [
      {
        type: "hook",
        headline:
          "You are billing 20 hours a month writing proposals nobody asked you to write manually.",
        subtext:
          "For a law firm, 20 hours is not an afternoon — it's a week of billable work handed to admin.",
      },
      {
        type: "problem",
        headline:
          "Every new matter starts with a blank document and two hours of your time.",
        subtext:
          "You research, you draft, you format, you price, you follow up. Then the prospect ghosts because they got a faster response somewhere else.",
      },
      {
        type: "math",
        headline:
          "20 hours per month writing proposals. At your billing rate, that's thousands left on the table.",
        subtext:
          "Even at $200/hr, that's $4,000 a month in opportunity cost. Time you could spend on billable client work.",
      },
      {
        type: "fix",
        headline:
          "Record a 2-minute voice memo. Get a complete proposal draft in 10 minutes.",
        subtext:
          "You speak the case details. AI drafts the proposal, structures the scope, fills in standard clauses, and queues the follow-up sequence. You review and send.",
      },
      {
        type: "proof",
        headline:
          "Law firms using this cut proposal time from 2 hours to under 15 minutes per matter.",
        subtext:
          "Same quality. Faster response. More matters handled per month without adding headcount.",
      },
      {
        type: "flow",
        headline: "How the automation works.",
        subtext:
          "Voice memo recorded. AI drafts proposal. Auto follow-up sequence. Client signs.",
      },
      {
        type: "cta",
        headline: "DM me QUOTE",
        subtext:
          "I'll show you the exact workflow we use. 15-minute call. You'll leave with a clear picture of how to implement it. calendar.app.google/psycao3CrXjGnmk48",
      },
    ],
  },

  "no-show-killer": {
    keyword: "NOSHOW",
    title: "The No-Show Killer",
    slides: [
      {
        type: "hook",
        headline: "3 no-shows a week is $12,480 a year. Gone.",
        subtext:
          "For a gym or personal training studio, every empty session is revenue you cannot recover. It just disappears.",
      },
      {
        type: "problem",
        headline:
          "People forget. Life happens. And you have no system to catch them before they ghost.",
        subtext:
          "A confirmation email at booking is not a reminder. It gets buried. By appointment day, most clients have no memory of what time they scheduled.",
      },
      {
        type: "math",
        headline:
          "3 no-shows per week x $80 per session x 52 weeks = $12,480 per year.",
        subtext:
          "That's not edge-case math. Personal training communities on Reddit call this \"the industry's dirty little number\" — it's universal.",
      },
      {
        type: "fix",
        headline:
          "Two reminders fire automatically: 24 hours out and 1 hour out.",
        subtext:
          "The 24-hour reminder includes a reschedule link. The 1-hour reminder is a final nudge. No-shows drop by 60-80% within the first two weeks.",
      },
      {
        type: "proof",
        headline:
          "Gym owners using this recapture 2-3 sessions per week that would have been empty slots.",
        subtext:
          "The system runs on its own. You set it once. Every booking automatically enters the reminder sequence.",
      },
      {
        type: "flow",
        headline: "How the automation works.",
        subtext:
          "Appointment booked. 24h reminder sent. 1h reminder sent. Reschedule link if no-show.",
      },
      {
        type: "cta",
        headline: "DM me NOSHOW",
        subtext:
          "I'll show you the exact reminder sequence setup for your studio. Free 15-minute call. calendar.app.google/psycao3CrXjGnmk48",
      },
    ],
  },
};

module.exports = { SLIDE_DATA };
