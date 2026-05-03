/**
 * tokens.ts — typed exports of brand-manifest.json
 *
 * Use these named exports in every Remotion component.
 * Never write raw hex values, font names, or duration numbers
 * outside this file. If you need a new token, add it here AND
 * to brand-manifest.json — keep them in sync.
 */

export const FPS = 30;

export const FORMAT = {
  reel:     { width: 1080, height: 1920 },
  carousel: { width: 1080, height: 1350 },
  story:    { width: 1080, height: 1920 },
} as const;

export const SAFE_ZONE_REEL = {
  topPx:    250,
  bottomPx: 430,
  leftPx:    60,
  rightPx:   60,
} as const;

export const COLOR = {
  ink:        '#0A1117',
  paper:      '#FCFCFC',
  muted:      '#A8A29E',
  dim:        '#6B7280',
  purple:     '#A055FF',
  softPurple: '#C084FC',
  cyan:       '#31D8FE',
  yellow:     '#FFCF01',
  orange:     '#FF8135',
  lime:       '#B5ED30',
  pink:       '#FA61AA',
} as const;

/** The accent slot — pick exactly one per shot. */
export const ACCENT = {
  purple: COLOR.purple,
  cyan:   COLOR.cyan,
  yellow: COLOR.yellow,
  lime:   COLOR.lime,
  pink:   COLOR.pink,
  orange: COLOR.orange,
} as const;

export type AccentColor = typeof ACCENT[keyof typeof ACCENT];

export const SCRIM = {
  bottomDark: 'linear-gradient(180deg, transparent 0%, rgba(10,17,23,.85) 100%)',
  topDark:    'linear-gradient(180deg, rgba(10,17,23,.85) 0%, transparent 100%)',
  spotlight:  'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(160,85,255,.18) 0%, transparent 65%)',
} as const;

export const FONT = {
  display: '"Roc Grotesk Wide", sans-serif',
  body:    '"Gilroy", sans-serif',
  mono:    '"JetBrains Mono", ui-monospace, Menlo, monospace',
} as const;

/** Type scales — px values native to a 1080×1920 frame. */
export const TYPE = {
  display_xl:   { fontSize: 200, fontWeight: 950, lineHeight: 0.86, letterSpacing: '-0.025em' },
  display_l:    { fontSize: 160, fontWeight: 950, lineHeight: 0.88, letterSpacing: '-0.025em' },
  display_m:    { fontSize: 108, fontWeight: 800, lineHeight: 1.0,  letterSpacing: '-0.012em' },
  display_s:    { fontSize:  72, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.012em' },
  body_l:       { fontSize:  46, fontWeight: 600, lineHeight: 1.32 },
  body_m:       { fontSize:  38, fontWeight: 500, lineHeight: 1.32 },
  mono_eyebrow: { fontSize:  32, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase' as const },
} as const;

/** Motion presets — frame counts assume 30fps. */
export const MOTION = {
  snap_in: {
    durationFrames: 8,
    easing: 'linear' as const,
  },
  soft_in: {
    durationFrames: 14,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)' as const,
  },
  rail_wipe: {
    durationFrames: 10,
    easing: 'cubic-bezier(0.7, 0, 0.3, 1)' as const,
  },
  out: {
    durationFrames: 8,
    easing: 'cubic-bezier(0.4, 0, 1, 1)' as const,
  },
  defaultDurationFrames: 120, // 4s at 30fps
} as const;

/**
 * ZONES — calibrated to Sameer's standard close-up framing.
 * Face fills approximately top 60% of the 1080×1920 frame.
 * Overlays MUST avoid the face. Use these zones only.
 */
export const ZONES = {
  /** Bottom narrow band below the chest line — name strip, captions, single-line stat. */
  lowerStrip:      { bottom: 460, left: 60, right: 60, height: 240 },
  /** Vertical gradient gutter on the left edge — list, diagram, quote. */
  leftGutter:      { top: 720, left: 0,  width: 460, bottom: 460 },
  /** Mirror gutter on the right edge. */
  rightGutter:     { top: 720, right: 0, width: 460, bottom: 460 },
  /** Top chapter pill — sits in the IG top-chrome safe-zone, above the face. */
  topChapterStrip: { top: 270, left: 60, right: 60, height: 120 },

  /** Reference: the area where the face lives. NEVER place overlays here. */
  faceBox:         { top: 250, bottom: 1280 },
} as const;

/**
 * Caption baseline — a horizontal centered strip raised above the chest line.
 * Used by CaptionStrip; sits inside lowerStrip's vertical band but centered horizontally.
 */
export const CAPTION_BASELINE_Y = 1500; // px from frame top

