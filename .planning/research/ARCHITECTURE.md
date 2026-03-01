# Architecture Research

**Domain:** Solo AI Automation Consultant — Content Marketing Engine (v2.0 Milestone)
**Researched:** 2026-03-01
**Confidence:** MEDIUM — component patterns are well-established across multiple 2026 sources; specific automation trigger details (YouTube API polling, multi-platform publish nodes) confirmed via n8n workflow catalog; overall structure derived from verified sources with one low-confidence section flagged.

---

## Context: What Already Exists

This milestone adds a content marketing engine to an existing minimal setup:

```
EXISTING (do not break):
├── website/              # Static HTML + Tailwind CSS (GitHub Pages)
├── brand/                # SVG logos, brand voice guide
├── ops/
│   ├── outreach/         # Email templates (day-1, day-3, day-7, audit)
│   └── packages/         # Service package concepts
└── .planning/            # Project planning, roadmap, research
```

The content marketing engine lives ALONGSIDE this. It does not require a backend, database, or server. It is a system of local scripts, file-based workflows, external platform APIs, and manual production steps — connected by a solo operator.

---

## Standard Architecture

This is a content operations architecture, not a software architecture. The system has five distinct layers:

### System Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                     CONTENT IDEATION ENGINE                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────────┐ │
│  │  Competitor     │  │  Trending Topic  │  │  Case Study          │ │
│  │  Research CLI   │→ │  Scanner (API)   │→ │  Idea Generator      │ │
│  │  (local script) │  │  (YouTube/Search)│  │  (Claude Code)       │ │
│  └─────────────────┘  └─────────────────┘  └──────────────────────┘ │
│                              ↓ ideas + briefs                         │
│                    content/ideas/ (markdown files)                    │
└──────────────────────────────────────────────────────────────────────┘
                               ↓ approved ideas
┌──────────────────────────────────────────────────────────────────────┐
│                     CONTENT PRODUCTION ENGINE                        │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────────┐ │
│  │  Case Study     │  │  Demo Build      │  │  YouTube Long-Form   │ │
│  │  Template       │  │  (screen record  │  │  Production          │ │
│  │  (markdown)     │  │   + walkthrough) │  │  (OBS + Descript)    │ │
│  └─────────────────┘  └─────────────────┘  └──────────────────────┘ │
│                              ↓ published YouTube video                │
│                         YouTube (content hub)                         │
└──────────────────────────────────────────────────────────────────────┘
                               ↓ YouTube video URL
┌──────────────────────────────────────────────────────────────────────┐
│                     REPURPOSING PIPELINE                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────────┐ │
│  │  Transcript     │→ │  AI Content      │→ │  Multi-Platform      │ │
│  │  Extraction     │  │  Transform       │  │  Draft Queue         │ │
│  │  (YouTube API)  │  │  (Claude Code /  │  │  (local markdown)    │ │
│  │                 │  │   n8n workflow)  │  │                      │ │
│  └─────────────────┘  └─────────────────┘  └──────────────────────┘ │
│                              ↓ platform-optimized drafts              │
│        Twitter threads | Instagram captions | YouTube Shorts script   │
└──────────────────────────────────────────────────────────────────────┘
                               ↓ reviewed + approved drafts
┌──────────────────────────────────────────────────────────────────────┐
│                     DISTRIBUTION ENGINE                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────────────┐ │
│  │  Twitter/X      │  │  Instagram       │  │  Giveaway Content    │ │
│  │  (@SameerAutomates)│ │  (@SameerAutomates)│ │  (checklists,      │ │
│  │  Manual post    │  │  Manual post     │  │   templates, tips)   │ │
│  └─────────────────┘  └─────────────────┘  └──────────────────────┘ │
│                              ↓ traffic                                │
│                    landing page (GitHub Pages)                        │
└──────────────────────────────────────────────────────────────────────┘
                               ↓ book a call CTA
