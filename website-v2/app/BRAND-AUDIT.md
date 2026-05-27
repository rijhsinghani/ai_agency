# Brand Audit — Landing Page Components

Audited: 2026-04-13
Components: Hero, ProblemStrip, ServicesGrid, HowItWorks, TransformationStories
Additional input: Gemini CLI visual polish review

---

## Issues by Component

### Hero.tsx

| #   | Issue                                                                                                                                                           | Priority | Line(s)                      |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------------------- |
| 1   | Uses `gray-400`, `gray-500`, `gray-800` while all other sections use `zinc-*`                                                                                   | P1       | 219, 262, 263, 279, 253, 311 |
| 2   | Cycling headlines use Title Case ("Grow Your Business") — should be sentence case                                                                               | P1       | 128-133                      |
| 3   | Floating cards show template filler ("AI Processing / Real-time Analysis", "Growth Metrics / +247% This Month") that don't match real stats and read as generic | P1       | 296-333                      |
| 4   | Off-brand color `#3BCEAC` in network visualization and floating card gradient                                                                                   | P2       | 42, 323                      |

### ProblemStrip.tsx

| #   | Issue                                                                       | Priority | Line(s) |
| --- | --------------------------------------------------------------------------- | -------- | ------- |
| 5   | `bg-black` instead of `bg-[#0E0E0E]` — visible seam against Hero/HowItWorks | P1       | 30      |
| 6   | `py-16` instead of `py-24` — inconsistent vertical rhythm                   | P1       | 31      |
| 7   | `px-4` instead of `px-6` — horizontal content jump between sections         | P2       | 31      |

### ServicesGrid.tsx

| #   | Issue                                                                                       | Priority | Line(s) |
| --- | ------------------------------------------------------------------------------------------- | -------- | ------- |
| 8   | `bg-black` instead of `bg-[#0E0E0E]`                                                        | P1       | 42      |
| 9   | `py-16` instead of `py-24`                                                                  | P1       | 43      |
| 10  | `px-4` instead of `px-6`                                                                    | P2       | 43      |
| 11  | Off-brand colors `#D97706` (orange) and `#10B981` (green) — only purple/cyan family allowed | P1       | 13, 29  |

### HowItWorks.tsx

| #   | Issue                                                                     | Priority | Line(s) |
| --- | ------------------------------------------------------------------------- | -------- | ------- |
| 12  | `max-w-5xl` instead of `max-w-6xl` — content width jumps between sections | P1       | 44      |

### TransformationStories.tsx

| #   | Issue                                | Priority | Line(s) |
| --- | ------------------------------------ | -------- | ------- |
| 13  | `bg-black` instead of `bg-[#0E0E0E]` | P1       | 46      |

---

## Cross-Component Consistency Issues

| Issue                                                              | Components Affected                               | Priority |
| ------------------------------------------------------------------ | ------------------------------------------------- | -------- |
| Background color inconsistency (`bg-black` vs `bg-[#0E0E0E]`)      | ProblemStrip, ServicesGrid, TransformationStories | P1       |
| Vertical padding inconsistency (`py-16` vs `py-24`)                | ProblemStrip, ServicesGrid                        | P1       |
| Horizontal padding inconsistency (`px-4` vs `px-6`)                | ProblemStrip, ServicesGrid                        | P2       |
| Container width inconsistency (`max-w-5xl` vs `max-w-6xl`)         | HowItWorks                                        | P1       |
| Color class family inconsistency (`gray-*` vs `zinc-*`)            | Hero                                              | P1       |
| Section label formatting (uppercase in content vs uppercase class) | All                                               | P2       |

---

## Gemini Review Highlights

1. **Palette dilution** in ServicesGrid — orange and green break the tight purple/cyan brand
2. **Background seams** between `bg-black` and `bg-[#0E0E0E]` sections visible on calibrated monitors
3. **Uneven vertical padding** between `py-16` and `py-24` sections disrupts scroll rhythm
4. **Container width jump** at HowItWorks (`max-w-5xl` vs `max-w-6xl` elsewhere)
5. **Hero subheadline** uses `gray-400` instead of `zinc-400` for consistency
6. **Secondary CTA button** may be hard to see on some displays (low contrast cyan on dark)

---

## Banned Phrase Check

- No banned phrases found in user-facing text across audited components
- "seamless" appears in SocialProof.tsx line 42 as a code comment only (not user-facing)
- "Real-time Analysis" in Hero floating cards is generic jargon — flagged for removal with floating cards

---

## Terminology Check

- "systems" used correctly (not "tools" or "platform")
- "growth partner" used correctly in badge
- No references to Sameer's day job or employer
- Numerals used for all metrics (73%, 40%, 2.5x, $4,200/mo, 60 sec, 5+)

---

## Priority Summary

**P1 fixes (13 total):** bg-black standardization (3), py-16 standardization (2), max-w-5xl fix (1), gray-to-zinc (1), Title Case headlines (1), template floating cards (1), off-brand ServicesGrid colors (1), off-brand Hero network color (moved from P2 to fix alongside)

**P2 items (deferred):** px-4 to px-6 (2), section label class standardization, corner squares on cards, canvas DPI handling
