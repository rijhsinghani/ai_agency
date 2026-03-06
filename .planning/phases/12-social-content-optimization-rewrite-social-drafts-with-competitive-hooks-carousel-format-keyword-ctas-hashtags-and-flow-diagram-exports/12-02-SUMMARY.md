---
phase: 12-social-content-optimization
plan: "02"
subsystem: tooling
tags: [puppeteer, carousel, instagram, png, cli, commander, nodejs]

# Dependency graph
requires:
  - phase: 11-automation-guide-series
    provides: getFlowDiagram() SVG function from guide-generator/lib/template.js
provides:
  - carousel-generator CLI at research/tools/carousel-generator/
  - 45 PNG files: 7 carousel slides + flow-square + flow-landscape per guide
  - Reusable slide content registry (SLIDE_DATA) for all 5 guides
affects:
  - social-content (ready-to-post Instagram carousel assets)

# Tech tracking
tech-stack:
  added: [puppeteer@24, commander@14]
  patterns:
    - "Shared browser instance per guide run (open once, render all 9 assets, close)"
    - "Request interception to block CDN fonts and prevent setContent timeout on reuse"
    - "try/finally browser.close() for guaranteed cleanup"
    - "getFlowDiagram imported from guide-generator — no SVG duplication"

key-files:
  created:
    - research/tools/carousel-generator/package.json
    - research/tools/carousel-generator/index.js
    - research/tools/carousel-generator/lib/slides.js
    - research/tools/carousel-generator/lib/template.js
    - research/tools/carousel-generator/lib/flow-template.js
    - research/tools/carousel-generator/lib/renderer.js
    - research/tools/carousel-generator/output/.gitkeep
    - research/tools/carousel-generator/.gitignore

key-decisions:
  - "Block Google Fonts CDN via request interception instead of networkidle0/2 — prevents navigation timeout when reusing page across multiple setContent calls"
  - "domcontentloaded wait sufficient since fonts blocked; system-ui (San Francisco) renders immediately as DM Sans fallback"
  - "7 slides per guide: hook/problem/math/fix/proof/flow/cta — consistent narrative arc"
  - "Output organized as output/{slug}/slide-NN.png + flow-square.png + flow-landscape.png"

patterns-established:
  - "Pattern: page._interceptingRequests flag prevents double-registration of request interceptor on reused page object"
  - "Pattern: renderPNGWithPage(page, html, path, w, h) + shared browser = batch render efficiency"

requirements-completed: [SOC-03, SOC-04, SOC-06]

# Metrics
duration: 6min
completed: "2026-03-06"
---

# Phase 12 Plan 02: Carousel Generator Summary

**Puppeteer-based carousel-generator CLI producing 45 PNGs (7 slides + 2 flow diagrams per guide) for all 5 automation guides at exact Instagram dimensions (1080x1080 carousel, 1200x675 landscape)**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-06T01:05:50Z
- **Completed:** 2026-03-06T01:11:23Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments

- Built carousel-generator CLI with --guide and --all flags mirroring guide-generator structure
- 35 carousel slides across 5 guides (7 per guide: hook, problem, math, fix, proof, flow, CTA)
- 10 flow diagram PNGs (5 square 1080x1080 + 5 landscape 1200x675) reusing SVGs from guide-generator
- All PNGs verified at correct dimensions via `file` command

## Task Commits

Each task was committed atomically:

1. **Task 1: Build carousel-generator CLI with slide content, HTML templates, and PNG renderer** - `70ae218` (feat)
2. **Task 2: Generate all carousel slides and flow diagrams for all 5 guides** - `9e8efeb` (feat)

## Files Created/Modified

- `research/tools/carousel-generator/package.json` - commander + puppeteer deps
- `research/tools/carousel-generator/index.js` - CLI entry point with --guide/--all/--output flags
- `research/tools/carousel-generator/lib/slides.js` - SLIDE_DATA registry for all 5 guides (7 slides each)
- `research/tools/carousel-generator/lib/template.js` - buildSlideHTML returning 1080x1080 dark-theme HTML with gradient accents and SVG flow embed
- `research/tools/carousel-generator/lib/flow-template.js` - buildFlowHTML for square and landscape flow diagram assets
- `research/tools/carousel-generator/lib/renderer.js` - renderPNGWithPage with request interception + try/finally browser.close()
- `research/tools/carousel-generator/output/.gitkeep` - preserve output directory in git
- `research/tools/carousel-generator/.gitignore` - exclude node_modules/ and generated PNG subdirectories

## Decisions Made

- **Block Google Fonts CDN requests** — using `page.setRequestInterception(true)` to abort fonts.googleapis.com and fonts.gstatic.com requests. When reusing a page across multiple `setContent()` calls, `networkidle0` and `networkidle2` both timeout because previous page's pending network connections confuse the lifecycle watcher. Blocking external resources and using `domcontentloaded` is reliable and fast.
- **System-ui font fallback** — DM Sans blocked at CDN level; system-ui (San Francisco on macOS) renders with the same clean sans-serif aesthetic. Acceptable for this local tooling context.
- **7 slides per guide** — hook/problem/math/fix/proof/flow/cta. Consistent narrative arc per CONTEXT.md decision. Dollar-math pain anchors from guide data used throughout.
- **page.\_interceptingRequests flag** — prevents double-registration of request event listener when `renderPNGWithPage` is called multiple times on the same page object.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed navigation timeout on repeated setContent calls**

- **Found during:** Task 1 (renderer verification)
- **Issue:** Using `networkidle0`/`networkidle2` with `page.setContent()` on a reused page caused 30-60s navigation timeouts on the second slide render. CDN font requests left from the first render interfered with networkidle lifecycle detection.
- **Fix:** Added request interception to block Google Fonts CDN requests; switched to `domcontentloaded` wait strategy. DM Sans falls back to system-ui which renders immediately.
- **Files modified:** `research/tools/carousel-generator/lib/renderer.js`
- **Verification:** All 7 slides + 2 flow diagrams for missed-call-textback rendered without errors
- **Committed in:** `70ae218` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug)
**Impact on plan:** Required fix for core rendering to work. No scope creep. DM Sans CDN dependency traded for system-ui fallback; visual quality maintained.

## Issues Encountered

- Initial `networkidle0` and `networkidle2` strategies both failed on page reuse — root cause was CDN request lifecycle interference. Resolved with request interception approach.

## User Setup Required

None - no external service configuration required. Tool runs locally with `node index.js --all`.

## Next Phase Readiness

- 45 PNG files ready for Instagram carousel publishing
- Flow diagrams ready for Stories (1080x1080) and YouTube community posts (1200x675)
- Slide content follows Hormozi hook structure with dollar-math pain anchors per CONTEXT.md
- Run `node research/tools/carousel-generator/index.js --all` at any time to regenerate all assets

---

_Phase: 12-social-content-optimization_
_Completed: 2026-03-06_
