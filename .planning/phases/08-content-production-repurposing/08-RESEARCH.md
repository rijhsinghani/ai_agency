# Phase 8: Content Production + Repurposing - Research

**Researched:** 2026-03-02
**Domain:** YouTube video production, content repurposing pipeline, video clip extraction, SOP documentation
**Confidence:** HIGH (tooling stack), MEDIUM (SOP structure), HIGH (repurposing script architecture)

---

## Summary

Phase 8 has four deliverables: a published YouTube video, a documented production SOP, a repurposing script (YouTube URL to Twitter/Instagram/clip script drafts), and a video clipping tool (30-60s clip with burned-in captions). The phase depends on Phase 7 artifacts that are now complete — the Raj Photo Video case study is the source material for Video 1, the content calendar specifies Week 1 topics, and the content idea CLI informs the angle.

The technical work divides into two distinct tracks. Track 1 is human-operated: recording, editing, and publishing the first YouTube video against a production SOP. This track produces Markdown SOP documents and tested checklists, not code. Track 2 is tooling: a Node.js script that calls Supadata.ai for transcript extraction, sends the transcript to Claude API for platform-specific draft generation, and a separate Node.js script that wraps native ffmpeg (via `child_process.spawn`) for video clip extraction with burned-in captions. Both tools follow the project's established Node.js/CommonJS/Commander.js pattern from the content idea CLI.

The key architectural decision is that fluent-ffmpeg was archived in May 2025 and no longer works with recent ffmpeg versions. The correct approach for the clipping tool is native `child_process.spawn` calling `ffmpeg` directly — simpler and without the broken abstraction layer. ffmpeg-static (v6.1.1) provides the binary without a system install requirement.

**Primary recommendation:** Build two separate Node.js tools following the established CLI pattern: `research/tools/repurposing-script/` (Supadata + Claude API) and `research/tools/video-clipper/` (ffmpeg via spawn). Produce the production SOP as four Markdown checklists in `ops/sop/`. The YouTube video itself is human-executed following the SOP.

---

<phase_requirements>

## Phase Requirements

| ID      | Description                                                                                                                                      | Research Support                                                                                                                                                                     |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| PROD-01 | First YouTube video published — demos automation, business-owner framing, CTA to discovery call                                                  | Video 1 from content-plan.md (origin story + Raj PV case study) is the specified source. Script structure is documented in content-plan.md. No new tooling needed — human execution. |
| PROD-02 | Production SOP documented and tested: outline template, recording checklist, editing checklist, publish checklist — all used for the first video | Four Markdown checklists created in ops/sop/. Structure derived from established YouTube production best practices and the existing video structure template in content-plan.md.     |
| TOOL-03 | Repurposing script: YouTube video URL → transcript → Twitter thread draft, Instagram caption draft, short clip script — review queue, no posting | Supadata.ai @supadata/js SDK for transcript (1 credit/request, 100 free/mo). Claude API for generation. Review queue = local Markdown files in a `review/` folder.                   |
| TOOL-04 | Video clipping tool: extracts 30-60s clip from YouTube video with burned-in captions, formatted for Instagram Reels and Twitter                  | ffmpeg via child_process.spawn + ffmpeg-static binary. 9:16 crop + scale filter + subtitles filter from SRT. Requires transcript timestamps from Supadata.                           |

</phase_requirements>

---

## Standard Stack

### Core

| Library             | Version      | Purpose                                    | Why Standard                                                                                                      |
| ------------------- | ------------ | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `@supadata/js`      | latest (npm) | YouTube transcript extraction from URL     | Chosen in Phase 7 decisions — 100 free credits/mo, official SDK, handles async job polling for videos over 20 min |
| `@anthropic-ai/sdk` | latest       | Claude API calls for content generation    | Project uses Claude API for text generation; brand voice guide exists in brand/brand-voice.md                     |
| `ffmpeg-static`     | ^5.2.0       | Bundled ffmpeg binary for video processing | No system ffmpeg required; cross-platform; ships 6.1.1; 218K weekly downloads                                     |
| `commander`         | ^14.0.3      | CLI flag parsing                           | Already used in content-idea-cli — locked stack decision                                                          |

