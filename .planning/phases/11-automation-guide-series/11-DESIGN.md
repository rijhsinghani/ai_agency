# Design: "5 Automations You Can Steal" Guide Series

**Date:** 2026-03-03
**Origin:** Brainstorm session during v2.0 UAT verification

---

## Purpose

Build audience and social following through a series of 5 branded PDF guides — each one a standalone, high-value automation walkthrough that small business owners can use immediately. The guides demonstrate the same kind of value Sameer Automations sells, without being salesy.

## Target outcome

Social follows and direct engagement. No email gate. No newsletter signup required. The value is the marketing.

---

## The 5 Guides

1. **"The 30-second save"** — Missed call text-back. Caller gets a text within 30 seconds of a missed call. Lead stays warm until you're free.

2. **"The review machine"** — Auto-request Google reviews after every job/appointment. Take a business from 8 reviews and 3.9 stars to 50+ reviews and 4.7 stars without lifting a finger.

3. **"The Monday morning pipeline"** — Automated weekly summary of every lead, pipeline status, and who needs follow-up. Replaces the "check my texts and emails" scramble.

4. **"The quote that writes itself"** — Voice memo or bullet points in, formatted proposal out. Claude API drafts the proposal. Saves the Sunday night paperwork session.

5. **"The no-show killer"** — Appointment reminder sequence (48hr + 2hr) with easy reschedule link. 3 no-shows/week at $80 each = $12,000/year recovered.

---

## Guide format (hybrid)

Each guide has 3 sections:

### Page 1 — The hook (problem + cost)

One paragraph. Name the pain. Quantify it. "You're losing $X/month because of [thing]." This is the part people screenshot and share.

### Page 2 — How it works (the automation explained)

Plain English, no jargon. What triggers it, what happens automatically, what the business owner sees. A simple before/after table. This is where they go "oh, that's clever."

### Page 3 — The DIY walkthrough (linked, not inline)

A separate detailed page or PDF covering: tools needed (free/cheap options), step-by-step setup, common gotchas. Honest about where it gets complicated — which is exactly where the service fills the gap.

### Footer on every guide

"Built by Sameer Automations. I build these systems for small businesses — if you'd rather skip the setup, here's my calendar." Soft. One line. Not a pitch.

---

## Visual design

Branded PDFs following the existing visual identity:

- Dark background (#1A1A1A) with cream text (#EDE9E3)
- Roc Grotesk Bold for headings, Gilroy for body text
- Single purple-to-cyan gradient accent line as section divider
- Dot grid texture at low opacity in background margins
- Small logo icon in top-right corner
- One or two arch-nodes as compositional anchors
- Max 3 colors per page (dark base, cream text, one accent)
- Max 150 words per page section — lots of breathing room
- Before/after tables use surface-raised card style (#1E1E1E, thin cream border)
- No emojis. Sentence case. Numerals for metrics.

### PDF generation

Markdown → styled HTML (inline styles matching brand) → PDF via puppeteer. Fully automated, reproducible via Claude Code.

---

## Distribution

### Primary — social posts

Each guide gets a social post that delivers the hook natively in the post itself. The full PDF is linked for people who want the detail.

Example Twitter thread for "The 30-second save":

- Tweet 1: "A solo salon owner misses 5 calls a week. At $80/appointment, that's $400/week walking out the door. Here's the automation that stops it."
- Tweets 2-3: How it works (the before/after)
- Final tweet: "Full guide with DIY walkthrough: [link]. Built by @SameerAutomates"

No "follow me for more." No "like and RT to unlock." The value speaks.

### Hosting

PDFs hosted on GitHub Pages at sameerautomations.com/guides/. Each guide gets a lightweight landing page (hook + download button + footer). Clean URLs.

### Release cadence

One guide per week for 5 weeks. Each guide also feeds the repurposing script for additional social content.

---

## Build approach

Claude Code generates all content and HTML. The build pipeline:

1. Claude Code writes guide content as markdown (using brand voice, banned phrases, style rules)
2. Claude Code generates styled HTML with inline CSS matching brand visual identity
3. Puppeteer converts HTML → PDF
4. Claude Code generates the social post variants (using repurposing script with --cta soft)
5. PDFs committed to repo, deployed to GitHub Pages

No external dependencies. No design tools. Everything built and shipped from the terminal.

---

## Success criteria

1. 5 branded PDF guides exist, each following the 3-section hybrid format
2. Each guide uses real math and industry-neutral examples (not trades-only)
3. Visual design matches brand identity (dark theme, Roc Grotesk, gradient accents)
4. Each guide has a corresponding social post ready for distribution
5. All 5 guides are hosted at sameerautomations.com/guides/ with clean landing pages
6. No email gate — guides are free and public
7. Footer CTA is soft ("if you'd rather skip the setup") not salesy
