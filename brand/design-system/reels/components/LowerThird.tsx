/**
 * LowerThird.tsx — name / topic strip anchored to the bottom band.
 *
 * Calibrated for Sameer's standard close-up framing: face fills the
 * top ~60% of the 1080×1920 frame, so this overlay sits in the
 * bottom 240px lowerStrip BELOW the chest line. The dark scrim is
 * localized to the strip itself with a soft fade — the face is
 * never dimmed.
 *
 * Usage:
 *   <Sequence from={30} durationInFrames={120}>
 *     <LowerThird
 *       eyebrow="@SameerAutomates"
 *       title="SAMEER RIJHSINGHANI"
 *       accent={ACCENT.purple}
 *     />
 *   </Sequence>
 */

import React from 'react';
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';
import { COLOR, FONT, TYPE, MOTION, ZONES, AccentColor, ACCENT } from '../tokens';

export interface LowerThirdProps {
  /** Top line — handle, role, or topic. JetBrains Mono, accent color. */
  eyebrow: string;
  /** Bottom line — name or headline. Roc Grotesk Wide, white. */
  title: string;
  /** Optional second line under title. Use sparingly — keeps strip slim. */
  subtitle?: string;
  accent?: AccentColor;
}

export const LowerThird: React.FC<LowerThirdProps> = ({
  eyebrow, title, subtitle, accent = ACCENT.purple,
}) => {
  const frame = useCurrentFrame();

  const t = interpolate(frame, [0, MOTION.soft_in.durationFrames], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const opacity = t;
  const ty = interpolate(t, [0, 1], [10, 0]);
  const railWidth = interpolate(t, [0, 1], [0, 320]);

  // Strip geometry — sits in lowerStrip (bottom 460 → 700px from frame top).
  const stripBottom = ZONES.lowerStrip.bottom;          // 460
  const stripHeight = ZONES.lowerStrip.height;          // 240
  const stripPadX   = 36;
  const stripPadY   = 24;
  const stripWidth  = 720; // pixel width of the dark plate — leaves the right side clear

  return (
    <AbsoluteFill>
      {/* Localized scrim — vertical fade so the strip dissolves UP into the face area without dimming it.
          Anchored bottom-left, hard left edge bleeding off-frame for a poster-style cut. */}
      <div style={{
        position: 'absolute',
        left: 0, bottom: stripBottom - 8,
        width: stripWidth + stripPadX,
        height: stripHeight + 24,
        background:
          'linear-gradient(180deg, rgba(10,17,23,0) 0%, rgba(10,17,23,.55) 22%, rgba(10,17,23,.85) 60%, rgba(10,17,23,.92) 100%)',
        opacity,
      }} />

      {/* Accent rail — sits at the TOP edge of the strip, as in the user's reference. */}
      <div style={{
        position: 'absolute',
        left: 0,
        bottom: stripBottom + stripHeight - 8,
        height: 4,
        width: railWidth,
        background: accent,
        boxShadow: `0 0 16px ${accent}88`,
        borderRadius: 2,
        opacity,
      }} />

      {/* Text block */}
      <div style={{
        position: 'absolute',
        left: stripPadX,
        bottom: stripBottom + stripPadY,
        width: stripWidth - stripPadX * 2,
        opacity,
        transform: `translateY(${ty}px)`,
        transformOrigin: 'bottom left',
      }}>
        <div style={{
          ...TYPE.display_m,
          fontFamily: FONT.display,
          fontWeight: 900,
          fontSize: 76,           // slimmer than full display_m so it fits one line
          lineHeight: 0.95,
          letterSpacing: '-0.012em',
          color: COLOR.paper,
          textTransform: 'uppercase',
          marginBottom: 14,
        }}>
          {title}
        </div>

        <div style={{
          ...TYPE.mono_eyebrow,
          fontFamily: FONT.mono,
          color: accent,
          fontSize: 28,
        }}>
          {eyebrow}
        </div>

        {subtitle && (
          <div style={{
            fontFamily: FONT.body,
            fontWeight: 500,
            fontSize: 32,
            lineHeight: 1.3,
            color: COLOR.muted,
            marginTop: 12,
          }}>
            {subtitle}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