### Supporting

| Library                          | Version           | Purpose                                           | When to Use                                                                   |
| -------------------------------- | ----------------- | ------------------------------------------------- | ----------------------------------------------------------------------------- |
| `node-fetch` or built-in `fetch` | Node 18+ built-in | HTTP calls to Supadata API if SDK is insufficient | Fallback if SDK has issues; Node 20+ has native fetch                         |
| `ffprobe-static`                 | npm               | Inspect video metadata before clipping            | Needed to get video duration and validate timestamp ranges before ffmpeg clip |

### Alternatives Considered

| Instead of       | Could Use                                     | Tradeoff                                                                                                                                   |
| ---------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Supadata.ai      | `youtube-transcript` npm package (unofficial) | Unofficial package reverse-engineers YouTube internal API — unreliable, breaks when YouTube updates. Supadata is stable, has official SDK. |
| Claude API       | OpenAI GPT-4                                  | content-engine uses GPT-4; but project voice rules and brand-voice.md are optimized for Claude. Decision is Claude.                        |
| ffmpeg via spawn | fluent-ffmpeg                                 | fluent-ffmpeg archived May 22, 2025, no longer maintained, breaks with recent ffmpeg versions. Do not use.                                 |
| ffmpeg via spawn | ffmpeg.wasm                                   | Browser-targeted, large bundle, not suitable for CLI Node.js scripts                                                                       |

**Installation:**

```bash
# Repurposing script
npm install @supadata/js @anthropic-ai/sdk commander

# Video clipper
npm install ffmpeg-static commander
# Optional: npm install ffprobe-static
```

---

## Architecture Patterns

### Recommended Project Structure

```
research/tools/
├── content-idea-cli/          # Phase 7 — existing
├── repurposing-script/        # Phase 8 — TOOL-03
│   ├── index.js               # CLI entry point (Commander.js)
│   ├── lib/
│   │   ├── transcript.js      # Supadata SDK wrapper
│   │   ├── generator.js       # Claude API calls per platform
│   │   ├── queue.js           # Write drafts to review/ folder
│   │   └── formatter.js       # Format each platform draft
│   ├── package.json
│   └── README.md
├── video-clipper/             # Phase 8 — TOOL-04
│   ├── index.js               # CLI entry point
│   ├── lib/
│   │   ├── extractor.js       # ffmpeg spawn + clip extraction
│   │   ├── captioner.js       # SRT generation + burn-in
│   │   └── formatter.js       # 9:16 crop/scale for Reels/Twitter
│   ├── package.json
│   └── README.md
ops/sop/                       # Phase 8 — PROD-02
├── outline-template.md        # Hook/context/demo/results/framework/CTA structure
├── recording-checklist.md     # Pre-shoot, during-shoot, wrap items
├── editing-checklist.md       # Assembly, cut review, thumbnail, captions
└── publish-checklist.md       # Upload, metadata, description, scheduling
review/                        # Output queue for TOOL-03 (gitignored or committed)
├── [video-title]-twitter.md
├── [video-title]-instagram.md
└── [video-title]-clip-script.md
```

### Pattern 1: Supadata Transcript Extraction

**What:** Takes a YouTube URL, extracts transcript via Supadata SDK, handles both sync (under 20 min) and async (polling for over 20 min) responses.
**When to use:** TOOL-03 repurposing script step 1. Also used in TOOL-04 if timestamps needed for clip selection.

```javascript
// Source: https://github.com/supadata-ai/js
const { Supadata } = require("@supadata/js");

async function getTranscript(youtubeUrl) {
  const supadata = new Supadata({ apiKey: process.env.SUPADATA_API_KEY });

  // Synchronous response for videos under 20 min (HTTP 200)
  // Async job ID for longer videos (HTTP 202) — use getJobStatus polling
  const result = await supadata.transcript({
    url: youtubeUrl,
    lang: "en",
    text: true, // plain text, not timestamped chunks
    mode: "auto", // native transcript first, AI fallback
  });

  // For timestamped chunks (needed for clip selection in TOOL-04):
  // text: false — returns array of {text, offset, duration} objects
  return result;
}
```

