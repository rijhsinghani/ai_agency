---
phase: quick
plan: 4
subsystem: brand
tags: [youtube, branding, svg, png, chrome-headless]
dependency_graph:
  requires: []
  provides: [brand/youtube/banner.png, brand/youtube/profile-pic-branded.png]
  affects: []
tech_stack:
  added: []
  patterns:
    [
      Chrome headless=new with --force-device-scale-factor=1 for exact-pixel PNG export,
    ]
key_files:
  created:
    - brand/youtube/banner.png
    - brand/youtube/profile-pic-branded.png
  modified:
    - brand/youtube/banner.svg
    - brand/youtube/profile-pic.svg
decisions:
  - "Chrome --headless=new flag (Chrome 112+) respects --force-device-scale-factor=1; legacy --headless does not — use headless=new for dimension-accurate screenshots on Retina displays"
  - "HTML wrapper approach used instead of direct SVG screenshot — prevents Chrome viewport crop and ensures body/img dimensions drive the render"
  - "Retina display scale factor on this Mac is 1.5625x (2560/1440 CSS pixels -> 4000/2250 device pixels without override)"
metrics:
  duration_minutes: 6
  completed_date: "2026-03-04T20:55:38Z"
  tasks_completed: 2
  files_changed: 4
---

# Quick Task 4: Fix Banner and Profile Pic SVG-to-PNG Export Summary

**One-liner:** SVG font declarations updated to Helvetica Neue and both PNGs exported at exact dimensions (2560x1440 banner, 800x800 profile pic) via Chrome --headless=new with --force-device-scale-factor=1.

---

## What Was Built

Replaced unavailable custom fonts (Roc Grotesk, Gilroy, Outfit) with Helvetica Neue system font in both YouTube branding SVGs, then rendered upload-ready PNG exports using Chrome headless.

---

## Tasks Completed

| Task | Name                                           | Commit  | Files                               |
| ---- | ---------------------------------------------- | ------- | ----------------------------------- |
| 1    | Update SVG font declarations to Helvetica Neue | 627d0f9 | banner.svg, profile-pic.svg         |
| 2    | Render PNGs using Chrome headless              | 4251375 | banner.png, profile-pic-branded.png |

---

## Verification Results

1. `grep -c "Roc Grotesk\|Gilroy" banner.svg` — 0 (PASS)
2. `grep -c "Roc Grotesk\|Gilroy" profile-pic.svg` — 0 (PASS)
3. `sips -g pixelWidth -g pixelHeight banner.png` — 2560x1440 (PASS)
4. `sips -g pixelWidth -g pixelHeight profile-pic-branded.png` — 800x800 (PASS)
5. banner.png size: 2.2MB (>> 50KB threshold) (PASS)
6. profile-pic-branded.png size: 413KB (>> 10KB threshold) (PASS)

---

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Chrome Retina display scale producing wrong output dimensions**

- **Found during:** Task 2
- **Issue:** Chrome headless screenshot on this Retina Mac (1.5625x device scale) produced 4000x2250 output instead of 2560x1440 when using legacy `--headless` flag. `--force-device-scale-factor=1` had no effect with legacy flag.
- **Fix:** Switched to `--headless=new` flag (Chrome 112+), which correctly respects `--force-device-scale-factor=1`. Also used HTML wrapper files (per plan's fallback guidance) for reliable viewport control. Cleaned up wrapper files after successful export.
- **Files modified:** No permanent file changes (wrappers created and deleted within same task)
- **Commit:** 4251375

---

## Decisions Made

1. **Chrome --headless=new for dimension accuracy** — Legacy `--headless` ignores `--force-device-scale-factor=1` on Retina displays. `--headless=new` (Chrome 112+, current version is 145) honors it correctly.

2. **HTML wrapper approach** — HTML body set to exact dimensions with `overflow: hidden`, SVG embedded via `<img>` tag. Prevents viewport cropping and ensures exact pixel-for-pixel rendering.

3. **Profile pic sGlow opacity: 0.20 -> 0.35** — Boosted purple glow behind S-wave for better visibility in PNG export.

4. **Border ring opacity: 0.8 -> 1.0** — Crisp purple ring at full opacity eliminates any anti-aliasing softness.

---

## Self-Check: PASSED

- [x] brand/youtube/banner.svg exists and has 0 custom font references
- [x] brand/youtube/profile-pic.svg exists and has 0 custom font references
- [x] brand/youtube/banner.png exists — 2560x1440 at 2.2MB
- [x] brand/youtube/profile-pic-branded.png exists — 800x800 at 413KB
- [x] Commit 627d0f9 exists (Task 1)
- [x] Commit 4251375 exists (Task 2)
