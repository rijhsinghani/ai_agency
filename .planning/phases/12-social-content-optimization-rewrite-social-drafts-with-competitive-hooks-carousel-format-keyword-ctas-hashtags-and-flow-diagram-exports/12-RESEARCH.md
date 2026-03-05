# Phase 12: Social Content Optimization - Research

**Researched:** 2026-03-05
**Domain:** Social content rewriting, HTML-to-PNG rendering via Puppeteer, Instagram carousel generation, SVG flow diagram export
**Confidence:** HIGH

---

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions

**Hook style and structure**

- Pattern interrupt first, then pain-math — Hormozi-style: open with a provocative statement that stops the scroll, then back it with specific dollar math. e.g., "You're paying $20,800/year for a problem that takes 30 seconds to fix."
- Subtle contrast hooks — acknowledge common approach fails without naming competitors or gurus. e.g., "Manual follow-up converts at 5%. Automated converts at 40%." No guru-bashing, no competitor callouts.
- Platform-native hooks — Twitter hooks optimized for reply engagement (questions, provocative statements), Instagram hooks optimized for saves (actionable, specific). Different openings for same guide.
- Twitter threads expand to 5-6 tweets — add "before/after" transformation tweet and "common mistake" tweet before the solution. More value per thread.

**Instagram carousel format**

- Both carousel + caption — carousel slides carry the visual story, caption has full text version with CTA. Users who swipe get the visual, readers get the text.
- Slide count varies per guide (5-8 slides) — flex based on content complexity.
- Dark with high contrast visual style — dark background with larger, bolder text and more white space per slide. Branded AND readable. Hormozi carousel aesthetic.
- HTML to PNG production (automated) — build HTML template with brand styling, render each slide to PNG via puppeteer. Same pattern as PDF guide generator. Fully automated, version-controlled.

**DM CTAs and hashtags**

- Both: keyword trigger + soft booking link — Primary CTA is keyword ("DM me MISSED for the full breakdown"), followed by soft booking link ("or grab 15 min here: [link]"). Two engagement paths.
- Unique keyword per guide — MISSED, REVIEWS, PIPELINE, QUOTE, NOSHOW. Know exactly which post drove the DM. Better tracking.
- 5-8 niche hashtags on Instagram only — targeted: #smallbusinessautomation #missedcalls #salonowner etc. Lower volume but higher intent. Placed at end of caption. No hashtags on Twitter.

**Flow diagram social assets**

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

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>

## Phase Requirements

| ID     | Description                                                                                                                               | Research Support                                                                                  |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| SOC-01 | Rewrite 5 Twitter threads with Hormozi-style hooks, before/after tweet, and common mistake tweet (5-6 tweets total)                       | Existing 4-tweet drafts in review/ serve as source material; hook formulas documented below       |
| SOC-02 | Rewrite 5 Instagram captions with pattern-interrupt hooks, keyword DM CTAs (MISSED/REVIEWS/PIPELINE/QUOTE/NOSHOW), and 5-8 niche hashtags | Existing captions in review/ serve as base; hashtag strategy documented below                     |
| SOC-03 | Build carousel-generator CLI tool: HTML template + Puppeteer rendering for 5-8 slides per guide at 1080x1080 PNG                          | Puppeteer 24.x already installed in guide-generator; renderer.js pattern is directly reusable     |
| SOC-04 | Build flow diagram social assets: square (1080x1080) and landscape (1200x675) PNG per guide from HTML/SVG + Puppeteer                     | Flow diagram SVG already defined in template.js for all 5 guides; extend to standalone PNG export |
| SOC-05 | Rewritten drafts replace files in research/tools/repurposing-script/review/                                                               | Direct file overwrite; no new directory needed for text drafts                                    |
| SOC-06 | Carousel PNGs and flow diagram PNGs output to new directory (e.g., website/social/ or research/tools/carousel-generator/output/)          | New tool at research/tools/carousel-generator/ mirrors guide-generator structure                  |

</phase_requirements>

---

## Summary

Phase 12 has two distinct workstreams: **content rewriting** (the 10 existing social drafts) and **asset generation** (carousel slides + flow diagrams as PNGs). The content rewriting is straightforward text work — apply Hormozi hook formulas to the existing drafts, add structural tweets to Twitter threads, add keyword CTAs and hashtags to Instagram captions. No API calls needed; Claude Code writes the drafts directly (same approach as Phase 11-03).