### Pattern 2: Claude API Content Generation with Brand Voice

**What:** Sends transcript + brand voice rules to Claude API, generates platform-specific draft.
**When to use:** TOOL-03 — one Claude call per platform (Twitter thread, Instagram caption, short clip script).

```javascript
// Source: Anthropic Claude SDK docs + brand-voice.md constraints
const Anthropic = require("@anthropic-ai/sdk");

const BANNED_PHRASES = [
  "game-changer",
  "seamless",
  "leverage",
  "robust",
  "cutting-edge",
  "groundbreaking",
  "revolutionary",
  "synergy",
  "ecosystem",
  "platform suite",
];

async function generatePlatformDraft(transcript, platform, brandVoiceRules) {
  const client = new Anthropic();

  const systemPrompt = `You are writing ${platform} content for Sameer Automations.
Voice rules: Direct, peer-level, confident, practical, transparent.
Never use: ${BANNED_PHRASES.join(", ")}.
No emojis. Use contractions. Numerals for metrics. Sentence case headings.
Outcomes before technology. Audience = small business owners, not builders.`;

  const userPrompt = buildPlatformPrompt(platform, transcript);

  const message = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 1024,
    messages: [{ role: "user", content: userPrompt }],
    system: systemPrompt,
  });

  return message.content[0].text;
}

function buildPlatformPrompt(platform, transcript) {
  const specs = {
    twitter:
      'Write a Twitter thread (6-8 tweets, 280 chars max each). Lead with the result. End with: "Book a free 15-min discovery call: calendar.app.google/psycao3CrXjGnmk48"',
    instagram:
      "Write an Instagram caption (150-300 words). Problem hook first. One core insight. End with the booking CTA.",
    clip_script:
      "Identify the single most business-owner-relevant 30-60 second moment from this transcript. Write a short script (hook + insight + bridge) as if introducing the clip.",
  };
  return `${specs[platform]}\n\nTranscript:\n${transcript}`;
}
```

### Pattern 3: FFmpeg Clip Extraction via spawn

**What:** Spawns ffmpeg as a child process to extract a clip segment, crop to 9:16 vertical, burn in SRT captions.
**When to use:** TOOL-04 — video clipping tool.

```javascript
// Source: Node.js child_process docs + ffmpeg documentation
const { spawn } = require("child_process");
const ffmpegPath = require("ffmpeg-static");
const path = require("path");

async function extractClip({
  inputPath,
  outputPath,
  startSec,
  durationSec,
  srtPath,
}) {
  return new Promise((resolve, reject) => {
    // Crop 9:16 from 16:9 source: crop height=ih, width=ih*(9/16)
    // Then scale to 1080x1920 for Reels/Shorts format
    const vfFilter = srtPath
      ? `crop=ih*9/16:ih,scale=1080:1920,subtitles='${srtPath}':force_style='Fontname=Arial,Fontsize=24,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,Outline=2,Alignment=2'`
      : `crop=ih*9/16:ih,scale=1080:1920`;

    const args = [
      "-ss",
      String(startSec),
      "-i",
      inputPath,
      "-t",
      String(durationSec),
      "-vf",
      vfFilter,
      "-c:v",
      "libx264",
      "-crf",
      "23",
      "-preset",
      "fast",
      "-c:a",
      "aac",
      "-b:a",
      "128k",
      "-movflags",
      "+faststart",
      "-y", // overwrite output
      outputPath,
    ];

    const proc = spawn(ffmpegPath, args);
    let stderr = "";

    proc.stderr.on("data", (data) => {
      stderr += data.toString();
    });
    proc.on("close", (code) => {
      if (code === 0) resolve(outputPath);
      else reject(new Error(`ffmpeg exited ${code}: ${stderr.slice(-500)}`));
    });
    proc.on("error", reject);
  });
}
```

### Pattern 4: Review Queue (TOOL-03 output)

