---
phase: quick
plan: 4
type: execute
wave: 1
depends_on: []
files_modified:
  - brand/youtube/banner.svg
  - brand/youtube/profile-pic.svg
  - brand/youtube/banner.png
  - brand/youtube/profile-pic-branded.png
autonomous: true
requirements: []
must_haves:
  truths:
    - "Banner PNG renders 'Sameer Automations' text clearly at 2560x1440"
    - "Banner PNG renders tagline and stats text clearly"
    - "Profile pic PNG renders S-wave logo visibly at 800x800"
    - "Profile pic PNG renders SR watermark text"
  artifacts:
    - path: "brand/youtube/banner.png"
      provides: "YouTube banner with readable text"
    - path: "brand/youtube/profile-pic-branded.png"
      provides: "YouTube profile pic with visible S-wave logo"
  key_links: []
---

<objective>
Fix SVG-to-PNG export for YouTube banner and profile pic. Custom fonts (Roc Grotesk, Gilroy, Outfit) are not installed, causing ImageMagick to render blank/missing text. Replace font declarations with installed system fonts and use Chrome headless for high-fidelity rendering.

Purpose: Produce upload-ready YouTube branding PNGs with all text and logo elements visible.
Output: banner.png (2560x1440) and profile-pic-branded.png (800x800)
</objective>

<execution_context>
@./.claude/get-shit-done/workflows/execute-plan.md
@./.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@brand/youtube/banner.svg
@brand/youtube/profile-pic.svg
</context>

<tasks>

<task type="auto">
  <name>Task 1: Update SVG font declarations to use installed system fonts</name>
  <files>brand/youtube/banner.svg, brand/youtube/profile-pic.svg</files>
  <action>
In both SVGs, replace custom font-family declarations with system fonts that are confirmed available on macOS:

banner.svg replacements:

- Line 109: `font-family="'Roc Grotesk', 'Outfit', sans-serif"` -> `font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"` (name text)
- Line 112: `font-family="'Gilroy', 'DM Sans', sans-serif"` -> `font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"` (tagline)
- Line 115: `font-family="'Roc Grotesk', 'Outfit', sans-serif"` -> `font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"` (stats group)

profile-pic.svg replacements:

- Line 103: `font-family="'Roc Grotesk', 'Outfit', sans-serif"` -> `font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"` (SR watermark)

Additionally in profile-pic.svg, the S-wave logo and surrounding elements use very low opacity making them nearly invisible in PNG exports. Boost these:

- Line 44: connection paths group `opacity="0.8"` — keep as-is (already decent)
- Line 41: purple glow ellipse `stop-opacity="0.20"` -> `stop-opacity="0.35"` (line 19, first stop of sGlow gradient)
- The S-wave stroke-width is already 8 at scale 3.2, which is fine
- The border ring on line 114: `opacity="0.8"` -> `opacity="1.0"` for crispness

Do NOT change any colors, layout positions, or text content. Only font-family values and the opacity tweaks above.
</action>
<verify>grep -c "Roc Grotesk\|Gilroy" brand/youtube/banner.svg brand/youtube/profile-pic.svg should return 0 for both files. grep "Helvetica Neue" brand/youtube/banner.svg should return 4 matches. grep "Helvetica Neue" brand/youtube/profile-pic.svg should return 1 match.</verify>
<done>All font-family declarations reference Helvetica Neue (installed system font). Profile pic opacity values boosted for visibility. No custom/missing font references remain.</done>
</task>

<task type="auto">
  <name>Task 2: Render PNGs using Chrome headless</name>
  <files>brand/youtube/banner.png, brand/youtube/profile-pic-branded.png</files>
  <action>
Use Chrome headless to render SVGs to PNG. Chrome handles system font fallback correctly unlike ImageMagick.

Chrome path: /Applications/Google Chrome.app/Contents/MacOS/Google Chrome

For banner (2560x1440):

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless \
  --disable-gpu \
  --screenshot="brand/youtube/banner.png" \
  --window-size=2560,1440 \
  --default-background-color=0 \
  "file://$(pwd)/brand/youtube/banner.svg"
```

For profile pic (800x800):

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless \
  --disable-gpu \
  --screenshot="brand/youtube/profile-pic-branded.png" \
  --window-size=800,800 \
  --default-background-color=0 \
  "file://$(pwd)/brand/youtube/profile-pic.svg"
```

After rendering, verify file sizes are reasonable (banner > 50KB, profile pic > 10KB — anything smaller indicates a blank render). If Chrome headless produces files with wrong dimensions, use the --force-device-scale-factor=1 flag.

If Chrome headless screenshot crops incorrectly (common issue: it screenshots the viewport, not the SVG), wrap each SVG in a minimal HTML file that sets body margin to 0 and embeds the SVG via img tag at exact dimensions, then screenshot the HTML instead:

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      body {
        width: 2560px;
        height: 1440px;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <img src="banner.svg" width="2560" height="1440" />
  </body>
</html>
```

Clean up any temporary HTML wrapper files after successful export.
</action>
<verify>
ls -la brand/youtube/banner.png brand/youtube/profile-pic-branded.png — both files exist with reasonable sizes. Use `sips -g pixelWidth -g pixelHeight brand/youtube/banner.png` to confirm 2560x1440. Use `sips -g pixelWidth -g pixelHeight brand/youtube/profile-pic-branded.png` to confirm 800x800.
</verify>
<done>banner.png is 2560x1440 with visible "Sameer Automations" text, tagline, and stats. profile-pic-branded.png is 800x800 with visible S-wave logo, connection nodes, and SR watermark. Both ready for YouTube upload.</done>
</task>

</tasks>

<verification>
1. `grep -c "Roc Grotesk\|Gilroy" brand/youtube/banner.svg brand/youtube/profile-pic.svg` — both return 0
2. `sips -g pixelWidth -g pixelHeight brand/youtube/banner.png` — 2560x1440
3. `sips -g pixelWidth -g pixelHeight brand/youtube/profile-pic-branded.png` — 800x800
4. Both PNGs > 50KB (not blank renders)
</verification>

<success_criteria>

- banner.png renders all text (name, tagline, stats) using Helvetica Neue at 2560x1440
- profile-pic-branded.png renders S-wave logo and SR watermark visibly at 800x800
- No custom font references remain in either SVG
- Both PNGs are upload-ready for YouTube Studio
  </success_criteria>

<output>
After completion, create `.planning/quick/4-fix-banner-and-profile-pic-svg-to-png-ex/4-SUMMARY.md`
</output>