The asset generation is an extension of the guide-generator pattern already proven in Phase 11. Puppeteer 24.38.0 is already installed and working. The flow diagram SVGs are already defined for all 5 guides in `lib/template.js`. The new work is: (1) building a carousel HTML template for slide-by-slide content, (2) adapting `renderPreview()` to output 1080x1080 and 1200x675 PNG clips, and (3) extracting the flow diagrams from PDF context to standalone PNG renders.

The primary technical risk is the viewport/clip math for square Instagram dimensions — the existing `renderPreview()` uses 816x400. The new carousel generator needs `page.setViewport({ width: 1080, height: 1080 })` and `page.screenshot({ clip: { x:0, y:0, width:1080, height:1080 } })`. This is a direct API call with well-documented parameters.

**Primary recommendation:** Build a new `research/tools/carousel-generator/` CLI that mirrors guide-generator's structure. Reuse renderer.js pattern exactly. Extend template.js to support slide-by-slide HTML. Write all 10 rewritten social drafts directly (no Claude API needed — Claude Code writes them inline). The content and tooling work can proceed in parallel.

---

## Standard Stack

### Core

| Library   | Version             | Purpose                                                       | Why Standard                                                                                |
| --------- | ------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| puppeteer | 24.38.0 (installed) | HTML-to-PNG rendering                                         | Already installed and proven in guide-generator; handles viewport, screenshot, network idle |
| commander | ^14.0.3 (installed) | CLI argument parsing                                          | Already in guide-generator; same version                                                    |
| marked    | ^15.0.0 (installed) | Markdown to HTML (if needed for slide content from .md files) | Already in guide-generator                                                                  |

### Supporting

| Library              | Version | Purpose                        | When to Use                |
| -------------------- | ------- | ------------------------------ | -------------------------- |
| fs (Node built-in)   | —       | Read/write slide content files | Always — no npm dep needed |
| path (Node built-in) | —       | Resolve output paths           | Always                     |

### Alternatives Considered

| Instead of            | Could Use                    | Tradeoff                                                                                            |
| --------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------- |
| Puppeteer HTML-to-PNG | sharp / canvas npm           | Puppeteer already installed and working; canvas requires native bindings; sharp doesn't render HTML |
| Puppeteer HTML-to-PNG | playwright                   | Same capability, heavier dep; no reason to switch mid-project                                       |
| Inline slide content  | Separate .md files per slide | Inline JS objects simpler for fixed 5-guide structure; no file management overhead                  |

**Installation:** No new packages required. `puppeteer`, `commander`, and `marked` are already installed in `research/tools/guide-generator/node_modules/`. The new carousel-generator can either reuse the same node_modules (symlink or relative require) or run `npm install` with the same package.json. Simplest: create `research/tools/carousel-generator/` with its own `package.json` requiring the same deps.

```bash
cd research/tools/carousel-generator && npm install
```

---

## Architecture Patterns

### Recommended Project Structure

```
research/tools/carousel-generator/
├── index.js                  # CLI entry: --guide <slug> | --all, --output <dir>
├── package.json              # Same deps as guide-generator
├── lib/
│   ├── slides.js             # Slide content registry: 5 guides x 5-8 slides each
│   ├── template.js           # buildSlideHTML(slide, opts) — returns complete HTML doc
│   ├── flow-template.js      # buildFlowHTML(slug, format) — square or landscape
│   └── renderer.js           # renderSlide(html, path, {w,h}) — puppeteer PNG render
└── output/                   # Generated PNGs (gitignored, .gitkeep tracked)
    ├── missed-call-textback/
    │   ├── slide-01.png      # 1080x1080
    │   ├── slide-02.png
    │   ├── ...
    │   ├── flow-square.png   # 1080x1080
    │   └── flow-landscape.png # 1200x675
    └── [other-guides]/
```

The final PNG output can also go to `website/social/` if it will be web-served. The planner should decide; either works architecturally.

### Pattern 1: Puppeteer PNG Render (Square Viewport)

**What:** Set viewport to exact output dimensions, render HTML, screenshot full page.
**When to use:** Every carousel slide and every flow diagram PNG.

