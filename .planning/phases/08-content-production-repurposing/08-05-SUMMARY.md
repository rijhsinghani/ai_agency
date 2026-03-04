---
phase: 08-content-production-repurposing
plan: "05"
subsystem: testing
tags:
  [
    jest,
    cta-modes,
    repurposing-script,
    formatter,
    generator,
    video-outline,
    sop,
  ]

# Dependency graph
requires:
  - phase: 08-content-production-repurposing
    provides: formatter.js and generator.js with CTA mode implementation (value/soft/booking)
provides:
  - Test coverage for all three CTA modes in formatter.test.js and generator.test.js
  - Video-1-outline.md Section 3 with soft mid-video CTA (no booking URL)
  - outline-template.md with explicit guidance to use soft engagement at mid-video CTA
affects: [content production, UAT-5 gap closure]

# Tech tracking
tech-stack:
  added: []
  patterns:
    [
      CTA mode tests assert URL presence/absence per mode,
      clip_script is CTA-mode-invariant,
    ]

key-files:
  created: []
  modified:
    - research/tools/repurposing-script/__tests__/formatter.test.js
    - research/tools/repurposing-script/__tests__/generator.test.js
    - content/videos/Video-1-outline.md
    - ops/sop/outline-template.md

key-decisions:
  - "Mid-video CTA (Section 3) is soft engagement only — booking URL is confined to Section 6 end card"
  - "clip_script CTA tests assert value/soft/booking produce identical output — by design, clip_script ignores ctaMode"

patterns-established:
  - "CTA mode tests: assert no booking URL for value/soft modes; assert URL presence for booking mode"
  - "Mid-video CTA rule: soft engagement teasers only — no URLs, no booking pitches before Section 6"

requirements-completed: [PROD-01, PROD-02, TOOL-03, TOOL-04]

# Metrics
duration: 3min
completed: 2026-03-04
---

# Phase 08 Plan 05: CTA Mode Test Coverage + Video Outline Fix Summary

**CTA mode tests added (9 formatter + 3 generator), Section 3 booking CTA replaced with soft engagement line, outline template updated with explicit mid-video CTA guidance**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-04T18:49:04Z
- **Completed:** 2026-03-04T18:51:14Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- formatter.test.js: 9 new tests covering all three CTA modes (value/soft/booking) for twitter and instagram, plus default-is-value and clip_script-is-identical assertions
- generator.test.js: 3 new tests confirming ctaMode passthrough reaches buildPrompt (booking mode includes URL, value/default modes exclude it)
- Video-1-outline.md Section 3 mid-video CTA replaced: "If this is something you're dealing with in your business, stick around — I'll show you the numbers in a second." (no booking URL)
- ops/sop/outline-template.md: Added explicit guidance block explaining mid-video CTA must be soft engagement, not a booking pitch — with good/bad examples

## Task Commits

1. **Task 1: Add CTA mode test coverage to formatter.test.js and generator.test.js** - `d438b14` (test)
2. **Task 2: Fix Video-1-outline.md mid-video CTA and update outline template guidance** - `86d3838` (fix)

## Files Created/Modified

- `research/tools/repurposing-script/__tests__/formatter.test.js` - 9 new CTA mode tests in new describe block
- `research/tools/repurposing-script/__tests__/generator.test.js` - 3 new ctaMode passthrough tests in new describe block
- `content/videos/Video-1-outline.md` - Section 3 CTA replaced with soft engagement (booking URL removed from mid-video position)
- `ops/sop/outline-template.md` - Explicit note added after Section 3 CTA placeholder: do NOT use booking link mid-video

## Decisions Made

- Mid-video CTA (Section 3) is soft engagement only — booking URL is confined to Section 6 end card. This matches the UAT Test #5 expectation and the two-CTA rule documented in 08-01.
- clip_script CTA tests assert all three modes produce identical output — by design, clip_script ignores ctaMode since it selects a clip moment, not a social post ending.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- `jest` command not found on first test run — `npm install` in repurposing-script directory resolved it (node_modules were not committed). Tests passed on second run.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- UAT Test #5 gap is fully closed: CTA variability tested in code, mid-video content corrected, SOP template updated
- All 37 repurposing-script tests pass
- Phase 08 all plans complete (01+02+03+05)

---

_Phase: 08-content-production-repurposing_
_Completed: 2026-03-04_
