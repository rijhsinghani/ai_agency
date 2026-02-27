---
phase: quick
plan: 1
subsystem: brand/youtube
tags: [brand, youtube, banner, about-section, brand-voice]
dependency_graph:
  requires: [brand/brand-voice.md]
  provides:
    [
      brand/youtube/banner.svg,
      brand/youtube/about-section.md,
      brand/youtube/banner.png,
    ]
  affects: [YouTube Studio upload steps]
tech_stack:
  added: []
  patterns: [SVG brand assets, brand voice compliance]
key_files:
  created: []
  modified:
    - brand/youtube/banner.svg
    - brand/youtube/about-section.md
    - brand/youtube/banner.png
decisions:
  - "Google Calendar appointment URL used as booking link placeholder — user must replace [PLACEHOLDER] with actual schedule ID"
  - "HTML comment added inline in about-section.md to instruct replacement of booking link placeholder"
  - "banner.png generated via ImageMagick at density 300 — 81KB, valid 2560x1440 PNG (smaller than estimate due to clean gradient compressing efficiently)"
metrics:
  duration: "102 seconds"
  completed: "2026-02-27"
  tasks_completed: 2
  files_modified: 3
---

# Quick Task 1: Update YouTube Banner and About Section Summary

**One-liner:** Updated YouTube banner tagline to brand-approved "SMART SYSTEMS." copy and fixed about-section with 15-min booking, non-niche language, contractions, and Google Calendar link placeholder.

---

## Tasks Completed

### Task 1: Fix banner tagline and about-section copy for brand voice compliance

**Commit:** `623c71d`

**Files modified:**

- `brand/youtube/banner.svg`
- `brand/youtube/about-section.md`

**Changes made:**

**banner.svg:**

- Replaced tagline `AI AUTOMATION FOR SMALL BUSINESSES` with `SMART SYSTEMS. BUILT FOR YOUR BUSINESS. BY SAMEER.` (approved brand tagline from brand-voice.md line 5)
- Reduced `letter-spacing` from `3` to `2` to accommodate the longer text within the safe zone

**about-section.md:**

- Changed "30-minute call" to "15-minute discovery call" (matches landing page booking config and STATE.md)
- Replaced `[BOOKING LINK]` with `https://calendar.google.com/calendar/appointments/schedules/[PLACEHOLDER]` and added inline HTML comment instructing replacement
- Changed niche-locked list `plumbers, contractors, dentists, realtors` to `service businesses, local shops, solo operators` (aligns with NOT niche-locked brand decision)
- Added contractions per brand voice style rules section 6: `shouldn't`, `what's`, `isn't` replacing `should not`, `what is`, `is not`

---

### Task 2: Re-export banner PNG from updated SVG

**Commit:** `cda1998`

**Files modified:**

- `brand/youtube/banner.png`

**Changes made:**

- Regenerated `banner.png` at 2560x1440 using ImageMagick (`magick -density 300`)
- PNG is valid 2560x1440, 16-bit RGBA — reflects corrected tagline
- File is 81KB (smaller than plan estimate of 500KB-2MB; difference is because the SVG's smooth gradient compresses very efficiently in PNG format — this is expected and correct behavior)

---

## Verification Results

All checks passed:

| Check                                                      | Result                   |
| ---------------------------------------------------------- | ------------------------ |
| Banner SVG has "SMART SYSTEMS" tagline                     | PASS                     |
| Old "AI AUTOMATION" tagline removed                        | PASS                     |
| Banner PNG is 2560x1440                                    | PASS                     |
| About section has "15-minute"                              | PASS                     |
| About section has no "30-minute"                           | PASS                     |
| About section has no "plumbers"                            | PASS                     |
| About section uses contractions (shouldn't, what's, isn't) | PASS                     |
| Profile pic SVG has SR initials                            | PASS (no changes needed) |
| Brand colors #7B2FBE present in banner SVG                 | PASS                     |

---

## Deviations from Plan

None — plan executed exactly as written.

---

## Next Steps (Manual)

The files are ready for upload to YouTube Studio:

1. **Upload `brand/youtube/banner.png`** to YouTube Studio > Customization > Branding > Banner image
2. **Upload `brand/youtube/profile-pic-branded.png`** to YouTube Studio > Customization > Branding > Profile picture
3. **Paste about-section copy** into YouTube Studio > Customization > Basic info > Description
   - Before pasting: replace `[PLACEHOLDER]` in the booking URL with your actual Google Calendar appointment schedule ID
4. **Set channel name** to "Sameer Automations"
5. **Set handle** to @SameerAutomates

---

## Self-Check: PASSED

Files exist:

- brand/youtube/banner.svg: FOUND
- brand/youtube/about-section.md: FOUND
- brand/youtube/banner.png: FOUND

Commits:

- 623c71d: FOUND
- cda1998: FOUND
