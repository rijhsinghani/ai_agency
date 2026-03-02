---
phase: 06-platform-foundation
plan: 01
subsystem: content
tags: [copywriting, twitter, instagram, social-media, brand-voice, carousel]

# Dependency graph
requires:
  - phase: 05-market-research-pain-point-discovery
    provides: topic-bank.md with ranked pain points and Reddit evidence quotes
  - phase: 01-brand-foundation
    provides: brand-voice.md, YouTube branding assets (banner SVG, profile pics)
provides:
  - Twitter bio copy (3 options, all under 160 chars, pain-first, exact CTA wording)
  - Twitter pinned thread (5 tweets, under 280 chars each, who/what/proof/CTA structure)
  - Twitter header adaptation brief (1500x500, safe zone guidance, Canva instructions)
  - Instagram bio copy (3 options, all under 150 chars, pain-first with line breaks)
  - Instagram carousel captions for 3 posts (Pain, Proof, Offer sequence)
  - Instagram carousel design brief (1080x1350, full brand spec for Canva production)
affects:
  - 06-02 (website and landing page funnel)
  - Phase 7 content production (social post templates established)
  - Any phase touching @SameerAutomates brand voice on social

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Pain-first bio structure: pain signal -> what I build -> booking CTA"
    - "Tweet thread structure: Hook -> Identity -> Services -> Proof -> CTA"
    - "Carousel structure: Pain amplification -> Fix hint -> CTA (Post 01), Lead with result (Post 02), One service per slide (Post 03)"
    - "All copy: no emojis, no hashtags, direct peer-level tone, contractions used"

key-files:
  created:
    - .planning/phases/06-platform-foundation/copy/twitter-bio.md
    - .planning/phases/06-platform-foundation/copy/twitter-thread.md
    - .planning/phases/06-platform-foundation/copy/twitter-header-brief.md
    - .planning/phases/06-platform-foundation/copy/instagram-bio.md
    - .planning/phases/06-platform-foundation/copy/ig-post-01-captions.md
    - .planning/phases/06-platform-foundation/copy/ig-post-02-captions.md
    - .planning/phases/06-platform-foundation/copy/ig-post-03-captions.md
    - .planning/phases/06-platform-foundation/copy/ig-carousel-design-brief.md
  modified: []

key-decisions:
  - "Pain-first bio structure chosen over feature-first — leads with the problem the audience lives every day"
  - "No emojis, no hashtags in v1 posts — brand voice rules enforced across all copy"
  - "CTA wording locked: 'Book a free 15-min discovery call' — no variation across any platform"
  - "Instagram carousel sequence locked as Pain -> Proof -> Offer — narrative arc intentional"
  - "Topic-bank rank 4 (Missed Calls) and rank 9 (Slow Follow-Up) sourced directly as hook data"
  - "Task 3 (profile setup) deferred by user — all copy and design assets ready for founder to upload manually"

patterns-established:
  - "Pain -> What I build -> CTA: locked bio structure for all social profiles"
  - "Lead with result, not process: proof post opens with $4,200 recovered, not 'I built a system'"
  - "Slide 1 = scroll-stopper: every carousel hook slide must carry a specific number from research data"

requirements-completed:
  - PLAT-01
  - PLAT-02

# Metrics
duration: ~45min
completed: 2026-03-02
---

# Phase 6 Plan 01: Twitter and Instagram Copy Assets Summary

**8 social media copy files produced — Twitter bio/thread/header brief and Instagram bio/3 carousels/design brief — all sourced from topic-bank pain data, brand voice rules enforced, ready for manual profile setup.**

## Performance

- **Duration:** ~45 min
- **Started:** 2026-03-02
- **Completed:** 2026-03-02
- **Tasks:** 2 of 3 executed (Task 3 deferred by user)
- **Files modified:** 8

## Accomplishments

- Twitter copy complete: 3 bio options (all under 160 chars), 5-tweet pinned thread (all under 280 chars), header adaptation brief for Canva (1500x500, safe zone guidance, source SVG referenced)
- Instagram copy complete: 3 bio options (all under 150 chars), 3 carousel caption sets (Pain/Proof/Offer sequence), and full design brief for Canva carousel production (1080x1350, brand colors, typography, file naming)
- All copy sourced from real research: pain hooks drawn from topic-bank.md rank 4 and rank 9; $4,200 recovered / $200/mo case study anchors the Proof post; all 6 ops/packages/ services named in Offer post

## Task Commits

Each task was committed atomically:

1. **Task 1: Write Twitter profile copy and header adaptation brief** - `e44bc9d` (feat)
2. **Task 2: Write Instagram profile copy, carousel captions, and design brief** - `721ae03` (feat)
3. **Fix: Trim Tweet 3 to fit 280-character limit** - `67dc76c` (fix)
4. **Task 3: Human sets up Twitter and Instagram profiles** - DEFERRED (user will complete manually)

