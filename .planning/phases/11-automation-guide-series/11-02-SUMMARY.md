---
phase: 11-automation-guide-series
plan: 02
subsystem: ui
tags: [puppeteer, pdf, html, tailwind, svg, branding, github-pages]

# Dependency graph
requires:
  - phase: 11-01
    provides: guide markdown files, guide-generator CLI with renderPDF + renderPreview functions

provides:
  - 5 branded dark-theme PDFs in website/guides/ (missed-call-textback, review-automation, monday-pipeline, quote-writer, no-show-killer)
  - 5 preview PNGs for landing page thumbnails
  - 5 individual guide landing pages with hook, preview image, download button, soft CTA
  - 1 hub index page at website/guides/index.html with 5-guide responsive grid
  - Brand logo icon (S-wave gradient) in nav of all 6 HTML pages and top-right corner of all PDF pages

affects: [github-pages deployment, social distribution, content marketing]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Inline SVG logo in nav: flex items-center gap-2 with 24px logo icon + brand wordmark"
    - "PDF logo placement: .logo class with position absolute, top 24px, right 32px, z-index 2"
    - "Dark PDF rendering: printBackground true + -webkit-print-color-adjust exact enforced"
    - "Preview PNG: 816x400 clip of first page via puppeteer screenshot"

key-files:
  created:
    - website/guides/index.html
    - website/guides/missed-call-textback.html
    - website/guides/review-automation.html
    - website/guides/monday-pipeline.html
    - website/guides/quote-writer.html
    - website/guides/no-show-killer.html
    - website/guides/missed-call-textback.pdf
    - website/guides/review-automation.pdf
    - website/guides/monday-pipeline.pdf
    - website/guides/quote-writer.pdf
    - website/guides/no-show-killer.pdf
    - website/guides/missed-call-textback-preview.png
    - website/guides/review-automation-preview.png
    - website/guides/monday-pipeline-preview.png
    - website/guides/quote-writer-preview.png
    - website/guides/no-show-killer-preview.png
  modified:
    - research/tools/guide-generator/lib/template.js

key-decisions:
  - "brand/logo-icon-light.svg inlined as SVG in template.js — no external file reference needed in PDF, works offline"
  - "Placeholder logo SVG in template.js replaced with actual brand icon (S-wave path, atmospheric halos, gradient nodes)"
  - "Logo added to HTML nav as 24px inline SVG beside brand wordmark — consistent across all 6 pages"

patterns-established:
  - "Logo in nav: always use flex items-center gap-2 with inline SVG at 24x24 + font-display wordmark"
  - "PDF logo: position absolute in .page container, top-right, opacity 0.85, z-index 2 above dot grid"

requirements-completed: [GUIDE-PDF, GUIDE-VISUAL, GUIDE-HOSTING, GUIDE-CTA]

# Metrics
duration: 15min
completed: 2026-03-03
---

# Phase 11 Plan 02: PDF Rendering + Landing Pages Summary

**5 branded dark-theme PDF guides rendered via puppeteer with real brand logo, 5 preview PNGs, 5 landing pages, and 1 hub index — all logo-branded and deployed to website/guides/**

## Performance

- **Duration:** ~15 min (continuation from checkpoint approval)
- **Started:** 2026-03-03T14:00:00Z
- **Completed:** 2026-03-03T14:21:00Z
- **Tasks:** 2 (Task 1 from prior session, Task 2 logo fix after checkpoint approval)
- **Files modified:** 17

## Accomplishments

- 5 branded PDF guides (dark #1A1A1A background, 3 pages each) rendered via puppeteer from markdown
- 5 landing pages with hook text, preview image, download button (no email gate), soft CTA footer
- 1 hub index page at website/guides/index.html with responsive 3-column grid
- Real brand logo (S-wave gradient icon from brand/logo-icon-light.svg) now appears in top-right corner of every PDF page and in the nav of every landing page and hub index
- All files committed and ready for GitHub Pages deployment

## Task Commits

Each task was committed atomically:

1. **Task 1: Render 5 PDFs with preview images and build all landing pages** - `79dd5ac` (feat)
2. **Task 2 (logo fix): Add brand logo to PDF guides and landing pages** - `c645574` (feat)

## Files Created/Modified

- `research/tools/guide-generator/lib/template.js` - Updated: replaced placeholder logo SVG with actual brand/logo-icon-light.svg content
- `website/guides/index.html` - Hub page: 5-guide responsive grid, logo in nav
- `website/guides/missed-call-textback.html` - Landing page: The 30-second save, logo in nav
- `website/guides/review-automation.html` - Landing page: The review machine, logo in nav
- `website/guides/monday-pipeline.html` - Landing page: The Monday morning pipeline, logo in nav
- `website/guides/quote-writer.html` - Landing page: The quote that writes itself, logo in nav
- `website/guides/no-show-killer.html` - Landing page: The no-show killer, logo in nav
- `website/guides/*.pdf` (5 files) - Re-rendered with brand logo in top-right corner of each page
- `website/guides/*-preview.png` (5 files) - Re-rendered preview PNGs showing logo in corner

## Decisions Made

- Brand logo inlined as SVG in template.js rather than referenced as external file — ensures PDF rendering works without file path resolution; logo renders correctly regardless of puppeteer working directory
- Logo added to HTML pages as inline SVG (24px) beside brand wordmark in nav — consistent with landing page design system, no external image dependency

## Deviations from Plan

### Post-Checkpoint Fix (User Feedback)

**Logo addition — user-requested fix after visual checkpoint approval**

- **Found during:** Task 2 checkpoint — user approved design but noted logo was missing
- **Issue:** template.js had a placeholder SVG that didn't match the actual brand/logo-icon-light.svg; HTML pages had no logo at all
- **Fix:** Updated template.js with real brand SVG (S-wave path with halos and gradient nodes); added 24px logo icon to nav of all 6 HTML files; re-rendered all 5 PDFs and 5 preview PNGs
- **Files modified:** template.js, all 6 HTML files, all 5 PDFs, all 5 PNGs
- **Committed in:** c645574

---

**Total deviations:** 1 (user-requested logo addition from checkpoint feedback)
**Impact on plan:** Logo was specified in 11-DESIGN.md ("small logo icon in top-right corner") but the original placeholder SVG wasn't the real brand icon. Fix applied correctly.

## Issues Encountered

None — re-render completed cleanly on first run after logo update.

## Next Phase Readiness

- All 5 guide PDFs, preview PNGs, landing pages, and hub index are complete and committed
- Files are ready for GitHub Pages deployment at sameerautomations.com/guides/ (GitHub Pages activation is out of scope for this phase)
- Social post drafts for all 5 guides are in research/tools/repurposing-script/review/ (from Plan 03) and ready for posting
- Phase 11 is now fully complete (Plans 01, 02, 03 all done)

---

_Phase: 11-automation-guide-series_
_Completed: 2026-03-03_
