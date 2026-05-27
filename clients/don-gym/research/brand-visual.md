# ARCH Training — Brand Visual Identity

**Source:** Live site scrape + CSS extraction via Firecrawl, May 23 2026
**Platform:** Squarespace (site ID: 5554b3d7e4b03a83e2b7428d, account: domenick-cilea-knoq)

---

## Brand Colors (extracted from site.css)

These are extracted from `https://static1.squarespace.com/static/sitecss/5554b3d7e4b03a83e2b7428d/...site.css` — the actual Squarespace site-specific stylesheet. Occurrence counts reflect usage frequency across all CSS rules.

| Role                           | Hex                   | Count | Notes                                  |
| ------------------------------ | --------------------- | ----- | -------------------------------------- |
| **Primary background**         | `#000000` / `#131313` | ~70+  | Black base; near-black body background |
| **Dark body / card bg**        | `#1f2526`             | 10    | Very dark charcoal, used for sections  |
| **Text / heading on dark**     | `#ffffff` / `#fff`    | 180   | Primary text color on dark backgrounds |
| **PRIMARY BRAND RED / ACCENT** | `#a21e22`             | 29    | Deep crimson red — dominant accent     |
| **Lighter red (hover/alt)**    | `#f0523d`             | 11    | Brighter warm red, secondary accent    |
| **Dark red variant**           | `#80181b`             | 8     | Darker crimson, shadow/pressed states  |
| **Mid-dark gray**              | `#272727`             | 58    | Used for surface/divider elements      |
| **Dark charcoal**              | `#222`                | 39    | Secondary dark backgrounds             |
| **Medium gray**                | `#3e3e3e`             | 22    | Input backgrounds, borders             |
| **Light gray / off-white**     | `#f6f6f6`             | 11    | Subtle light sections                  |
| **White**                      | `#ffffff`             | 180   | Text, icons on dark bg                 |

**Summary palette (5 key colors):**

- `#000000` — Background black
- `#131313` / `#1f2526` — Near-black surfaces
- `#a21e22` — Brand red (primary accent) ← THE signature color
- `#ffffff` — Primary text / reversed text
- `#272727` — Mid-dark sections

**Color system in plain English:** This is a classic dark-gym palette. Near-black base, pure white text, a deep crimson red as the sole brand accent. Very little else — no blues, no teals, no gradients found in the custom CSS. The `#a21e22` deep red appears 29 times and is clearly the primary brand color.

---

## Fonts (extracted from site.css)

The CSS explicitly loads these typefaces (also confirmed via `wf-*` classes in the HTML body):

| Role                          | Font                                         | Source                                                         |
| ----------------------------- | -------------------------------------------- | -------------------------------------------------------------- |
| **Primary heading / display** | **Europa**                                   | Web font (wf-europa — loaded in 5 weights: n3, n4, n7, i3, i7) |
| **Secondary / body**          | **Calluna**                                  | Web font (wf-calluna-n3)                                       |
| **Utility/button**            | **Proxima Nova**                             | Web font (wf-proximanova — n4, n6, n7 loaded)                  |
| **Video player**              | Clarkson (Squarespace internal)              | Platform font                                                  |
| **Fallback**                  | Helvetica Neue, Helvetica, Arial, sans-serif | Standard stack                                                 |

**Key finding:** Europa (a geometric sans with strong industrial character) is the heading font. Calluna is a serif — used for body/secondary. Proxima Nova handles UI elements and buttons. This is a premium font stack, not Squarespace defaults.

---

## Logo Files

### Downloaded to research directory:

| File                      | Path                                                                                   | Dimensions              | Alpha               | Notes                                                                                   |
| ------------------------- | -------------------------------------------------------------------------------------- | ----------------------- | ------------------- | --------------------------------------------------------------------------------------- |
| `logo-black-bg.png`       | `/Users/sameerrijhsinghani/ai_agency/clients/don-gym/research/logo-black-bg.png`       | 1500 × 1310 px          | YES (hasAlpha: yes) | Despite name, has transparency layer — likely white text/logo on opaque black square bg |
| `logo-black-bg-small.png` | `/Users/sameerrijhsinghani/ai_agency/clients/don-gym/research/logo-black-bg-small.png` | Smaller version of same | —                   | 37K, same CDN source at 750w                                                            |

**Source URL for logo:** `https://images.squarespace-cdn.com/content/v1/5554b3d7e4b03a83e2b7428d/1610656520871-2L5K74VRZPN2FKG0VM1X/ARCH+TRAINING+LOGO+BLACK+BG+-+PNG.png?format=1500w`

**Logo notes:** The filename explicitly says "BLACK BG" — this is the version with a black background. A white/light-background version was not found via a direct URL, but likely exists on the site as the nav logo on dark header (transparent or white variant). The Squarespace sitemap and page headers use this same CDN path. The logo appears to be wordmark-style: "ARCH TRAINING" in all-caps, bold, likely Europa or condensed sans.

**What was NOT found:** No separate light/white logo URL was surfaced. The site uses a transparent header, so only the dark version was needed for the dark site background.

---

## Hero / Photography Images

| File                   | Path                                                                                | Size  | Source                                      |
| ---------------------- | ----------------------------------------------------------------------------------- | ----- | ------------------------------------------- |
| `hero-01-training.jpg` | `/Users/sameerrijhsinghani/ai_agency/clients/don-gym/research/hero-01-training.jpg` | 2.3MB | `Arch-107.jpg` — professional branded shoot |
| `hero-02-gym.jpg`      | `/Users/sameerrijhsinghani/ai_agency/clients/don-gym/research/hero-02-gym.jpg`      | 621K  | `ARCH TRAINING-188.jpg` — gym/trainer shot  |

**Photography style observed across the site:** Dark, dramatic, contrast-heavy. Professional shoot (file naming: "Arch-107", "Arch-16", "ARCH TRAINING-188" suggest a branded photography session). Action/in-gym shots with members training. Equipment-forward. The HYROX page has 20+ images of athletes mid-workout (sleds, rowers, races). No lifestyle photography (coffee shops, outdoor yoga etc.) — purely performance/gym aesthetic.

---

## Overall Aesthetic

**3–4 words:** Industrial. High-contrast. Performance-driven. Unapologetic.

**Expanded:** Black and deep crimson, bold sans-serif typography, dark photography, zero lifestyle softness. The visual language says "serious gym" — not boutique fitness, not luxury wellness. Closer to Crossfit or a powerlifting box than a SoulCycle or Equinox. The 2021 rebrand to "ARCH Training" (from a group fitness studio) is reflected in this identity shift toward open gym + elite equipment + HYROX.

---

## Technical Findings

- **No JSON-LD schema markup** found anywhere on the site (confirmed: zero `application/ld+json` blocks in scraped HTML)
- **CSS custom color properties** (`--siteBackgroundColor` etc.) were NOT present in the scraped HTML — Squarespace v6 (older template) stores colors in the compiled CSS, not as CSS variables
- **No `llms.txt`** at arch-training.com/llms.txt (301 redirects to www, but that page also returns empty — no AI-friendly content file exists)
- **robots.txt** explicitly BLOCKS anthropic-ai, ClaudeBot, GPTBot, Google-Extended, and 20+ other AI crawlers — this site is locked out of AI training data