```javascript
// Source: puppeteer official docs + existing renderer.js pattern
async function renderPNG(htmlContent, outputPath, width, height) {
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 2 }); // 2x for retina-quality
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    await page.screenshot({
      path: outputPath,
      type: "png",
      clip: { x: 0, y: 0, width, height },
    });
  } finally {
    await browser.close();
  }
}

// Square Instagram: renderPNG(html, path, 1080, 1080)
// Landscape Twitter: renderPNG(html, path, 1200, 675)
```

**Key insight:** `deviceScaleFactor: 2` doubles the pixel density without changing the CSS layout dimensions. The output PNG is 2160x2160 (for 1080x1080 viewport) — high-res for social media. Set `clip` to match the viewport to avoid any scroll overflow.

### Pattern 2: Carousel Slide HTML Template

**What:** Each slide is a self-contained HTML document with brand styling. Content is injected per slide from a JS data object.
**When to use:** Building each of the 5-8 slides per guide.

```javascript
// Slide data structure
const SLIDE_DATA = {
  "missed-call-textback": {
    keyword: "MISSED",
    slides: [
      {
        type: "hook", // "hook" | "problem" | "solution" | "proof" | "flow" | "cta"
        headline:
          "You're paying $20,800/year for a problem that takes 30 seconds to fix.",
        subtext: null,
      },
      {
        type: "problem",
        headline: "5 missed calls/week",
        subtext:
          "At $80 a booking, that's $400 gone every week. Most callers don't call back.",
      },
      // ... etc
      {
        type: "flow", // Render the flow diagram SVG inline
        headline: "How it works",
        subtext: null,
      },
      {
        type: "cta",
        headline: "DM me MISSED",
        subtext:
          "I'll send you the full breakdown — or grab 15 min: calendar.app.google/psycao3CrXjGnmk48",
      },
    ],
  },
};
```

### Pattern 3: Reusing Existing SVG Flow Diagrams

**What:** The `getFlowDiagram(slug)` and `getProblemDiagram(slug)` functions in `lib/template.js` already return complete SVG markup for all 5 guides. Embed these in a standalone HTML page and render to PNG.
**When to use:** Building the standalone flow diagram social assets.

```javascript
// flow-template.js — build a standalone HTML page around the existing SVG
const { getFlowDiagram } = require("../../guide-generator/lib/template");

function buildFlowHTML(slug, format = "square") {
  const svgMarkup = getFlowDiagram(slug);
  const isSquare = format === "square"; // 1080x1080 vs 1200x675

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: ${isSquare ? "1080px" : "1200px"};
      height: ${isSquare ? "1080px" : "675px"};
      background: #1A1A1A;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: 'DM Sans', system-ui, sans-serif;
    }
    .label {
      color: rgba(237,233,227,0.6);
      font-size: 18px;
      margin-bottom: 32px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    /* Scale SVG up from 688px source width to fit the canvas */
    .flow-wrapper {
      transform: scale(${isSquare ? "1.3" : "1.5"});
    }
  </style>
</head>
<body>
  <p class="label">How the automation works</p>
  <div class="flow-wrapper">${svgMarkup}</div>
</body>
</html>`;
}
```

**Key insight:** The SVG is already 688px wide with brand-correct colors. Scale it up via CSS transform rather than redefining SVG dimensions. Avoids duplication with template.js.

**Alternative:** Instead of requiring from guide-generator, copy `getFlowDiagram` logic into carousel-generator. Cleaner dependency boundary, small duplication cost. Planner should decide.

### Pattern 4: Rewritten Draft File Format

**What:** The rewritten Twitter and Instagram drafts overwrite the existing files in `research/tools/repurposing-script/review/`. Same markdown format, same review header.
**When to use:** All 10 content rewrites.

```markdown
# Review: missed-call-textback — twitter

**Status:** DRAFT — not posted
**Rewritten:** 2026-03-05 (Phase 12 — competitive hooks, Hormozi format)

---

1/ You're paying $20,800/year for a problem that takes 30 seconds to fix.
[≤280 chars]

2/ [Before: what manual follow-up looks like / the common mistake]

3/ [The math that makes the problem undeniable]

4/ [The fix — specific, technical enough to be credible]

5/ [Social proof or transformation result]

