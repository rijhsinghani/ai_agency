# Stack Research

**Domain:** Content Marketing Engine — Solo AI Automation Agency (v2.0 milestone)
**Researched:** 2026-03-01
**Confidence:** MEDIUM-HIGH (most tools verified via official docs and 2026 sources; Instagram API Reels support has conflicting documentation requiring direct Meta verification)

---

## Context: What This Milestone Adds

The existing v1.0 stack (static HTML, GitHub Pages, Google Calendar, N8N, Claude Code) handles the agency's operational core. This milestone adds five new capability areas:

1. **Content idea research CLI** — Competitor research + keyword research + topic suggestions
2. **Transcript extraction** — Pull text from existing YouTube videos for repurposing
3. **Video clipping** — Cut long-form YouTube demos into short-form clips
4. **Text content generation** — Twitter threads, Instagram captions, case study drafts from transcripts
5. **Multi-platform posting/scheduling** — Distribute content to Twitter, Instagram, YouTube

The constraint: **solo operator, bootstrapped**. Every tool must have a free or near-free tier. Custom code over SaaS subscriptions where Claude Code + Node.js can do the job.

---

## Stack by Capability Area

### 1. Content Idea Research CLI

**Verdict: Build a custom Node.js CLI with Commander.js. Drive research via VidIQ (free browser extension) + Claude API for synthesis.**

Do not buy a SaaS research tool. The CLI is a thin orchestration layer that calls APIs and formats output for fast decision-making. Build this, don't buy it.

#### Core Technologies

| Technology           | Version          | Purpose                                                 | Why Recommended                                                                                                                                                      |
| -------------------- | ---------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Commander.js         | 14.0.3           | CLI framework for the content idea tool                 | Industry standard, actively maintained, v15 not until May 2026, requires Node 20+. Full-featured option parsing, help text, subcommands. No learning curve overhead. |
| Claude API (Haiku)   | claude-haiku-3-5 | Synthesize research findings into topic recommendations | Cheapest capable model for this use case. Input: competitor topics, trending queries, niche context. Output: ranked topic ideas with hooks.                          |
| Anthropic SDK (Node) | ^0.39.x          | Claude API calls from Node.js CLI                       | Official SDK. Handles auth, retries, streaming.                                                                                                                      |

#### Supporting Libraries for CLI Research

| Library | Version | Purpose                                             | When to Use                                                      |
| ------- | ------- | --------------------------------------------------- | ---------------------------------------------------------------- |
| axios   | ^1.9.x  | HTTP client for keyword/trend API calls             | Standard, well-maintained. For any REST API calls the CLI makes. |
| chalk   | ^5.x    | Terminal output formatting (colored output, tables) | ESM-only in v5. Makes CLI output scannable at a glance.          |
| ora     | ^8.x    | Terminal spinner for async operations               | Shows progress during API calls. ESM-only in v8+.                |
| dotenv  | ^16.x   | Load API keys from .env file                        | Standard for CLI tools with secrets.                             |

#### External Research Sources (Free)

| Source                                                          | Purpose                                                                                  | Cost                          | Confidence                                                                                                  |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| VidIQ (browser extension, free plan)                            | YouTube keyword scores, video scores, competitor channel tracking, "Daily Ideas" feature | Free                          | MEDIUM — free plan gives basic keyword research and idea generation; competitor tracking is limited on free |
| YouTube Data API v3                                             | Channel search, trending videos in a category, video metadata                            | Free (10,000 quota units/day) | HIGH — official Google API                                                                                  |
| Google Trends (unofficial scraping via `google-trends-api` npm) | Trending queries in "business automation" topics                                         | Free                          | LOW — unofficial; Google blocks scrapers intermittently                                                     |

**Recommended approach:** VidIQ browser extension for manual competitor research sessions + YouTube Data API v3 for programmatic channel/video data + Claude Haiku to synthesize into topic briefs. The CLI runs the YouTube API + Claude synthesis; VidIQ is used manually when doing competitor research sessions.

---

### 2. YouTube Transcript Extraction

**Verdict: Use Supadata.ai API (100 free requests, then pay-as-you-go). Do NOT use the `youtube-transcript` npm package — last published 2 years ago and uses unofficial API that breaks without notice.**

