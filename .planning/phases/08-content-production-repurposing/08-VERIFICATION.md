---
phase: 08-content-production-repurposing
verified: 2026-03-02T23:30:00Z
status: human_needed
score: 3/4 must-haves verified
re_verification: false
human_verification:
  - test: "Film and publish the first YouTube video following content/videos/Video-1-outline.md and all four ops/sop/ checklists"
    expected: "A publicly accessible YouTube video demoing the missed-call text-back automation, 8-10 minutes long, framed for business owners, ending with 'Book a free 15-min discovery call' and the booking URL in the description"
    why_human: "Claude cannot film, edit, or publish video. This is a founder execution step. The outline is complete (commit 3aa680c) and the video is at the checkpoint gate in 08-04-PLAN.md, which requires the founder to film and confirm the live URL."
  - test: "Verify the YouTube video description contains chapter timestamps and the booking URL"
    expected: "Description matches the publish-checklist.md description template — chapters, booking link, hashtags (#SmallBusiness #BusinessAutomation #SameerAutomates)"
    why_human: "Cannot verify YouTube metadata without a live video URL."
  - test: "Verify PROD-02 'tested with first video' component"
    expected: "After publishing, the four ops/sop/ checklists have been marked up (items checked) during actual production — at least some items annotated with real-world observations from filming Video 1"
    why_human: "The SOP documents exist and are complete. But PROD-02 requires they be tested against the actual first video. That test cannot happen until filming occurs. The automated portion of PROD-02 (SOP documented) is done; the validation portion (tested with first video) is pending filming."
---

# Phase 8: Content Production + Repurposing Verification Report

**Phase Goal:** The first YouTube video is published, the production workflow is proven, and the repurposing pipeline converts YouTube videos into platform-ready drafts for human review
**Verified:** 2026-03-02T23:30:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| #   | Truth                                                                                                                                        | Status       | Evidence                                                                                                                                                                                               |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | The first YouTube video is live — demos an automation, framed around business owner outcomes, ends with a CTA                                | HUMAN NEEDED | Video-1-outline.md exists and is complete (commit 3aa680c). Plan 08-04 is at a blocking human checkpoint. Filming has not occurred yet.                                                                |
| 2   | The production SOP is documented and tested: all four checklists exist and were used for the first video                                     | PARTIAL      | Four checklists exist and pass all structural checks. "Documented" portion: verified. "Tested with first video" portion: pending filming.                                                              |
| 3   | Given a YouTube URL, the repurposing script produces Twitter, Instagram, and clip-script drafts in the review queue without posting anything | VERIFIED     | 26 Jest tests pass (0 failures). CLI accepts --url and --from-cache. Three platform drafts written to review/ folder. Booking URL hardcoded in Twitter and Instagram prompts. review/\*.md gitignored. |
| 4   | The video clipping tool extracts a 30-60 second clip in 9:16 format with burned-in captions                                                  | VERIFIED     | 27 Jest tests pass (0 failures). CLI accepts --input, --start, --duration, --output, --srt. ffmpeg-static bundles binary. SRT written to /tmp/ path. No shell:true (injection guard).                  |

**Score:** 2/4 truths fully verified, 1/4 partial (SOP documented but not yet tested against a real video), 1/4 human needed (video not yet filmed)

---

## Required Artifacts

### Plan 08-01: Production SOP Checklists (PROD-02)