6/ Guide + keyword CTA: sameerautomations.com/guides/missed-call-textback.html — DM me MISSED for the full breakdown.

---

_Review before posting. Keyword: MISSED. CTA: https://calendar.app.google/psycao3CrXjGnmk48_
```

### Anti-Patterns to Avoid

- **Opening with "I" on Twitter:** Platform demotes first-person openers. Start with the user's reality or a number.
- **Soft asks without a keyword:** "DM me if this is happening" is untrackable. Always include the keyword (MISSED, REVIEWS, etc.).
- **Using `page.setContent()` without `waitUntil: "networkidle0"`:** Google Fonts won't load, text renders in fallback font. Established in Phase 11.
- **Running puppeteer with `headless: 'new'`:** puppeteer 24.x defaults to new headless. `headless: true` still works and is consistent with guide-generator. Don't change it.
- **Emojis in any copy:** Brand rule. No exceptions. Not in hooks, not in CTAs, not in hashtags.
- **Hashtags on Twitter:** Only on Instagram. Zero hashtags in any Twitter content.
- **`os.tmpdir()` for output paths:** Returns `/private/var/folders/...` on macOS, breaks tools. Use absolute paths resolved from `__dirname`. Established in Phase 8-03.
- **shell: true in spawn():** Not applicable here (no spawn calls), but worth noting the project pattern from Phase 8-03.

---

## Don't Hand-Roll

| Problem              | Don't Build                               | Use Instead                                                              | Why                                                                                    |
| -------------------- | ----------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| HTML-to-PNG          | Custom canvas drawing, sharp, ImageMagick | puppeteer (already installed)                                            | Puppeteer handles all CSS layout, fonts, SVG rendering. ImageMagick can't render HTML. |
| Flow diagram SVGs    | New SVG definitions                       | Existing `getFlowDiagram()` / `getProblemDiagram()` in `lib/template.js` | Already defined for all 5 guides with correct brand colors. Duplication creates drift. |
| CLI argument parsing | Manual `process.argv` parsing             | commander (already installed)                                            | Already proven in both guide-generator and repurposing-script.                         |
| Font loading         | System font paths                         | Google Fonts CDN link in HTML `<head>` + `waitUntil: "networkidle0"`     | Same pattern proven in guide-generator's PDF output.                                   |

**Key insight:** This phase is almost entirely composition of existing patterns. The guide-generator already solved the hardest parts (puppeteer setup, brand HTML templates, CLI structure, font loading). The carousel-generator is guide-generator with a different HTML template and different viewport dimensions.

---

## Common Pitfalls

### Pitfall 1: Twitter Character Count

**What goes wrong:** Rewritten tweets with dollar math, before/after framing, and keyword CTAs exceed 280 characters.
**Why it happens:** The new tweet structure adds a before/after tweet and common mistake tweet — 5-6 tweets means more content per thread but still 280 chars per tweet.
**How to avoid:** Count characters during content writing. Tweet 1 (hook) is most likely to overshoot — dollar math + provocative opener in 280 chars is tight. Test: "You're paying $20,800/year for a problem that takes 30 seconds to fix." = 71 chars. Leaves 209 for the rest of tweet 1.
**Warning signs:** Any tweet with a full sentence + dollar figure + percentage + CTA is at risk.

### Pitfall 2: Slide Count vs. Content Fit

**What goes wrong:** Content is either crammed into too few slides (unreadable) or spread across too many (audience drops off).
**Why it happens:** Hormozi carousel aesthetic favors large type and minimal text per slide — that means more slides, not fewer. But the decision locked "5-8 slides."
**How to avoid:** Plan slide types first (hook / problem / math / fix / proof / flow diagram / CTA). 7 slides is the natural structure for most of these guides — hook, problem, math, fix, proof/social, flow diagram, CTA. No guide needs more than 8.
**Warning signs:** Any slide with more than 3 lines of body text needs to be split.

### Pitfall 3: Puppeteer deviceScaleFactor and actual file size

**What goes wrong:** Using `deviceScaleFactor: 2` outputs a 2160x2160 PNG (for 1080x1080 viewport). Some tools expect exactly 1080x1080.
**Why it happens:** deviceScaleFactor multiplies the physical pixel count without changing CSS layout.
**How to avoid:** `deviceScaleFactor: 1` gives exactly 1080x1080. `deviceScaleFactor: 2` gives 2160x2160 (retina). Instagram accepts both but compresses on upload. Use `deviceScaleFactor: 2` for quality; document this in the CLI help text. Or make it a flag.
**Warning signs:** If the PNG dimensions don't match expectation, check deviceScaleFactor.

### Pitfall 4: SVG scaling in carousel slides

**What goes wrong:** The existing flow diagram SVG is 688px wide, optimized for the 816px PDF page. Embedded directly in a 1080px carousel slide, it looks small.
**Why it happens:** SVG has explicit `width="688"` and `height="100"` attributes.
**How to avoid:** Wrap SVG in a `<div>` with `transform: scale(X)` or change the SVG `width` attribute to `100%` with `viewBox` intact. The viewBox is already set (`viewBox="0 0 688 100"`), so `width="100%"` on the SVG element will make it fill its container.
**Warning signs:** Flow diagram appears small/cramped in the bottom-left of rendered slides.

### Pitfall 5: require() path from carousel-generator to guide-generator

**What goes wrong:** `require("../../guide-generator/lib/template")` works in dev but breaks if the CLI is run from a different directory.
**Why it happens:** require() resolves relative to `__dirname`, not `process.cwd()`. This is actually fine — `__dirname` is constant.
**How to avoid:** Always use `path.resolve(__dirname, "../../guide-generator/lib/template")` to be explicit. Or copy the SVG functions into carousel-generator (clean dependency boundary). Either works. Flag this tradeoff for the planner.
**Warning signs:** `Cannot find module` errors when running CLI from a different cwd.

### Pitfall 6: banned-phrases.json path resolution

**What goes wrong:** New carousel-generator or content-rewriter scripts need the banlist, but the relative path from the new tool location is different.
**Why it happens:** The banlist is at `brand/banned-phrases.json` (repo root). Each tool resolves it differently.
**How to avoid:** The established pattern (from formatter.js) is `path.resolve(__dirname, "../../../..", "brand", "banned-phrases.json")`. For carousel-generator at `research/tools/carousel-generator/lib/`, that's 4 levels up to repo root. Count carefully: `lib/ -> carousel-generator/ -> tools/ -> research/ -> [repo root]` = 4 levels = `"../../../.."`. Same as repurposing-script.

---

## Code Examples

### Carousel Slide Render (square 1080x1080)

```javascript
// Source: extends renderer.js from research/tools/guide-generator/lib/renderer.js
async function renderSlide(htmlContent, outputPath) {
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    await page.screenshot({
      path: outputPath,
      type: "png",
      clip: { x: 0, y: 0, width: 1080, height: 1080 },
    });
  } finally {
    await browser.close();
  }
}
```

### Carousel Slide HTML Structure (hook slide example)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&display=swap"
      rel="stylesheet"
    />
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        width: 1080px;
        height: 1080px;
        background: #1a1a1a;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 96px;
        font-family: "DM Sans", system-ui, sans-serif;
      }
      .slide-number {
        color: rgba(237, 233, 227, 0.35);
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 32px;
        letter-spacing: 0.08em;
      }
      .headline {
        color: #ede9e3;
        font-size: 64px;
        font-weight: 700;
        line-height: 1.15;
        max-width: 880px;
      }
      .headline .accent {
        background: linear-gradient(90deg, #7b2fbe, #4dd9e8);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .subtext {
        color: rgba(237, 233, 227, 0.65);
        font-size: 28px;
        font-weight: 400;
        line-height: 1.55;
        margin-top: 32px;
        max-width: 820px;
      }
      .brand-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #7b2fbe, #4dd9e8);
      }
      /* Slide-type variants applied via body class */
      body.slide-cta .headline {
        font-size: 72px;
      }
      body.slide-flow {
        justify-content: space-between;
        padding-bottom: 80px;
      }
    </style>
  </head>
  <body class="slide-hook">
    <div class="slide-number">01 / 07</div>
    <h1 class="headline">
      You're paying <span class="accent">$20,800/year</span> for a problem that
      takes 30 seconds to fix.
    </h1>
    <div class="brand-bar"></div>
  </body>
</html>
```