┌──────────────────────────────────────────────────────────────────────┐
│                     CONVERSION ENGINE                                │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │           Google Calendar Appointment Scheduling                 │ │
│  │           (15-min discovery call — already exists)               │ │
│  └─────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```

---

### Component Responsibilities

| Component                  | Responsibility                                                                                                  | Implementation                                                                                                    |
| -------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Competitor Research CLI    | Pull top YouTube channels in automation niche, extract video titles, views, engagement. Surface what's working. | Local Node.js or Python script using YouTube Data API v3. Run on demand via Claude Code.                          |
| Trending Topic Scanner     | Identify rising questions from target audience (plumbers, dentists, realtors). Surface gaps.                    | YouTube Data API + Google Trends API or SerpAPI. Piped into Claude for synthesis.                                 |
| Case Study Idea Generator  | Take a client automation or demo build + produce a structured content brief                                     | Claude Code prompt template. Input: automation type, business vertical. Output: brief markdown in content/ideas/. |
| Case Study Template        | Standardized before/after format for documenting automations as publishable case studies                        | Markdown file. Fields: business type, pain point, solution, before metric, after metric, demo video link.         |
| Demo Build                 | Working automation built for a specific small business type to demonstrate results                              | Claude Code + N8N. The demo is real, not hypothetical. Screen-recorded for video.                                 |
| YouTube Production         | Long-form videos (10-15 min): case study walkthroughs, demo recordings, business owner explainers               | OBS for recording, Descript for editing and captions, CapCut for short clips.                                     |
| Transcript Extraction      | Pull transcript from published YouTube video                                                                    | YouTube Data API v3 (captions endpoint) or yt-dlp. Returns plain text.                                            |
| AI Content Transform       | Convert transcript into platform-specific drafts: Twitter thread, Instagram caption, YouTube Shorts script      | Claude Code with platform-specific prompt templates per output type. Optionally n8n workflow for automation.      |
| Multi-Platform Draft Queue | Staging area for AI-generated drafts awaiting human review and approval                                         | Local markdown files in content/queue/. One file per platform per piece.                                          |
| Distribution (Twitter)     | Post approved threads, tips, short clips as @SameerAutomates                                                    | Manual at v2.0 launch. Optionally n8n → Twitter API after content rhythm established.                             |
| Distribution (Instagram)   | Post approved reels, carousels, captions as @SameerAutomates                                                    | Manual at v2.0 launch. Later: n8n → Meta Graph API.                                                               |
| Giveaway Content           | Free checklists, templates, and tip sheets distributed via social to build trust and grow audience              | Markdown-generated PDFs or simple HTML pages hosted on GitHub Pages. No external tools needed.                    |
| Landing Page               | Convert inbound social traffic to discovery calls                                                               | Static HTML + Tailwind (GitHub Pages). Already exists. Needs CTA audit + UTM link tracking.                       |
| Booking                    | Convert landing page visitors to 15-min discovery calls                                                         | Google Calendar Appointment Scheduling. Already exists. No changes needed.                                        |

---

## Recommended Project Structure

This adds to the existing repo without touching what already exists:

```
automation_consulting/
├── website/               # EXISTING — do not modify
├── brand/                 # EXISTING — do not modify
├── ops/                   # EXISTING — do not modify
│
├── content/               # NEW — content marketing engine root
│   ├── ideas/             # Generated content briefs (markdown)
│   │   └── YYYY-MM-DD-slug.md
│   ├── case-studies/      # Published case study documents
│   │   └── [vertical]-[automation-type].md
│   ├── scripts/           # Video scripts (markdown)
│   │   └── YYYY-MM-DD-title.md
│   ├── queue/             # Repurposed drafts awaiting review
│   │   ├── twitter/       # Thread drafts (one .md per video)
│   │   ├── instagram/     # Caption + reel script drafts
│   │   └── shorts/        # YouTube Shorts scripts
│   ├── giveaways/         # Free templates, checklists, tip sheets
│   │   └── [topic]-checklist.md
│   └── calendar.md        # Content calendar (what's planned/published)
│
└── tools/                 # NEW — CLI tools (local scripts)
    ├── idea-generator.js  # Content idea CLI (competitor research + topic suggestions)
    ├── repurpose.js        # YouTube URL → multi-platform drafts (Claude API)
    └── case-study-gen.js  # Automation description → case study markdown
