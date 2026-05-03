/**
 * NumberedList.tsx — items stack in a side gutter, NOT bottom-anchored.
 *
 * Calibrated for the close-up talking-head framing: list lives in
 * leftGutter or rightGutter (~460px wide, top 720 → bottom 460),
 * with a horizontal-fade scrim that ONLY dims the gutter strip.
 * The face stays untouched.
 *
 * Each item enters with a soft_in, staggered by `staggerFrames`.
 * Numerals rotate through the accent palette by default for rhythm,
 * OR all share the shot accent when `singleAccent` is true.
 *
 * Usage:
 *   <Sequence from={60} durationInFrames={300}>
 *     <NumberedList
 *       eyebrow="·  THE STACK"
 *       title="5 plays."
 *       items={[
 *         'Lead-response · 60s',
 *         'Quote-builder · half a day',
 *         'Review-engine · auto',
 *         'Invoice + chase · zero touch',
 *         'Pipeline dashboard · live',
 *       ]}
 *       staggerFrames={20}
 *       side="right"
 *       accent={ACCENT.purple}
 *     />
 *   </Sequence>
 */

import React from 'react';
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';
import { COLOR, FONT, TYPE, ACCENT, AccentColor, ZONES } from '../tokens';

export interface NumberedListProps {
  items: string[];
  staggerFrames?: number;
  accent?: AccentColor;
  singleAccent?: boolean;
  eyebrow?: string;
  title?: string;
  side?: 'left' | 'right';
}

const ROTATE = [ACCENT.cyan, ACCENT.yellow, ACCENT.lime, ACCENT.orange, ACCENT.purple, ACCENT.pink];

export const NumberedList: React.FC<NumberedListProps> = ({
  items, staggerFrames = 18, accent = ACCENT.purple, singleAccent = false,
  eyebrow, title, side = 'right',
}) => {
  const frame = useCurrentFrame();

  const zone = side === 'left' ? ZONES.leftGutter : ZONES.rightGutter;
  const isLeft = side === 'left';

  const scrimGradient = isLeft
    ? 'linear-gradient(90deg, rgba(10,17,23,.92) 0%, rgba(10,17,23,.78) 60%, rgba(10,17,23,0) 100%)'
    : 'linear-gradient(270deg, rgba(10,17,23,.92) 0%, rgba(10,17,23,.78) 60%, rgba(10,17,23,0) 100%)';

  return (
    <AbsoluteFill>
      {/* Localized horizontal scrim — only dims the gutter strip. */}
      <div style={{
        position: 'absolute',
        top: zone.top,
        bottom: zone.bottom,
        ...(isLeft ? { left: 0 } : { right: 0 }),
        width: zone.width + 80,        // soft tail that fades into the face area
        background: scrimGradient,
      }} />

      {/* Accent rail at the inside edge of the gutter */}
      <div style={{
        position: 'absolute',
        top: zone.top,
        bottom: zone.bottom,
        ...(isLeft ? { left: zone.width } : { right: zone.width }),
        width: 2,
        background: `linear-gradient(180deg, ${accent} 0%, transparent 100%)`,
        opacity: 0.55,
      }} />

      <div style={{
        position: 'absolute',
        top: zone.top + 24,
        bottom: zone.bottom + 24,
        ...(isLeft ? { left: 60 } : { right: 60 }),
        width: zone.width - 100,
        display: 'flex', flexDirection: 'column',
      }}>
        {eyebrow && (
          <div style={{
            ...TYPE.mono_eyebrow, fontFamily: FONT.mono,
            color: accent, fontSize: 28, marginBottom: 22,
          }}>{eyebrow}</div>
        )}
        {title && (
          <div style={{
            fontFamily: FONT.display,
            fontWeight: 800,
            fontSize: 88,
            lineHeight: 0.95,
            letterSpacing: '-0.012em',
            color: COLOR.paper,
            marginBottom: 36,
          }}>{title}</div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {items.map((item, i) => {
            const enterFrame = i * staggerFrames;
            const t = interpolate(frame, [enterFrame, enterFrame + 14], [0, 1], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
              easing: Easing.bezier(0.22, 1, 0.36, 1),
            });
            const tx = interpolate(t, [0, 1], [isLeft ? -16 : 16, 0]);
            const num = String(i + 1).padStart(2, '0');
            const numColor = singleAccent ? accent : ROTATE[i % ROTATE.length];
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'baseline', gap: 22,
                paddingBottom: 16,
                borderBottom: '1px dashed rgba(252,252,252,.14)',
                opacity: t,
                transform: `translateX(${tx}px)`,
              }}>
                <div style={{
                  ...TYPE.mono_eyebrow, fontFamily: FONT.mono,
                  fontSize: 28, color: numColor, minWidth: 56,
                }}>{num}</div>
                <div style={{
                  fontFamily: FONT.body,
                  fontSize: 32,
                  fontWeight: 600,
                  lineHeight: 1.25,
                  color: COLOR.paper,
                }}>{item}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