### Rewritten Twitter Thread Structure (template)

```
Tweet 1 (HOOK — pattern interrupt):
[Dollar math or time reversal]. [What most people think is happening vs. what's actually happening.]

Tweet 2 (BEFORE — common mistake or manual process):
[What the broken process looks like in practice. Specific and vivid.]

Tweet 3 (THE MATH — make the pain undeniable):
[Multiply the small loss by time. Surface the annual number.]

Tweet 4 (THE FIX — specific enough to be credible):
[Exactly how the automation works. Tools named. Timing specified.]

Tweet 5 (PROOF/TRANSFORMATION):
[Before/after or community evidence. Not invented — reference real data from the guides.]

Tweet 6 (CTA):
[Guide URL] — DM me [KEYWORD] for the full breakdown. Or grab 15 min: https://calendar.app.google/psycao3CrXjGnmk48
```

### Rewritten Instagram Caption Structure (template)

```
[HOOK — pattern interrupt, first line must stop the scroll]
[Pain math — the specific dollar loss or time cost]
[The manual process failure — vivid and specific]
[The fix — what the automation does, no jargon]
[Result/transformation]

DM me [KEYWORD] for the full breakdown.
Or grab 15 min: https://calendar.app.google/psycao3CrXjGnmk48

#hashtag1 #hashtag2 #hashtag3 #hashtag4 #hashtag5 #hashtag6
```

