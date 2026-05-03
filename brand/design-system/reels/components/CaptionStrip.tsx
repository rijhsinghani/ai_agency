/**
 * CaptionStrip.tsx — auto-captions for spoken audio.
 *
 * One <CaptionStrip> per cue (≤2 lines, ≤22 chars/line).
 * Up to 1 word may be emphasized via emphasisWordIndex.
 * Sits ABOVE the IG bottom safe-zone (480px from bottom).
 *
 * Usage:
 *   <Sequence from={cue.frameIn} durationInFrames={cue.frameLen}>
 *     <CaptionStrip
 *       words={['Lead', 'response', 'in', '60', 'seconds.']}
 *       emphasisWordIndex={3}
 *       accent={ACCENT.cyan}
 *     />
 *   </Sequence>
 */

import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { COLOR, FONT, AccentColor, ACCENT } from '../tokens';

export interface CaptionStripProps {
  words: string[];
  emphasisWordIndex?: number;
  accent?: AccentColor;
}

export const CaptionStrip: React.FC<CaptionStripProps> = ({
  words, emphasisWordIndex, accent = ACCENT.purple,
}) => {
  const frame = useCurrentFrame();

  // snap_in (linear, 8 frames)
  const t = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: 'clamp' });
  const opacity = t;
  const ty = interpolate(t, [0, 1], [10, 0]);

  return (
    <AbsoluteFill>
      <div style={{
        position: 'absolute',
        left: 60, right: 60,
        bottom: 480,
        display: 'flex',
        justifyContent: 'center',
        opacity,
        transform: `translateY(${ty}px)`,
      }}>
        <div style={{
          padding: '18px 32px',
          background: 'rgba(10,17,23,.78)',
          border: '1px solid rgba(252,252,252,.06)',
          borderRadius: 14,
          fontFamily: FONT.body,
          fontSize: 56,
          fontWeight: 700,
          lineHeight: 1.18,
          color: COLOR.paper,
          textAlign: 'center',
          maxWidth: '90%',
        }}>
          {words.map((w, i) => (
            <React.Fragment key={i}>
              <span style={
                i === emphasisWordIndex
                  ? { color: accent, fontWeight: 800 }
                  : undefined
              }>{w}</span>
              {i < words.length - 1 ? ' ' : ''}
            </React.Fragment>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
