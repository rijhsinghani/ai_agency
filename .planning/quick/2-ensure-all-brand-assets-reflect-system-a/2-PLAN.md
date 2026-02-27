---
phase: quick
plan: 2
subsystem: brand
tags: [brand, system-architecture, design-consistency, svg, html]
dependency_graph:
  requires: [brand/youtube/banner.svg, brand/brand-voice.md]
  provides:
    - brand/youtube/profile-pic.svg
    - brand/youtube/thumbnail-template.svg
    - brand/email-signature.html
  affects: [brand consistency, YouTube uploads]
tech_stack:
  added: []
  patterns: [SVG system architecture design language, brand cohesion]
key_files:
  created: []
  modified:
    - brand/youtube/profile-pic.svg
    - brand/youtube/thumbnail-template.svg
    - brand/email-signature.html
---

# Quick Task 2: Propagate system architecture design across all brand assets

## Goal

Ensure all brand assets reflect the "system architecture" design language established in the YouTube banner — grid dots, connection nodes, grain texture, Outfit/DM Sans typography, ambient glows.

## Design Language Reference (from banner.svg)

- Background: #0E0E0E
- Grain: feTurbulence (baseFrequency 0.65, numOctaves 4), opacity 0.035
- Grid dots: 48px pattern, r=0.6 circles, #A8A29E at 0.05 opacity
- Connection nodes: colored circles (#4DD9E8 cyan, #7B2FBE purple, #FF8A4C orange, #D4A574 warm, #9B4FDE light purple)
- Dashed connection paths: stroke-dasharray="4 6", width 0.8
- Ambient glows: radial gradients of brand purple
- Fonts: Outfit 700 (display), DM Sans 400 (body)
- S watermark at very low opacity

## Tasks

### Task 1: Update YouTube profile pic with system architecture elements

**Files:** `brand/youtube/profile-pic.svg`

**Changes:**

- Update background from #252525/#1A1A1A gradient to #0E0E0E
- Add grain filter (same as banner, slightly higher opacity ~0.06 for small-size visibility)
- Add gridDots pattern within circular clip
- Add 3 connection nodes in triangle formation around S logo (cyan, orange, light purple)
- Add dashed connection paths behind the S logo
- Keep purple border ring
- Replace "SR" Arial text with "SR" in Outfit 700 as subtle watermark
- All elements clipped to circle

**Verify:** Profile pic has grain, grid dots, and connection nodes. S logo remains prominent and centered.

### Task 2: Overhaul YouTube thumbnail template with system architecture design

**Files:** `brand/youtube/thumbnail-template.svg`

**Changes:**

- Replace linear grid pattern with gridDots pattern (48px spacing)
- Add grain filter overlay at 0.04 opacity
- Add ambient purple glow (radial gradient) behind text area
- Update all fonts from Arial to Outfit (headlines) and DM Sans (body/subtitle)
- Add connection node accents: nodes near the "CASE STUDY" tag and title area
- Replace solid highlight bar with dashed accent line ending in a node
- Add subtle connection paths in the background
- Keep headshot placeholder area and fade overlay

**Verify:** Thumbnail template matches banner's system architecture feel. Fonts are Outfit/DM Sans.

### Task 3: Update email signature with system architecture accents

**Files:** `brand/email-signature.html`

**Changes:**

- Update font-family declarations to prefer Outfit (name/title) and DM Sans (body/tagline)
- Add Google Fonts links for Outfit and DM Sans
- Replace solid purple divider with dashed purple line + cyan indicator dot
- Add colored indicator dots next to social links (purple for LinkedIn, orange for YouTube)
- Keep layout simple and email-client compatible (no SVG filters)

**Verify:** Email signature renders correctly with updated fonts and accent dots. No broken rendering in major email clients.