| Artifact                         | Min Lines | Actual | Status   | Details                                                                                                                                                              |
| -------------------------------- | --------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ops/sop/outline-template.md`    | 40        | 139    | VERIFIED | All 6 sections present (Hook, Context, Demo, Results, Framework, CTA). Booking URL in CTA section. Pre-film verification checklist embedded.                         |
| `ops/sop/recording-checklist.md` | 30        | 51     | VERIFIED | Three sections: Pre-shoot, During Shoot, Wrap. 28 checkbox items. All actionable, not aspirational.                                                                  |
| `ops/sop/editing-checklist.md`   | 30        | 71     | VERIFIED | Tool-agnostic, outcome-based items. Two CTAs explicitly documented: mid-video at ~60% mark and end screen at final 15 seconds. 28+ checkbox items.                   |
| `ops/sop/publish-checklist.md`   | 40        | 85     | VERIFIED | Description template embedded with chapters, booking URL, hashtags. Thumbnail upload, scheduling, and post-publish social sharing steps present. 24+ checkbox items. |

### Plan 08-02: Repurposing Script CLI (TOOL-03)

| Artifact                                              | Status   | Details                                                                                                                                                      |
| ----------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `research/tools/repurposing-script/index.js`          | VERIFIED | CLI entry with --url, --from-cache, --title flags. Wired to all lib modules.                                                                                 |
| `research/tools/repurposing-script/lib/transcript.js` | VERIFIED | Supadata SDK wrapper. Sync path (response.content) and async polling path (jobId + getJobStatus). 60-attempt max with 3s interval.                           |
| `research/tools/repurposing-script/lib/generator.js`  | VERIFIED | claude-opus-4-6 model. BANNED_PHRASES injected into system prompt on every call. buildPrompt() called with platform + transcript.                            |
| `research/tools/repurposing-script/lib/queue.js`      | VERIFIED | writeToReviewQueue writes to review/[slug]-[platform].md. cacheTranscript and loadCachedTranscript implement --from-cache logic. DRAFT header in output.     |
| `research/tools/repurposing-script/lib/formatter.js`  | VERIFIED | BANNED_PHRASES array exported (17 entries). buildPrompt() has twitter, instagram, clip_script specs. Booking URL hardcoded in Twitter and Instagram prompts. |
| `research/tools/repurposing-script/package.json`      | VERIFIED | bin: sameer-repurpose. Dependencies: @supadata/js, @anthropic-ai/sdk, commander.                                                                             |
| `review/.gitkeep`                                     | VERIFIED | File exists. review/\*.md in .gitignore. review/.gitkeep tracked.                                                                                            |
| 4 test files                                          | VERIFIED | 26 tests passing, 0 failures. All modules covered with mocked external SDKs.                                                                                 |

### Plan 08-03: Video Clipper CLI (TOOL-04)

| Artifact                                        | Status   | Details                                                                                                                                                                                           |
| ----------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `research/tools/video-clipper/index.js`         | VERIFIED | CLI entry with --input, --start, --duration, --output, --srt flags. Help text describes seconds format.                                                                                           |
| `research/tools/video-clipper/lib/extractor.js` | VERIFIED | Spawns ffmpeg-static binary. Args passed as array (no shell:true). -ss, -t, -vf, -c:v libx264, -c:a aac, -movflags +faststart all present. Rejects with descriptive error on non-zero exit.       |
| `research/tools/video-clipper/lib/captioner.js` | VERIFIED | msToSrtTime formats ms to HH:MM:SS,mmm. chunksToSrt produces numbered SRT blocks. writeSrtToTemp uses literal /tmp/clip*captions*[timestamp].srt (not os.tmpdir() — macOS /private path avoided). |
| `research/tools/video-clipper/lib/formatter.js` | VERIFIED | buildVideoFilter(null) returns crop+scale only. buildVideoFilter(srtPath) returns crop+scale+subtitles with force_style. buildAudioArgs() returns aac 128k args.                                  |
| `research/tools/video-clipper/package.json`     | VERIFIED | bin: sameer-clip. ffmpeg-static@^5.2.0 in dependencies.                                                                                                                                           |
| 3 test files                                    | VERIFIED | 27 tests passing, 0 failures. child_process mocked for extractor tests. Captioner and formatter tested as pure functions.                                                                         |

### Plan 08-04: Video 1 Production (PROD-01, PROD-02)

| Artifact                            | Status       | Details                                                                                                                                                                                                                                          |
| ----------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `content/videos/Video-1-outline.md` | VERIFIED     | 154 lines. All 6 sections filled in with Video 1-specific content (origin story, missed-call automation). Raj Photo Video mentioned. Booking URL appears 3 times. "Published URL:" placeholder present — awaiting founder to film and paste URL. |
| YouTube video (live, public)        | HUMAN NEEDED | Plan 08-04 is at a blocking human checkpoint (Task 2). The outline is complete (commit 3aa680c). Filming, editing, and publishing require founder execution. No URL has been pasted into Video-1-outline.md.                                     |

---

## Key Link Verification

### Plan 08-01 Key Links

| From                           | To                                | Via                                                                   | Status   | Details                                                                                               |
| ------------------------------ | --------------------------------- | --------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `ops/sop/outline-template.md`  | `content/youtube/content-plan.md` | 6-section structure matches (Hook/Context/Demo/Results/Framework/CTA) | VERIFIED | All 6 section headers confirmed in file. Matches content-plan.md template exactly.                    |
| `ops/sop/publish-checklist.md` | `brand/brand-voice.md`            | CTA wording "Book a free 15-min discovery call" and booking URL       | VERIFIED | `https://calendar.app.google/psycao3CrXjGnmk48` appears in publish-checklist.md description template. |

