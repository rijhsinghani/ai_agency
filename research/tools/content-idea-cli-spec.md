# Content idea CLI — specification (TOOL-01)

**Phase:** 7 — Case Studies + Content Tooling
**Requirement:** TOOL-01
**Status:** Pre-work (spec only — no code written)
**Owner:** Sameer Rijhsinghani
**Date:** 2026-03-02

---

## Purpose

The content idea CLI is a local command-line tool that generates 5–10 content topic suggestions on demand, drawn entirely from research data already collected in this repository. It replaces the manual process of re-reading the topic bank, cross-referencing the YouTube content plan, and thinking through which service package a topic ties to — a task that currently takes 20–30 minutes every time content planning happens.

The output is Markdown-formatted, ready to paste into a content calendar or a planning document. Every suggestion is framed for small business owners, not for builders or automation hobbyists. The hook language comes directly from real complaints found in subreddit research, not invented from scratch.

No external API calls. No network access at runtime. Works entirely from local files that already exist in the repo.

---

## Tech stack

- **Runtime:** Node.js (v20+)
- **CLI framework:** Commander.js v14.0.3 (per project decisions locked in Phase 5 tooling)
- **Language:** JavaScript (CommonJS modules, consistent with the existing research scripts)
- **Output:** Markdown rendered to stdout — pipe-friendly, file-friendly, terminal-readable
- **Data sources:** Local Markdown files read at runtime — no database, no network

**Why Commander.js v14.0.3:** This version was selected during Phase 5 infrastructure work. Do not upgrade or swap it out without a separate decision record.

---

## Command interface

### Default — 5 topics

```
sameer-ideas
```

Returns 5 topic suggestions, scored and ranked from the topic bank. Default platform is YouTube (long-form), since YouTube is the hub channel per the ROADMAP content strategy.

---

### Count flag — specify how many topics to return

```
sameer-ideas --count 10
```

Returns the specified number of topics, up to the maximum available in the topic bank (currently 12). If `--count` exceeds the number of available topics, the CLI returns all available topics and logs a note that the bank is exhausted.

Shorthand: `-c`

---

### Focus flag — filter by vertical or keyword

```
sameer-ideas --focus plumbing
sameer-ideas --focus hvac
sameer-ideas --focus cleaning
```

Filters topics to those with matching subreddit evidence from the given vertical. Matching is case-insensitive and checks the subreddit list and evidence quotes stored per topic in the topic bank.

If no topics match the focus filter, the CLI returns: "No topics found matching '[value]'. Try: hvac, plumbing, electrician, lawncare, photography, smallbusiness, realestate."

Shorthand: `-f`

---

### Format flag — generate platform-specific angles

```
sameer-ideas --format youtube
sameer-ideas --format twitter
sameer-ideas --format carousel
```

Accepted values: `youtube`, `twitter`, `carousel`

When a format is specified, the suggested hook and framing adapt to that platform's content conventions:

- `youtube` — long-form hook (problem statement, 2–3 sentences, designed for a verbal delivery in the first 10 seconds). Mirrors the pattern used in the existing YouTube content plan.
- `twitter` — punchy single-line hook. Metric first ("Most plumbers close 10% of inbound leads. The ones who close 35% do one thing differently."). Under 240 characters. No hashtags.
- `carousel` — slide-by-slide angle. Outputs a 5-slide structure: [cover hook] → [pain context] → [what most businesses do] → [what the fix looks like] → [CTA]. Instagram carousel format.

Default (no flag): `youtube`

Shorthand: `-m` (for "medium" — avoids conflict with `-f` for format if both are used in a pipeline)

---

### Combined example

```
sameer-ideas --count 3 --focus hvac --format twitter
```

Returns 3 topics filtered to HVAC-relevant evidence, with Twitter-formatted hooks.

---

## Input sources

The CLI reads from 4 local data sources at startup. All paths are relative to the project root. The CLI resolves paths from `process.env.CONSULTANCY_ROOT` if set, otherwise uses the directory containing the CLI script.

### 1. Topic bank (`research/output/topic-bank.md`)

The primary data source. Contains 12 ranked topics with:

- Pain point name
- Composite score (used as the primary sort key)
- Post count and subreddit spread
- Package match (existing package name or "New development needed")
- Content angle (pre-written hook written during research)
- Subreddit list (used for `--focus` filtering)
- Evidence quotes (real posts with upvote counts — used to validate hook language)

