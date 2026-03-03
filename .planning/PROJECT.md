# AI Automation Agency

## What This Is

A solo AI automation agency offering custom workflow automation services to small businesses across industries — any owner too busy serving customers to chase new leads. Dental offices, salons, trades, law firms, cleaning companies, photography studios, and more. Built with n8n, Twilio, and the Claude API — not full application development, but discrete, tangible workflow automations that drive measurable efficiency and ROI. The founder brings deep product development experience and technical fluency with AI tooling.

## Core Value

Local service businesses save real money and recover real revenue through AI-powered automations they couldn't build themselves — and the agency makes that accessible, measurable, and low-risk.

## Current Milestone: v2.0 Content Marketing Engine

**Goal:** Build a repeatable content marketing system that generates awareness across Twitter, YouTube, and Instagram, drives discovery call bookings, and positions Sameer as the go-to automation consultant for small business.

**Target features:**

- Content idea CLI tool (competitor research, trending topics, suggested speaking points)
- Case study library (real automations + demo builds for common small business problems)
- YouTube as content hub (long-form demos, walkthroughs, case studies)
- Content repurposing pipeline (YouTube → Twitter threads, Instagram posts/reels, short clips)
- Twitter + Instagram platform setup with @SameerAutomates branding
- Giveaway strategy (free tips, checklists, templates to build buzz)
- Content → booking funnel (every piece drives to discovery call)

## Requirements

### Validated

- ✓ Landing page with value proposition, booking link, testimonials — v1.0 Phase 1
- ✓ Brand identity (logo, colors, voice guide, tagline) — v1.0 Phase 1
- ✓ YouTube channel branding (banner, profile pic, about section, keywords) — v1.0 Phase 1
- ✓ Google Calendar booking link (15-min discovery call) — v1.0 Phase 1
- ✓ Outreach templates (intro, follow-up, value-add, free audit framework) — v1.0 Phase 2
- ✓ Content strategy (5 video topics planned) — v1.0 Phase 2

### Active

- [ ] Content idea generation tool (CLI command to research competitors and suggest topics)
- [ ] Case study creation from existing automations (Raj Photo Video, financial services, Studio S)
- [ ] Demo automation builds for common small business pain points
- [ ] YouTube long-form content production (demos, walkthroughs, case studies)
- [ ] Content repurposing pipeline (YouTube → Twitter, Instagram, short clips)
- [ ] Twitter account setup and content strategy (@SameerAutomates)
- [ ] Instagram account setup and content strategy (@SameerAutomates)
- [ ] Giveaway/free value content (tips, checklists, automation templates)
- [ ] Content-to-booking funnel optimization (CTAs, links, conversion tracking)

### Out of Scope

- Full application development — too large, too complex, not the play
- Hiring/team building — solo operator, at least for v2
- Serving enterprise clients — local service businesses only
- Photography-niche-only positioning — too narrow, want broader local services market
- LinkedIn — deferred, focusing on Twitter/YouTube/Instagram first
- Paid advertising — organic content first, paid only after messaging validates
- Podcast — too much production overhead for v2

## Context

**Founder background:**

- Strong product development and small business experience
- Technically fluent with APIs, MCPs, Claude Code (daily user)
- Has a YouTube channel (currently photography content, low views) that will be pivoted
- Has an existing LLC: **Raj Photo Video** — will leverage this entity, email, and resources
- Can manage large complex projects but doesn't want to build apps
- Funnel: YouTube/Instagram → Landing page → Book a call (Google Calendar)

**Market opportunity:**

- Most small local businesses are not automated at all
- AI automation agencies are emerging but the space is early
- Small business owners don't know what's possible with LLMs/AI
- Content + demonstration is the education play

**Target customer profile:**

- Small business owners across industries — any owner physically occupied while serving customers (dental, salons, trades, law, cleaning, photography, gyms, tutoring, and more)
- Non-technical owners doing manual work (phone calls, emails, scheduling)
- Revenue per client worth $1K-5K+ → even small improvements in lead capture are valuable
- Not tech-savvy enough to build automations themselves

**Pricing model:**

- Value-based: charge a fraction of the value delivered
- Setup fee: $1,500-3,000 per automation build
- Monthly retainer: $200-500/mo for maintenance, monitoring, tweaks
- Value measurement: recovered leads × client LTV + time freed × hourly cost
- Payment terms: 50% upfront, 50% on completion. Retainer starts at go-live

**Go-to-market:**

- Content funnel: YouTube (hub) + Twitter + Instagram → landing page → discovery call
- LinkedIn deferred — focusing on three platforms first
- Content for business owners (non-technical audience) — "what this does for you" not "how I built it"
- Content types: screen recordings, talking head explainers, case studies, short-form clips, giveaways
- Repurpose long-form YouTube → short-form Twitter threads + Instagram posts/reels
- Case studies as core content: real automations + demo builds
- Giveaways: free tips, checklists, templates to build buzz and trust

**Contracts:**

- Plain-English client agreement (no lawyer needed for v1)
- Key terms: scope of work, deliverables/timeline, 50/50 payment split, IP (client owns instance, agency owns methodology), liability cap, monthly retainer scope, 30-day exit clause
- Reusable template customized per engagement

## Constraints

- **Operator**: Solo — all work is done by one person leveraging AI tools
- **Pace**: Side project — no hard timeline, building alongside other work
- **Complexity cap**: Discrete workflow automations only, no full app development
- **Tools**: n8n (workflow orchestration) + Twilio (SMS/voice) + Claude API (text generation) for client delivery. Claude Code + MCPs for build tooling. Cloud Run only for content pipeline.
- **Budget**: Bootstrapped — minimize costs (free/low-cost tools where possible)
- **Content**: Must be accessible to non-technical business owners

## Key Decisions

| Decision                                       | Rationale                                                                                                                                                                                                                       | Outcome   |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Target local service businesses                | Repeatable pain points (scheduling, follow-ups, reviews), not tech-savvy enough to DIY                                                                                                                                          | — Pending |
| Value-based pricing (not hourly)               | Aligns incentives, captures more value, differentiates from freelancers                                                                                                                                                         | — Pending |
| Build + monthly retainer model                 | Setup fee covers build, retainer creates recurring revenue and ongoing relationship                                                                                                                                             | — Pending |
| Lead follow-up automation as first PoC         | High-impact, easy to demo, directly measurable (leads captured, appointments booked)                                                                                                                                            | — Pending |
| Pivot existing YouTube channel                 | Existing channel (photography) has infrastructure, pivot to automation content for business owners                                                                                                                              | — Pending |
| Content targets business owners, not builders  | Audience = potential clients. Show results, not process                                                                                                                                                                         | — Pending |
| n8n + Twilio + Claude API as delivery stack    | n8n is powerful, self-hostable, and lets you templatize automations across clients. Twilio handles SMS/voice. Claude API handles text generation. Claude Code builds and configures — it is not part of client-facing delivery. | Decided   |
| No custom domain registration                  | GitHub Pages URL is sufficient for now. Custom domain can be added later if needed.                                                                                                                                             | Decided   |
| Consulting positioning (not freelancing)       | Years of experience automating own business + professional financial services. Expert offering.                                                                                                                                 | Decided   |
| Multi-platform: Twitter, YouTube, Instagram    | Three platforms with different content formats. LinkedIn deferred.                                                                                                                                                              | Decided   |
| Content repurposing over original per-platform | Create once on YouTube, repurpose everywhere. Solo operator can't create unique per platform.                                                                                                                                   | Decided   |

---

_Last updated: 2026-03-01 — milestone v2.0 Content Marketing Engine started_
