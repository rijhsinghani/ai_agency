# Section order recommendation — sameerautomations.com v2

**Generated:** 2026-04-12
**Source of truth:** PRD `snazzy-sauteeing-pixel.md` — "Page architecture (single long-scroll page, v1)"

---

## Recommendation: KEEP the PRD order, with one micro-change

The PRD's 9-section order holds up against what the 21st.dev gallery and landmark dark SaaS references do. The narrative arc is: pain → solution → proof → process → price → ask. That is the correct order for a cold visitor on a service business landing page. No structural change needed.

**The one micro-change:** move the industry proof strip from below the hero CTAs into the hero itself (row 4 of the hero layout in style-plan.md §2). The industry strip belongs above the fold, not in its own slot. This is not a "new section," it is a rehoming — reduces vertical scroll-to-CTA by ~80px and plants the "any industry" frame inside the hero instead of making it a separate beat.

---

## Locked order (9 sections)

| #   | Section          | Why it sits here                                                                  |
| --- | ---------------- | --------------------------------------------------------------------------------- |
| 1   | Nav              | Sticky, minimal. Logo + 3 links + "Book a call" button. Universal pattern.        |
| 2   | Hero             | Pain + value prop + 2 CTAs + animated S-wave + industry strip. Above the fold.    |
| 3   | Problem strip    | 3 tiles. Validates the pain for skeptics who did not feel it in the H1.           |
| 4   | Automation cards | 4 cards. What actually gets built. Answers "what am I buying?"                    |
| 5   | Proof            | 3 giant-metric blocks. Answers "does it work?" Must follow "what" not precede it. |
| 6   | How it works     | 4 steps. Answers "how does this happen?" De-risks commitment.                     |
| 7   | FAQ              | Price transparency, ownership, what if I leave. Kills final objections.           |
| 8   | Final CTA        | Last ask. Signature gradient moment. Book a call + direct email.                  |
| 9   | Footer           | Contact, social, legal. Minimal.                                                  |

---

## Why not alternative orders

Considered three alternatives, all rejected:

**Alt A — Proof before automation cards (5 ↔ 4).** Rejected. The visitor does not know what you build yet. A giant metric like "$4,200 recovered" means nothing before they know what "missed call text-back" is. Cards must come first to prime the proof.

**Alt B — FAQ before how-it-works (7 ↔ 6).** Rejected. How-it-works answers commitment questions ("how long? how hard?"). FAQ answers final friction ("what about price? what if I leave?"). The psychological order is: commitment questions first, then price friction. Reversing it makes the page feel defensive.

**Alt C — Origin story section between hero and problem strip.** Rejected for v1. Tempting because the brand is built around Sameer's personal credibility, but a dedicated section would force a fifth beat before the visitor gets to the value prop. Better to surface origin story inside the How-it-works section (step 3 caption: "I built this for my own business first, then built it for clients") where it costs zero additional scroll. Reconsider for v1.1.

---

## Section density / scroll length

- Nav: 72px fixed
- Hero: ~720px
- Problem strip: ~360px
- Automation cards: ~640px
- Proof: ~520px
- How it works: ~560px
- FAQ: ~480px (collapsed accordion)
- Final CTA: ~400px
- Footer: ~240px

**Total scroll length:** ≈4000px desktop, ≈5600px mobile. Hero CTA in view within 1 scroll; second CTA (in automation cards wrapper) in view within 3 scrolls; final CTA reachable in under 6 scrolls. This is the right density for a service-business landing page — short enough to skim, long enough to close.

---

## Out-of-scope reminders

These sections were asked about in past rounds and are explicitly NOT on the page for v1:

- Testimonial carousel (we use 3 static proof blocks instead — stronger, less chrome)
- Blog / latest articles (v1.1 after YouTube ships)
- Pricing table with tiers (we state price plainly in the FAQ — no tier table)
- Logo cloud of client brands (client confidentiality — we use industry labels, not names)
- Newsletter signup (no list yet)
- Live chat widget (Slack-to-owner is not a customer channel)