### Plan 08-02 Key Links

| From                | To                  | Via                                                                | Status   | Details                                                                                                     |
| ------------------- | ------------------- | ------------------------------------------------------------------ | -------- | ----------------------------------------------------------------------------------------------------------- |
| `lib/transcript.js` | `@supadata/js SDK`  | `new Supadata({ apiKey: process.env.SUPADATA_API_KEY })` + polling | VERIFIED | Pattern confirmed. getJobStatus and jobId polling present. API key read from env — not hardcoded.           |
| `lib/generator.js`  | `@anthropic-ai/sdk` | `client.messages.create` with BANNED_PHRASES in system prompt      | VERIFIED | BANNED_PHRASES imported from formatter.js and joined into system prompt string. claude-opus-4-6 model used. |
| `lib/queue.js`      | `review/` folder    | `fs.writeFileSync` to review/[slug]-[platform].md                  | VERIFIED | writeToReviewQueue creates [slug]-[platform].md. DRAFT header confirmed in content template.                |

### Plan 08-03 Key Links

| From               | To                                   | Via                                                                    | Status   | Details                                                                                  |
| ------------------ | ------------------------------------ | ---------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------- |
| `lib/extractor.js` | ffmpeg-static binary                 | `const ffmpegPath = require('ffmpeg-static'); spawn(ffmpegPath, args)` | VERIFIED | ffmpeg-static imported. spawn called with ffmpegPath and args array. No shell:true.      |
| `lib/captioner.js` | `/tmp/clip_captions_[timestamp].srt` | Literal `/tmp/` path — avoids macOS os.tmpdir() spaces issue           | VERIFIED | Template literal `/tmp/clip_captions_${Date.now()}.srt` confirmed. os.tmpdir() not used. |
| `lib/formatter.js` | ffmpeg subtitles filter              | `subtitles='...'force_style='Fontname=Arial,...'`                      | VERIFIED | subtitles filter with force_style confirmed in buildVideoFilter().                       |

---

## Requirements Coverage

| Requirement | Source Plan                  | Description                                                                                       | Status                 | Evidence                                                                                                                                                                                                                                            |
| ----------- | ---------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PROD-01     | 08-04-PLAN.md                | First YouTube video published — demo automation walkthrough, non-technical, CTA to discovery call | PENDING — HUMAN NEEDED | content/videos/Video-1-outline.md complete. Video filming is a human task at checkpoint gate in 08-04. No live URL yet.                                                                                                                             |
| PROD-02     | 08-01-PLAN.md, 08-04-PLAN.md | Production SOP documented and tested with first video                                             | PARTIAL                | SOP documentation: verified (4 checklists exist, all pass structural checks). "Tested with first video": pending filming. REQUIREMENTS.md marks PROD-02 as [x] complete, but the "tested" component is only verifiable after the video is produced. |
| TOOL-03     | 08-02-PLAN.md                | Repurposing script: YouTube URL → transcript → platform drafts for human review                   | VERIFIED               | 26 tests pass. CLI works. Booking URL in prompts. Async polling implemented. Caching works. No posting — review queue only.                                                                                                                         |
| TOOL-04     | 08-03-PLAN.md                | Video clipping tool: 30-60s clips with burned-in captions for Reels/Twitter                       | VERIFIED               | 27 tests pass. CLI works. 9:16 / 1080x1920 output. SRT burn-in via /tmp path. ffmpeg-static bundled.                                                                                                                                                |

### Traceability Table Note

REQUIREMENTS.md traceability table lists PROD-01, PROD-02, TOOL-03, and TOOL-04 under "Phase 7" — this is a stale label from when the traceability table was last updated. The actual plans for these requirements are in Phase 8 (plans 08-01 through 08-04). This is a documentation inconsistency, not an implementation gap. The requirements themselves are mapped to Phase 8 plans and correctly tracked.

