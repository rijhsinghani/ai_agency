---
name: youtube-thumbnail
description: Use when the user wants to generate 4 YouTube thumbnail variations for a video — uses Gemini 3 Pro Image Preview for generation, composes a 2x2 comparison grid, and presents options for selection. Accepts a video title and optional hook text.
---

Generate YouTube thumbnail variations: $ARGUMENTS

## Overview

This skill generates 4 distinct YouTube thumbnail concepts for a video, uses Gemini 3 Pro Image Preview to render each one, composes a 2x2 comparison grid, and guides the user to select and iterate until a final thumbnail is chosen.

Scripts are shared from the full youtube pipeline skill at `.claude/skills/youtube/scripts/` — no duplication.

---

## Phase 1: Preflight

Before generating anything, verify the environment and gather inputs.

### 1a. Required environment variables

Check that these are set:

| Variable         | Required | Notes                                              |
| ---------------- | -------- | -------------------------------------------------- |
| `GEMINI_API_KEY` | YES      | Used by generate_thumbnail.py for image generation |
| `HEADSHOT_DIR`   | YES      | Path to directory containing headshot images       |

```bash
printenv GEMINI_API_KEY
printenv HEADSHOT_DIR
```

If either is missing, stop and report which ones are missing. Do not proceed.

### 1b. Verify headshot directory

```bash
ls "$HEADSHOT_DIR" | head -5
```

- Verify `HEADSHOT_DIR` resolves to a real directory
- Verify it contains at least one image file (.jpg, .jpeg, .png)
- Note the path of the first available headshot — you will use it in Phase 3

### 1c. Gather inputs

Accept the following inputs (from $ARGUMENTS or from a GCS trigger JSON):

| Input             | Required | Source                                               |
| ----------------- | -------- | ---------------------------------------------------- |
| `video_title`     | YES      | Argument or trigger JSON field `video_title`         |
| `thumbnail_hook`  | NO       | Argument or trigger JSON field — free-form hook text |
| `content_bank_id` | NO       | Trigger JSON field — used for Phase 6 update         |
| `brand`           | NO       | Trigger JSON field — brand identifier                |

**If invoked from a GCS trigger JSON** (file in `thumbnails-pending/` prefix):

```bash
# The trigger JSON contains: video_title, brand, content_bank_id, grid_output_path, headshot_dir
# Parse these fields and use them throughout the skill
```

If `headshot_dir` is provided in the trigger JSON, use it instead of the `HEADSHOT_DIR` env var.

---

## Phase 2: Design 4 Concepts

Before generating images, design the 4 thumbnail concepts. This step is purely analytical — no scripts run here.

### 2a. Desire-loop framework

Work through this framework for the specific video title:

1. **Desire**: What does the viewer secretly want after watching this?
2. **Pain**: What frustration or gap are they experiencing right now?
3. **Transformation**: What does the video deliver (result, insight, shortcut)?
4. **Curiosity loop**: What question does the thumbnail open that the video answers?

Write out your answers to all four before designing.

### 2b. Design 4 distinct concepts

Create concepts labeled A, B, C, D. Each must differ across these dimensions:

| Dimension       | Options to vary                                                        |
| --------------- | ---------------------------------------------------------------------- |
| Visual focus    | End state, process, before/after, pain point, result proof             |
| Text treatment  | Strong hook word, question, number, no text, minimal text              |
| Color direction | Warm (orange/red), cool (blue/teal), high-contrast (black/white), bold |
| Expression      | Confident, shocked/surprised, curious, serious/intense                 |
| Composition     | Centered subject, asymmetrical, A→B split, object-forward              |

### 2c. Present concepts to user

Describe all 4 concepts to the user before generating. Include:

- Hook text for each thumbnail
- Visual direction
- Color palette
- Expression and composition

Get implicit or explicit buy-in that the directions make sense before proceeding to Phase 3.

---

## Phase 3: Generate 4 Thumbnails

### 3a. Prepare output directory

```bash
DATE=$(date +%Y-%m-%d)
VIDEO_SLUG=$(echo "<video_title>" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-' | cut -c1-40)
OUTPUT_DIR="youtube-thumbnails/$DATE/thumbnails/$VIDEO_SLUG"
mkdir -p "$OUTPUT_DIR"
```

### 3b. Pick headshot

Use the first available headshot from `$HEADSHOT_DIR` (or `headshot_dir` from trigger JSON):

```bash
HEADSHOT=$(ls "$HEADSHOT_DIR"/*.{jpg,jpeg,png} 2>/dev/null | head -1)
```

### 3c. Run all 4 in parallel

Generate all 4 thumbnails in parallel using the existing generate_thumbnail.py script:

```bash
python3 .claude/skills/youtube/scripts/generate_thumbnail.py \
  --headshot "$HEADSHOT" \
  --thumbnail-hook "<concept A hook text>" \
  --prompt "<concept A full prompt>" \
  --output "$OUTPUT_DIR/a.png"
```

Repeat for `b.png`, `c.png`, `d.png` with their respective concept prompts. Run all 4 simultaneously — do not wait for each to finish before starting the next.