**What:** Writes platform drafts as Markdown files to a local review/ folder. No posting. Founder reviews before any use.
**When to use:** End of repurposing script run — all output goes here.

```javascript
// Source: project pattern — no automated posting in v2.0 (locked decision)
const fs = require("fs");
const path = require("path");

function writeToReviewQueue(videoTitle, platform, draft) {
  const slug = videoTitle.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  const filename = `${slug}-${platform}.md`;
  const filepath = path.join(process.cwd(), "review", filename);

  const content = `# Review: ${videoTitle} — ${platform}\n\n**Status:** DRAFT — not posted\n**Generated:** ${new Date().toISOString()}\n\n---\n\n${draft}\n\n---\n\n_Review before posting. Edit as needed. CTA must include: https://calendar.app.google/psycao3CrXjGnmk48_\n`;

  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content, "utf-8");
  return filepath;
}
```

### Anti-Patterns to Avoid

- **Using fluent-ffmpeg:** Archived May 2025, breaks with recent ffmpeg. Use `child_process.spawn` + `ffmpeg-static` directly.
- **Using shell: true with spawn:** Exposes shell injection risk when video paths are user-provided. Always pass args as array.
- **Posting without review:** v2.0 decision is human-in-the-loop. Repurposing script MUST write to review queue, never call Buffer or any posting API.
- **Hard-coding start/end timestamps:** TOOL-04 must accept timestamps as CLI flags — the founder identifies the clip, the tool processes it. Do not attempt AI-automated clip selection in Phase 8 (that's Phase 10 / Gemini territory).
- **Single-credit waste:** Supadata charges 1 credit per transcript. The repurposing script should cache the transcript to disk alongside review files so rerunning generation does not cost another credit.
- **AI-generated content without real video facts:** Brand voice rule: "AI accelerates expression, never invents the insight." All generated drafts must reference specific facts from the transcript (numbers, quotes, named scenarios) — not generic automation advice.

---

## Don't Hand-Roll

| Problem                               | Don't Build                    | Use Instead                                                                                      | Why                                                                                                                           |
| ------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| YouTube transcript extraction         | Custom YouTube API scraping    | `@supadata/js` SDK                                                                               | Reverse-engineered approaches break on YouTube changes; Supadata handles native + AI fallback, async jobs, multiple languages |
| FFmpeg wrapper abstractions           | Custom spawn abstraction class | Direct `child_process.spawn` with ffmpegPath                                                     | fluent-ffmpeg is archived; simple spawn is less code and more maintainable than a new abstraction                             |
| Brand voice enforcement               | Custom NLP validation          | Explicit banned-phrase list in prompt + system prompt                                            | Simpler, transparent, faster. List is in brand-voice.md already.                                                              |
| SRT caption file generation for clips | Custom timestamp parser        | Supadata `text: false` mode returns `{text, offset, duration}` objects — convert to SRT directly | The data is already structured; a 20-line converter is all that's needed                                                      |
| Review queue management               | Database, web UI               | Markdown files in `review/` folder                                                               | Consistent with project pattern (all docs are Markdown, version controlled); Supabase review queue is Phase 10 territory      |

**Key insight:** Phase 8 tooling is deliberately lightweight — it bridges Phase 7 (research, calendar, case studies) to Phase 10 (full automation pipeline). Scope creep toward Phase 10 features (Slack approval, auto-posting, Supabase storage) must be rejected.

---

## Common Pitfalls

### Pitfall 1: SOP as Theory, Not Practice

**What goes wrong:** Production SOP is written before the video is filmed. It documents the ideal process, not the actual process. When filming starts, real problems emerge (lighting, retakes, edit decisions) that weren't covered. SOP ends up unused.
**Why it happens:** Planners document the theory before validating it against reality.
**How to avoid:** Build SOP incrementally. Draft the outline template and recording checklist before filming. Fill in the editing and publish checklists after editing is complete. The SOP is "tested" because it was used during the first video, not just referenced.
**Warning signs:** SOP exists but none of the checklists have been executed against a real video.

### Pitfall 2: Repurposing Drafts Sound Generic

**What goes wrong:** Claude generates Twitter threads and Instagram captions that sound like AI-written automation advice, not Sameer's voice. The output doesn't reference the specific story, numbers, or scenario from the video.
**Why it happens:** Prompt only includes the brand voice rules, not the specific content from the transcript.
**How to avoid:** System prompt carries voice rules (banned phrases, style). User prompt includes the actual transcript excerpt with key facts. Explicitly instruct: "Reference specific numbers and scenarios from this transcript. Do not write generic automation advice."
**Warning signs:** Generated drafts use words like "leverage," "seamlessly," "game-changer," or don't mention any specific metric from the video.

### Pitfall 3: Supadata Async Job Not Handled

**What goes wrong:** Script calls Supadata, gets HTTP 202 (job queued) instead of 200 (immediate result), and crashes or returns empty because async polling wasn't implemented.
**Why it happens:** Videos over 20 minutes trigger async processing. Video 1 (origin story) is targeted at 8-10 minutes — likely sync. But future videos may be longer.
**How to avoid:** Always implement polling. Check if response has `content` (sync) or `jobId` (async). If `jobId`, poll `/transcript/{jobId}` every 3 seconds until `status === 'completed'`.
**Warning signs:** Transcript extraction works in dev (short test video) but fails in production (full-length video).

### Pitfall 4: FFmpeg Clip Aspect Ratio Artifacts

**What goes wrong:** Crop filter runs on a video where the source resolution is unexpected (e.g., 1280x720 instead of 1920x1080), producing incorrect crop dimensions or pillarboxing.
**Why it happens:** The `crop=ih*9/16:ih` formula assumes the video is wider than it is tall (landscape). If the video is already 9:16 or square, the crop cuts off content incorrectly.
**How to avoid:** Inspect video with ffprobe before clipping. If source is already 9:16, skip the crop filter and only scale. Document the expected input format in the CLI help text.
**Warning signs:** Output clip has black bars on left/right or content appears zoomed in unexpectedly.

### Pitfall 5: SRT Subtitle Path with Spaces in ffmpeg

**What goes wrong:** ffmpeg's subtitles filter fails with path error when the SRT file path contains spaces or special characters. This is a known ffmpeg issue on macOS.
**Why it happens:** The subtitles filter parses the path before ffmpeg processes it. Spaces break the filter string.
**How to avoid:** Always write the SRT file to a temp path with no spaces (e.g., `/tmp/clip_captions.srt`) before passing to ffmpeg. Document this constraint in the CLI.
**Warning signs:** ffmpeg returns "No such file or directory" for a path that clearly exists.

### Pitfall 6: YouTube Video CTA Buried

**What goes wrong:** The discovery call CTA is at the very end of the video. Research shows only 16% of viewers reach the final 10 seconds. CTA is effectively invisible to 84% of the audience.
**How to avoid:** Include two CTAs: mid-video (around 60% mark, during or after the results section) and end-screen (final 15 seconds). Both use the exact CTA wording from brand-voice.md: "Book a free 15-min discovery call."
**Warning signs:** CTA only appears once, at the very end.

---

## Code Examples

Verified patterns from official sources:

### Supadata Timestamp Chunks (for clip selection)

```javascript
// Source: https://docs.supadata.ai/get-transcript
// Returns array when text: false — each chunk has {text, offset, duration}
const result = await supadata.transcript({
  url: youtubeUrl,
  lang: "en",
  text: false, // timestamped chunks, not plain text
  mode: "auto",
});
// result.content = [{text: "...", offset: 0, duration: 3400}, ...]
// offset and duration are in milliseconds