#### Recommended

| Technology         | Version | Purpose                                                             | Why                                                                                                                                                                                                                                      |
| ------------------ | ------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@supadata/js` SDK | latest  | Extract transcripts from YouTube, TikTok, Instagram, Twitter videos | 100 free requests/month, no credit card required. Returns timestamped transcripts. Supports videos without captions via AI transcription. Official TypeScript/JavaScript SDK. Works as a managed API so no brittle scraping to maintain. |

#### Alternative (self-hosted, no API cost)

| Technology          | Version | Purpose                                                            | Why                                                                                                                                                                                                     |
| ------------------- | ------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nodejs-whisper`    | ^0.1.x  | Local Whisper transcription via Node.js bindings (C++ CPU version) | $0 per request, fully offline. Tradeoff: slower (CPU-only), requires FFmpeg, requires model download (~1.5GB for medium model). Use this if video volume grows enough to make Supadata cost meaningful. |
| `yt-dlp` (CLI tool) | latest  | Download YouTube audio for local Whisper transcription             | More reliable than youtube-dl. Used to extract audio before passing to Whisper.                                                                                                                         |

#### What NOT to Use

| Avoid                               | Why                                                                                                                                                            | Use Instead                        |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `youtube-transcript` npm package    | Last published 2 years ago; uses unofficial YouTube API that breaks without notice                                                                             | `@supadata/js`                     |
| `youtube-caption-extractor`         | Unofficial API; no active maintenance guarantee                                                                                                                | `@supadata/js`                     |
| YouTube Data API v3 for transcripts | YouTube's official API does not return transcript text — only caption track metadata and timed text files in raw XML format, which requires additional parsing | `@supadata/js`                     |
| OpenAI Whisper API                  | $0.006/minute of audio — fine for occasional use, but adds up for a pipeline processing multiple videos per week                                               | Local `nodejs-whisper` or Supadata |

---

### 3. Video Clipping (Long-form → Short-form)

**Verdict: FFmpeg via `fluent-ffmpeg` + `ffmpeg-static` for clip cutting. Use Claude Haiku to identify clip timestamps from the transcript. Do NOT use Opus Clip or similar SaaS — they charge $30-100+/month for what a 50-line script does.**

#### Core Technologies

| Technology         | Version          | Purpose                                                      | Why                                                                                                                          |
| ------------------ | ---------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `fluent-ffmpeg`    | ^2.1.x           | Node.js wrapper for FFmpeg video/audio processing            | Industry standard. Fluent API for constructing FFmpeg commands. Active maintenance.                                          |
| `ffmpeg-static`    | ^5.x             | Provides static FFmpeg binaries — no system install required | Eliminates "FFmpeg not installed" setup friction. Works on macOS, Linux, Windows. Required for cross-machine portability.    |
| Claude API (Haiku) | claude-haiku-3-5 | Identify clip-worthy timestamps from transcript text         | Given a transcript, ask Claude to identify the 3-5 best 60-90 second clip segments with timestamps. Returns structured JSON. |

#### Supporting Libraries

| Library                        | Version | Purpose                          | When to Use                                                                                       |
| ------------------------------ | ------- | -------------------------------- | ------------------------------------------------------------------------------------------------- |
| `@ffmpeg/ffmpeg` (WebAssembly) | —       | Alternative browser-based FFmpeg | NOT recommended for this use case — WASM is slower than native binary. Use fluent-ffmpeg instead. |

#### What NOT to Use

| Avoid                                                | Why                                                                                                                   | Use Instead                                |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| OpusClip / Vizard.ai / quso.ai                       | SaaS tools charging $30-100+/month. Solve a problem that 50 lines of Node + FFmpeg + Claude solves at near-zero cost. | fluent-ffmpeg + ffmpeg-static + Claude API |
| DaVinci Resolve / Premiere for programmatic clipping | GUI tools, not scriptable in a pipeline                                                                               | FFmpeg                                     |
| `@ffmpeg/ffmpeg` WASM                                | 3-5x slower than native binary for long video processing                                                              | fluent-ffmpeg + ffmpeg-static              |

#### Video Format Notes

