---
phase: quick
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - brand/youtube/banner.svg
  - brand/youtube/about-section.md
  - brand/youtube/profile-pic.svg
autonomous: true
requirements: [YOUTUBE-BRAND-ALIGN]

must_haves:
  truths:
    - "Banner tagline matches the approved brand tagline from brand-voice.md"
    - "About section uses brand-compliant language with no jargon, no buzzwords, no emojis"
    - "About section booking link placeholder is updated and call duration matches landing page (15 min)"
    - "All YouTube SVG assets use correct brand colors (#7B2FBE, #9B4FDE, #1A1A1A)"
    - "Profile pic SVG is consistent with personal brand (SR initials, not old 'SAMEER AUTOMATIONS' text)"
  artifacts:
    - path: "brand/youtube/banner.svg"
      provides: "YouTube banner with correct tagline and brand-aligned design"
      contains: "Smart systems"
    - path: "brand/youtube/about-section.md"
      provides: "YouTube channel description under 1000 chars, brand-voice compliant"
      contains: "15-minute"
    - path: "brand/youtube/profile-pic.svg"
      provides: "YouTube profile picture with SR initials and brand colors"
      contains: "SR"
  key_links:
    - from: "brand/youtube/banner.svg"
      to: "brand/brand-voice.md"
      via: "Tagline must match approved tagline"
      pattern: "Smart systems"
    - from: "brand/youtube/about-section.md"
      to: "brand/brand-voice.md"
      via: "Tone, terminology, and style rules must comply"
      pattern: "No emojis.*No jargon"
---

<objective>
Update YouTube banner SVG, about-section copy, and profile pic SVG to align with the latest brand voice guide and project decisions.

Purpose: The YouTube assets were recently updated in a brand pivot (from "Sameer Automations" branding to personal brand under full name), but several inconsistencies remain between the current files and the approved brand voice guide. This plan fixes those gaps so the assets are ready for manual upload to YouTube Studio.

Output: Three updated files in `brand/youtube/` that are fully brand-compliant and ready for upload.
</objective>

<execution_context>
@./.claude/get-shit-done/workflows/execute-plan.md
@./.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@brand/brand-voice.md
@brand/youtube/banner.svg
@brand/youtube/about-section.md
@brand/youtube/profile-pic.svg
@brand/youtube/channel-keywords.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix banner tagline and about-section copy for brand voice compliance</name>
  <files>brand/youtube/banner.svg, brand/youtube/about-section.md</files>
  <action>
**banner.svg — Fix tagline:**
The current banner tagline reads "AI AUTOMATION FOR SMALL BUSINESSES". This violates the brand voice terminology rules in `brand/brand-voice.md` section 7, which says to use "automation" not "AI solution, AI-powered tool". Additionally, the approved brand tagline is "Smart systems. Built for your business. By Sameer." (from brand-voice.md line 5).

Replace the tagline text element (currently at y="790") content from:

```
AI AUTOMATION FOR SMALL BUSINESSES
```

to:

```
SMART SYSTEMS. BUILT FOR YOUR BUSINESS. BY SAMEER.
```

Adjust `letter-spacing` from "3" to "2" to fit the longer tagline within the safe zone (1546px wide, centered at x=1280). The font-size of 28 should remain the same. Verify the text stays within the safe zone bounds (x: 507-2053).

Everything else in the banner SVG stays as-is. The "SAMEER RIJHSINGHANI" name, the gradient background, the accent lines, the corner decorations — all correct and brand-aligned.

**about-section.md — Fix three issues:**

1. **Call duration:** Change "30-minute call" to "15-minute discovery call" to match the landing page booking configuration (STATE.md confirms "15-min discovery call").

2. **Booking link placeholder:** Replace `[BOOKING LINK]` with the Google Calendar booking link. Since the actual link is not in the codebase, use `https://calendar.google.com/calendar/appointments/schedules/[PLACEHOLDER]` and add a comment noting the user must replace this with their actual Google Calendar appointment link. Per STATE.md: "Cal.com removed — replaced with Google Calendar (Google Workspace) everywhere."

3. **Niche list wording:** The current copy says "plumbers, contractors, dentists, realtors". Per STATE.md decision "NOT niche-locked — serves all small business owners, not just plumbers/contractors", soften this to not imply niche focus. Change the line from:

   ```
   plumbers, contractors, dentists, realtors — anyone losing time and money
   ```

   to:

   ```
   service businesses, local shops, solo operators — anyone losing time and money
   ```

   This keeps it concrete enough for YouTube search (business owners searching for solutions) without locking into specific trades, aligning with the "not niche-locked" brand decision.