// Convert to SRT format:
function chunksToSrt(chunks) {
  return chunks
    .map((chunk, i) => {
      const start = msToSrtTime(chunk.offset);
      const end = msToSrtTime(chunk.offset + chunk.duration);
      return `${i + 1}\n${start} --> ${end}\n${chunk.text}\n`;
    })
    .join("\n");
}

function msToSrtTime(ms) {
  const h = Math.floor(ms / 3600000)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((ms % 3600000) / 60000)
    .toString()
    .padStart(2, "0");
  const s = Math.floor((ms % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  const ms2 = (ms % 1000).toString().padStart(3, "0");
  return `${h}:${m}:${s},${ms2}`;
}
```

### Async Supadata Polling

```javascript
// Source: https://docs.supadata.ai/get-transcript (async response handling)
async function getTranscriptWithPolling(youtubeUrl) {
  const supadata = new Supadata({ apiKey: process.env.SUPADATA_API_KEY });
  const response = await supadata.transcript({
    url: youtubeUrl,
    text: true,
    mode: "auto",
  });

  // Sync response: has content directly
  if (response.content) return response.content;

  // Async response: has jobId, must poll
  const { jobId } = response;
  let attempts = 0;
  while (attempts < 60) {
    // 3 min max
    await new Promise((r) => setTimeout(r, 3000));
    const status = await supadata.getJobStatus(jobId);
    if (status.status === "completed") return status.content;
    if (status.status === "failed")
      throw new Error(`Transcript job failed: ${status.error}`);
    attempts++;
  }
  throw new Error("Transcript polling timed out after 3 minutes");
}
```

### FFmpeg Clip with Caption Burn-In (full working command)

```bash
# Source: ffmpeg documentation — subtitles filter + crop/scale
# -ss before -i = fast seek (input seek, not output seek)
# crop=ih*9/16:ih = crop width to 9/16 of height (centers crop)
# scale=1080:1920 = final Reels/Shorts resolution
# force_style controls caption appearance

ffmpeg -ss 120 -i input.mp4 -t 45 \
  -vf "crop=ih*9/16:ih,scale=1080:1920,subtitles='/tmp/captions.srt':force_style='Fontname=Arial,Fontsize=22,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,Outline=2,Alignment=2'" \
  -c:v libx264 -crf 23 -preset fast \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  output_clip.mp4
```

### Production SOP — Video Structure Template (from content-plan.md)

The existing `content/youtube/content-plan.md` already defines the 6-section video structure:

1. Hook (0-10 seconds): Problem statement or curiosity-driven question
2. Context (10-30 seconds): Why this matters, who should care
3. Workflow/Demo (30 seconds-6 minutes): Screen recording, actual system
4. Results (1-2 minutes): The numbers — time saved, revenue recovered
5. Framework/takeaway (1-2 minutes): What the audience should do next
6. CTA (10-15 seconds): Discovery call booking link

This is the outline template. The SOP formalizes it as a checklist with actionable items.

---

## State of the Art

| Old Approach                           | Current Approach             | When Changed        | Impact                                                                            |
| -------------------------------------- | ---------------------------- | ------------------- | --------------------------------------------------------------------------------- |
| fluent-ffmpeg wrapper                  | Direct spawn + ffmpeg-static | May 2025 (archived) | Must use native spawn — fluent-ffmpeg no longer works with ffmpeg 6+              |
| YouTube unofficial transcript scrapers | Supadata.ai SDK              | 2024-2025           | More reliable; handles multiple languages, private videos gracefully, AI fallback |
| Sync-only transcript APIs              | Async job polling (Supadata) | Current             | Long videos (>20 min) return jobId; polling required                              |
| Single CTA at video end                | Mid-video + end CTA          | Current research    | Only 16% reach end of video; mid-video CTA at 60% mark captures majority          |

**Deprecated/outdated:**

- fluent-ffmpeg: Archived May 22, 2025. Do not use for new projects.
- ffmpeg-kit: Archived June 23, 2025. Do not use.
- `youtube-transcript` npm (unofficial): Reverse-engineers YouTube internals, unreliable. Use Supadata instead.

---

## Open Questions

1. **Does Supadata return timestamped chunks for YouTube videos with auto-generated captions only?**
   - What we know: The SDK `text: false` mode returns `{text, offset, duration}` chunks
   - What's unclear: Whether AI-generated transcripts (mode: 'generate') also return timestamped chunks, or only plain text
   - Recommendation: Test with the actual Video 1 YouTube URL before building the clip selection feature. If timestamps not available from AI mode, the clip script can still be generated from plain text — just without automatic timestamp mapping.

2. **Where does the founder identify clip start/end times for TOOL-04?**
   - What we know: TOOL-04 should accept timestamps as CLI flags based on Phase 8 success criteria
   - What's unclear: Whether this is manual input (founder watches video, notes timestamps) or derived from repurposing script output
   - Recommendation: Manual for Phase 8 — CLI accepts `--start` and `--duration` flags. The repurposing script's clip script output can suggest a moment, but timestamp selection stays human. Phase 10 adds Gemini-powered automatic selection.

3. **What editing software does Sameer use for the first video?**
   - What we know: Nothing specified in existing planning files
   - What's unclear: DaVinci Resolve, Final Cut Pro, CapCut, or other — the editing checklist items vary slightly by tool
   - Recommendation: Keep editing checklist tool-agnostic. List outcomes (tight cuts, no dead air, captions added, thumbnail exported) rather than software-specific menu commands.

4. **Should the repurposing script's review queue output be committed to git or gitignored?**
   - What we know: Review files contain generated drafts that are pre-publication
   - What's unclear: Whether pre-publication drafts should be version-controlled or kept local
   - Recommendation: Add `review/*.md` to `.gitignore`. These are staging files, not project artifacts. Add a `review/.gitkeep` to create the directory without committing drafts.

---

## Validation Architecture

> `workflow.nyquist_validation` is not set to true in .planning/config.json — config uses `verifier: true` (different key). Skipping formal Nyquist validation architecture section. Standard verification applies.

---

## Sources

### Primary (HIGH confidence)

- https://github.com/supadata-ai/js — Supadata JS SDK installation and API usage
- https://docs.supadata.ai/get-transcript — Transcript API parameters, response format, async job handling, credit pricing
- https://supadata.ai/pricing — Free tier: 100 credits/month, 1 credit/transcript, 1 req/sec rate limit
- Node.js official docs (child_process.spawn) — Direct ffmpeg invocation pattern
- `/Users/sameerrijhsinghani/automation_consultancy/brand/brand-voice.md` — Voice rules, banned phrases, CTA wording
- `/Users/sameerrijhsinghani/automation_consultancy/content/youtube/content-plan.md` — Video structure template, Video 1 specification
- `/Users/sameerrijhsinghani/automation_consultancy/research/tools/content-idea-cli/package.json` — Established CLI pattern (Commander.js v14.0.3, CommonJS)
- `/Users/sameerrijhsinghani/automation_consultancy/.planning/STATE.md` — Key decisions: Supadata chosen, human-in-the-loop publishing, Node.js/Commander.js CLI stack locked

### Secondary (MEDIUM confidence)

- https://www.npmjs.com/package/ffmpeg-static — Current version 5.x, ships ffmpeg 6.1.1, 218K weekly downloads (active)
- https://github.com/fluent-ffmpeg/node-fluent-ffmpeg — Confirmed archived May 22, 2025 (source: GitHub repository)
- ffmpeg documentation (burn-in subtitles filter) — `subtitles=path:force_style` pattern verified across multiple sources
- https://subscribr.ai/p/youtube-video-production-checklist — Production SOP four-phase framework (returned 410; framework verified via multiple other sources)

### Tertiary (LOW confidence)

- Research finding on 16% viewer completion rate (mid-video CTA recommendation) — multiple sources cite similar figures but not verified against a single authoritative study. Treat as directional guidance, not hard fact.

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — Supadata SDK confirmed official, ffmpeg-static confirmed active, fluent-ffmpeg archival confirmed from GitHub
- Architecture: HIGH — follows established project patterns (Commander.js CLI, Node.js CommonJS, Markdown output queue)
- Pitfalls: HIGH — fluent-ffmpeg archival is a concrete fact; SRT path issue is a documented ffmpeg behavior; Supadata async job handling is documented in API spec
- SOP structure: MEDIUM — no authoritative single source; synthesized from multiple production workflow references aligned to existing content-plan.md structure

**Research date:** 2026-03-02
**Valid until:** 2026-04-02 (30 days — Supadata pricing/limits may change; ffmpeg-static is stable)
