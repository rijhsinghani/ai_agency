# Mobile Funnel Test — Phase 6

**Purpose:** Verify the full funnel from each content entry point to Google Calendar booking confirmation on mobile.

---

## Test Setup

| Field                  | Value                      |
| ---------------------- | -------------------------- |
| Test date              |                            |
| Real device model      | (e.g., iPhone 15, Pixel 8) |
| Chrome DevTools device | (e.g., iPhone 14 Pro)      |
| Tester name            |                            |

---

## Pass Criteria (applies to every step)

1. Page renders fully on mobile without horizontal scroll
2. Tappable CTA button/link navigates to the correct destination
3. Final step reaches Google Calendar confirmation

Any broken link, layout issue, or dead end = FAIL. Document in Notes column.

---

## Path 1: YouTube video -> description link -> landing page -> booking -> confirmation

| Step | URL / Action                                                                      | Pass/Fail | Notes |
| ---- | --------------------------------------------------------------------------------- | --------- | ----- |
| 1    | Open a YouTube video from @SameerAutomates on mobile                              |           |       |
| 2    | Tap "Show more" in description to expand — find landing page link                 |           |       |
| 3    | Tap landing page link — page loads at https://rijhsinghani.github.io/ai_agency/   |           |       |
| 4    | Landing page renders without horizontal scroll on mobile                          |           |       |
| 5    | Tap "Book a free 15-min discovery call" CTA button                                |           |       |
| 6    | Booking page loads at https://calendar.app.google/psycao3CrXjGnmk48               |           |       |
| 7    | Calendar renders with visible time slots on mobile                                |           |       |
| 8    | Select a time slot, complete booking form — Google Calendar confirmation received |           |       |

**Path 1 result:** PASS / FAIL

---

## Path 2: Twitter bio link -> landing page -> booking -> confirmation

**Note:** Twitter (@SameerAutomates) is pending manual profile setup. Complete this path after profile is live.

| Step | URL / Action                                                                              | Pass/Fail | Notes |
| ---- | ----------------------------------------------------------------------------------------- | --------- | ----- |
| 1    | Open @SameerAutomates profile on Twitter (mobile)                                         |           |       |
| 2    | Tap Website link in bio — landing page loads at https://rijhsinghani.github.io/ai_agency/ |           |       |
| 3    | Landing page renders without horizontal scroll on mobile                                  |           |       |
| 4    | Tap "Book a free 15-min discovery call" CTA button                                        |           |       |
| 5    | Booking page loads at https://calendar.app.google/psycao3CrXjGnmk48                       |           |       |
| 6    | Google Calendar confirmation received                                                     |           |       |

**Path 2 result:** PASS / FAIL

---

## Path 3: Instagram bio link -> landing page -> booking -> confirmation

**Note:** Instagram (@SameerAutomates) is pending manual profile setup. Complete this path after profile is live.

| Step | URL / Action                                                                                        | Pass/Fail | Notes |
| ---- | --------------------------------------------------------------------------------------------------- | --------- | ----- |
| 1    | Open @SameerAutomates profile on Instagram (mobile)                                                 |           |       |
| 2    | Tap Website/Links field below bio — landing page loads at https://rijhsinghani.github.io/ai_agency/ |           |       |
| 3    | Landing page renders without horizontal scroll on mobile                                            |           |       |
| 4    | Tap "Book a free 15-min discovery call" CTA button                                                  |           |       |
| 5    | Booking page loads at https://calendar.app.google/psycao3CrXjGnmk48                                 |           |       |
| 6    | Google Calendar confirmation received                                                               |           |       |

**Path 3 result:** PASS / FAIL

---

## Path 4: Pinned tweet link -> landing page -> booking -> confirmation

**Note:** Twitter (@SameerAutomates) is pending manual profile setup. Complete this path after pinned thread is live.

| Step | URL / Action                                                                                  | Pass/Fail | Notes |
| ---- | --------------------------------------------------------------------------------------------- | --------- | ----- |
| 1    | Open @SameerAutomates profile on Twitter — tap pinned tweet thread                            |           |       |
| 2    | Read through thread to final tweet — find landing page URL                                    |           |       |
| 3    | Tap landing page URL in final tweet — page loads at https://rijhsinghani.github.io/ai_agency/ |           |       |
| 4    | Landing page renders without horizontal scroll on mobile                                      |           |       |
| 5    | Tap "Book a free 15-min discovery call" CTA button                                            |           |       |
| 6    | Google Calendar confirmation received                                                         |           |       |

**Path 4 result:** PASS / FAIL

---

## Result

| Path   | Description                                | Result    |
| ------ | ------------------------------------------ | --------- |
| Path 1 | YouTube video description link             | PASS/FAIL |
| Path 2 | Twitter bio link (pending profile setup)   | PASS/FAIL |
| Path 3 | Instagram bio link (pending profile setup) | PASS/FAIL |
| Path 4 | Pinned tweet link (pending profile setup)  | PASS/FAIL |

**All 4 paths pass:** YES / NO

**Date verified:**

**Blockers found (if any):**

- [ ] List any failures here with step reference and path number
- Note: Landing page mobile responsiveness issues are deferred per CONTEXT.md — document but do not fix inline

**Deferred issues:**

- (none, or list here)