## Files Created/Modified

- `.planning/phases/06-platform-foundation/copy/twitter-bio.md` - 3 Twitter bio options, all under 160 chars, pain-first, with exact CTA wording and character counts
- `.planning/phases/06-platform-foundation/copy/twitter-thread.md` - 5-tweet pinned intro thread (Hook/Identity/Services/Proof/CTA), character counts per tweet
- `.planning/phases/06-platform-foundation/copy/twitter-header-brief.md` - Design brief for adapting banner-v1-system-architecture.svg to 1500x500 in Canva
- `.planning/phases/06-platform-foundation/copy/instagram-bio.md` - 3 Instagram bio options, all under 150 chars, line breaks used, pain-first
- `.planning/phases/06-platform-foundation/copy/ig-post-01-captions.md` - Pain carousel (6 slides): missed-call pain point, slide text + caption
- `.planning/phases/06-platform-foundation/copy/ig-post-02-captions.md` - Proof carousel (5 slides): $4,200/$200/mo case study, slide text + caption
- `.planning/phases/06-platform-foundation/copy/ig-post-03-captions.md` - Offer carousel (8 slides): 6 automation services, slide text + caption
- `.planning/phases/06-platform-foundation/copy/ig-carousel-design-brief.md` - Full Canva production spec: dimensions, colors, typography, elements, export settings

## Decisions Made

- Pain-first bio structure chosen over feature-first on both platforms — leads with the specific problem the audience already feels, not a description of services
- CTA wording is locked across all copy: "Book a free 15-min discovery call" — no variation permitted
- Instagram carousel sequence is locked as Pain -> Proof -> Offer — narrative arc is intentional (establish problem, prove credibility, present solution)
- No emojis, no hashtags in any v1 posts — brand voice rules enforced throughout
- Topic-bank.md rank 4 (Missed Calls Losing Customers) and rank 9 (Leads Going Cold from Slow Response Times) are the primary pain data sources for hooks
- Task 3 (manual profile upload) deferred at user's request — all assets are production-ready when founder is ready to publish

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Tweet 3 exceeded 280-character limit**

- **Found during:** Post-task verification of twitter-thread.md
- **Issue:** Tweet 3 (Services) was over the 280-character Twitter limit
- **Fix:** Condensed the services list while preserving all 6 automation names
- **Files modified:** .planning/phases/06-platform-foundation/copy/twitter-thread.md
- **Verification:** Character count confirmed at or under 280 after fix
- **Committed in:** 67dc76c (fix commit)

---

**Total deviations:** 1 auto-fixed (1 bug — character count)
**Impact on plan:** Character count fix necessary for correctness. No scope creep.

### Deferred Items

**Task 3: Human sets up Twitter and Instagram profiles**

- **Status:** Deferred by user on 2026-03-02
- **User decision:** "I'll do all of the profile updates at the end. Let's move on."
- **What's needed:** Upload profile pics, paste bio copy, publish pinned thread, create carousel slides in Canva, post all 3 Instagram carousels
- **Assets ready:** All 8 copy files are production-ready. No additional copy work needed.
- **To pick up:** Follow instructions in each copy file in `.planning/phases/06-platform-foundation/copy/`

## User Setup Required

**Profile setup deferred to later.** Founder will complete these steps manually when ready:

**Twitter (@SameerAutomates):**

1. Upload `brand/youtube/profile-pic-headshot.png` as profile picture
2. Paste chosen bio from `copy/twitter-bio.md` — put landing page URL in Website field
3. Follow `copy/twitter-header-brief.md` to adapt banner SVG to 1500x500 in Canva, upload as header
4. Compose all 5 tweets from `copy/twitter-thread.md` as a thread, post, then pin Tweet 1

**Instagram (@SameerAutomates):**

1. Upload `brand/youtube/profile-pic-headshot.png` as profile picture
2. Paste chosen bio from `copy/instagram-bio.md` — put landing page URL in Website/Links field
3. Follow `copy/ig-carousel-design-brief.md` to create all carousel slides in Canva (1080x1350)
4. Post all 3 carousels using captions from ig-post-01, ig-post-02, ig-post-03 — post in order (Pain first, Proof second, Offer third)

## Issues Encountered

None — plan executed cleanly for automated tasks. Task 3 deferred by user decision, not a blocker.

## Next Phase Readiness

- All social copy assets are complete and ready for upload at any time
- Phase 6 Plan 02 (website/funnel verification) can proceed independently — no dependency on Task 3 being complete
- Profile setup can be batched with other manual platform tasks from v1.0 pending list (YouTube branding upload, channel name, about section)

---

_Phase: 06-platform-foundation_
_Completed: 2026-03-02_