### Hashtag Sets Per Guide (Claude's Discretion — recommended starting point)

```
missed-call-textback (MISSED):
#missedcalls #salonowner #smallbusinessautomation #beautysalon
#automationtips #salonmarketing #businessautomation #clientretention

review-automation (REVIEWS):
#googlereviews #dentalmarketing #smallbusinessautomation #reputationmanagement
#automationtips #dentaloffice #localseo #businessgrowth

monday-pipeline (PIPELINE):
#leadmanagement #cleaningbusiness #smallbusinessautomation #salestips
#automationtips #cleaningservice #followupautomation #businesssystems

quote-writer (QUOTE):
#lawfirm #proposalautomation #smallbusinessautomation #legalmarketing
#automationtips #lawyerlife #businessautomation #timesaving

no-show-killer (NOSHOW):
#noshow #personaltrainer #smallbusinessautomation #appointmentreminders
#automationtips #gymowner #fitnessbusiness #clientmanagement
```

---

## State of the Art

| Old Approach                                    | Current Approach                                             | When Changed      | Impact                                                          |
| ----------------------------------------------- | ------------------------------------------------------------ | ----------------- | --------------------------------------------------------------- |
| Canva carousel design (manual)                  | Puppeteer HTML-to-PNG (automated)                            | Phase 12 decision | Version-controlled, brand-consistent, no per-slide manual work  |
| Soft "DM me if this is happening" CTA           | Keyword DM CTA (MISSED / REVIEWS / etc.)                     | Phase 12 decision | Trackable funnel — know which post drove each DM                |
| 4-tweet threads with info-only structure        | 5-6 tweet threads with Hormozi hook + before/after + mistake | Phase 12 decision | Higher engagement optimization per established creator patterns |
| No hashtags (Phase 11 decision was no hashtags) | 5-8 niche hashtags on Instagram only                         | Phase 12 decision | Lower volume, higher intent — avoids spam appearance            |

**Note on Phase 11 hashtag decision:** Phase 11 drafts had no hashtags by design. Phase 12 adds them to Instagram only. Twitter remains zero hashtags (confirmed in CONTEXT.md).

---

## Open Questions

1. **Shared node_modules vs. separate install for carousel-generator**
   - What we know: guide-generator has puppeteer 24.38.0 installed at `research/tools/guide-generator/node_modules/`
   - What's unclear: Should carousel-generator have its own `package.json` + `npm install`, or reference guide-generator's modules via relative require?
   - Recommendation: Own `package.json` + `npm install`. Cleaner boundary, avoids implicit dependency on sibling directory structure. Small cost (150MB node_modules), big gain in maintainability.

2. **Output directory for social PNGs**
   - What we know: CONTEXT.md says "e.g., website/social/ or research/tools/carousel-generator/output/"
   - What's unclear: Will these PNGs need to be web-served (website/) or are they local work artifacts (research/tools/)?
   - Recommendation: `research/tools/carousel-generator/output/` for now. They are working artifacts for human review before posting, not web assets. Consistent with the review/ pattern in repurposing-script.

