---
gsd_state_version: 1.0
milestone: v2.0
milestone_name: Content Marketing Engine
status: unknown
last_updated: "2026-03-02T19:59:40.185Z"
progress:
  total_phases: 4
  completed_phases: 3
  total_plans: 6
  completed_plans: 6
  percent: 100
---

# Project State: AI Automation Agency

**Project:** AI Automation Agency — Solo Operator, Personal Brand
**Initialized:** 2026-02-27
**Strategy:** Content-first. Build audience and trust through value content. Funnel to discovery calls.

---

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-01)

**Core value:** Small business owners save real money and recover real revenue through AI-powered automations they couldn't build themselves — and Sameer makes that accessible, measurable, and low-risk.

**Current focus:** Milestone v2.0 — Content Marketing Engine — Phase 5: Platform Foundation

---

## Current Position

| Field         | Value                                                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Milestone     | v2.0 — Content Marketing Engine                                                                                         |
| Phase         | 7 of 8 (Phase 7: Case Studies + Content Tooling) — IN PROGRESS                                                          |
| Plan          | 2 of 3 complete — 07-01 case studies + 07-02 CLI + calendar done                                                        |
| Status        | Phase 7 Plan 02 complete — content idea CLI built (32 tests), calendar updated with ramp model; Plan 03 pending         |
| Last activity | 2026-03-02 — 07-02 SUMMARY.md finalized; CLI tool built and verified, calendar updated with ramp cadence and CSV export |

**Progress:**

[██████████] 100%
Phase 7: [██████░░░░] Plans 01+02 of 3 complete (case studies, CLI tool, calendar)

