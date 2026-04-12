# Inspiration scan — sameerautomations.com v2

**Collected:** 2026-04-12
**Method:** WebFetch on 21st.dev component gallery + curated landmark references. Firecrawl-mcp was not available in this session; fallback used as pre-approved in task brief. All items below were vetted against the locked System Architecture visual language (dot-grids, arch-nodes, connectors, mesh gradients, grain, purple→cyan).
**Constraint:** Brand is locked. We are NOT borrowing palettes or typography from any reference. Only motion patterns, layout structure, and background treatments.

---

## Tier 1 — 21st.dev component gallery (6 references)

### 1. Artificial Hero (21st.dev, by lovesickfromthe6ix)

- **URL:** https://21st.dev/community/components/s/hero (Artificial Hero)
- **What to steal:** Film grain overlay at ~4% opacity over the whole hero. It adds tactile quality without tipping into skeuomorphism. Pair with our existing grain token. The procedural background animation is overkill for us but the grain + bloom layering is exactly what our "System Architecture" language asks for.

### 2. AuroraHero (21st.dev)

- **URL:** https://21st.dev/community/components/s/hero (AuroraHero)
- **What to steal:** Animated radial mesh gradient that slowly shifts hue across a subtle starfield. Our version replaces hue shift with a purple→cyan signature gradient that slow-pulses (8s ease-in-out loop) behind the hero headline. Do NOT copy the starfield — we use dot-grids instead.

### 3. BackgroundPaths (21st.dev)

- **URL:** https://21st.dev/community/components/s/hero (BackgroundPaths)
- **What to steal:** SVG stroke-dasharray path animation with a spring-eased letter entrance. This is the technical blueprint for our hero S-wave Input/Output Bridge: animate a single cubic-bezier `<path>` with `stroke-dashoffset` from `1` to `0` on mount, then keep the two arch-node circles glowing with a CSS filter pulse.

### 4. FlickeringGridHero (21st.dev, by xubohuah)

- **URL:** https://21st.dev/community/components/s/hero (FlickeringGridHero)
- **What to steal:** A dense grid of dots where a small percentage flicker at low opacity on a staggered timer. This is our dot-grid background. Take the flicker rate (~1 dot per 400ms at ~8% max opacity) as the target so the page feels alive without being distracting.

### 5. Hero 45 (21st.dev, by shadcnblockscom)

- **URL:** https://21st.dev/community/components/s/hero (Hero 45)
- **What to steal:** Layout pattern — large headline + 3 mini feature tiles directly underneath the hero, before the fold ends. We adopt this but replace the 3 mini tiles with our "industry proof strip" (dental, salon, roofing, dental, gym, real estate — one-line text row, not cards).

### 6. Rotating Text (21st.dev, by dev.yadhakim)

- **URL:** https://21st.dev/community/components/s/hero (Rotating Text)
- **What to steal:** Single animated word in the H1 that slide-rotates through a list. Our version: the H1 reads "Every lead gets a response in 60 seconds for [dental practices | roofers | salons | law firms | cleaning crews]". Rotates every 2.5s with a 400ms slide-up + blur. This directly enforces the "rotate 5+ industries" brand rule inside the hero itself.

---

## Tier 2 — Landmark dark SaaS / agency sites (6 references, general knowledge — verify screenshots live during Wave 2 build)

### 7. Linear — linear.app

- **URL:** https://linear.app
- **What to steal:** The exact section rhythm — hero, one-line value prop below the fold, then alternating dark surfaces with subtle tint shifts (not separate colors, just +3 luminance). This is our template for the 9-section scroll. Also: their H1 weight (roughly 64px/1.05 line-height) is the reference for our Roc Grotesk scale.

### 8. Vercel — vercel.com

- **URL:** https://vercel.com
- **What to steal:** Mesh gradient placement — a single large radial behind the hero, anchored bottom-left, bleeding into the next section. We use this for our purple→cyan signature gradient so it "pours" from the hero into the problem strip, giving the scroll a continuous feel instead of stacked cards.

### 9. Attio — attio.com

- **URL:** https://attio.com
- **What to steal:** Card treatment for the automation-cards section. 1px border in `rgba(255,255,255,0.08)`, no shadow, hover state lifts the border to `rgba(155,79,222,0.35)` (our light purple). This replaces heavy drop-shadows which fight the grain texture and feel dated.

### 10. Framer — framer.com

- **URL:** https://framer.com
- **What to steal:** Motion vocabulary. Fade-up on scroll with 120ms stagger, 24px travel, `cubic-bezier(0.22, 1, 0.36, 1)` easing, no bounce. This is exactly the Framer Motion preset we lock for every section reveal. Also: their FAQ accordion uses `height: auto` with a grid-row trick — zero layout jank.

### 11. Runway — runwayml.com

- **URL:** https://runwayml.com
- **What to steal:** Proof block treatment. One giant metric centered, small caption below, NO card chrome around it. Our three case-study proof blocks use this pattern: "$4,200/mo recovered" in 120px Roc Grotesk Bold, one-line context below in Gilroy, industry tag in cyan.

### 12. Stripe — stripe.com/payments

- **URL:** https://stripe.com/payments
- **What to steal:** The connector lines concept. Stripe draws thin animated lines between feature cards to imply data flow. We already have this language built into the brand (connectors are item 3 in §9 of brand-voice.md). Use SVG `<path>` with `stroke-dasharray` animation between the 4 automation cards — purple→cyan gradient, 1px stroke, animates in on viewport entry.

---

## Cross-reference: "what to steal" summary

| Element                 | Source             | Applied to          |
| ----------------------- | ------------------ | ------------------- |
| Grain overlay           | Artificial Hero    | All sections        |
| Mesh gradient placement | Vercel, AuroraHero | Hero + final CTA    |
| Animated SVG S-wave     | BackgroundPaths    | Hero right column   |
| Flicker dot grid        | FlickeringGridHero | All section bgs     |
| Rotating industry word  | Rotating Text      | Hero H1             |
| Section rhythm          | Linear             | 9-section scroll    |
| Card border hover       | Attio              | Automation cards    |
| Fade-up motion preset   | Framer             | All section reveals |
| Chromeless giant metric | Runway             | Proof blocks        |
| Connector lines         | Stripe             | Automation cards    |
| Industry strip layout   | Hero 45            | Below hero          |

---

## Explicitly NOT stealing

- Neon-lit cyberpunk aesthetic (too loud, fights brand voice)
- 3D hero objects / WebGL (heavy, slow on mobile, over-promises technical depth that is not the product)
- Glassmorphism (dated, reduces text contrast, fights grain)
- Full-bleed video backgrounds (over-promises, slow LCP)
- Bright saturated CTAs (our purple is already saturated; a warm orange CTA would break the System Architecture feel)
- Testimonial carousels (we use 3 static giant-metric proof blocks instead — stronger, less chrome)

---

## Questions this scan resolved

1. **Do we need WebGL/Spline for the hero visual?** No. An animated SVG path with a two-stop gradient and two glowing circles gives us everything BackgroundPaths, Stripe, and our own `hero-preview.html` already prove works. Lower bundle cost, faster LCP, and easier to maintain.
2. **Do we need a carousel anywhere?** No. Three static proof blocks beat one carousel for both conversion and code weight.
3. **Do we need card shadows?** No. 1px borders (Attio pattern) are the right call under a grain texture.
4. **Do we need dark + light variants?** No — v1 is dark only. Light mode is a v1.1 decision.
