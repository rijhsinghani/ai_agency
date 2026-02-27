# Project State: AI Automation Agency

**Project:** AI Automation Agency — Solo Operator, Personal Brand
**Initialized:** 2026-02-27

---

## Project Reference

**Core Value:** Small business owners save real money and recover real revenue through AI-powered automations they couldn't build themselves — and Sameer makes that accessible, measurable, and low-risk.

**Brand Voice:** See `brand/brand-voice.md` for full guide. Personal brand under Sameer's name, peer-to-peer tone, NOT niche-locked.

**Current Focus:** Phase 3 — Sales Surface (packages + landing page done, N8N + booking pending)

---

## Current Position

| Field         | Value                                                              |
| ------------- | ------------------------------------------------------------------ |
| Current Phase | 3 — Sales Surface (partially executed)                             |
| Phase 1       | 95% — brand assets done, manual YouTube uploads pending            |
| Phase 2       | 0% — plan exists, not started (blocked on N8N + API accounts)      |
| Phase 3       | 50% — packages + landing page done, N8N templates + booking remain |
| Phase 4       | 25% — outreach docs + content plan done, execution pending         |

**Progress:**

```
Phase 1 [█████████▌] 95%  ← Manual YouTube uploads remain
Phase 2 [          ]  0%  ← Plan exists, blocked on N8N
Phase 3 [█████     ] 50%  ← Packages + landing page done
Phase 4 [███       ] 25%  ← Outreach + content plan revised
```

---

## Performance Metrics

| Metric                   | Value   |
| ------------------------ | ------- |
| Phases complete          | 0 / 4   |
| Requirements mapped      | 25 / 25 |
| Requirements complete    | ~6 / 25 |
| v2 requirements deferred | 10      |

---

## Accumulated Context

### Key Decisions

- **Personal brand** under Sameer's full name — @SameerAutomates, face forward
- **NOT niche-locked** — serves all small business owners, not just plumbers/contractors
- Origin story: automated his own wedding photography business (Raj Photo Video)
- Enterprise background exists but **NEVER mentioned by name** (confidentiality constraint)
- Value-based pricing: $1,500-3,000 build + $200-500/mo retainer (non-optional)
- Build stack: Claude Code + N8N self-hosted + Twilio/Resend + **Google Calendar Appointment Scheduling**
- Landing page: static HTML with Tailwind CSS (not Framer)
- Retainer is a required line item, not an upsell — present in every proposal
- **Cal.com removed** — replaced with Google Calendar (Google Workspace) everywhere

### Brand Voice (documented in `brand/brand-voice.md`)

- Tone: direct, peer-to-peer, confident
- No emojis. No jargon. No buzzwords.
- Content pillars: real automations, case studies with numbers, behind-the-scenes builds, what's worth automating, origin story
- Tagline: "Smart systems. Built for your business. By Sameer."
- Three doors open: agency services now, broader services later, products/courses eventually

### Critical Sequencing (must not violate)

1. Brand/domain before any outreach or selling
2. PoC must be live before landing page is published (credibility requirement)
3. Landing page must be live before running content-driven acquisition
4. Never parallelize phases — one primary focus per phase

### Technical Setup Required (Phase 2)

- N8N self-hosted on VPS ($5-20/mo — confirm Railway vs. DigitalOcean vs. Render)
- Twilio account (SMS/webhooks, pay-as-you-go)
- Resend account (transactional email, free tier 3,000/mo)
- Google Calendar Appointment Scheduling (included in Google Workspace)
- Supabase free tier (state storage if needed)

---

## Completed Assets

### Brand (Phase 1)

- Logo SVG package: 8 variants in `brand/` (icon, lockup, wordmark, favicon x dark/light/white)
- Email signature: `brand/email-signature.html`
- Color palette: #7B2FBE primary purple, #9B4FDE light purple, #1A1A1A dark base
- Brand voice guide: `brand/brand-voice.md` (5 attributes, tone spectrum, style rules, terminology, confidentiality rules)
- YouTube banner: `brand/youtube/banner.png` (2560x1440)
- YouTube profile pic: `brand/youtube/profile-pic-branded.png` (800x800)
- YouTube about section: `brand/youtube/about-section.md` (updated for brand pivot)
- YouTube keywords: `brand/youtube/channel-keywords.md` (50 tags)
- YouTube thumbnail template: `brand/youtube/thumbnail-template.svg`
- Brand preview page: `website/brand-preview.html`

### Sales Surface (Phase 3 — partial)

- Package docs: `ops/packages/` — 6 files (lead-follow-up, missed-call-text-back, review-reputation, appointment-reminders, quote-follow-up, custom-build-intake)
- Landing page: `website/index.html` — hero, services, packages/pricing, ROI section, case study placeholder, booking section, premium CSS design (gradient text, card hover effects, shimmer CTAs, ambient glows)

### Outreach (Phase 4 — partial)

- Outreach templates: `ops/outreach/` — 5 files (day-1-intro, day-3-followup, day-7-value-add, free-audit-framework, prospecting-criteria)
- Content strategy: 5 video topics planned in `phase-4/PLAN.md` (personal brand voice, origin story first)

### Plans

- `.planning/phase-2/PLAN.md` — PoC build (N8N + Claude + Twilio/Resend + Google Calendar)
- `.planning/phase-3/PLAN.md` — Sales surface (packages, landing page, N8N templates)
- `.planning/phase-4/PLAN.md` — Acquisition engine (YouTube content, cold outreach) — revised for brand pivot

---

## Todos

- [ ] MANUAL: Upload YouTube banner to Studio
- [ ] MANUAL: Upload YouTube profile pic to Studio
- [ ] MANUAL: Change channel name to "Sameer Automations"
- [ ] MANUAL: Paste about section text (from updated about-section.md)
- [ ] MANUAL: Set handle to @SameerAutomates
- [ ] MANUAL: Set old photography videos to Unlisted
- [ ] Register domain (sameerautomations.com) + branded email
- [ ] Set up Google Calendar Appointment Scheduling (booking link for landing page)
- [ ] Deploy N8N instance (Railway) — blocks Phase 2 + Phase 3 templates
- [ ] Visual review of landing page design upgrade
- [ ] Create API accounts: Twilio, Resend

---

## Blockers

- N8N deployment blocks Phase 2 (PoC build) and Phase 3 (N8N templates)
- Google Calendar booking link needed before landing page can go live
- PoC case study needed before landing page has real social proof

---

## Session Continuity

**Last session:** 2026-02-27 — Brand voice application + design upgrade + Cal.com sweep

**What was done this session:**

1. Brand voice documented: `brand/brand-voice.md` — 5 attributes, tone spectrum, style rules, terminology, confidentiality
2. YouTube about section updated: removed niche-specific copy, aligned to brand pivot
3. Landing page copy broadened: title, meta, hero subhead, ROI section — no longer niche-locked
4. Cal.com → Google Calendar sweep: 54 references replaced across 14 files
5. Phase 4 PLAN.md revised: all 5 video topics rewritten for personal brand, @SameerAutomates, content pillars aligned
6. Landing page design upgraded: 140+ lines of premium CSS (gradient text, card hover effects, shimmer CTAs, ambient glows, section headers, footer animations)

**Next action:** Visually verify landing page in browser, then decide: deploy N8N (unblocks Phase 2+3) or handle manual YouTube uploads first

---

_Initialized: 2026-02-27_
_Last updated: 2026-02-27_
