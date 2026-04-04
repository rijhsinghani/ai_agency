---
phase: quick-3
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - content/videos/diagrams/video-1-automation-flow.svg
  - content/videos/Video-1-outline.md
  - content/videos/Video-1-workflow-diagrams.md
autonomous: true
requirements: []

must_haves:
  truths:
    - "video-1-automation-flow.svg opens in a browser and renders a 1600x500 dark widescreen with 5 horizontal step nodes"
    - "Each node has its correct color (red/purple/purple/cyan/green) stroke, dark background, emoji, step number badge, and step label text"
    - "Arrow connectors flow left-to-right between all 5 nodes with purple gradient"
    - "Title, subtitle, timing annotations, and result callout box are all present and readable"
    - "Video-1-outline.md Production Prep checklist references the .svg file (not .excalidraw)"
    - "Video-1-workflow-diagrams.md Usage Notes reference the .svg file (not .excalidraw)"
  artifacts:
    - path: "content/videos/diagrams/video-1-automation-flow.svg"
      provides: "1600x500 branded screen-share diagram — replaces Excalidraw"
      contains: "5 step nodes, dot grid, gradient defs, title, annotations, result callout"
  key_links:
    - from: "content/videos/Video-1-outline.md"
      to: "content/videos/diagrams/video-1-automation-flow.svg"
      via: "Production Prep checklist line item"
    - from: "content/videos/Video-1-workflow-diagrams.md"
      to: "content/videos/diagrams/video-1-automation-flow.svg"
      via: "Usage Notes reference"
---

<objective>
Replace the flat Excalidraw diagram with a production-quality branded SVG for screen-share during YouTube Video 1 recording. The SVG uses the full System Architecture Design Language from brand/brand-voice.md Section 9.

Purpose: Excalidraw is a flat sketch tool. The screen-share visual needs to match the System Architecture visual language (dot grid, arch-nodes, mesh gradients, glow effects) used in all other brand assets. This SVG will be visible on screen for several minutes during recording.

Output: `content/videos/diagrams/video-1-automation-flow.svg` — 1600x500 widescreen branded diagram. Two markdown reference files updated to point to .svg instead of .excalidraw.
</objective>

<execution_context>
@./.claude/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@brand/brand-voice.md
@brand/logo-icon-dark.svg
@brand/youtube/banner-v1-system-architecture.svg
@content/videos/diagrams/video-1-automation-flow.excalidraw
@content/videos/Video-1-outline.md
@content/videos/Video-1-workflow-diagrams.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create branded SVG diagram</name>
  <files>content/videos/diagrams/video-1-automation-flow.svg</files>
  <action>
Create a new SVG file at `content/videos/diagrams/video-1-automation-flow.svg`. The Excalidraw file being replaced has exact content specs to match — read it to confirm step labels and colors before writing.

**Canvas:** `viewBox="0 0 1600 500"` width="1600" height="500"

**`<defs>` block — define all filters and gradients first:**

1. `grain` filter — `feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch"` + `feColorMatrix type="saturate" values="0"` (copy pattern from banner-v1-system-architecture.svg)

2. `dotGrid` pattern — `width="40" height="40" patternUnits="userSpaceOnUse"` with `<circle cx="20" cy="20" r="3" fill="#A8A29E" opacity="0.05"/>` (heavier dots than banner — these are decorative foreground elements on a 1600px canvas)

3. Mesh gradient radials:
   - `meshPurple` — radialGradient cx="25%" cy="50%" r="40%" — purple #7B2FBE stop-opacity 0.08 → 0
   - `meshCyan` — radialGradient cx="75%" cy="50%" r="40%" — cyan #4DD9E8 stop-opacity 0.08 → 0

4. Node glow filters (one per step color):
   - `glowRed` — feGaussianBlur stdDeviation="12" result="blur" + feMerge (blur node + SourceGraphic)
   - `glowPurple` — same, stdDeviation="12"
   - `glowCyan` — same, stdDeviation="12"
   - `glowGreen` — same, stdDeviation="12"

5. `arrowGrad` — linearGradient x1="0%" x2="100%" — #7B2FBE at 0% → #9B4FDE at 50% → #4DD9E8 at 100%

6. `accentBar` — linearGradient x1="0%" x2="100%" — #7B2FBE at 0% → #4DD9E8 at 100%

7. `resultGlow` — feGaussianBlur stdDeviation="20" + feMerge for the callout box warm-orange glow

**Background layers (in order):**

- `<rect width="1600" height="500" fill="#1A1A1A"/>` — base
- `<rect width="1600" height="500" filter="url(#grain)" opacity="0.04"/>` — grain
- `<rect width="1600" height="500" fill="url(#dotGrid)"/>` — dot grid
- `<rect width="1600" height="500" fill="url(#meshPurple)"/>` — purple mesh
- `<rect width="1600" height="500" fill="url(#meshCyan)"/>` — cyan mesh