- Instagram requires 9:16 vertical aspect ratio for Reels. Use FFmpeg crop filter: `scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920`.
- Twitter/X accepts landscape and square. No crop needed from standard YouTube 16:9.
- YouTube Shorts requires 9:16 vertical, under 60 seconds.
- Caption overlay for short clips: use FFmpeg `drawtext` filter or CapCut (manual, free) for final caption polish.

---

### 4. Text Content Generation (Twitter Threads, Instagram Captions, Case Studies)

**Verdict: Claude Haiku via Anthropic SDK with a prompt template library. No separate content generation SaaS needed. Cost is negligible at this volume.**

#### Core Technologies

| Technology          | Version          | Purpose                                                                               | Why                                                                                                                                                          |
| ------------------- | ---------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Claude API (Haiku)  | claude-haiku-3-5 | Generate Twitter threads, Instagram captions, case study first drafts from transcript | Haiku input/output costs are $0.80/$4.00 per million tokens. A 10,000-token transcript → 500-token Twitter thread costs ~$0.01. Volume is not a cost driver. |
| `@anthropic-ai/sdk` | ^0.39.x          | Official SDK for Claude API calls                                                     | Handles retries, streaming, auth.                                                                                                                            |

#### Prompt Template Structure

Keep prompt templates as plain `.txt` or `.md` files in a `prompts/` directory. Version-control them. This is the asset that drives quality — better prompts beat bigger models.

Example template structure:

```
prompts/
  twitter-thread.md      # System prompt for Twitter thread generation
  instagram-caption.md   # System prompt for Instagram captions
  case-study-draft.md    # System prompt for case study narrative
  youtube-description.md # System prompt for video descriptions + tags
```

#### What NOT to Use

| Avoid                                    | Why                                                                                                        | Use Instead           |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------- |
| Jasper / Copy.ai / Writesonic            | $49-99/mo subscription for what Claude Haiku does at $0.01/generation                                      | Anthropic SDK + Haiku |
| GPT-4o for content generation            | Higher cost than Haiku for this use case; Haiku quality is sufficient for social captions and first drafts | Claude Haiku          |
| Claude Opus / Sonnet for bulk generation | Overkill for Twitter threads and captions; reserve Sonnet for complex reasoning tasks                      | Claude Haiku          |

---

### 5. Multi-Platform Posting and Scheduling

**Verdict: Use Buffer Essentials (~$6/channel/month) for scheduling Twitter, Instagram, and YouTube Shorts. This is the correct tradeoff: direct API integration for Twitter and Instagram costs development time and ongoing maintenance that Buffer eliminates.**

This is the most architecturally complex area. Here is the honest analysis:

#### Platform API Reality Check (2026)