---

## Anti-Patterns Found

No blocker anti-patterns detected across Phase 8 files.

| File                                | Pattern                                               | Severity | Impact                                                                                                            |
| ----------------------------------- | ----------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `content/videos/Video-1-outline.md` | `[paste YouTube URL here when published]` placeholder | Info     | Expected — this is the checkpoint gate placeholder, not a code stub. The founder must fill this in after filming. |
| `ops/sop/outline-template.md`       | `[fill in next Thursday...]` publish date placeholder | Info     | Expected — template fill-in field by design.                                                                      |

No TODO/FIXME/XXX patterns found in implementation files. No empty implementations. No console.log-only handlers. No hardcoded API keys.

---

## Human Verification Required

### 1. Film and Publish the Origin Story Video

**Test:** Follow content/videos/Video-1-outline.md as the filming brief. Run through ops/sop/recording-checklist.md before recording. Edit using ops/sop/editing-checklist.md. Publish using ops/sop/publish-checklist.md description template. Set to publish next Thursday 9:00 AM ET.

**Expected:** A publicly accessible YouTube video at a confirmed URL. Video is 8-10 minutes. Demo section shows the missed-call text-back automation (rajphotovideo-email-automation). Mid-video CTA at ~60% mark. End-screen CTA in final 15 seconds. No banned phrases ("game-changer," "seamless," "leverage," etc.). Description contains: chapters, `https://calendar.app.google/psycao3CrXjGnmk48`, and hashtags `#SmallBusiness #BusinessAutomation #SameerAutomates`.

**Why human:** Claude cannot film, edit, or upload video. This is the blocking checkpoint in 08-04-PLAN.md. Once the URL is live, paste it into `content/videos/Video-1-outline.md` in the `Published URL:` field.

**Resume signal (from 08-04-PLAN.md):** Reply "Published: [YouTube URL]" or "Issues: [what the SOP missed]"

### 2. Verify Post-Publish Checklist Steps

**Test:** After the video is live, confirm the post-publish section of ops/sop/publish-checklist.md was completed: video publicly playable, shared to Twitter (result metric + video link), shared to Instagram, first-24-hour comments replied to, pinned comment asking follow-up question.

**Expected:** All post-publish items in publish-checklist.md are marked complete within 24 hours of the video going live.

**Why human:** Requires live YouTube video and active platform engagement. Cannot be verified programmatically.

### 3. Run Repurposing Script Against the Live Video

**Test:** After the video is published, run: `node research/tools/repurposing-script/index.js --url [YouTube URL] --title "Video-1-origin-story"` with real `SUPADATA_API_KEY` and `ANTHROPIC_API_KEY` set in environment.

**Expected:** Three files appear in review/ folder: `video-1-origin-story-twitter.md`, `video-1-origin-story-instagram.md`, `video-1-origin-story-clip_script.md`. Each draft contains the booking URL. No banned phrases in generated content. Re-running with `--from-cache` does not consume a second Supadata credit.

**Why human:** Requires live video URL and real API keys. Jest tests cover behavior with mocked APIs — real end-to-end run needed for confidence.

---

## Gaps Summary

No automated gaps found. All three tool/SOP plans (08-01, 08-02, 08-03) are fully verified. The only outstanding items are human execution tasks:

1. **PROD-01 (Video 1 not yet filmed):** Plan 08-04 is at a blocking checkpoint gate. The pre-production materials are complete and committed (outline, SOP checklists). Filming, editing, and publishing are founder tasks. This is by design — the plan explicitly states "Claude cannot film, edit, or publish; the founder executes the production steps." Per the verification instruction, this is a human_needed item, not a gap.

2. **PROD-02 partial note:** The "tested with first video" component of PROD-02 will be satisfied when the founder films Video 1 using the SOP. The SOP documentation itself is complete and verified. REQUIREMENTS.md already marks PROD-02 as [x] complete, reflecting the documentation being done — the production test will occur as part of the filming task above.

Phase goal achievement is blocked only by the founder's filming task. All automated/programmable deliverables are complete, substantive, and wired.

---

_Verified: 2026-03-02T23:30:00Z_
_Verifier: Claude (gsd-verifier)_