```

### Structure Rationale

- **content/ideas/**: Captures output from the idea generation CLI. Dated, slug-named, reviewed by founder before production begins. Prevents building content without a plan.
- **content/case-studies/**: The agency's primary content asset. Every automation built becomes a case study. Named by vertical + type so they compound as a library.
- **content/queue/**: Staging area between AI generation and human publishing. Nothing in queue/ goes live until reviewed. This is the quality gate.
- **content/giveaways/**: Lead magnets and trust-builders. Markdown-first, can be rendered to PDF or hosted as simple HTML pages.
- **tools/**: Local scripts runnable via Claude Code. Not deployed, not hosted. Just local automation for the founder.

---

## Architectural Patterns

### Pattern 1: YouTube as the Content Hub, Platforms as Distribution Channels

**What:** Every piece of content starts as a YouTube video. Twitter threads, Instagram posts, Shorts, and giveaway content are all derived from the YouTube video. Nothing is created natively per platform except the repurposed format.

**When to use:** Always. Solo operators cannot create unique content per platform — the math doesn't work. One long-form video yields: 1 Twitter thread (8-12 tweets), 1 Instagram caption + reel clip, 1-2 YouTube Shorts scripts, and optionally 1 checklist/giveaway piece. That is 5-6 pieces of content from one production session.

**Trade-offs:** Slower to build initial presence on Twitter/Instagram (waiting for YouTube videos to exist). Platform-native content (memes, trending audio) is not this system. Acceptable trade-off for a solo operator.

**Data flow:**

```
YouTube video published
    ↓
tools/repurpose.js [YouTube URL]
    ↓ (fetches transcript via YouTube Data API)
Claude Code generates platform drafts
    ↓
content/queue/twitter/YYYY-MM-DD-slug.md
content/queue/instagram/YYYY-MM-DD-slug.md
content/queue/shorts/YYYY-MM-DD-slug.md
    ↓ (founder reviews, edits, approves)
Manual post to Twitter + Instagram
```

---

### Pattern 2: Case Study as Cornerstone Asset

**What:** Every automation (demo build or real client work) is documented as a case study with quantified before/after metrics. The case study becomes: (1) a YouTube video script, (2) a landing page social proof section, (3) Twitter thread content, (4) Instagram carousel content, and (5) outreach email proof point.

**When to use:** For every automation demo and every client delivery. The case study is written before the video is recorded — it serves as the video script and the social proof artifact simultaneously.

**Trade-offs:** Requires discipline to document automations immediately rather than moving on. Worth it: one documented case study produces content for 2-3 weeks across platforms.

**Example structure (content/case-studies/plumber-lead-followup.md):**

```markdown
# Case Study: Lead Follow-Up Automation for a Plumbing Business

**Business type:** Local plumbing service, 2 trucks, owner-operated
**Problem:** Missing ~15 leads/month when calls go unanswered
**Before:** Leads called, hit voicemail, called a competitor
**After:** Every missed call gets an SMS within 60 seconds, 70% book online
**Dollar impact:** 10 recovered leads × $400 avg job = $4,000/month recovered
**Build time:** 4 hours with N8N + Claude + Twilio
**Demo video:** [YouTube link]
```

---

### Pattern 3: Idea Generation as a CLI Tool, Not a Product

**What:** The content idea generator is a local script — not a web app, not a SaaS tool. Run it on demand when planning the content calendar. It calls YouTube Data API to pull top-performing videos in the automation niche and related small business verticals, then pipes the titles and topics to Claude for synthesis and gap analysis.

**When to use:** Once per week or once per content planning cycle. Output goes into content/ideas/ as markdown briefs.

**Trade-offs:** Requires YouTube Data API key (free quota: 10,000 units/day, more than sufficient). No persistent state — it runs, generates, and saves to disk. Simple is right here; do not over-engineer.

**Example CLI invocation:**

```bash
node tools/idea-generator.js \
  --vertical plumber \
  --channels "UCxxx,UCyyy" \
  --trending-days 30 \
  > content/ideas/2026-03-05-plumber-ideas.md