3. **Whether to batch puppeteer browser instances across slides**
   - What we know: guide-generator opens/closes a browser per PDF render. For 5-8 slides × 5 guides = 25-40 renders, opening a browser per slide is slow (~3-5 sec startup each = 2-3 min total).
   - What's unclear: Is the build speed acceptable?
   - Recommendation: Share one browser instance per guide (open once, render all slides, close). This is a straightforward optimization using the existing `puppeteer.launch()` pattern. Show the planner this option.

---

## Validation Architecture

> workflow.nyquist_validation key is absent from .planning/config.json — treating as enabled.

### Test Framework

| Property           | Value                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------- |
| Framework          | Jest (if present in repurposing-script) or manual validation                                |
| Config file        | None detected in guide-generator or repurposing-script — see Wave 0                         |
| Quick run command  | `node research/tools/carousel-generator/index.js --guide missed-call-textback` (smoke test) |
| Full suite command | `node research/tools/carousel-generator/index.js --all`                                     |

**Note:** Neither guide-generator nor repurposing-script has a test config file. The repurposing-script has a `__tests__/` directory. This phase follows the same pattern: no formal test framework, validation is CLI smoke test + visual inspection of output PNGs.

### Phase Requirements → Test Map

| Req ID | Behavior                                                    | Test Type | Automated Command                                                                                                                                   | File Exists?                         |
| ------ | ----------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| SOC-01 | 5 Twitter threads rewritten with Hormozi hooks, 5-6 tweets  | manual    | Open `review/*-twitter.md` files, verify structure                                                                                                  | ❌ Wave 0 (overwrite existing files) |
| SOC-02 | 5 Instagram captions rewritten with keyword CTAs + hashtags | manual    | Open `review/*-instagram.md` files, verify keyword and hashtag presence                                                                             | ❌ Wave 0 (overwrite existing files) |
| SOC-03 | Carousel generator produces 5-8 PNGs per guide at 1080x1080 | smoke     | `node research/tools/carousel-generator/index.js --guide missed-call-textback && ls research/tools/carousel-generator/output/missed-call-textback/` | ❌ Wave 0                            |
| SOC-04 | Flow diagram PNGs produced at 1080x1080 and 1200x675        | smoke     | `ls research/tools/carousel-generator/output/missed-call-textback/flow-*.png`                                                                       | ❌ Wave 0                            |
| SOC-05 | Rewritten drafts replace existing files                     | manual    | File timestamps and content diff vs. originals                                                                                                      | ✅ Files exist, will be overwritten  |
| SOC-06 | Output directory structure matches spec                     | smoke     | `ls research/tools/carousel-generator/output/`                                                                                                      | ❌ Wave 0                            |

### Sampling Rate

- **Per task commit:** `node research/tools/carousel-generator/index.js --guide missed-call-textback` (one guide as smoke test)
- **Per wave merge:** `node research/tools/carousel-generator/index.js --all` (all 5 guides, all slides + flow diagrams)
- **Phase gate:** All 10 rewritten .md files present, all 5 guides producing PNG output, visual inspection of at least 1 guide's full carousel before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `research/tools/carousel-generator/index.js` — main CLI
- [ ] `research/tools/carousel-generator/lib/slides.js` — slide content registry
- [ ] `research/tools/carousel-generator/lib/template.js` — HTML template builder
- [ ] `research/tools/carousel-generator/lib/flow-template.js` — flow diagram HTML builder
- [ ] `research/tools/carousel-generator/lib/renderer.js` — puppeteer PNG render
- [ ] `research/tools/carousel-generator/package.json` — declares puppeteer + commander deps
- [ ] `research/tools/carousel-generator/output/.gitkeep` — preserve directory in git (same pattern as review/.gitkeep)

---

## Existing Code Inventory (What Gets Reused vs. What Gets Built)

### Reuse directly (no changes)

