# Instagram Template Inventory — Sameer Automations

The 8 canonical Instagram design templates. All render off `brand-manifest.json` (single source of truth). Open any preview HTML directly in a browser — it links to `_base.css` + `colors_and_type.css` for styling.

## 1. ig-profile-grid.html — IG Profile / 9-Tile Grid

**What:** How the @sameer_rijhsinghani feed should look as a balanced 9-tile composition.
**When to use:** Planning the next 3 posts. Make sure tile types alternate (carousel / quote / reel cover) so the grid reads as one designed surface.

## 2. ig-dm-bot.html — DM Bot Flow ("AUDIT → booked call")

**What:** The exact conversational flow Sameer's IG DM bot uses to qualify and book leads.
**When to use:** Reference for the DM agent's tone, qualifying flow (industry + lead volume max), and the booking card pattern.

## 3. ig-story.html — Four Story Templates

**What:** Poll, build-log, link push, BTS — the four story formats Sameer reuses.
**When to use:** Shipping a story. Pick the format that matches the moment (audience question / weekly progress / push-to-feed / behind-the-scenes).

## 4. ig-carousel.html — Carousel Post

**What:** Swipeable post template for turning a 5-play list, framework, or breakdown into a 5-7 slide carousel.
**When to use:** When the message needs more than one tile but isn't a Reel.

## 5. ig-single-post.html — Single-Tile Post

**What:** Stand-alone post template for a quote, statement, or one-frame message.
**When to use:** Punchy single-image posts where one bold idea carries the whole tile.

## 6. ig-reel-cover.html — Reel Cover (with safe-zone)

**What:** The branded cover frame that shows in the grid for Reels. Includes the 250px top + 430px bottom safe-zone validation per `brand-manifest.json`.
**When to use:** Designing a Reel cover. The cover must clear IG chrome on top + bottom or text gets clipped on profile view.

## 7. ig-reel-endcard.html — Reel Endcard

**What:** The closing frame on a Reel with CTA + handle.
**When to use:** Final 1-2 seconds of every Reel — viewer should know what to do next (DM "AUDIT", swipe up, follow).

## 8. ig-highlight-covers.html — Highlight Covers

**What:** Branded set of IG highlight cover circles (about / case studies / work with me / etc.).
**When to use:** Refreshing the profile highlights row. Set is the canonical brand reference; don't mix with off-brand covers.

---

## How to use this folder

1. Open any `preview/ig-*.html` in a browser to see the rendered template.
2. The brand tokens (colors, fonts, motion) live in `brand-manifest.json` — read it before touching any rendered asset.
3. The Reel overlay components in `reels/components/` are the production parts the Remotion render pipeline uses.
4. The fonts in `fonts/` are licensed (Roc Grotesk Wide + Gilroy via Fontspring) — they ship with this folder.
5. For agents: read `CLAUDE.md` in this folder before generating any IG asset. It's the editing contract.
