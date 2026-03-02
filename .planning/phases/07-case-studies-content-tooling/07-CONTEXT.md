# Phase 7: Case Studies + Content Tooling - Context

**Gathered:** 2026-03-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver a working content idea CLI, document case study #1, create a reusable case study template, build a demo capability library covering 3-5 automation use cases, and finalize a 4-week content calendar. All deliverables must be ready before filming begins (Phase 8). No video production, no social media posting, no content distribution automation in this phase.

</domain>

<decisions>
## Implementation Decisions

### Content idea CLI behavior

- Parser strategy for topic-bank.md: Claude's discretion — choose between line-by-line state machine or lightweight Markdown parser (marked) based on the actual file structure. Prioritize defensive parsing that fails clearly on format changes.
- De-duplication against YouTube content plan: Claude's discretion — choose between keyword matching or category-based matching. The spec's "closely overlaps" definition needs a concrete rule before writing code.
- Installation: use npx local execution (`npx ./research/tools/content-idea-cli`) — zero setup friction, works from repo root, no global install needed.
- Output style: clean by default, verbose with `--verbose` flag. Default output shows topics + hooks only. Verbose mode adds scores, penalties, de-dup reasons.
- Tech stack locked: Node.js, Commander.js v14.0.3, CommonJS modules, local-only (no network), Markdown to stdout.
- Spec already exists at `research/tools/content-idea-cli-spec.md` — implementation should follow it closely.

### Demo capability library (CASE-03)

- Format: capability briefs — one-page documents per use case (problem, solution overview, expected ROI, real evidence). Sales-focused, not technical. Fastest to produce.
- Industry targeting: follow the package lineup — one demo per existing package (missed call text-back, lead follow-up, quote follow-up, review automation, appointment reminders). Maps to 5 demos, each tied to a sellable product.
- Depth: tiered approach — top 2 use cases get full case-study depth (~130 lines with narrative and before/after). Remaining 3 get condensed briefs (~50 lines). Balances quality and production speed.
- ROI sourcing: combine package ROI calculations with real Reddit evidence. Package files have exact pricing/ROI examples. Reddit posts have real business owner numbers (e.g., "close rate went from 23% to 41%"). Use both.
- Location: `research/case-studies/` directory alongside the Raj Photo Video case study and template.

### Case study depth and tone

- Client identity: follow the template's existing confidentiality rules — industry + size descriptors by default, client names only with written approval.
- Financial detail: depends on the engagement — exact numbers for Sameer's own business (Raj Photo Video), ranges for client businesses unless they approve exact figures.
- Template structure: keep the 7-section format (profile, before, problem, solution, results, what made it work, what others should know). Add a TL;DR block at the top with 3 key numbers (revenue recovered, time saved, system cost) for scanners.
- Timeline section: add as optional field in the template — include build duration, onboarding time, time to first results when data is available.
- Raj Photo Video case study (CASE-01) is already drafted at `research/case-studies/01-raj-photo-video.md` — needs review against the updated template (TL;DR + optional timeline), then finalize.
- Case study template exists at `research/case-studies/TEMPLATE.md` — needs updating with TL;DR and timeline sections.

### Content calendar finalization (TOOL-02)

- Posting cadence: start slower, ramp up — Weeks 1-2 lighter load (YouTube + 1 Twitter + 1 Instagram), Weeks 3-4 full cadence (YouTube + 3 Twitter + 2 Instagram). Build production momentum without burnout.
- Week 2 double YouTube: decide after Week 1 analytics — keep the plan flexible. If Week 1 production was smooth, do 2 uploads in Week 2. If rough, spread Video 2 into Week 3.
- Calendar format: Markdown is the source of truth (version-controlled, repo-native). Generate CSV export for spreadsheet/scheduling tool import when needed.
- Hub model: YouTube is primary hub, but allow ~20% platform-original content (timely reactions, quick tips on Twitter/Instagram that don't derive from a YouTube video). 80% derived from YouTube.
- Draft calendar already exists at `research/content-calendar-draft.md` — needs updating with the cadence, flexibility, and hub model decisions captured here.
- Brand voice rules from `brand/brand-voice.md` apply to all calendar entries.

### Claude's Discretion

- CLI parser implementation approach (state machine vs. marked library)
- De-duplication matching algorithm details
- Which 2 of the 5 demo use cases get full depth vs. condensed briefs (pick based on topic bank scores and package strength)
- Exact TL;DR format for case study template
- CSV export format and generation method for calendar

</decisions>

<specifics>
## Specific Ideas

- The CLI should feel like a daily-use tool — run `npx ./research/tools/content-idea-cli` and get fresh topic suggestions in seconds. Not a one-time generator.
- Demo capability briefs should be usable in discovery calls — a prospect should be able to read one and understand the value without technical explanation.
- The content calendar's "start slow, ramp up" approach matches the reality that Week 1 is also about learning the production process (recording, editing, publishing).
- YouTube Shorts and Instagram Reels are clipped from long-form — same file, both platforms, burned-in captions.

</specifics>

<code_context>

## Existing Code Insights

### Reusable Assets

- `research/case-studies/01-raj-photo-video.md`: Draft case study, ~135 lines, follows problem/stakes/solution/results format
- `research/case-studies/TEMPLATE.md`: Reusable template with HTML comments as authoring instructions, ~187 lines
- `research/content-calendar-draft.md`: 4-week calendar with specific topics mapped to platforms, ~155 lines
- `research/tools/content-idea-cli-spec.md`: Full CLI specification including command interface, data model, scoring algorithm, ~403 lines
- `research/output/topic-bank.md`: 12 ranked topics with composite scores and evidence
- `research/output/competitor-audit.md`: Competitor content analysis
- `content/youtube/content-plan.md`: 5 YouTube video ideas with hooks and outlines
- `ops/packages/*.md`: 6 service packages with pricing, ROI examples, and descriptions
- `research/scripts/reddit-scraper.py` and `research/scripts/competitor-audit.py`: Python research scripts (not directly reused but show data collection patterns)

### Established Patterns

- Brand voice: `brand/brand-voice.md` — no emojis, numerals for metrics, contractions preferred, sentence case headings, short paragraphs
- CTA consistency: "Book a free 15-min discovery call" with calendar link `https://calendar.app.google/psycao3CrXjGnmk48`
- File organization: research outputs in `research/output/`, case studies in `research/case-studies/`, tools in `research/tools/`

### Integration Points

- CLI reads from `research/output/topic-bank.md`, `content/youtube/content-plan.md`, and `ops/packages/*.md` at runtime
- Case studies integrate with landing page (`website/index.html`) for social proof (GIVE-02 in later phase)
- Content calendar feeds into Phase 8 video production workflow
- Demo capability briefs feed into discovery call process and landing page updates

</code_context>

<deferred>
## Deferred Ideas

- Content repurposing script (TOOL-03) and video clipping tool (TOOL-04) — Phase 8 territory
- Live sandbox demo environments — too high maintenance for Phase 7, revisit when client base grows
- Notion/Airtable content calendar sync — Phase 8+ after production workflow is established
- Competitor gap score integration into CLI — depends on Phase 5 RSCH-03 completion, CLI handles absent data gracefully

</deferred>

---

_Phase: 07-case-studies-content-tooling_
_Context gathered: 2026-03-02_
