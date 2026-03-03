---
gsd_state_version: 1.0
milestone: v2.0
milestone_name: Content Marketing Engine
status: unknown
last_updated: "2026-03-03T00:58:37.272Z"
progress:
  total_phases: 6
  completed_phases: 4
  total_plans: 19
  completed_plans: 11
  percent: 58
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

| Field         | Value                                                                                                     |
| ------------- | --------------------------------------------------------------------------------------------------------- |
| Milestone     | v2.0 — Content Marketing Engine                                                                           |
| Phase         | 9 of 9 (Phase 9: Giveaway + Social Proof) — COMPLETE                                                      |
| Plan          | 2 of 2 complete — 09-01 HVAC/plumbing missed call giveaway doc + 09-02 social proof replacement done      |
| Status        | Phase 9 Plan 02 complete — 6 fictional testimonials removed, real Raj PV proof block + Reddit cards added |
| Last activity | 2026-03-03 — 09-02 SUMMARY.md finalized; website social proof sections replaced with real data            |

**Progress:**

[██████░░░░] 58%
Phase 8: [██████████] Plans 01+02+03 of 3 complete (SOP checklists, repurposing CLI, video clipper)
Phase 9: [██████████] Plans 01+02 of 2 complete (giveaway doc + social proof replacement)

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
| Phase 09-giveaway-social-proof P01 | 2 | 1 tasks | 1 files |
| Phase 09-giveaway-social-proof P02 | 6 | 3 tasks | 1 files |

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
- **[08-03] Use literal /tmp/ path in writeSrtToTemp** — os.tmpdir() returns /private/var/folders/... on macOS, not /tmp/; literal /tmp/ ensures ffmpeg subtitles filter works without path issues
- **[08-03] spawn(ffmpegPath, argsArray) with no shell:true** — prevents shell injection with user-supplied file paths in video-clipper
- **[08-03] ffmpeg-static bundled binary** — no system ffmpeg dependency required; tool works on any machine without global ffmpeg install
- **[08-02] Booking URL hardcoded in every Twitter and Instagram prompt in formatter.js** — permanent brand asset, no variation permitted
- **[08-02] BANNED_PHRASES injected into Claude system prompt on every generation call** — brand voice enforced at API level, not post-processing
- **[08-02] review/*.md gitignored, review/.gitkeep tracked** — draft files are working artifacts, directory preserved in fresh clones
- **[08-02] Transcript caching to review/[slug]-transcript.txt** — --from-cache flag skips Supadata credit on reruns
- **[09-02] Pull quote attribution uses business type only** — "wedding + event photography studio" preserves client privacy while remaining credible; no client name on public page
- **[09-02] Reddit community voice cards use r/ avatar badge** — clearly distinguishes community quotes from client testimonials; avoids misleading trust signals
- **[09-02] Hybrid social proof layout: proof block (md:col-span-2) + 3 Reddit cards** — real case study dominates visually, community voices supplement without fabrication
- **[09-01] Giveaway section headings name reader's reality** — "The math you are not tracking" not "Section 1: Introduction"; pattern for all future giveaway docs
- **[09-01] Reddit quote attributed as community quote, not client** — "from r/HVAC, 445 upvotes" framing avoids implying client relationship
- **[09-01] Section 3 friction paragraph qualifies against DIYers** — explains carrier/VoIP/CRM integration complexity without providing build steps
- **[09-01] Checklist scoring threshold is 3 of 5** — calibrated to match pain point research for measurable missed-call revenue loss

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

Last session: 2026-03-03
Stopped at: Completed 09-02 SUMMARY.md — Tasks 1+2+3 done. 6 fictional testimonials (Mike Ramirez et al.) removed from website/index.html. Real Raj Photo Video proof block + 3 Reddit community voice cards added to testimonials section. Case study metrics card updated with real numbers (4+ hrs to 60 sec, $4,200/mo recovered). Phase 9 all 2 plans complete.
Resume: Phase 9 complete (giveaway doc + social proof replacement). Next: Phase 10 (v3.0 Content Automation Pipeline) per ROADMAP. Phase 6 manual tasks still pending: (1) paste updated YouTube about section into YouTube Studio, (2) complete CTA audit on each live platform, (3) run mobile funnel test on real device. Giveaway doc ready to copy into Google Doc — set "Anyone with link can view" and use URL in social bios.
```
