# Phase 12: Social Content Optimization - Context

**Gathered:** 2026-03-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Rewrite all 10 existing social drafts (5 Twitter threads + 5 Instagram captions) in research/tools/repurposing-script/review/ with competitive hooks, carousel format for Instagram, keyword-trigger DM CTAs, hashtags, and flow diagram exports as social assets. No new automations, no new guides, no distribution automation (Phase 10 territory). Inputs are the existing drafts + guide PDFs from Phase 11.

</domain>

<decisions>
## Implementation Decisions

### Hook style and structure

- Pattern interrupt first, then pain-math — Hormozi-style: open with a provocative statement that stops the scroll, then back it with specific dollar math. e.g., "You're paying $20,800/year for a problem that takes 30 seconds to fix."
- Subtle contrast hooks — acknowledge common approach fails without naming competitors or gurus. e.g., "Manual follow-up converts at 5%. Automated converts at 40%." No guru-bashing, no competitor callouts.
- Platform-native hooks — Twitter hooks optimized for reply engagement (questions, provocative statements), Instagram hooks optimized for saves (actionable, specific). Different openings for same guide.
- Twitter threads expand to 5-6 tweets — add "before/after" transformation tweet and "common mistake" tweet before the solution. More value per thread.

### Instagram carousel format

- Both carousel + caption — carousel slides carry the visual story, caption has full text version with CTA. Users who swipe get the visual, readers get the text.
- Slide count varies per guide (5-8 slides) — some automations need more explanation than others. Flex based on content complexity.
- Dark with high contrast visual style — dark background with larger, bolder text and more white space per slide. Branded AND readable. Hormozi carousel aesthetic.
- HTML to PNG production (automated) — build HTML template with brand styling, render each slide to PNG via puppeteer. Same pattern as PDF guide generator. Fully automated, version-controlled.

### DM CTAs and hashtags

- Both: keyword trigger + soft booking link — Primary CTA is keyword ("DM me MISSED for the full breakdown"), followed by soft booking link ("or grab 15 min here: [link]"). Two engagement paths.
- Unique keyword per guide — MISSED, REVIEWS, PIPELINE, QUOTE, NOSHOW. Know exactly which post drove the DM. Better tracking.
- 5-8 niche hashtags on Instagram only — targeted: #smallbusinessautomation #missedcalls #salonowner etc. Lower volume but higher intent. Placed at end of caption. No hashtags on Twitter.

### Flow diagram social assets

- Flow diagrams as carousel slides — include the automation flow diagram as one of the carousel slides (e.g., slide showing the automation under the hood). Shows the automation visually within the post.
- Also as separate standalone posts — post flow diagrams independently on a different day. "Here's what this automation looks like under the hood." Double the content from one asset.
- HTML-rendered diagrams — build flow diagrams in HTML/CSS with brand styling, render to PNG via puppeteer. Same pipeline as carousel slides. Consistent styling and control.
- Text labels on each step — each box has a short label ("Missed Call", "Twilio SMS", "Auto-text sent"). Self-explanatory without reading the caption.
- Square format (1080x1080) for Instagram, with landscape (1200x675) also generated for Twitter. Optimized per platform.

### Claude's Discretion

- Exact text per carousel slide (how to break content across slides)
- Which specific hashtags per guide (within the 5-8 niche strategy)
- Flow diagram layout and arrow styling details
- Exact wording of keyword-trigger DM response templates
- Slide transition/flow within each carousel
- Whether to include Reddit quotes on flow diagram posts

</decisions>

<specifics>
## Specific Ideas

- Hormozi-style pattern interrupts: "You're paying $X/year for a problem that takes Y seconds to fix" — the reversal of expectations is the scroll-stopper
- Carousels should feel like a mini-presentation: each slide stands alone but builds a narrative arc (hook -> problem -> solution -> proof -> CTA)
- Flow diagrams are the "under the hood" moment — readers who see the technical diagram feel like they got insider access, which drives saves
- DM keywords create a trackable funnel: post -> DM keyword -> manual response -> booking link. Each keyword maps to a specific automation guide.
- The 5 keyword-trigger words map to guides: MISSED (missed-call-textback), REVIEWS (review-automation), PIPELINE (monday-pipeline), QUOTE (quote-writer), NOSHOW (no-show-killer)

</specifics>

<code_context>

## Existing Code Insights

### Reusable Assets

- `research/tools/repurposing-script/review/*.md`: 10 existing draft files (5 Twitter + 5 Instagram) — these are the inputs being rewritten
- `research/tools/guide-generator/`: Puppeteer-based HTML-to-PDF pipeline with branded templates — reuse pattern for carousel slide rendering
- `brand/brand-voice.md`: Full voice guide with tone spectrum, banned phrases, visual identity spec
- `brand/banned-phrases.json`: Machine-readable banlist for generation-level enforcement
- `website/guides/*.pdf`: 5 completed guide PDFs with automation flow descriptions (source material for flow diagrams)
- `content/videos/diagrams/video-1-automation-flow.svg`: Existing flow diagram reference

### Established Patterns

- Puppeteer HTML-to-image rendering: guide-generator already does HTML -> PDF. Extend to HTML -> PNG for carousel slides.
- Brand visual identity: dark #1A1A1A background, cream #EDE9E3 text, purple-to-cyan gradient accents
- Claude API content generation with banned phrase injection (Phase 8 repurposing script pattern)
- Soft CTA pattern: "if you'd rather skip the setup, here's my calendar" (Phase 9)
- Excalidraw flow diagrams with fontFamily 2 / Helvetica (Phase 8 decision)

### Integration Points

- Rewritten drafts replace existing files in research/tools/repurposing-script/review/
- New carousel PNG assets go to a new directory (e.g., website/social/ or research/tools/carousel-generator/output/)
- Flow diagram PNGs generated alongside carousel slides
- All outputs reference guide landing page URLs (sameerautomations.com/guides/\*.html)

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

_Phase: 12-social-content-optimization_
_Context gathered: 2026-03-05_