Parser reads the Markdown table for the ranked list, then reads each `### Topic` section for full detail. No external library needed — a simple line-by-line state machine parser is sufficient.

### 2. YouTube content plan (`content/youtube/content-plan.md`)

Used to detect which topics are already covered by the 5 existing video ideas, so the CLI avoids suggesting duplicates. The CLI reads the plan at startup, extracts the theme of each existing video (bookkeeping automation, missed call text-back, studio-os/employee replacement, what's worth automating, content engine), and scores down topics that closely overlap.

The de-duplication is soft, not hard — if a topic overlaps with an existing video but has a meaningfully different angle or format, it can still appear in output.

### 3. Package list (`ops/packages/`)

All 6 package files are read at startup:

- `missed-call-text-back.md` — $1,500 build / $200/mo
- `lead-follow-up.md` — $2,500 build / $350/mo
- `appointment-reminders.md` — $1,500 build / $200/mo
- `quote-follow-up.md` — $2,000 build / $300/mo
- `review-reputation.md` — $1,500 build / $200/mo
- `custom-build-intake.md` — $2,500–$5,000 build

From each file, the CLI extracts: package name, build price, monthly retainer, the "What This Does" section (plain-English description), and the ROI example. These are attached to output topics where a package match exists in the topic bank.

### 4. Competitor gap data (future input — not yet available)

The ROADMAP references a competitor content audit (Phase 5 RSCH-03) that would provide gap data. At the time this spec is written, that data has not been generated. The CLI data model should include a placeholder field for competitor gap score (default: 0) so the scoring algorithm can incorporate this when the audit runs. The CLI should not crash or warn if this file is absent — treat it as optional.

---

## Output format

Each suggested topic is rendered as a Markdown section. One section per topic, separated by a horizontal rule.

### Single-topic output block

```markdown
## [Topic title]

**Hook:** [Platform-appropriate hook sentence or paragraph]

**Why it works:** [1–2 sentences. What real business owner pain this addresses. Reference to evidence score where relevant.]

**Suggested platforms:** [Comma-separated list of recommended platforms based on topic type and audience density]

**Related package:** [Package name with build price and retainer, or "No existing package — new development opportunity"]

**Topic bank score:** [Numeric score from topic-bank.md]
**Evidence posts:** [Count] across [Subreddit count] subreddits
```

---

### Full run output structure

```
# Content ideas — [date generated]
# Command: sameer-ideas [flags used]
# Topics returned: [N] of [available]

---

## [Topic 1]
[block]

---

## [Topic 2]
[block]

---
[...continues]
```

The header block makes the output self-documenting when saved to a file — the reader can reconstruct the command that produced it.

---

## Scoring and ranking algorithm

Topics are scored at runtime using a weighted composite of the signals available in local data. The score from topic-bank.md (already a composite of upvotes, post count, and subreddit spread) is the base. The CLI applies multipliers and penalties on top.

### Base score

Pull directly from the topic bank. This score was computed by the Reddit scraper as a function of: total upvotes across posts, number of posts, and number of distinct subreddits. Higher = stronger validated pain point.

### Package match bonus (+15% to base score)

Topics with an existing "Ready to sell" package match get a 15% bonus. These topics have both a validated pain point AND a deliverable product — the content has a clear commercial path. Topics with "New development needed" receive no bonus.

### Already-covered penalty (−30% to base score)

If the topic closely overlaps a YouTube video already in the content plan, reduce its score by 30%. This keeps suggestions fresh relative to the existing plan. "Closely overlaps" is defined as: the existing video covers the same core pain point, not just the same industry.

### Format relevance adjustment

When `--format twitter` is used, apply a small upward adjustment (+5%) to topics with shorter, more punchy evidence quotes — these translate better to single-tweet hooks. When `--format carousel`, apply a +5% adjustment to topics with multi-step processes (quote follow-up sequence, appointment reminders) that naturally fill 5 slides.

### Final sort

Sort by adjusted score descending. Return the top N (per `--count`, default 5).

---

## Data architecture

```
Runtime data flow:

topic-bank.md ──────────────────────┐
                                    │
content-plan.md ──── de-dup filter ─┤
                                    ├──► topic scorer ──► ranked list ──► formatter ──► stdout
ops/packages/*.md ─── package map ──┤
                                    │
[competitor-gaps.md] (optional) ────┘
```

All data is loaded into memory at startup. The total data footprint is small (topic bank is ~6KB, all package files combined ~15KB, content plan ~8KB) — no streaming or lazy loading needed.

### Internal data model (per topic)

```
{
  rank: number,                 // from topic bank ranked table
  title: string,                // pain point name
  baseScore: number,            // composite score from topic bank
  adjustedScore: number,        // after multipliers/penalties applied
  contentAngle: string,         // pre-written hook from topic bank
  subreddits: string[],         // used for --focus filtering
  evidencePosts: number,        // post count
  subredditSpread: number,      // distinct subreddit count
  evidenceQuotes: string[],     // real quotes from the research
  packageMatch: string | null,  // package slug or null
  packageStatus: string,        // "Ready to sell" | "New development needed"
  packageDetails: object | null // from package file: name, build price, retainer, roi excerpt
  alreadyCovered: boolean,      // true if overlaps with existing YouTube plan
  competitorGapScore: number    // 0 if file absent, populated when audit data exists
}
```

---

## Brand voice constraints on output

The CLI's output text — hooks, "why it works" copy, package descriptions — must follow the brand voice rules from `brand/brand-voice.md`. These constraints apply to any text the CLI generates (as opposed to text pulled directly from source files):

- No emojis anywhere
- No jargon: "automated follow-up" not "AI-powered omnichannel engagement"
- No buzzwords: no "game-changer," "seamless," "leverage," "revolutionary"
- Lead with the outcome, not the technology
- Use numerals for business metrics (3 jobs, $4,200, 40%) — never write them out
- Contractions are fine and preferred (it's, you're, we'll)
- Short paragraphs — 2 to 4 sentences max
- Sentence case in headings

Text pulled verbatim from source files (evidence quotes, content angles, package descriptions) is exempt — those are already in-voice.

---

## Error handling and edge cases

| Condition                                   | Behavior                                                                                  |
| ------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `topic-bank.md` not found                   | Exit with error: "Topic bank not found at [path]. Run the research scraper first."        |
| `content/youtube/content-plan.md` not found | Log warning, skip de-dup check, continue                                                  |
| `ops/packages/` directory not found         | Log warning, skip package enrichment, continue                                            |
| `--count` exceeds available topics          | Return all available, log: "Returning [N] topics — topic bank only contains [N] entries." |
| `--focus` matches nothing                   | Print: "No topics match '[value]'. Available verticals: [list]" and exit cleanly          |
| `--format` receives unknown value           | Print: "Unknown format '[value]'. Use: youtube, twitter, carousel" and exit               |
| Malformed topic bank (parser fails)         | Exit with error pointing to the specific section that failed to parse                     |

---

## Example output

Command run:

```
sameer-ideas --count 3 --format youtube
```

Output:

```markdown
# Content ideas — 2026-03-02

# Command: sameer-ideas --count 3 --format youtube

# Topics returned: 3 of 12

---

## Missed calls losing customers to competitors

**Hook:** I was under a sink when the call came in. By the time I surfaced, they had already booked someone else. Every trade business owner has this story. Here's how to make sure it never costs you another job.

**Why it works:** This is the top validated pain point from HVAC and plumbing subreddits. 4 posts, 887 combined upvotes. The prospect already knows the cost — they've lived it. Content only needs to show the fix.

**Suggested platforms:** YouTube (long-form demo), Instagram (before/after carousel), Twitter (lead metric hook)

**Related package:** Missed Call Text-Back — $1,500 build / $200/mo. Recovers an average of 2 leads per month for a solo electrician at standard call volume. Build fee paid back in under 2 jobs.

**Topic bank score:** 2218.5 (adjusted: 2551.3 — package match bonus applied)
**Evidence posts:** 4 across 3 subreddits

---

## Quotes sent with no follow-up or close

**Hook:** You wrote the estimate. You sent it. Then nothing. You followed up once — maybe. Then you moved on. Your close rate isn't a pricing problem. It's a follow-up problem. Here's the 3-touch sequence that fixed it for a roofing company going from 25% to 35% close rate in 60 days.

**Why it works:** The evidence quote (1,243 upvotes on r/entrepreneur) is one of the highest-engagement data points in the entire research set. The specific percentage improvement and timeline make this directly usable as a thumbnail number.

**Suggested platforms:** YouTube (case study format), Twitter (stat hook), Instagram (carousel — 5 slides map cleanly to the 3-touch sequence)

**Related package:** Lead Nurture & Quote Follow-Up — $2,000 build / $300/mo. Recovers 2 additional closes per month for a roofing company sending 20 quotes. Build fee recovered in under one month.

**Topic bank score:** 2076.5 (adjusted: 2388.0 — package match bonus applied)
**Evidence posts:** 3 across 3 subreddits

---

## Google review gap vs competitors

**Hook:** 31 reviews. Your competitor has 180. You've done just as many jobs. Maybe more. The difference isn't the quality of your work — it's that they ask every single customer, automatically, 2 hours after the job wraps. Here's what that system looks like.

**Why it works:** The hook is pulled near-verbatim from the highest-upvoted evidence post in this topic (523 upvotes, r/HVAC). Business owners in this situation feel the gap as an injustice, not just a problem — the framing of fairness is unusually motivating.

**Suggested platforms:** YouTube (demo + results walkthrough), Instagram (before/after stat carousel), Twitter (contrast hook)

**Related package:** Review & Reputation Automation — $1,500 build / $200/mo. Moving from 4.1 to 4.7 stars generates an estimated 25–30% more clicks from Google Maps — which at 30 calls/month translates to 4–5 additional booked jobs.

**Topic bank score:** 1918.5 (adjusted: 2206.3 — package match bonus applied)
**Evidence posts:** 3 across 2 subreddits
```

---

## What the CLI does not do

These are explicit non-goals for this tool. If any of these capabilities are needed in the future, they belong in a separate tool or a later version with its own spec.

- Does not make any network requests at runtime
- Does not write files — output is always to stdout; the user pipes or redirects as needed
- Does not generate social post copy — it generates topic suggestions and hooks, not finished posts (that is Phase 8 territory, TOOL-03/TOOL-04)
- Does not have a web UI or a dashboard
- Does not store or cache output — every run reads from the source files fresh
- Does not require authentication or API keys of any kind
- Does not call the Claude API, OpenAI, or any other LLM service
- Does not modify the topic bank or any source file

---

## Installation

The tool will be installed as a local CLI using `npm link` or an `npm run` script — the exact mechanism to be decided during Phase 7 implementation. The binary name is `sameer-ideas`.

The tool lives at: `research/tools/content-idea-cli/` (directory to be created during implementation).

A `package.json` `bin` field will expose `sameer-ideas` as the executable name.

---

## Acceptance criteria (from ROADMAP Phase 7 TOOL-01)

The tool is complete when:

1. Running `sameer-ideas` produces 5 topic suggestions drawn from the topic bank, each correctly linked to a package where one exists.
2. `--count 10` returns 10 suggestions without error.
3. `--focus plumbing` filters to topics with plumbing subreddit evidence and returns a helpful message if none match.
4. `--format twitter` returns hooks that are single-line, metric-first, and under 240 characters.
5. All output text follows brand voice rules (no jargon, no buzzwords, numerals for metrics).
6. The CLI runs with no network access — verified by running with firewall blocking outbound connections.
7. A topic already covered by the YouTube content plan scores lower than equivalent topics not yet covered.

---

## Open questions (to resolve during Phase 7 implementation)

1. **Competitor gap data:** The scoring model reserves a slot for competitor gap score, but the Phase 5 competitor audit (RSCH-03) has not been completed. Implementation should confirm whether that data will be available before Phase 7 build starts, or proceed with the gap score defaulting to 0.

2. **Parser strategy for topic-bank.md:** The topic bank is Markdown with a specific structure. The parser should be defensive — if the file structure changes (e.g., the scraper is re-run with different output formatting), the CLI should fail with a clear error rather than silently return wrong data. Decide during implementation whether to use a line-by-line state machine or a lightweight Markdown parser like `marked`.

3. **De-duplication sensitivity:** The overlap detection between topic suggestions and the YouTube content plan is currently specified as "closely overlaps" — a judgment call. During implementation, define the exact matching rule (keyword matching? semantic? topic category?) before writing the code, not after.
