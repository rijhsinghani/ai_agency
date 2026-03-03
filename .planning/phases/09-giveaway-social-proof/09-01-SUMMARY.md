---
phase: 09-giveaway-social-proof
plan: "01"
subsystem: content
tags: [giveaway, hvac, plumbing, missed-call, lead-qualification, copywriting]

# Dependency graph
requires:
  - phase: 07-case-studies-content-tooling
    provides: case study research (02-missed-call-text-back.md) and real metrics used in giveaway
  - phase: 05-market-research-pain-point-discovery
    provides: validated pain points for HVAC/plumbing verticals
provides:
  - content/giveaways/01-missed-call-audit-hvac-plumbing.md — buyer-qualifying giveaway doc for HVAC/plumbing owners
affects:
  - phase 10 (content automation) — this file is a distribution asset for social bios and YouTube descriptions

# Tech tracking
tech-stack:
  added: []
  patterns: []

key-files:
  created:
    - content/giveaways/01-missed-call-audit-hvac-plumbing.md
  modified: []

key-decisions:
  - "5-section structure with no 'Section N' labels — headings name reader's reality, not topic categories"
  - "Friction paragraph in Section 3 informs about integration complexity without teaching the build"
  - "Reddit quote (445 upvotes, r/HVAC) attributed as community quote, not as client testimonial"
  - "CTA uses real booking URL https://calendar.app.google/psycao3CrXjGnmk48 — no placeholder"
  - "Section 5 checklist scoring threshold: yes to 3 or more = qualified lead"

patterns-established: []

requirements-completed: [GIVE-01]

# Metrics
duration: 2min
completed: "2026-03-03"
---

# Phase 09 Plan 01: Missed Call Giveaway Document Summary

**Buyer-qualifying HVAC/plumbing giveaway doc with 5-step self-audit, real ROI math ($1,200/month recovered), and booking CTA**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-03T00:48:28Z
- **Completed:** 2026-03-03T00:50:04Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Created content/giveaways/01-missed-call-audit-hvac-plumbing.md (85 lines) — a standalone readable document positioned as a self-audit for HVAC and plumbing business owners
- Document walks through the missed call math ($600 baseline, 2 jobs/month = $1,200/month), explains why manual callback fails, and shows automated system value without teaching the build
- Section 5 delivers the "audit" promised in the title: 5 yes/no questions with a scoring threshold that funnels high-fit prospects to a discovery call

## Task Commits

Each task was committed atomically:

1. **Task 1: Write buyer-qualifying giveaway document** - `dc27266` (feat)

**Plan metadata:** (to be committed with this SUMMARY)

## Files Created/Modified

- `content/giveaways/01-missed-call-audit-hvac-plumbing.md` — 85-line Markdown source document: title + subtitle, 5 sections, before/after table, 5-question checklist with scoring, CTA block with real booking URL

## Decisions Made

- 5-section structure with headings that name the reader's situation ("The math you are not tracking", "Why calling back does not fix it") rather than topic labels
- Reddit quote attributed explicitly as "from r/HVAC" to avoid implying client relationship
- Section 3 friction paragraph explains carrier/VoIP/CRM integration complexity to qualify against DIYers without providing build steps
- Self-qualifying checklist threshold set at 3 of 5 yes answers — consistent with pain point research showing this profile has measurable missed-call loss
- Real booking URL confirmed: https://calendar.app.google/psycao3CrXjGnmk48
- Document is ready to copy into Google Doc and share as "Anyone with the link can view" — that link becomes the download URL for social bios and YouTube descriptions

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

**Distribution note:** Copy the content of `content/giveaways/01-missed-call-audit-hvac-plumbing.md` into a Google Doc. Set sharing to "Anyone with the link can view." The Google Doc share URL becomes the download link for YouTube descriptions, social bios, and any other distribution channels.

## Next Phase Readiness

- Giveaway document ready for distribution as a Google Doc / PDF
- Phase 9 Plan 02 (social proof assets) can now proceed
- Document uses all real numbers from ops/packages/missed-call-text-back.md and research/case-studies/02-missed-call-text-back.md — no invented figures

## Self-Check: PASSED

- FOUND: content/giveaways/01-missed-call-audit-hvac-plumbing.md
- FOUND: .planning/phases/09-giveaway-social-proof/09-01-SUMMARY.md
- FOUND: commit dc27266 (feat(09-01): write buyer-qualifying missed call giveaway document)

---

_Phase: 09-giveaway-social-proof_
_Completed: 2026-03-03_
