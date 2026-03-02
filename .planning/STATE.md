---
gsd_state_version: 1.0
milestone: v2.0
milestone_name: Content Marketing Engine
status: unknown
last_updated: "2026-03-01T23:40:52.707Z"
progress:
  total_phases: 1
  completed_phases: 1
  total_plans: 2
  completed_plans: 2
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

| Field         | Value                                                                                                 |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| Milestone     | v2.0 — Content Marketing Engine                                                                       |
| Phase         | 6 of 8 (Phase 6: Platform Foundation) — IN PROGRESS                                                   |
| Plan          | 2 of 2 tasks 1+2 complete — paused at checkpoint:human-verify (Task 3)                                |
| Status        | Phase 6 Plan 02 paused — YouTube about section updated, audit + funnel templates ready                |
| Last activity | 2026-03-02 — Executed 06-02 Tasks 1+2; paused at checkpoint for manual CTA audit + mobile funnel test |

**Progress:**

[██████████] Phase 5 complete
Phase 6: [█████████-] 90% (Tasks 1+2 of Plan 02 complete — awaiting human verification)

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
Stopped at: Completed 06-02 Tasks 1+2 — YouTube about section updated with real booking URL, 06-CTA-AUDIT.md and 06-FUNNEL-TEST.md created. Paused at checkpoint:human-verify (Task 3).
Resume: Complete Task 3 manually — (1) paste updated about section into YouTube Studio, (2) fill CTA audit checklist on each live platform, (3) run mobile funnel test on real device. Reply "funnel verified" when all 4 paths pass.
```