4. **Contractions:** Per brand voice style rules section 6: "Use contractions (it's, you're, we'll) — they are conversational and keep the tone human." The current about-section uses "should not", "is not", "what is" — update these to contractions: "shouldn't", "isn't", "what's". Keep "I ran" and "I got" as-is (those are past tense, not contraction candidates).

5. **Title:** Keep "YouTube Channel Description — Sameer Rijhsinghani" (correct, matches personal brand).
   </action>
   <verify>
   Run the following checks:

- `grep "SMART SYSTEMS" brand/youtube/banner.svg` returns the new tagline
- `grep "AI AUTOMATION" brand/youtube/banner.svg` returns nothing (old tagline removed)
- `grep "15-minute" brand/youtube/about-section.md` confirms updated call duration
- `grep "30-minute" brand/youtube/about-section.md` returns nothing
- `grep "plumbers" brand/youtube/about-section.md` returns nothing (niche list updated)
- `grep "shouldn't" brand/youtube/about-section.md` confirms contractions used
- Character count of the about section final copy (between the `---` markers) is under 1000 characters
  </verify>
  <done>
  Banner SVG displays the approved tagline "SMART SYSTEMS. BUILT FOR YOUR BUSINESS. BY SAMEER." instead of "AI AUTOMATION FOR SMALL BUSINESSES". About section uses 15-minute discovery call, has Google Calendar placeholder link, uses non-niche-locked language, and uses contractions per brand voice guide. Both files pass all brand voice compliance checks.
  </done>
  </task>

<task type="auto">
  <name>Task 2: Re-export banner PNG from updated SVG</name>
  <files>brand/youtube/banner.png</files>
  <action>
The banner.png (2560x1440) needs to be regenerated from the updated banner.svg so YouTube Studio gets the correct rasterized version.

Use one of these approaches (in order of availability):

1. `rsvg-convert` (from librsvg): `rsvg-convert -w 2560 -h 1440 brand/youtube/banner.svg -o brand/youtube/banner.png`
2. `cairosvg` (Python): `python3 -c "import cairosvg; cairosvg.svg2png(url='brand/youtube/banner.svg', write_to='brand/youtube/banner.png', output_width=2560, output_height=1440)"`
3. `convert` (ImageMagick): `convert -density 300 -resize 2560x1440 brand/youtube/banner.svg brand/youtube/banner.png`
4. If none available, install via: `brew install librsvg` then use option 1.

After export, verify the PNG file exists and is a reasonable size (should be 500KB-2MB for a 2560x1440 image with gradients).

Note: The profile-pic PNGs (profile-pic-branded.png, profile-pic-headshot.png, profile-pic-tight.png) appear to be real photos/composites, not purely SVG-derived, so do NOT regenerate those. Only the banner.png needs re-export.
</action>
<verify>

- `file brand/youtube/banner.png` confirms it is a PNG image
- `identify brand/youtube/banner.png 2>/dev/null || file brand/youtube/banner.png` shows 2560x1440 dimensions (if ImageMagick available) or at least confirms PNG format
- File size is between 100KB and 3MB: `ls -la brand/youtube/banner.png`
  </verify>
  <done>
  banner.png is regenerated from the updated banner.svg at 2560x1440 resolution, ready for upload to YouTube Studio. The PNG reflects the corrected tagline.
  </done>
  </task>

</tasks>

<verification>
1. Banner SVG: tagline is "SMART SYSTEMS. BUILT FOR YOUR BUSINESS. BY SAMEER." (not "AI AUTOMATION...")
2. Banner PNG: regenerated at 2560x1440 from updated SVG
3. About section: 15-minute discovery call, Google Calendar link placeholder, non-niche-locked language, contractions used
4. Profile pic SVG: already correct (SR initials, brand colors) — no changes needed
5. All files pass brand voice compliance: no emojis, no jargon, no buzzwords, correct terminology per brand-voice.md section 7
6. About section character count is under 1000
</verification>

<success_criteria>

- All three YouTube brand files are consistent with brand-voice.md
- Banner uses the approved tagline, not generic "AI AUTOMATION" phrasing
- About section is ready for paste into YouTube Studio (under 1000 chars, correct booking details)
- Banner PNG is current with SVG changes
- Files are ready for the manual YouTube Studio upload steps listed in STATE.md todos
  </success_criteria>

<output>
After completion, create `.planning/quick/1-update-youtube-banner-and-description-ba/1-SUMMARY.md`
</output>
