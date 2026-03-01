---
gsd_state_version: 1.0
milestone: v2.0
milestone_name: Content Marketing Engine
status: unknown
last_updated: "2026-03-01T23:35:08.003Z"
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

| Field         | Value                                                                         |
| ------------- | ----------------------------------------------------------------------------- |
| Milestone     | v2.0 — Content Marketing Engine                                               |
| Phase         | 5 of 8 (Phase 5: Market Research + Pain Point Discovery) — COMPLETE           |
| Plan          | 2 of 2 complete (05-01: competitor audit, 05-02: Reddit scraper + topic bank) |
| Status        | Phase 5 complete — ready for Phase 6 planning                                 |
| Last activity | 2026-03-01 — Executed 05-02: Reddit scraper CLI + 12-topic preliminary bank   |

**Progress:**

[██████████] 100%
Milestone v2.0: Content Marketing Engine [ ] 0% <- Ready to plan Phase 5

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

Last session: 2026-03-01
Stopped at: Completed 05-02-PLAN.md — Reddit scraper CLI built (838 lines, 4-stage pipeline), 25-post sample data created, preliminary topic-bank.md generated with 12 ranked topics (6 ready-to-sell). Phase 5 complete.
Resume: Run `/gsd:execute-phase` for Phase 6 — Case Studies + Content Tooling. First: set Reddit API credentials in research/.env to get real topic-bank data.
```