| Asset                                     | Location                                          | How Used                                                                  |
| ----------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------- |
| `getFlowDiagram(slug)`                    | `research/tools/guide-generator/lib/template.js`  | Embed SVG in flow-template.js output                                      |
| `getProblemDiagram(slug)`                 | `research/tools/guide-generator/lib/template.js`  | Optional: include in carousel as problem slide                            |
| `renderPDF()` / `renderPreview()` pattern | `research/tools/guide-generator/lib/renderer.js`  | Direct model for carousel renderer.js                                     |
| `GUIDES` registry                         | `research/tools/guide-generator/lib/generator.js` | Guide slug/industry/ROI data for slide content                            |
| Brand colors                              | `brand/brand-voice.md`                            | `#1A1A1A`, `#EDE9E3`, `#7B2FBE`, `#4DD9E8` hardcoded in carousel template |
| `BANNED_PHRASES`                          | `brand/banned-phrases.json`                       | Self-enforce during content rewriting (Claude Code reads and applies)     |

### Build new

| Asset                                     | What It Does                                                       |
| ----------------------------------------- | ------------------------------------------------------------------ |
| `carousel-generator/index.js`             | CLI: `--guide <slug> \| --all`, `--output <dir>`                   |
| `carousel-generator/lib/slides.js`        | Slide content data for all 5 guides (headline, subtext per slide)  |
| `carousel-generator/lib/template.js`      | `buildSlideHTML(slide, slideNum, total)` → complete HTML string    |
| `carousel-generator/lib/flow-template.js` | `buildFlowHTML(slug, format)` → HTML for standalone flow diagram   |
| `carousel-generator/lib/renderer.js`      | `renderPNG(html, path, w, h)` → puppeteer PNG at exact dimensions  |
| Rewritten `review/*-twitter.md` (×5)      | 5-6 tweet threads with Hormozi hooks, before/after, keyword CTAs   |
| Rewritten `review/*-instagram.md` (×5)    | Rewritten captions with pattern interrupts, keyword CTAs, hashtags |

---

## Keyword-to-Guide Mapping (Reference)

| Keyword  | Guide                | Industry         | ROI Anchor                                  |
| -------- | -------------------- | ---------------- | ------------------------------------------- |
| MISSED   | missed-call-textback | Salon            | 5 calls/wk × $80 = $20,800/yr               |
| REVIEWS  | review-automation    | Dental           | 8 reviews → 94 reviews = 25-30% more clicks |
| PIPELINE | monday-pipeline      | Cleaning service | 3 leads/mo × $150 = $5,400/yr               |
| QUOTE    | quote-writer         | Law firm         | 20 hrs/mo on proposals = 1 week billable/mo |
| NOSHOW   | no-show-killer       | Gym              | 3 no-shows/wk × $80 = $12,480/yr            |

---

## Sources

### Primary (HIGH confidence)

- Direct code inspection: `research/tools/guide-generator/lib/renderer.js` — puppeteer HTML-to-PNG pattern verified
- Direct code inspection: `research/tools/guide-generator/lib/template.js` — SVG flow diagram functions for all 5 guides verified
- Direct code inspection: `research/tools/repurposing-script/lib/formatter.js` — banned-phrases path resolution pattern verified
- puppeteer 24.38.0 installed and version-confirmed at `research/tools/guide-generator/node_modules/puppeteer/`
- `.planning/phases/12-.../12-CONTEXT.md` — all locked decisions read directly

### Secondary (MEDIUM confidence)

- puppeteer screenshot API (`page.screenshot({ clip, type })`) — established behavior documented in puppeteer docs; `setViewport + screenshot clip` pattern used consistently since v1.x
- `deviceScaleFactor` behavior — standard puppeteer viewport option; doubles physical pixel output without changing CSS layout

### Tertiary (LOW confidence)

- Hashtag strategy (5-8 niche, low-volume) — based on general Instagram best practice consensus; no single authoritative source. Specific hashtag choices are Claude's discretion per CONTEXT.md.
- Hormozi carousel "5-8 slide" structure — based on publicly observable patterns from Alex Hormozi's Instagram content; not from an official source.

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — puppeteer version confirmed installed; all deps verified
- Architecture: HIGH — directly extends proven guide-generator patterns; no new primitives
- Pitfalls: HIGH — most pitfalls are from existing project decisions (Phase 8-03 macOS path, Phase 11 font loading, Phase 11 try/finally browser.close())
- Content (hooks, hashtags): MEDIUM — hook formulas from CONTEXT.md are locked; hashtag specifics are Claude's discretion

**Research date:** 2026-03-05
**Valid until:** 2026-04-05 (puppeteer API is stable; no upcoming breaking changes expected)
