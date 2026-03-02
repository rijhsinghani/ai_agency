---
phase: 08-content-production-repurposing
plan: "03"
subsystem: tooling
tags: [nodejs, ffmpeg, ffmpeg-static, commander, jest, video-clipper, srt, tdd]

# Dependency graph
requires:
  - phase: 07-case-studies-content-tooling
    provides: CommonJS CLI pattern with Commander.js + Jest established in content-idea-cli
provides:
  - Node.js CLI (sameer-clip) that extracts 9:16 MP4 clips with burned-in SRT captions using ffmpeg-static
  - lib/formatter.js: FFmpeg filter string builder for crop/scale/subtitle burn-in
  - lib/captioner.js: SRT generation from timestamped chunks + /tmp path writing
  - lib/extractor.js: ffmpeg-static spawn wrapper producing 1080x1920 clips
  - 27 passing Jest unit tests covering all 3 lib modules
affects:
  - phase 10 video post-production (Cloud Run ffmpeg pipeline)
  - any phase using short-form video clip production

# Tech tracking
tech-stack:
  added: [ffmpeg-static@^5.2.0]
  patterns:
    - ffmpeg-static binary via spawn args array (no shell:true — prevents shell injection)
    - SRT files written to /tmp/ (not os.tmpdir()) to avoid macOS path spaces issue with ffmpeg subtitles filter
    - TDD RED/GREEN with jest.mock("child_process") for process spawn testing

key-files:
  created:
    - research/tools/video-clipper/index.js
    - research/tools/video-clipper/lib/extractor.js
    - research/tools/video-clipper/lib/captioner.js
    - research/tools/video-clipper/lib/formatter.js
    - research/tools/video-clipper/package.json
    - research/tools/video-clipper/__tests__/extractor.test.js
    - research/tools/video-clipper/__tests__/captioner.test.js
    - research/tools/video-clipper/__tests__/formatter.test.js
  modified: []

key-decisions:
  - "Use literal /tmp/ path (not os.tmpdir()) — macOS os.tmpdir() returns /private/var/folders/... which is not the same as /tmp/ and can cause ffmpeg subtitles filter failures"
  - "spawn args as array with no shell:true — prevents shell injection with user-provided file paths"
  - "ffmpeg-static bundled binary — no system ffmpeg dependency required for running the tool"

patterns-established:
  - "video-clipper follows same CommonJS + Commander.js + Jest pattern as content-idea-cli"
  - "/tmp/ path for SRT temp files: const tmpPath = /tmp/clip_captions_${Date.now()}.srt"
  - "spawn(ffmpegPath, argsArray) pattern — never spawn(ffmpegPath, shellString, {shell: true})"

requirements-completed: [TOOL-04]

# Metrics
duration: 3min
completed: 2026-03-02
---

# Phase 8 Plan 03: Video Clipper CLI Summary

**sameer-clip Node.js CLI using ffmpeg-static that extracts 9:16 / 1080x1920 MP4 clips with SRT caption burn-in, 27 unit tests passing via spawn mock**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-02T22:44:32Z
- **Completed:** 2026-03-02T22:47:33Z
- **Tasks:** 2 (TDD RED + GREEN)
- **Files created:** 8

## Accomplishments

- Built `sameer-clip` CLI — founder runs `sameer-clip --input video.mp4 --start 120 --duration 45 --output reel.mp4 --srt captions.srt` to get an Instagram Reels/Twitter-ready clip
- All 27 Jest unit tests pass with full mock coverage of child_process spawn
- ffmpeg-static provides bundled binary — no system ffmpeg installation required
- SRT files written to `/tmp/` before passing to ffmpeg, preventing the macOS spaces-in-path bug that silently drops subtitle rendering

## Task Commits

Each task was committed atomically:

1. **Task 1: Write failing tests for all 3 lib modules + package.json** - `ea8de36` (test) — RED state
2. **Task 2: Implement lib modules + index.js to pass all tests** - `fe04bcd` (feat) — GREEN state

## Files Created/Modified

- `research/tools/video-clipper/index.js` — sameer-clip CLI entry point with --input, --start, --duration, --output, --srt flags
- `research/tools/video-clipper/lib/extractor.js` — extractClip() spawns ffmpeg-static with crop/scale/subtitle args
- `research/tools/video-clipper/lib/captioner.js` — msToSrtTime(), chunksToSrt(), writeSrtToTemp() (writes to /tmp/)
- `research/tools/video-clipper/lib/formatter.js` — buildVideoFilter() and buildAudioArgs() pure functions
- `research/tools/video-clipper/package.json` — ffmpeg-static + commander deps, jest devDep, sameer-clip bin
- `research/tools/video-clipper/__tests__/extractor.test.js` — 9 tests with child_process mock
- `research/tools/video-clipper/__tests__/captioner.test.js` — 9 tests for SRT functions
- `research/tools/video-clipper/__tests__/formatter.test.js` — 9 tests for filter builder

## Decisions Made

- **Use literal `/tmp/` path in writeSrtToTemp** — `os.tmpdir()` returns `/private/var/folders/...` on macOS which differs from `/tmp/`. The plan specifies `/tmp/clip_captions_[timestamp].srt` explicitly for the ffmpeg subtitles filter to work correctly.
- **No shell:true** — spawn args passed as array to prevent shell injection with user-supplied file paths.
- **ffmpeg-static** — bundled binary approach; founder can run the tool on any machine without ffmpeg installed globally.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed /tmp/ path — os.tmpdir() returns wrong path on macOS**

- **Found during:** Task 2 (implementing captioner.js — test failure)
- **Issue:** The plan specified `/tmp/clip_captions_[timestamp].srt` explicitly, but the initial implementation used `path.join(os.tmpdir(), ...)`. On macOS, `os.tmpdir()` returns `/private/var/folders/.../T` not `/tmp/`, causing the captioner test to fail (expected `startsWith("/tmp/")`)
- **Fix:** Replaced `path.join(os.tmpdir(), ...)` with template literal `/tmp/clip_captions_${Date.now()}.srt`
- **Files modified:** `research/tools/video-clipper/lib/captioner.js`
- **Verification:** All 27 tests pass including `writeSrtToTemp` path assertion
- **Committed in:** `fe04bcd` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - bug)
**Impact on plan:** Auto-fix aligned implementation with plan's explicit /tmp/ requirement. No scope creep.

## Issues Encountered

None beyond the /tmp/ path deviation above.

## User Setup Required

None — ffmpeg-static bundles the binary. No external services or environment variables needed.

## Next Phase Readiness

- `sameer-clip` CLI is ready to use immediately: `node research/tools/video-clipper/index.js --help`
- Phase 8 Plans 01+02 remain (transcript extraction + repurposing script)
- Phase 10 video post-production pipeline can reference this tool's ffmpeg arg pattern

---

_Phase: 08-content-production-repurposing_
_Completed: 2026-03-02_