```

---

### Pattern 4: Human-in-the-Loop at Every Publication Step

**What:** AI generates drafts; the founder publishes. There is no automated posting at v2.0 launch. The repurposing pipeline produces drafts in content/queue/, and the founder reviews, edits for voice and accuracy, and manually posts.

**When to use:** Always at launch. Upgrade to n8n → Twitter/Instagram API posting only after: (1) content voice is established, (2) quality bar is consistent, and (3) 10+ posts have been reviewed without significant AI errors.

**Why:** Automated posting of incorrect or off-voice content about automation to potential clients is a reputational risk. The extra 5 minutes of manual posting is worth it at v2.0 scale. Automation of posting is Phase 3 of this milestone, not Phase 1.

**Trade-offs:** Slightly more friction per piece. Prevents brand-damaging errors. The bottleneck at v2.0 is content creation, not distribution — so automating posting does not unblock anything meaningful yet.

---

### Pattern 5: Giveaway Content as Static Files, Not a Platform

**What:** Free checklists, automation templates, and tip sheets are written as markdown, optionally exported as PDFs, and distributed via social (link in bio, pinned tweet, story link). They are hosted on GitHub Pages as static files — no external tool, no form, no email capture required at v2.0.

**When to use:** When social content is ready but audience growth needs a pull. Giveaways are trust accelerators — they show value before anyone books a call.

**Trade-offs:** No email capture means no email list built. This is acceptable for v2.0. Email list building is a v3.0 concern. The goal now is audience growth and discovery call bookings, not nurture sequences.

---

## Data Flow

### Primary Flow: Idea → Creation → Publishing → Booking

```
Content Planning Session (weekly)
    ↓
tools/idea-generator.js
    ↓ (YouTube API + Claude synthesis)
content/ideas/YYYY-MM-DD-topic.md
    ↓ (founder selects idea, writes case study)
content/case-studies/[case-study].md
    ↓ (script written from case study)
content/scripts/YYYY-MM-DD-title.md
    ↓ (video recorded with OBS, edited in Descript)
YouTube (published, unlisted for review, then public)
    ↓
tools/repurpose.js [YouTube URL]
    ↓ (YouTube API transcript → Claude → platform drafts)
