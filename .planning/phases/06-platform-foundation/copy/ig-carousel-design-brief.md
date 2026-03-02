# Instagram Carousel Design Brief

**Purpose:** Visual design specifications for creating all carousel slides in Canva (or Figma) for Posts 1, 2, and 3.

**Applies to:** ig-post-01 (Pain), ig-post-02 (Proof), ig-post-03 (Offer)

---

## Canvas Specification

| Parameter       | Value                                                     |
| --------------- | --------------------------------------------------------- |
| Dimensions      | 1080 x 1350 px                                            |
| Aspect ratio    | 4:5 (portrait)                                            |
| Format (export) | PNG                                                       |
| Color mode      | RGB                                                       |
| Safe zone       | 50px from all edges — no text or critical elements closer |

**Why 4:5 portrait:** Instagram displays carousels at 4:5 in the feed. Square (1:1) works but 4:5 occupies more real estate and interrupts the scroll more effectively.

---

## Color System

| Color          | Hex     | Usage                                           |
| -------------- | ------- | ----------------------------------------------- |
| Dark base      | #1A1A1A | Background on all slides — no exceptions        |
| Primary purple | #7B2FBE | Input nodes, accent circles, primary highlights |
| Light purple   | #9B4FDE | Gradient endpoints, secondary highlights        |
| Cyan           | #4DD9E8 | Output nodes, CTA elements, accent glow         |
| Warm orange    | #D97706 | Numbers, ROI metrics, dollar figures            |
| Soft white     | #F5F5F5 | Primary text                                    |
| Mid gray       | #6B7280 | Secondary text, labels, supporting copy         |

---

## Typography

| Role                 | Font           | Fallback    | Weight        |
| -------------------- | -------------- | ----------- | ------------- |
| Headlines            | Roc Grotesk    | Outfit Bold | Bold (700)    |
| Body text            | Gilroy         | DM Sans     | Regular (400) |
| Code / data / quotes | JetBrains Mono | Courier New | Regular (400) |

**If Roc Grotesk is not available in Canva Free:**

- Use Outfit Bold as the primary fallback — similar geometric proportions and authority
- Do not use Montserrat or Poppins — they are too common and lose the brand distinction

**Font sizes (approximate, adjust for content density):**

- Hook headline: 64-80px
- Standard headline: 48-56px
- Body text: 24-28px
- Secondary / footnote: 18-20px
- Pricing reference: 16-18px (never larger than body text)

---

## Design Elements

### Dot Grid Background

- Regular array of circular dots, 3-4px diameter, 30-40px spacing
- Opacity: 10-15% of white on the dark background
- Covers the full canvas as a texture layer
- Does not compete with text — it exists behind everything

### Arch-Node Circles

- Small glowing circles: 16-24px diameter
- Placed at compositional anchor points (corners, mid-edges, near headlines)
- Colors: mix of #7B2FBE (purple) and #4DD9E8 (cyan)
- Add a subtle outer glow filter at 20-30% opacity for the "system node" effect
- Use 2-4 per slide — never crowd them

### Gradient Accent Bar

- Thin horizontal line (4-6px height, full slide width or partial)
- Gradient: #7B2FBE (left) to #4DD9E8 (right)
- Used as a visual divider between headline and body content
- Position: below the headline, above the body text

### Mesh Gradient (Background Depth)

- Large-radius radial gradient, very subtle
- One purple radial (top-right area) and one cyan radial (bottom-left area)
- Opacity: 8-12% — barely visible, exists for atmospheric depth only
- Layer: above the dark base, below the dot grid

---

## Slide-by-Slide Layout Guidelines

### Hook Slide (Slide 1 — every post)

- Largest typography across all slides — the headline must fill and command the canvas
- Single primary message — do not add multiple ideas to the hook slide
- High contrast: pure white or warm orange text on #1A1A1A
- Swipe prompt in smaller text at the bottom: "Swipe to see X"
- No pricing on hook slides

### Content Slides (slides 2 through second-to-last)

- Headline at top in Roc Grotesk Bold
- Gradient accent bar below headline
- Body text in Gilroy Regular
- Evidence quotes in JetBrains Mono with a subtle left-border accent (2px, #7B2FBE)
- Numbers and metrics in warm orange (#D97706) or cyan (#4DD9E8) — never in mid gray
- Arch-node circles at compositional corners

### Stats Slides (Post 02 Slide 4)

- Two-column layout for metrics
- Labels in mid gray (#6B7280)
- Values in warm orange (#D97706) — large
- Gradient accent bar as horizontal separator between stat rows

### CTA Slide (Final slide — every post)

- Clean composition — fewer elements than content slides
- Headline in Roc Grotesk Bold: invitational ("Which one does your business need?" or "I build this for businesses like yours.")
- CTA text: "Book a free 15-min discovery call" in high-contrast white
- Handle: @SameerAutomates in #9B4FDE (light purple)
- Landing page URL in #6B7280 (mid gray) at smaller size
- Logo icon (logo-icon-white.svg) in bottom-right corner — 40x40px approximate

---

## Logo Placement

- Logo icon file: `brand/logo-icon-white.svg`
- Position: bottom-right corner of every slide
- Size: 40-50px wide
- Distance from edge: 30-40px from right edge, 30-40px from bottom
- Never on the left side (reserved for reading flow)
- Never enlarged beyond 60px (it is an accent, not a primary element)

---

## File Naming Convention

```
ig-post-01-slide-01.png
ig-post-01-slide-02.png
...
ig-post-02-slide-01.png
ig-post-02-slide-02.png
...
ig-post-03-slide-01.png
...
```

---

## Post-by-Post Slide Counts

| Post               | Count    | Notes                  |
| ------------------ | -------- | ---------------------- |
| ig-post-01 (Pain)  | 6 slides | Hook + 4 content + CTA |
| ig-post-02 (Proof) | 5 slides | Hook + 3 content + CTA |
| ig-post-03 (Offer) | 8 slides | Hook + 6 service + CTA |

Total slides to create: 19

---

## Canva Workflow

1. Create one template slide in Canva (1080x1350px) with the following layers in order (bottom to top):
   - Dark base fill (#1A1A1A)
   - Mesh gradient layer (purple + cyan radials, low opacity)
   - Dot grid pattern (create as a repeating element or use Canva's pattern backgrounds)
   - Content layer (text, quotes, stats — unique per slide)
   - Logo icon layer (bottom-right, consistent position)
   - Arch-node circles (move per slide composition)

2. Duplicate the template for each slide, swapping content

3. Export each slide individually as PNG, 1080x1350px

4. Name files per the naming convention above before uploading to Instagram

---

## Quality Checklist

Before posting:

- [ ] All slides are 1080 x 1350 px (verify in export dialog)
- [ ] No text within 50px of any edge
- [ ] Logo icon visible in bottom-right of every slide
- [ ] Headline readable in the Instagram feed thumbnail (Slide 1)
- [ ] CTA on final slide includes exact wording "Book a free 15-min discovery call"
- [ ] CTA slide includes @SameerAutomates handle
- [ ] No emojis anywhere
- [ ] Numbers and dollar figures in warm orange (#D97706) — not white
- [ ] File names follow ig-post-0X-slide-0Y.png convention

---

## Reference Files

- Logo icon: `brand/logo-icon-white.svg`
- Color reference: `brand/brand-voice.md` section 9
- Slide text content: `ig-post-01-captions.md`, `ig-post-02-captions.md`, `ig-post-03-captions.md`