| Platform  | API Posting Status                                                                                       | Cost                            | Key Constraint                                                                                                                                    |
| --------- | -------------------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Twitter/X | Free tier: 1,500 posts/month, write-only (no reads)                                                      | $0/month                        | No read access on free tier (can't monitor mentions, track engagement). For posting-only: free works.                                             |
| Instagram | Business/Creator account required. Personal accounts dropped in Dec 2024. Must connect to Facebook Page. | Requires Facebook Developer App | Reels publishing via API has conflicting official documentation — some sources say supported since mid-2022, others say not supported. Must test. |
| YouTube   | YouTube Data API v3 for metadata management. Video uploads require OAuth.                                | Free (quota-limited)            | Video upload requires OAuth; metadata (title, description, tags) is straightforward.                                                              |

#### Recommended Approach: Buffer as Scheduling Layer

| Technology        | Cost                                | Purpose                                                                            | Why                                                                                                                                                                                                                                                           |
| ----------------- | ----------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Buffer Essentials | $5-6/channel/month (billed monthly) | Schedule Twitter threads, Instagram posts/Reels, YouTube Shorts from one dashboard | Handles platform OAuth, rate limits, retry logic, scheduling queue. Supports: Twitter threads (compose multi-post), Instagram Reels, YouTube Shorts. Free plan: 3 channels, 10 queued posts max — sufficient for testing but too limiting for production use. |

**Buffer free plan is only enough for validation, not production.** At $5-6/channel/month for 3 platforms (Twitter + Instagram + YouTube Shorts), cost is $15-18/month. This is the right tradeoff for a solo operator: eliminate platform API maintenance, get scheduling queue, get basic analytics.

#### Alternative: Direct API Integration (Only If Buffer Proves Limiting)

If Buffer adds friction (e.g., doesn't support a specific format, changes pricing, or lacks automation triggers), build direct API integration:

| Library                                           | Version | Purpose                                                       | When to Use                                                                                                                                          |
| ------------------------------------------------- | ------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `twitter-api-v2`                                  | ^1.18.x | Post tweets and threads directly to X API                     | If Buffer is eliminated. Free tier of X API: 1,500 writes/month, no reads.                                                                           |
| Instagram Graph API (via `node-fetch` or `axios`) | —       | Publish feed posts and Reels to Instagram Business account    | Only if Buffer proves insufficient. Requires Facebook App + Business/Creator account. Reels support needs direct testing against Meta's current API. |
| YouTube Data API v3 (via `googleapis` npm)        | ^144.x  | Update video metadata (title, description, tags) after upload | Useful even with Buffer — Buffer handles scheduling but YouTube's metadata optimization (tags, chapters) still benefits from direct API access.      |

#### What NOT to Use

| Avoid                                                      | Why                                                                                                                                                                               | Use Instead             |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| Hootsuite                                                  | $199/month starting in 2026 — no free plan. Egregiously overpriced for a solo operator.                                                                                           | Buffer                  |
| Typefully                                                  | Twitter/LinkedIn only. Does not support Instagram.                                                                                                                                | Buffer (multi-platform) |
| HubSpot Social                                             | Part of a $800-1,500/month marketing suite. Not remotely appropriate here.                                                                                                        | Buffer                  |
| Sprout Social                                              | $249+/month. Enterprise tool.                                                                                                                                                     | Buffer                  |
| Custom direct Twitter/Instagram API integration from Day 1 | Adds 2-3 days of OAuth implementation, error handling, retry logic, rate limit management. Buffer handles all of this. Build direct integration only if Buffer proves inadequate. | Buffer Essentials       |
| TikTok                                                     | Out of scope per PROJECT.md (banned/restricted in US market, uncertain future).                                                                                                   | —                       |

---

### 6. Case Study Creation Workflow

**Verdict: No new tools needed. Claude API + a Markdown template + Notion (already in stack). The workflow is: interview notes → Claude draft → human edit → publish to Notion (shareable page) or as PDF from Notion.**

| Technology          | Version           | Purpose                                                     | Why                                                                                                                                          |
| ------------------- | ----------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Claude API (Sonnet) | claude-sonnet-4-5 | Draft case study narrative from interview notes and metrics | Sonnet-level quality warranted here — case studies are high-stakes sales assets, not just social captions. Use Sonnet, not Haiku.            |
| Notion              | Free tier         | Store and share case studies                                | Already in stack. A shared Notion page with a case study is linkable, shareable, and looks professional. Export to PDF for email attachment. |
| Canva               | Free tier         | Case study visual header / branded layout if needed         | Already in stack for thumbnails.                                                                                                             |

**No separate case study software needed.** Tools like Testimonial.to or Trustmary are SaaS subscription services for what Notion + Claude does at $0.

---

### 7. Giveaway/Free Value Distribution

**Verdict: No new tools. GitHub (already in stack for version control) hosts downloadable templates/checklists. Buffer distributes announcement posts. Google Drive or Notion for the actual giveaway assets. Zero additional cost.**

| Technology   | Purpose                                                                          | Why                                                                            |
| ------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| GitHub Pages | Host downloadable giveaway assets (PDF checklists, automation templates as JSON) | Already in stack. A direct download link from GitHub is reliable and free.     |
| Canva        | Design giveaway content (checklist PDFs, tip cards)                              | Already in stack. Sufficient on free plan for this volume.                     |
| Buffer       | Schedule and post giveaway announcement across Twitter + Instagram               | Same scheduling tool as content distribution. No additional tool.              |
| Google Drive | Share larger giveaway files (video walkthroughs, N8N workflow exports)           | Free. Already in Google Workspace. Better than GitHub for binary files >100MB. |

---

## Complete Stack Summary (Additions to v1.0)

### New Tools — Confirmed Required

| Tool                          | Cost                           | Purpose                                                        | Confidence                                                          |
| ----------------------------- | ------------------------------ | -------------------------------------------------------------- | ------------------------------------------------------------------- |
| Buffer Essentials             | ~$18/month (3 channels)        | Multi-platform scheduling: Twitter, Instagram, YouTube Shorts  | HIGH — verified 2026 pricing; supports all three platforms          |
| Supadata.ai                   | Free (100 req) → pay-as-you-go | YouTube transcript extraction                                  | HIGH — official SDK, 100 free requests/month                        |
| Commander.js                  | Free (npm)                     | Content idea CLI framework                                     | HIGH — v14.0.3 verified; stable until May 2026                      |
| fluent-ffmpeg + ffmpeg-static | Free (npm)                     | Video clip cutting                                             | HIGH — industry standard; widely used                               |
| @anthropic-ai/sdk             | Pay-as-you-go                  | Claude API for generation, synthesis, timestamp identification | HIGH — official SDK                                                 |
| VidIQ (browser extension)     | Free                           | YouTube keyword research, competitor tracking                  | MEDIUM — free plan limited; sufficient for manual research sessions |

### New Tools — Optional / Phase 2

| Tool                               | Cost                 | Purpose                              | Condition                                                         |
| ---------------------------------- | -------------------- | ------------------------------------ | ----------------------------------------------------------------- |
| `twitter-api-v2` npm               | Free                 | Direct X API posting (bypass Buffer) | Only if Buffer proves limiting or eliminated                      |
| `nodejs-whisper`                   | Free (local compute) | Local Whisper transcription          | If Supadata costs exceed $20/month                                |
| YouTube Data API v3 (`googleapis`) | Free                 | YouTube metadata management          | If publishing pipeline requires metadata automation beyond Buffer |
| `google-trends-api` npm            | Free                 | Trending query research in CLI       | LOW confidence — Google blocks unofficial scrapers intermittently |

### Existing Stack (v1.0) — No Changes

| Tool                       | Role                                                                  |
| -------------------------- | --------------------------------------------------------------------- |
| Static HTML + Tailwind CSS | Landing page — no changes needed                                      |
| GitHub Pages               | Hosting — no changes needed                                           |
| Claude Code (daily use)    | Orchestration tool for building all of this                           |
| N8N (self-hosted)          | Can be used to trigger repurposing pipeline from YouTube upload event |
| Notion                     | Case studies, CRM — no changes needed                                 |
| Canva                      | Thumbnails, graphics — no changes needed                              |
| Descript + CapCut          | Video editing — no changes needed                                     |
| OBS Studio                 | Screen recording — no changes needed                                  |
| Google Calendar            | Booking — no changes needed                                           |

---

## Installation

```bash
# CLI tool for content idea research
npm install commander chalk ora dotenv axios @anthropic-ai/sdk

# Transcript extraction
npm install @supadata/js

# Video clipping pipeline
npm install fluent-ffmpeg ffmpeg-static

# YouTube metadata management (optional, Phase 2)
npm install googleapis

# Twitter direct API (optional, Phase 2 — only if bypassing Buffer)
npm install twitter-api-v2
```

---

## Architecture: How These Tools Connect

```
[YouTube Video Published]
        |
        v
[Supadata.ai API] → transcript text (timestamped)
        |
        +──────────────────────────────────+
        |                                  |
        v                                  v
[Claude Haiku]                    [Claude Haiku]
"Identify 5 best clip segments"   "Generate Twitter thread"
"with start/end timestamps"       "Generate Instagram caption"
        |                         "Generate YouTube description"
        v                                  |
[fluent-ffmpeg + ffmpeg-static]            v
Generate 5 short clips (9:16)     [Buffer API / Buffer UI]
        |                         Schedule posts to Twitter,
        v                         Instagram, YouTube Shorts
[Manual review in CapCut]
Add captions, final polish
        |
        v
[Buffer / direct platform upload]
```

**N8N integration point:** N8N can monitor a YouTube channel for new uploads (YouTube trigger node), fire a webhook to a Node.js script that kicks off the above pipeline. This closes the loop from "video published" to "social posts queued" with minimal manual steps.

---

## Alternatives Considered

| Recommended                 | Alternative                  | When to Use Alternative                                                                                                                                                                                                                                 |
| --------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Buffer Essentials ($18/mo)  | Direct Twitter/Instagram API | Only if Buffer becomes unavailable, raises prices significantly, or lacks a feature needed. Direct API requires OAuth implementation + retry handling — not worth it for initial build.                                                                 |
| Supadata.ai                 | `nodejs-whisper` (local)     | If processing >200 videos/month, local Whisper becomes cheaper. Supadata is the right default for low volume.                                                                                                                                           |
| Claude Haiku for generation | GPT-4o Mini                  | Similar capability and cost. Claude Haiku chosen because the existing stack is Claude-native — one API key, one SDK, one billing account.                                                                                                               |
| Commander.js CLI            | N8N workflow UI              | N8N provides a visual interface but lacks the interactive REPL-like experience useful for research sessions. CLI is faster for ad-hoc research; N8N better for scheduled automation. Both are valid — use CLI for research, N8N for automated pipeline. |
| VidIQ free (browser ext)    | TubeBuddy free               | VidIQ wins for AI features and Daily Ideas on free plan. TubeBuddy wins for A/B testing (irrelevant at this stage). VidIQ for research.                                                                                                                 |
| Canva free                  | Figma                        | Canva is faster for non-designer workflows. Figma adds complexity for what is essentially template-filling.                                                                                                                                             |

---

## What NOT to Use

| Avoid                                        | Why                                                                                                                         | Use Instead                                  |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| OpusClip / Vizard.ai / quso.ai               | $30-100+/month SaaS for video repurposing. Solves the same problem as 50 lines of Node + FFmpeg + Claude at ~$0/month.      | fluent-ffmpeg + ffmpeg-static + Claude Haiku |
| Hootsuite                                    | Eliminated free plan in 2025. Now $199/month minimum. Egregiously overpriced for solo operator.                             | Buffer Essentials                            |
| Typefully                                    | Twitter/LinkedIn only — no Instagram support. Not suitable as the sole scheduling tool when Instagram is a target platform. | Buffer (covers all three platforms)          |
| `youtube-transcript` npm                     | Last published 2 years ago. Uses unofficial API. Will break without warning.                                                | `@supadata/js`                               |
| Jasper / Copy.ai / Writesonic                | $49-99/month subscription for content generation. Claude Haiku does the same at $0.01/generation.                           | Claude Haiku via Anthropic SDK               |
| Zapier for pipeline automation               | Per-step billing. A repurposing pipeline with 10 steps = 10 task credits per video. Costs spiral.                           | N8N (per-execution) or custom Node.js script |
| TikTok                                       | US market regulatory uncertainty (ban/restrictions in 2025-2026). Not worth platform investment until stability confirmed.  | Focus on Twitter, Instagram, YouTube         |
| Notion AI or similar for case study drafting | $10-20/month add-on for a feature Claude API already provides at lower cost with better control over prompts.               | Claude Sonnet via API                        |

---

## Version Compatibility Notes

| Package           | Version | Node.js Requirement | Notes                                                                                         |
| ----------------- | ------- | ------------------- | --------------------------------------------------------------------------------------------- |
| Commander.js      | 14.0.3  | Node 20+            | v15 arriving May 2026; v14 in maintenance with security updates to May 2027. Safe to use now. |
| chalk             | ^5.x    | Node 12.17+ (ESM)   | ESM-only; configure package.json with `"type": "module"` or use dynamic import.               |
| ora               | ^8.x    | Node 18+ (ESM)      | Same ESM-only consideration as chalk.                                                         |
| fluent-ffmpeg     | ^2.1.x  | Any current Node    | Requires FFmpeg binary; `ffmpeg-static` provides this — pair them always.                     |
| @anthropic-ai/sdk | ^0.39.x | Node 18+            | Check Anthropic changelog for model deprecations. Haiku 3.5 is current as of March 2026.      |
| twitter-api-v2    | ^1.18.x | Node 14+            | If used: X API free tier is write-only (1,500 posts/month). No read access on free plan.      |

**ESM Note:** Using chalk v5+ and ora v8+ in a CLI requires the project be an ESM module (`"type": "module"` in package.json). If this conflicts with other CommonJS dependencies, use the `esm` interop package or pin chalk to v4.x and ora to v6.x (last CJS-compatible versions).

---

## Critical Flags for Implementation

**Instagram Reels API — Verify Before Building**
There is conflicting documentation on whether Instagram Graph API supports Reels publishing. Some sources (mid-2022+) say Reels are supported; others say the API only handles feed images and videos. Before building a direct Reels posting script, test the current Meta Graph API documentation and verify with a test Business account. Buffer handles this complexity — if using Buffer, this flag is irrelevant.

**X API Free Tier Is Write-Only**
The free tier allows posting (1,500 posts/month) but provides no read access. This means the content idea research CLI cannot use the X API to track competitor posts, search hashtags, or analyze engagement. VidIQ (for YouTube research) + manual Twitter browsing is the research layer. Direct X API is only needed for posting automation, not research.

**`ffmpeg-static` Binary Size**
The `ffmpeg-static` package downloads a ~100MB binary at install time. Factor this into repository decisions. Do not commit the binary. Add `node_modules/` to `.gitignore` (standard practice). CI/CD environments need `npm install` before the pipeline runs.

---

## Sources

- [X/Twitter API Pricing 2026: GetLate.dev](https://getlate.dev/blog/twitter-api-pricing) — Free tier confirmed: 1,500 writes/month, write-only, $0
- [Instagram Graph API Developer Guide 2026 — Elfsight](https://elfsight.com/blog/instagram-graph-api-complete-developer-guide-for-2026/) — Account type requirements, rate limits (200 req/hr), publishing workflow
- [Instagram Reels via API — business-automated.medium.com](https://business-automated.medium.com/posting-instagram-reels-via-instagram-facebook-graph-api-9ea192d54dfa) — Reels publishing via Graph API documented (conflicting with some other sources — verify with current Meta docs)
- [Buffer Pricing 2026 — support.buffer.com](https://support.buffer.com/article/595-features-available-on-each-buffer-plan) — Essentials plan pricing, platform support confirmed
- [Buffer Free Plan Limits 2026 — buffer.com](https://buffer.com/pricing) — 3 channels, 10 posts per channel queue limit
- [Commander.js v14.0.3 — npmjs.com](https://www.npmjs.com/package/commander) — Version confirmed, Node 20+ requirement
- [Commander.js Releases — GitHub](https://github.com/tj/commander.js/releases) — v15 planned May 2026; v14 in maintenance after
- [fluent-ffmpeg — npmjs.com](https://www.npmjs.com/package/fluent-ffmpeg) — Active maintenance confirmed
- [youtube-transcript npm — intel.aikido.dev](https://intel.aikido.dev/packages/npm/youtube-transcript) — Last published 2 years ago; do not use
- [Supadata.ai YouTube Transcript API 2026 — supadata.ai](https://supadata.ai/youtube-transcript-api) — 100 free requests, official SDK available
- [Supadata JS SDK — npmjs.com](https://www.npmjs.com/package/@supadata/js) — Official TypeScript/JavaScript SDK confirmed
- [VidIQ vs TubeBuddy 2026 — linodash.com](https://linodash.com/vidiq-vs-tubebuddy/) — VidIQ wins for AI features, free plan includes Daily Ideas
- [OpenAI Whisper for Developers 2026 — assemblyai.com](https://www.assemblyai.com/blog/openai-whisper-developers-choosing-api-local-server-side-transcription) — Local vs API tradeoffs documented
- [n8n YouTube + Social Repurposing Templates — n8n.io](https://n8n.io/workflows/5292-summarize-youtube-videos-from-transcript-for-social-media/) — N8N workflow templates for transcript → social posts confirmed
- [Typefully Pricing 2026 — socialrails.com](https://socialrails.com/blog/typefully-pricing) — Confirmed no Instagram support; Twitter/LinkedIn/Bluesky only
- [Buffer vs Typefully 2026 — socialrails.com](https://socialrails.com/blog/buffer-vs-typefully) — Buffer wins for multi-platform; Typefully for Twitter-only experience
- [twitter-api-v2 npm — npmjs.com](https://www.npmjs.com/package/twitter-api-v2) — Strongly typed, full-featured X API client for Node.js

---

_Stack research for: Content Marketing Engine — v2.0 milestone additions for Solo AI Automation Agency_
_Researched: 2026-03-01_
