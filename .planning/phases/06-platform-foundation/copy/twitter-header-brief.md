# Twitter Header Image Adaptation Brief

**Purpose:** Adapt the existing YouTube banner SVG to Twitter's header dimensions.

---

## Source Asset

- **File:** `brand/youtube/banner-v1-system-architecture.svg`
- **Original dimensions:** 2560 x 1440 px (16:9 YouTube banner)
- **Design:** System Architecture motif — dot grids, arch-node circles, purple/cyan gradient, dark #1A1A1A background

---

## Target Specification

| Parameter    | Value             |
| ------------ | ----------------- |
| Dimensions   | 1500 x 500 px     |
| Aspect ratio | 3:1 (wide banner) |
| Format       | JPG               |
| File size    | Under 2MB         |
| Color mode   | RGB               |

---

## Safe Zone

Twitter masks the bottom-left approximately 200x200 px with your profile picture. Keep all meaningful content out of that zone.

```
+--------------------------------------------------+
|                                                  |
|   [SAFE FOR CONTENT]      [SAFE FOR CONTENT]    |
|                                                  |
|   [SAFE FOR CONTENT]      [SAFE FOR CONTENT]    |
|                                                  |
| [PROFILE PIC]  [text/logo not here bottom-left] |
+--------------------------------------------------+
  ^^ masked ^^
  ~200x200px
```

**Where to place critical elements:** Top-right quadrant or horizontal center. Never bottom-left.

---

## What to Preserve from Source

- Dark #1A1A1A background — the foundation of the design
- Dot grid pattern — keep at low opacity (10-15%) as texture
- Arch-node circles — at least 2-3 visible in the center band
- Purple-to-cyan gradient accent bar (horizontal divider)
- Logo icon (logo-icon-white.svg) — place in top-right, clear of the 500px bottom
- Any architecture connector lines visible in the center band

---

## What to Adapt

The YouTube banner is 2560 x 1440 — nearly 3x taller than Twitter's 500px target. Do not resize the whole banner (it will be tiny). Instead, crop the center horizontal band:

- **Crop strategy:** Extract the center 1500 x 500 region from the 2560 x 1440 source
- If the banner has text, ensure it falls within the visible center zone, not the bottom-left masked area
- If the banner has empty space, fill with the dot grid or gradient — do not leave dead white/gray

---

## Step-by-Step in Canva

1. Open Canva (canva.com) — Free plan is sufficient
2. Click "Create a design" > "Custom size" > enter **1500 x 500 px**
3. Upload `brand/youtube/banner-v1-system-architecture.svg` as an element
4. Resize the SVG to fill the canvas from left to right (maintain aspect ratio, allow vertical overflow)
5. Center the SVG vertically so the richest part of the design lands in the 500px visible window
6. Add the logo icon (upload `brand/logo-icon-white.svg`) — place in top-right corner, approximately 60px from right edge, 40px from top
7. Confirm nothing critical is in the bottom-left 200x200 zone (profile pic will cover it)
8. Download as JPG, quality "High" — verify file is under 2MB

---

## Alternative: Manual Crop

If Canva is unavailable:

1. Open the SVG in any image editor (Preview on Mac, Inkscape, GIMP, Affinity Designer)
2. Resize canvas to 1500 x 500
3. Center the source artwork vertically within the new canvas
4. Export as JPG, high quality
5. Verify dimensions are exactly 1500 x 500 before upload

---

## Export Checklist

- [ ] Dimensions: exactly 1500 x 500 px
- [ ] Format: JPG
- [ ] File size: under 2MB
- [ ] Logo icon visible in top-right (not bottom-left)
- [ ] No critical text or element in bottom-left ~200x200 zone
- [ ] Background is dark (#1A1A1A range), not white or light gray

---

## Upload Instructions

1. Twitter Settings > Profile > Edit profile
2. Click the camera icon in the header banner area
3. Upload the JPG file
4. Use Twitter's in-app crop tool to confirm framing
5. Save

---

## Notes

The Twitter header and YouTube banner should feel like siblings — same design language, adapted dimensions. The goal is visual recognition across platforms: someone who visits both profiles immediately knows it is the same brand.
