/**
 * QuotePull.tsx — repeats a spoken line as on-screen text.
 *
 * Anchored to leftRail or rightRail (off-center). One phrase
 * inside the body may be highlighted with the shot accent.
 *
 * Usage:
 *   <Sequence from={120} durationInFrames={150}>
 *     <QuotePull
 *       body={`You don't need 10 people. You need {one good system}.`}
 *       byline="— SAMEER"
 *       accent={ACCENT.purple}
 *       side="right"
 *     />
 *   </Sequence>
 *
 * Wrap the highlighted phrase in {curly braces} inside body — the
 * component splits on those and applies the accent.
 */

import React from 'react';
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';
import { COLOR, FONT, TYPE, ACCENT, AccentColor, ZONES } from '../tokens';

export interface QuotePullProps {
  body: string;
  byline?: string;
  accent?: AccentColor;
  side?: 'left' | 'right';
}

export const QuotePull: React.FC<QuotePullProps> = ({
  body, byline, accent = ACCENT.purple, side = 'right',
}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, 14], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const ty = interpolate(t, [0, 1], [14, 0]);
  const scale = interpolate(t, [0, 1], [0.96, 1]);

  // Split body into segments — odd indices are highlighted.
  const segments = body.split(/\{|\}/);

  const zone = side === 'left' ? ZONES.leftRail : ZONES.rightRail;

  return (
    <AbsoluteFill>
      <div style={{
        position: 'absolute',
        top: zone.top,
        ...(side === 'left' ? { left: zone.left } : { right: zone.right }),
        width: zone.width,
        opacity: t,
        transform: `translateY(${ty}px) scale(${scale})`,
        transformOrigin: side === 'left' ? 'top left' : 'top right',
      }}>
        {/* Accent rule above the quote */}
        <div style={{
          height: 4, width: 80, background: accent,
          borderRadius: 2, marginBottom: 32,
        }} />

        <div style={{
          fontFamily: FONT.display,
          fontSize: 80,
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: '-0.012em',
          color: COLOR.paper,
        }}>
          {segments.map((seg, i) => (
            <span
              key={i}
              style={i % 2 === 1 ? { color: accent } : undefined}
            >
              {seg}
            </span>
          ))}
        </div>

        {byline && (
          <div style={{
            marginTop: 36,
            fontFamily: FONT.mono,
            fontSize: 24,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: COLOR.muted,
          }}>
            {byline}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
