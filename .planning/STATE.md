---
gsd_state_version: 1.0
milestone: v2.0
milestone_name: Content Marketing Engine
status: unknown
last_updated: "2026-03-02T22:48:36.940Z"
progress:
  total_phases: 6
  completed_phases: 3
  total_plans: 19
  completed_plans: 9
  percent: 47
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

| Field         | Value                                                                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Milestone     | v2.0 — Content Marketing Engine                                                                                                                         |
| Phase         | 8 of 8 (Phase 8: Content Production + Repurposing) — IN PROGRESS                                                                                        |
| Plan          | 2 of 3 complete — 08-01 production SOP checklists + 08-02 repurposing script CLI done                                                                   |
| Status        | Phase 8 Plan 02 complete — repurposing script CLI built (26 tests), 4 lib modules, review/.gitkeep, .gitignore updated; Plan 03 pending                 |
| Last activity | 2026-03-02 — 08-02 SUMMARY.md finalized; sameer-repurpose CLI built with Supadata + Claude API, BANNED_PHRASES enforced, transcript caching implemented |

**Progress:**

[█████░░░░░] 47%
Phase 8: [██████░░░░] Plans 01+02 of 3 complete (SOP checklists, repurposing CLI)

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
| Phase 08-content-production-repurposing P01 | 2 | 2 tasks | 4 files |
| Phase 08-content-production-repurposing P03 | 3 | 2 tasks | 8 files |
| Phase 08-content-production-repurposing P02 | 3m | 2 tasks | 12 files |

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
- **[08-01] Pre-film verification checklist embedded in outline template** — ensures filming does not start before outline is complete; outline and pre-flight in same file
- **[08-01] Tool-agnostic editing checklist** — outcome-based items only, no software-specific menu references; durable across Final Cut, Premiere, DaVinci, or any future tool
- **[08-01] Two-CTA rule documented in editing checklist** — mid-video at 60% mark + end screen at 15 seconds; surfaced in both outline-template and editing checklist
- **[08-01] Description template hardcoded in publish checklist** — booking URL, hashtags, and chapter structure locked; reduces switching cost
- **[08-02] Booking URL hardcoded in every Twitter and Instagram prompt in formatter.js** — permanent brand asset, no variation permitted
- **[08-02] BANNED_PHRASES injected into Claude system prompt on every generation call** — brand voice enforced at API level, not post-processing
- **[08-02] review/*.md gitignored, review/.gitkeep tracked** — draft files are working artifacts, directory preserved in fresh clones
- **[08-02] Transcript caching to review/[slug]-transcript.txt** — --from-cache flag skips Supadata credit on reruns

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
Stopped at: Completed 08-02 SUMMARY.md — Tasks 1+2 done. Repurposing script CLI built with 26 passing Jest tests, 4 lib modules (transcript, formatter, generator, queue), Commander.js entry point with --url/--from-cache/--title flags, review/.gitkeep, .gitignore updated.
Resume: Phase 8 Plans 01+02 are done. Next automated work is Phase 8 Plan 03 (if exists). Phase 6 manual tasks still pending: (1) paste updated YouTube about section into YouTube Studio, (2) complete CTA audit on each live platform, (3) run mobile funnel test on real device.
```