**Header section (y: 30–95):**

- Title text: "Missed Call Text-Back: How It Works" — x="800" y="52" text-anchor="middle" font-family="'Roc Grotesk', 'Outfit', sans-serif" font-size="32" font-weight="700" fill="#F5F5F5"
- Accent bar under title: `<rect x="600" y="62" width="400" height="4" fill="url(#accentBar)" rx="2"/>`
- Subtitle: "Sameer Automations" — x="800" y="90" text-anchor="middle" font-family="'Gilroy', 'DM Sans', sans-serif" font-size="16" fill="#4DD9E8" letter-spacing="1"

**5 step nodes — horizontal layout:**

Node positions (center x of each): 160, 420, 680, 940, 1200. All at y=270 (center). Node size: 200px wide × 140px tall. rx="12" for rounded corners. Place each node group at cx-100, cy-70.

Node specs:

- Step 1 (Missed Call): stroke="#EF4444" fill="#2D1A1A" — glow filter glowRed applied to a rect behind node (same size, opacity 0.5, no fill, just the glow rect)
- Step 2 (Auto-Text): stroke="#7B2FBE" fill="#1A1A2D" — glow filter glowPurple
- Step 3 (Prospect Replies): stroke="#7B2FBE" fill="#1A1A2D" — glow filter glowPurple
- Step 4 (Notification): stroke="#4DD9E8" fill="#1A2D2D" — glow filter glowCyan
- Step 5 (Follow-Up + Booked): stroke="#10B981" fill="#1A2D1A" — glow filter glowGreen

For each node:

1. Glow rect (behind node): same position/size, fill="[stroke color]" opacity="0.15" filter="url(#glowXxx)" — render BEFORE the node rect
2. Node rect: rx="12" stroke-width="2"
3. Step badge (circle): cx at node center-x, cy at node top y+16 (sits on top edge), r="14", fill="[stroke color]"
4. Step number in badge: font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle"
5. Emoji box: small rect 36x36 rx="6" centered inside node horizontally, y at node-y+28, fill="rgba(255,255,255,0.06)" — put emoji text inside, font-size="20" text-anchor="middle"
6. Step label (bold): font-size="14" font-weight="700" fill="#F5F5F5" text-anchor="middle", y at node-y+82
7. Step sublabel: font-size="12" fill="#A8A29E" text-anchor="middle", y at node-y+100

Step content (from Excalidraw source of truth):

- Step 1: badge "1", emoji "📱", label "Missed Call", sublabel "You're on a job"
- Step 2: badge "2", emoji "💬", label "Auto-Text Fires", sublabel "30 seconds"
- Step 3: badge "3", emoji "📋", label "Prospect Replies", sublabel "Lead shares details"
- Step 4: badge "4", emoji "🔔", label "Notification", sublabel "You get notified"
- Step 5: badge "5", emoji "✅", label "Follow-Up + Booked", sublabel "BOOKED"

**Arrow connectors between nodes:**

4 arrows: between nodes 1→2, 2→3, 3→4, 4→5. Each arrow:

- x1 = right edge of left node (cx + 100), y1 = 270 (center)
- x2 = left edge of right node (cx - 100), y2 = 270
- Gap between nodes: 420-160=260px, so right-edge to left-edge = 60px gap
- Line: stroke="url(#arrowGrad)" stroke-width="2.5" marker-end="url(#arrowHead)"
- Define `arrowHead` marker in defs: path d="M 0 0 L 8 4 L 0 8 Z" fill="#9B4FDE" markerWidth="8" markerHeight="8" refX="8" refY="4"

**Timing annotations (below arrows, between nodes 1-2 and 2-3):**

- "30 seconds" — x=290 (midpoint of arrow 1→2), y=360, fill="#4DD9E8" font-size="13" text-anchor="middle" font-weight="600"
- "vs. 2-6 hours" — x=290, y=378, fill="#EF4444" fill-opacity="0.8" font-size="12" text-anchor="middle"

**Result callout box (right side, y=150–220):**

- Position: x=1340 y=150 width=220 height=80 rx="10"
- Background glow rect (behind): same position, fill="#D97706" opacity="0.15" filter="url(#resultGlow)"
- Box rect: fill="#1A1200" stroke="#D97706" stroke-width="1.5" rx="10"
- Line 1: "$4,200 recovered" x=1450 y=185 text-anchor="middle" font-size="16" font-weight="700" fill="#D97706"
- Line 2: "in month 1" x=1450 y=205 text-anchor="middle" font-size="13" fill="#A8A29E"