content/queue/twitter/*.md
content/queue/instagram/*.md
content/queue/shorts/*.md
    ↓ (founder reviews + edits)
Manual post: Twitter thread + Instagram post
    ↓ (links in posts point to landing page)
website/ (GitHub Pages landing page)
    ↓ (single CTA: Book a Discovery Call)
Google Calendar Appointment Scheduling
    ↓
Discovery call → proposal → client
```

---

### Secondary Flow: Case Study → Giveaway → Distribution

```
content/case-studies/[case-study].md
    ↓ (extract checklist or template from the automation)
content/giveaways/[topic]-checklist.md
    ↓ (rendered to PDF or simple hosted HTML page)
Distributed: pinned tweet, Instagram story, link in YouTube description
    ↓ (drives profile traffic and trust)
Landing page → Book a call
```

---

### Idea Generation Flow

```
tools/idea-generator.js
    ↓ (YouTube Data API: search competitor channels)
Top videos by view count in niche (last 30 days)
    ↓
Claude: "Given these titles and view counts, what topics are working?
         What questions are local service business owners asking?
         What gaps exist?"
    ↓
Structured brief (markdown): topic, hook, business vertical,
                              suggested case study to anchor it,
                              estimated effort (Low/Med/High)
Saved to: content/ideas/YYYY-MM-DD-[slug].md
```

---

## Manual vs Automated: What Gets Built vs What Stays Human

This is a solo operation. Not everything should be automated at v2.0. Clear separation prevents over-engineering.

| Step                              | Manual or Automated                      | Rationale                                           |
| --------------------------------- | ---------------------------------------- | --------------------------------------------------- |
| Content calendar planning         | Manual                                   | Judgment call — what to make next. Not automatable. |
| Idea generation (running the CLI) | Automated (on demand)                    | CLI generates structured ideas in seconds           |
| Case study writing                | Manual                                   | Requires accurate metrics and founder knowledge     |
| Video scripting                   | Manual                                   | Voice and framing are founder's judgment            |
| Video recording + editing         | Manual                                   | OBS + Descript; no good automation exists for this  |
| Transcript extraction             | Automated (via tools/repurpose.js)       | YouTube API; zero human effort                      |
| Platform draft generation         | Automated (Claude API)                   | 90% quality, needs founder review                   |
| Platform draft review + edit      | Manual                                   | Quality gate; 5-10 min per piece                    |
| Twitter posting                   | Manual (Phase 1-2), Automated (Phase 3+) | Build voice first; then n8n → Twitter API           |
| Instagram posting                 | Manual (Phase 1-2), Automated (Phase 3+) | Build voice first; then n8n → Meta Graph API        |
| Giveaway content creation         | Manual                                   | Write once; distribute many times                   |
| YouTube video publishing          | Manual                                   | Requires title, thumbnail, description judgment     |
| CTA links + UTM tracking          | Manual (one-time setup)                  | Set it once per campaign, not per post              |

---

## Integration Points

### External Services

| Service                                | Integration Pattern                                                                  | Notes                                                                                                                                                                           |
| -------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| YouTube Data API v3                    | REST API; local script; needs API key (free quota: 10K units/day)                    | Used for: competitor channel research, transcript extraction, video metadata. Quota is generous for solo use.                                                                   |
| Claude API (Anthropic)                 | claude-3-5-sonnet-20241022 or claude-opus-4-5 via API key; called from local scripts | Used for: idea synthesis, platform draft generation, case study outline. Token cost is minimal at this content volume.                                                          |
| Twitter/X API v2                       | OAuth 2.0; free tier allows 1,500 tweet writes/month                                 | Manual posting at launch; v2 API sufficient for Phase 3 automation. Note: Twitter API pricing changed in 2023 — verify free tier still includes write access before automating. |
| Meta Graph API (Instagram)             | Requires Facebook Developer App; Business account required                           | Manual posting at launch; Graph API for automation in Phase 3. Content API allows scheduled posts for approved accounts.                                                        |
| YouTube (publishing)                   | Manual upload via YouTube Studio; no API posting                                     | YouTube API supports video uploads but the metadata and thumbnail work is manual. Use Studio UI.                                                                                |
| Google Calendar Appointment Scheduling | Already integrated in website/                                                       | No changes needed. Ensure booking link is in YouTube video descriptions, Twitter bio, Instagram bio.                                                                            |
| GitHub Pages                           | Already hosts website/; static files served from main branch                         | Add content/giveaways/ as static pages if desired; otherwise distribute as linked PDFs.                                                                                         |
| yt-dlp (optional fallback)             | CLI tool; local install                                                              | Backup for transcript extraction if YouTube API quota is hit. No API key required.                                                                                              |

### Internal Boundaries

| Boundary                             | Communication                                                                    | Notes                                                                                         |
| ------------------------------------ | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Idea generator → Content calendar    | File-based: tools/idea-generator.js writes to content/ideas/                     | Founder reads files and populates content/calendar.md manually                                |
| YouTube video → Repurposing pipeline | tools/repurpose.js [URL] reads from YouTube API; writes drafts to content/queue/ | One script invocation per video                                                               |
| content/queue/ → Social platforms    | Manual review + post by founder                                                  | Quality gate; not automated at launch                                                         |
| Case studies → Landing page          | Manual: copy metrics and quotes into website/ testimonial section                | Update landing page monthly with new case study data                                          |
| Social posts → Landing page          | URL links in posts; UTM parameters for tracking                                  | Use consistent UTM structure: ?utm_source=twitter&utm_medium=social&utm_campaign=[video-slug] |
| Giveaway content → GitHub Pages      | Static files committed to repo; served automatically                             | No extra infrastructure needed                                                                |

---

## Build Order (Critical Path for v2.0)

Dependencies determine what must be built before what. Do not start Phase N+1 until Phase N is complete.

```
Phase 1: Foundation (platform + production setup)
  1. Twitter @SameerAutomates — account setup, bio, profile image, pinned tweet
  2. Instagram @SameerAutomates — account setup, bio, profile image
  3. YouTube Data API key — set up Google Cloud project, enable API, store key
  4. content/ directory structure — create folders, content/calendar.md stub

Phase 2: Content ideation tooling (the CLI)
  5. tools/idea-generator.js — YouTube API competitor research + Claude synthesis
  6. content/ideas/ — first 5-10 ideas generated and reviewed
  7. content/calendar.md — first 4 weeks planned

Phase 3: First case study + demo build
  8. Pick one automation type (lead follow-up recommended as first)
  9. Demo automation build — working N8N flow for a local service vertical
  10. content/case-studies/[slug].md — documented with real numbers
  11. content/scripts/[slug].md — video script written from case study

Phase 4: YouTube video production
  12. Record video (OBS screen capture + talking head)
  13. Edit + caption (Descript)
  14. Publish to YouTube with optimized title, description, tags
  15. Verify YouTube video is indexed and transcript available

Phase 5: Repurposing pipeline
  16. tools/repurpose.js — YouTube URL → transcript → Claude → platform drafts
  17. Test with first video; review output quality
  18. content/queue/twitter/*.md — review + edit first thread
  19. content/queue/instagram/*.md — review + edit first caption
  20. Post manually to Twitter and Instagram

Phase 6: Giveaway content
  21. content/giveaways/[topic]-checklist.md — first free asset
  22. Host on GitHub Pages or distribute as inline tweet/Instagram carousel
  23. Pin to Twitter profile; add to Instagram bio link

Phase 7: Funnel optimization (landing page updates)
  24. Audit landing page CTAs — every section must point to booking link
  25. Add UTM parameters to all social bio links
  26. Add YouTube video embed to landing page (first published case study video)
  27. Add case study metrics to landing page as social proof
```

---

## Anti-Patterns

### Anti-Pattern 1: Building per-platform Content Natively

**What people do:** Create unique content for Twitter that doesn't exist on YouTube, unique content for Instagram that doesn't exist elsewhere.

**Why it's wrong:** A solo operator with 2-3 client engagements cannot sustain three unique content streams. Native content per platform = burnout within 4-6 weeks. Content volume drops, consistency breaks, algorithm penalizes, audience stalls.

**Do this instead:** Everything starts on YouTube. Platforms receive repurposed, platform-adapted versions. The voice may differ slightly (more conversational on Twitter, more visual-hook on Instagram) but the source material is always the YouTube video.

---

### Anti-Pattern 2: Automating Posting Before Establishing Voice

**What people do:** Wire up n8n → Twitter API on day one, set up auto-posting, walk away.

**Why it's wrong:** AI-generated drafts need calibration. The first 10-15 posts will have voice errors, framing that doesn't fit the audience, or technical inaccuracies. Auto-posting these damages credibility with the exact potential clients you're trying to attract.

**Do this instead:** Post manually for the first 8-10 pieces. Review every AI draft before posting. Only automate posting after the pipeline is producing consistently good output that requires minimal editing.

---

### Anti-Pattern 3: Building the Repurposing Tool Before Having Content to Repurpose

**What people do:** Spend a week perfecting the repurpose.js script before any YouTube videos exist to run through it.

**Why it's wrong:** You don't know what the tool needs to produce until you've produced content and seen what platform-specific formats actually work. Building the tool first = building to spec that may be wrong.

**Do this instead:** Manually repurpose the first 2 YouTube videos by hand (write the thread yourself). Then build the automation to match what you did manually. The manual process defines the spec.

---

### Anti-Pattern 4: Case Studies Without Numbers

**What people do:** Write case studies with qualitative descriptions: "The client was very happy and their business improved."

**Why it's wrong:** Non-technical business owners need to understand the dollar impact to recognize the value. "15 more leads booked per month" is credible. "Business improved" is meaningless.

**Do this instead:** Every case study must have at minimum: leads recovered OR hours saved per month, and implied dollar value. For demo builds (not real clients yet): use conservative estimates and label them as such ("estimated based on typical plumbing lead value of $300-600/job").

---

### Anti-Pattern 5: Treating the Landing Page as Separate From the Content System

**What people do:** Build content on social, never update the landing page, never connect the dots.

**Why it's wrong:** Content drives traffic to the landing page. If the landing page is static while content evolves, conversion rates decline. The landing page must reflect the latest case studies, current social proof, and current CTA language.

**Do this instead:** Every published case study gets added to the landing page within one week. Every new giveaway gets a link added. Landing page is reviewed and updated monthly, not quarterly.

---

## Scaling Considerations

This is a solo operation. Scale here means: "what breaks when this works?"

| Stage                       | Scenario                  | Architecture Adjustment                                                                                                        |
| --------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 0-4 videos                  | Building the habit        | Manual posting; no automation needed; focus on quality                                                                         |
| 4-12 videos                 | Pattern is working        | Automate repurposing pipeline; still manual posting; refine case study template                                                |
| 12+ videos                  | Content is compounding    | Automate Twitter/Instagram posting via n8n; content queue self-fills weekly; founder role becomes editing, not creating drafts |
| Inbound bookings > capacity | Content engine is working | Raise prices; narrow content focus; giveaways become email capture (add form to GitHub Pages)                                  |

### Scaling Priorities

1. **First constraint:** Founder time to produce videos — resolved by batching (film 2-3 videos per session, not one per week)
2. **Second constraint:** Founder time on repurposing — resolved by the tools/ scripts after voice is established
3. **Third constraint:** Landing page conversion — resolved by continuous case study additions and CTA optimization
4. **Fourth constraint:** Booking capacity — a good problem; raise prices

---

## Sources

- [n8n: Multi-platform content generator from YouTube using AI & RSS](https://n8n.io/workflows/6843-multi-platform-content-generator-from-youtube-using-ai-and-rss/) — HIGH confidence; verified n8n workflow template exists; confirms YouTube → multi-platform n8n architecture is production-ready
- [n8n: Auto-publish YouTube videos to Facebook & Instagram with AI-generated captions](https://n8n.io/workflows/4478-auto-publish-youtube-videos-to-facebook-and-instagram-with-ai-generated-captions/) — HIGH confidence; confirms YouTube → Instagram via Meta Graph API is an established n8n pattern
- [n8n: Automate Instagram content discovery and repurposing with Apify, GPT-4o & Perplexity](https://n8n.io/workflows/4658-automate-instagram-content-discovery-and-repurposing-w-apify-gpt-4o-and-perplexity/) — HIGH confidence; confirmed n8n workflow; validates AI-driven repurposing pattern
- [n8n: Summarize YouTube videos from transcript for social media](https://n8n.io/workflows/5292-summarize-youtube-videos-from-transcript-for-social-media/) — HIGH confidence; confirms YouTube transcript → social media via n8n is a working pattern
- [Kaizen AI Consulting: Building a Social Media Content Pipeline with N8N and AI](https://kaizenaiconsulting.com/building-social-media-content-pipeline-n8n-ai/) — MEDIUM confidence; single practitioner source; detailed N8N component breakdown validated against n8n docs
- [NewZenler: Content Repurposing System for Creators 2026](https://www.newzenler.com/blog/content-repurposing-system-creators-2026) — MEDIUM confidence; established platform source; "one video → 40+ pieces" framework consistent across multiple creator marketing sources
- [YouTube Sales Funnel 7-Step Architecture](https://shortvids.co/build-youtube-sales-funnel/) — MEDIUM confidence; single source; funnel architecture consistent with landing page best practices research
- [InfluenceFlow: Content Distribution Automation Tool 2026](https://influenceflow.io/resources/content-distribution-automation-tool-the-complete-2026-guide/) — MEDIUM confidence; pattern consistent with multiple sources; human-in-loop approval workflow recommendation validated here and in Kaizen source
- YouTube Data API v3 Quota documentation — HIGH confidence; 10,000 units/day free confirmed via Google documentation

---

_Architecture research for: Solo AI Automation Consultant — Content Marketing Engine (v2.0 Milestone)_
_Researched: 2026-03-01_