### 3d. Prompt template for each concept

When constructing `--prompt` for each concept, use this template:

```
Create a YouTube thumbnail for a video titled "<video_title>".

Thumbnail hook text to display: "<thumbnail_hook>"

Concept direction: <describe the specific visual concept>

Viewer psychology:
- Desire: <what the viewer wants>
- Pain: <what frustration they have>
- Transformation promised: <what the video delivers>

Visual requirements:
- Integrate the provided headshot photo naturally into the composition
- 16:9 ratio, 1280x720px
- Text must be large, bold, readable at small sizes
- High contrast between text and background
- Face must be clearly visible and well-lit
- <concept-specific color palette>
- <concept-specific composition>

Style: Professional YouTube thumbnail — bold, high contrast, emotionally compelling.
Do NOT make it look AI-generated. No stock photo aesthetic.
```

### 3e. Brand style guide

Follow these style rules when writing concept prompts:

**Composition rules:**

- Subject occupies 40-60% of frame, positioned on the right third
- Text in left 40% of frame, never overlapping face
- Use rule of thirds, not dead center
- Background supports subject — never competes

**Color palette (brand defaults):**

- Dark moody backgrounds (deep navy, charcoal, near-black)
- Purple/cyan accent palette for text and highlight elements
- Bold white text for primary headline
- Maximum 3 colors per thumbnail

**Typography:**

- Primary text: 80-120px equivalent, sans-serif, bold/black weight
- Maximum 6 words total across entire thumbnail
- No thin or script fonts — unreadable at small sizes
- Emotional words outperform descriptive words

**Model:** `gemini-3-pro-image-preview`

**Cost:** $0 (Gemini free tier — 100 requests/day; 4 thumbnails = 4 requests)

---

## Phase 4: Compose 2x2 Grid

After all 4 thumbnails are generated, compose a comparison grid using the existing combine_thumbnails.py script:

```bash
python3 .claude/skills/youtube/scripts/combine_thumbnails.py \
  --images \
    "$OUTPUT_DIR/a.png" \
    "$OUTPUT_DIR/b.png" \
    "$OUTPUT_DIR/c.png" \
    "$OUTPUT_DIR/d.png" \
  --output "$OUTPUT_DIR/comparison.png" \
  --labels "A" "B" "C" "D"
```

Read the comparison.png with the Read tool and display it to the user.

**Quality checklist before presenting** — verify each thumbnail:

- [ ] Face is clearly visible, not obscured
- [ ] Text is readable at 1/10th size (thumbnail preview size)
- [ ] High contrast between text and background
- [ ] No more than 6 words of text
- [ ] Concept is clearly different from the other 3
- [ ] Desire loop is visible in the visual
- [ ] No AI artifacts (uncanny faces, mangled hands, distorted text)

---

## Phase 5: Select and Iterate

Present the comparison grid and ask:

> "Which direction resonates most — A, B, C, or D? Or describe what you'd change (expression, color, text, composition) and I'll regenerate."

**If the user wants changes:**

- For a full redo: regenerate that letter with a revised prompt
- For a variation: pass `--reference <path-to-chosen.png>` to generate a variation

Continue iterating until the user selects a final thumbnail.

**On final selection**, report:

- Path to the selected thumbnail file
- The video slug used for the output directory

---

## Phase 6: Update Content Bank (if content_bank_id provided)

If `content_bank_id` was provided (from GCS trigger JSON or argument), update the content_bank row in Supabase:

```bash
curl -s -X PATCH "$SUPABASE_URL/rest/v1/content_bank?id=eq.$CONTENT_BANK_ID" \
  -H "apikey: $SUPABASE_SERVICE_KEY" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "visual_assets": {
      "thumbnail_grid_url": "<path to comparison.png>",
      "selected_thumbnail": "<path to selected thumbnail>",
      "thumbnail_dir": "<OUTPUT_DIR>"
    }
  }'
```

Required env vars for this phase:

- `SUPABASE_URL` — e.g., `https://abcdef.supabase.co`
- `SUPABASE_SERVICE_KEY` — service role key

If either is missing, skip the update and report: "Content bank not updated — SUPABASE_URL or SUPABASE_SERVICE_KEY not set."

---

## Troubleshooting

| Symptom                  | Likely cause                          | Fix                                          |
| ------------------------ | ------------------------------------- | -------------------------------------------- |
| No image generated       | GEMINI_API_KEY missing or invalid     | Set env var: `export GEMINI_API_KEY=...`     |
| Script not found         | Wrong working directory               | Run from repo root (where `.claude/` lives)  |
| AI artifacts in faces    | Prompt too complex or conflicting     | Simplify concept, reduce visual elements     |
| Headshot not found       | HEADSHOT_DIR path wrong or empty      | Update env var or add headshot images to dir |
| Combine script fails     | One or more thumbnail files missing   | Check generate step output for errors        |
| Supabase update 401      | SUPABASE_SERVICE_KEY missing/expired  | Check env var is set and key has not expired |
| Free tier quota exceeded | 100+ requests/day to Gemini free tier | Wait 24h or use a paid Gemini API key        |