**Arch-node decorations (5–6 small glowing circles scattered in background):**

- These are accent dots per brand System Architecture Design Language
- Place them in negative space away from nodes — e.g. corners and top/bottom edges
- Sizes 8–16px, colors alternating purple #7B2FBE and cyan #4DD9E8, opacity 0.35–0.5
- Each has a matching radialGradient halo (30–40px radius) behind it at 0.2 opacity
- Suggested positions: (80,80), (1520,80), (80,420), (1520,420), (800,460), (1380,460)

**Important: all SVG must be well-formed XML. No unclosed tags. Test by opening in browser.**
</action>
<verify>
<automated>node -e "const fs = require('fs'); const s = fs.readFileSync('/Users/sameerrijhsinghani/automation_consulting/content/videos/diagrams/video-1-automation-flow.svg','utf8'); const checks = ['viewBox=\"0 0 1600 500\"', 'Missed Call Text-Back', 'Sameer Automations', 'glowRed', 'glowGreen', 'arrowGrad', 'dotGrid', '30 seconds', 'vs. 2-6 hours', '\\$4,200 recovered', 'Auto-Text Fires', 'Prospect Replies', 'Notification', 'Follow-Up'].every(c => s.includes(c)); console.log(checks ? 'PASS' : 'FAIL - missing elements')"</automated>
</verify>
<done>SVG file exists at content/videos/diagrams/video-1-automation-flow.svg, passes all element checks, opens in browser with correct layout: dark background, 5 colored nodes with glow, horizontal arrows, title/subtitle, timing annotations, result callout, arch-nodes, dot grid.</done>
</task>

<task type="auto">
  <name>Task 2: Update markdown references from .excalidraw to .svg</name>
  <files>content/videos/Video-1-outline.md, content/videos/Video-1-workflow-diagrams.md</files>
  <action>
Two files reference the old Excalidraw file. Update both to reference the SVG instead.

**Video-1-outline.md** — Production Prep Progress section (near the bottom). Find this line:

```
- [ ] content/videos/diagrams/video-1-automation-flow.excalidraw — loaded in Excalidraw for screen-share
```

Replace with:

```
- [ ] content/videos/diagrams/video-1-automation-flow.svg — open in browser for screen-share (full-screen the browser tab)
```

**Video-1-workflow-diagrams.md** — Usage Notes section at the bottom. Find this line:

```
- Branded Excalidraw version available: content/videos/diagrams/video-1-automation-flow.excalidraw — use this for screen-share during recording, keep ASCII versions here as text reference
```

Replace with:

```
- Branded SVG version available: content/videos/diagrams/video-1-automation-flow.svg — open in browser and full-screen for screen-share during recording, keep ASCII versions here as text reference
```

Do not change any other content in either file.
</action>
<verify>
<automated>node -e "const fs = require('fs'); const o = fs.readFileSync('/Users/sameerrijhsinghani/automation_consulting/content/videos/Video-1-outline.md','utf8'); const w = fs.readFileSync('/Users/sameerrijhsinghani/automation_consulting/content/videos/Video-1-workflow-diagrams.md','utf8'); const ok = o.includes('video-1-automation-flow.svg') && !o.includes('video-1-automation-flow.excalidraw') && w.includes('video-1-automation-flow.svg') && !w.includes('video-1-automation-flow.excalidraw'); console.log(ok ? 'PASS' : 'FAIL')"</automated>
</verify>
<done>Both markdown files reference video-1-automation-flow.svg with no remaining .excalidraw references. All other content in both files is unchanged.</done>
</task>

</tasks>

<verification>
After both tasks complete:
1. `content/videos/diagrams/video-1-automation-flow.svg` exists and is valid SVG XML
2. Open `open content/videos/diagrams/video-1-automation-flow.svg` — renders at 1600x500, dark background, 5 nodes visible with color-coded strokes and glow effects, arrows flow left to right, title readable, result callout visible in warm orange
3. Neither Video-1-outline.md nor Video-1-workflow-diagrams.md contain any reference to .excalidraw
</verification>

<success_criteria>

- SVG opens in browser and visually matches System Architecture Design Language: dark background with dot grid, arch-node decorations, mesh gradients, glowing nodes, gradient arrows
- All 5 step nodes present with correct colors: red (step 1), purple (steps 2-3), cyan (step 4), green (step 5)
- Timing annotations visible: "30 seconds" in cyan, "vs. 2-6 hours" in muted red
- Result callout box visible: "$4,200 recovered in month 1" in warm orange (#D97706)
- Both markdown reference files updated to .svg
- Ready to open in browser and full-screen as screen-share visual during recording
  </success_criteria>

<output>
No SUMMARY.md required for quick tasks. Commit files directly.
</output>