```

---

## Performance Metrics

| Metric                | Value |
| --------------------- | ----- |
| Phases complete       | 0     |
| Requirements active   | 15    |
| Requirements complete | 0     |

---
| Phase 05-market-research-pain-point-discovery P01 | 7 | 2 tasks | 7 files |
| Phase 05-market-research-pain-point-discovery P02 | 6 | 1 tasks | 3 files |
| Phase 07-case-studies-content-tooling P01 | 4 | 2 tasks | 7 files |
| Phase 07 P02 | 8m | 2 tasks | 13 files |

## Accumulated Context

### Pending Todos
- 1 pending: **Add YouTube thumbnail generation to content pipeline with Slack approval** (tooling)
- 1 pending: **MANUAL: Set up Twitter + Instagram profiles** — all copy assets in `.planning/phases/06-platform-foundation/copy/`. Upload profile pics, paste bios, publish pinned thread, create Canva carousels, post Pain/Proof/Offer sequence. Can be batched with other v1.0 manual tasks.

### Roadmap Evolution

- **2026-03-02**: Added Phase 10 (v3.0 Content Automation Pipeline) — Automated Content Preparation & Distribution Pipeline. Seven sub-parts: content bank (Supabase + Google Sheets), video post-production (Cloud Run ffmpeg pipeline), AI content generation (Gemini 3.1 Pro + Claude), Slack approval workflow, multi-platform publishing (Twitter/X, Instagram, YouTube, Substack, Threads via direct APIs), multi-brand support (Sameer Automations + Raj Photo Video), analytics feedback loop. Zero subscriptions, $5-15/mo estimated. Depends on Phase 8 + Phase 9.

### Key Decisions

- **Personal brand** under Sameer's full name — @SameerAutomates, face forward
- **NOT niche-locked** — serves all small business owners, not just plumbers/contractors
- **Market-first strategy** — sell before building. No infrastructure spend until first client pays.
- **YouTube is the hub** — everything starts as YouTube. Twitter and Instagram are repurposing channels.
- **Human-in-the-loop publishing** — AI drafts, founder publishes. No automated posting in v2.0.
- **Buffer Essentials (~$18/mo)** — chosen over direct API integration; eliminates Twitter OAuth + Instagram Graph API complexity
- **Supadata.ai** — chosen for transcript extraction (100 free req/mo, official SDK)
- **Commander.js v14.0.3** — CLI framework (Node 20+, stable before v15 ships May 2026)
- **No custom domain** — GitHub Pages URL sufficient for now
- **Consulting positioning** — not freelancing. Expert offering. Value-based pricing.
- **[05-01] Python for both research scripts** — single venv consistency; PRAW requires Python, YouTube audit co-located
- **[05-01] Buyer-focused content is the primary positioning gap** — competitors are 90% builder-tutorials; ROI case studies and vertical-specific content are highest differentiation opportunities
- **[05-01] --from-cache flag pattern** — run once live, develop against JSON cache to avoid quota exhaustion
- **[05-02] All 6 ops/packages/ products validated** — every existing package has matching Reddit demand signal; missed-call-text-back is highest-scoring topic (HVAC/plumbing dominant)
- **[05-02] HVAC + plumbing are highest-density pain point subreddits** — target these verticals first for YouTube content
- **[05-02] is_sample_data flag** — reddit-raw.json carries is_sample_data:true for sample data; PRELIMINARY label auto-removes when real Reddit credentials are used
- **[06-01] Pain-first bio structure** — leads with the specific pain signal the audience lives every day; locked across both Twitter and Instagram
- **[06-01] CTA wording locked** — "Book a free 15-min discovery call" — no variation permitted on any platform
- **[06-01] Instagram carousel sequence locked: Pain -> Proof -> Offer** — narrative arc intentional; post order must be preserved
- **[06-01] No emojis, no hashtags in v1 posts** — brand voice rules enforced across all social copy
- **[06-02] YouTube about section real booking URL** — calendar.app.google/psycao3CrXjGnmk48 replaces placeholder; HTML comment removed
- **[06-02] CTA audit includes landing page section** — added as critical link in every funnel path beyond the 3 platform sections specified
- **[06-02] Task 3 deferred by user** — manual CTA audit + mobile funnel test batched with other platform profile updates at end of milestone
- **[07-01] TL;DR block format locked** — 3-line blockquote with Revenue recovered, Time saved, System cost labels — consistent across all case studies and capability briefs
- **[07-01] Full-depth briefs: 02 and 03 selected** — based on highest topic-bank scores (2218.5 and 2076.5) and strongest Reddit evidence; all others condensed
- **[07-01] Capability brief structure established** — full-depth: client profile + 6 sections + CTA; condensed: 5 sections + CTA; no technical jargon, clients by industry only
- **[07-02] Ramp cadence locked** — Weeks 1-2 lighter (1 YouTube + 1 Twitter + 1 Instagram), Weeks 3-4 full cadence; deferred posts kept (not deleted)
- **[07-02] De-duplication is soft penalty** — -30% score reduction, not exclusion; all 12 topics accessible via --count 12
- **[07-02] COVERED_THEMES keyword matching** — 5 theme buckets detect overlap with existing YouTube content plan

### v2.0 Roadmap Structure

- Phase 5: Platform Foundation (PLAT-01 to PLAT-04) — accounts + funnel verification
- Phase 6: Case Studies + Content Tooling (TOOL-01, TOOL-02, CASE-01 to CASE-03) — ideation + social proof
- Phase 7: Content Production + Repurposing (PROD-01, PROD-02, TOOL-03, TOOL-04) — first video + pipeline
- Phase 8: Giveaway + Social Proof (GIVE-01, GIVE-02) — trust accelerators

### Blockers / Concerns

- YouTube channel migration decision is time-sensitive — test one automation video on existing channel; if CTR < 20% of photography average, start a fresh channel (do not fight the algorithm)
- Instagram Reels API has conflicting documentation — Buffer handles this at v2.0 launch; test direct Meta Graph API before any v2.1 direct integration
- Content calendar commitment should come AFTER production SOP is proven at cadence — do not announce public posting schedule before two test production cycles complete

### Completed Assets (v1.0)

- Logo SVG package: 8 variants in `brand/`
- Brand voice guide: `brand/brand-voice.md`
- YouTube branding: banner, profile pic, about section, keywords, thumbnail template
- Landing page: `website/index.html`
- Outreach templates: `ops/outreach/` (5 files)
- Package concepts: `ops/packages/` (6 files)

### v1.0 Pending (carry forward)

- [ ] Deploy landing page to GitHub Pages
- [ ] MANUAL: Upload YouTube branding to Studio
- [ ] MANUAL: Change channel name, set handle, paste about section
- [ ] MANUAL: Set old photography videos to Unlisted

---

## Session Continuity

Last session: 2026-03-02
Stopped at: Completed 07-02 SUMMARY.md — Tasks 1+2 done. Content calendar updated with ramp model + CSV export. CLI tool built with 32 passing unit tests and all 5 flags verified.
Resume: Phase 7 Plans 01+02 are done. Next automated work is Phase 7 Plan 03 (if exists — need to check ROADMAP). Phase 6 manual tasks still pending: (1) paste updated YouTube about section into YouTube Studio, (2) complete CTA audit on each live platform, (3) run mobile funnel test on real device.
```
