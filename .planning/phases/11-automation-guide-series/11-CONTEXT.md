# Phase 11: Automation Guide Series - Context

**Gathered:** 2026-03-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Create 5 branded PDF automation guides ("5 Automations You Can Steal") for audience building. Each guide follows a 3-section hybrid format: hook with cost breakdown, automation explanation with before/after table, and map-level DIY walkthrough. Guides are free, ungated, hosted on GitHub Pages at sameerautomations.com/guides/, and distributed via social posts. Build pipeline: Markdown to styled HTML to PDF via puppeteer. One guide per week for 5 weeks.

No email gate, no newsletter infrastructure, no content distribution automation (Phase 10 territory), no new automation capabilities beyond the 5 already defined in 11-DESIGN.md.

</domain>

<decisions>
## Implementation Decisions

### DIY walkthrough depth

- "Show the map, not the road" approach — name the tools, show the high-level flow, list 5-7 steps at headline level, then call out 2-3 gotchas that make it complex
- DIY walkthrough is inline as Page 3 of the same PDF — one document, three sections, no separate linked pages
- Reference the actual stack: n8n, Twilio, Claude API — authentic, matches the service offering
- Gotchas section names the complexity without explicitly saying "hire me" — reader draws the conclusion themselves
- No step-by-step code snippets or screenshots — this is a map, not a tutorial

### Landing pages and hosting

- Same repo (website/), same dark-theme design system as index.html
- Each guide gets an HTML landing page: hook paragraph, PDF preview image (first page), prominent download button, soft CTA footer
- /guides/index.html as a grid hub listing all 5 guides — social bio link points here
- URL structure: descriptive slugs (/guides/missed-call-textback.html, /guides/review-automation.html, etc.)
- PDFs stored alongside HTML in website/guides/ directory

### Social post generation

- Add --from-file flag to existing repurposing script (research/tools/repurposing-script/) — accepts markdown file instead of YouTube URL, reuses existing formatter, banned phrase injection, Claude API call, and --cta soft mode
- 1 Twitter thread (3-4 tweets) + 1 Instagram caption per guide — 10 total social assets
- Twitter thread delivers the full Page 1 hook natively in-feed; link to guide landing page comes in final tweet only
- Each social post treats the guide independently — no series branding ("3 of 5"), no "follow for more"
- Value-first: the thread stands alone as useful content even without clicking through

### Math and industry examples

- Rotate industries across guides: each guide uses a different primary industry to reinforce "any business" positioning (e.g., salon, dental, cleaning, law firm, gym)
- ROI math sourced from ops/packages/ docs + Reddit research evidence — blended for credibility
- Before/after tables use specific dollar amounts ("5 missed calls/week x $80 = $400/week lost"), not percentages or ranges
- All numerals, per brand voice — no writing out numbers

### Claude's Discretion

- Reddit community quotes ("from r/HVAC, 445 upvotes") — include where they strengthen the hook, omit where the math alone is compelling
- Exact industry-to-guide mapping (which industry pairs with which guide)
- PDF preview image generation approach (screenshot of page 1 vs. designed thumbnail)
- Exact landing page layout details (spacing, grid styling for index page)
- Puppeteer configuration and HTML-to-PDF rendering details

</decisions>

<specifics>
## Specific Ideas

- The guides should feel like something a business owner screenshots and texts to a friend — the Page 1 hook is the viral moment
- "Show the map, not the road" means the DIY section earns respect without enabling competition — reader thinks "I could do this... but it's more work than I thought"
- The /guides/ index page becomes the single link to put in social bios — one URL, all value
- Social posts are self-contained value — if someone never clicks the link, they still got something useful from the thread

</specifics>

<code_context>

## Existing Code Insights

### Reusable Assets

- `brand/brand-voice.md`: Full voice guide with tone spectrum, style rules, terminology, confidentiality rules, and visual identity spec (typography, colors, design language)
- `brand/banned-phrases.json`: Machine-readable banlist enforced at generation level — 30+ phrases blocked
- `brand/logo-icon-dark.svg`, `brand/logo-full-dark.svg`: Logo variants for PDF headers and landing pages
- `research/tools/repurposing-script/`: Node.js CLI with Claude API integration, --cta soft mode, banned phrase injection into system prompt, Twitter/Instagram formatters — add --from-file flag here
- `ops/packages/*.md`: 5 automation package docs (missed-call-text-back, lead-follow-up, review-reputation, appointment-reminders, quote-follow-up) — each has ROI calculations, pricing, and real examples
- `research/output/topic-bank.md`: Ranked topics with composite scores and Reddit evidence
- `content/giveaways/01-missed-call-audit-hvac-plumbing.md` and `02-missed-call-audit-general.md`: Existing giveaway format reference — similar structure to guide Page 1 hook
- `website/index.html`: Existing landing page with dark theme, brand styling — template for guide landing pages

### Established Patterns

- Brand visual identity: dark #1A1A1A background, cream #EDE9E3 text, Roc Grotesk Bold headings, Gilroy body, purple-to-cyan gradient accents, dot grid texture, arch-node design elements
- Content generation: Claude API with voice module + banned phrase injection (established in Phase 8 repurposing script)
- CTA consistency: "Book a free 15-min discovery call" with calendar link calendar.app.google/psycao3CrXjGnmk48
- Soft CTA pattern: "if you'd rather skip the setup, here's my calendar" (Phase 9 decision)
- No emojis anywhere, sentence case headings, numerals for all metrics, Oxford comma
- Industry diversity: rotate examples across industries, never trades-only (Phase 9 UAT fix)

### Integration Points

- PDF files deploy to GitHub Pages alongside existing website/index.html
- Repurposing script gets --from-file flag extending its input sources
- Guide content references the same 5 automation packages documented in ops/packages/
- Landing pages link back to main site footer and booking CTA

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

_Phase: 11-automation-guide-series_
_Context gathered: 2026-03-03_
