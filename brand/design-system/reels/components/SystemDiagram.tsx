/**
 * SystemDiagram.tsx — arch-node graph that builds as the speaker
 * explains a flow. Nodes pop in (snap_in) in `revealOrder`, edges
 * draw between them with rail_wipe, and all nodes pulse softly
 * while idle.
 *
 * Usage:
 *   <Sequence from={150} durationInFrames={300}>
 *     <SystemDiagram
 *       nodes={[
 *         { id: 'lead',   label: 'New lead',       x: 80,  y: 80,  color: ACCENT.cyan },
 *         { id: 'reply',  label: 'Auto-reply 60s', x: 80,  y: 320, color: ACCENT.purple },
 *         { id: 'qual',   label: 'Qualify',        x: 80,  y: 560, color: ACCENT.yellow },
 *         { id: 'book',   label: 'Booking',        x: 80,  y: 800, color: ACCENT.lime },
 *       ]}
 *       edges={[
 *         { from: 'lead',  to: 'reply' },
 *         { from: 'reply', to: 'qual'  },
 *         { from: 'qual',  to: 'book'  },
 *       ]}
 *       revealOrder={['lead', 'reply', 'qual', 'book']}
 *       staggerFrames={20}
 *       side="right"
 *     />
 *   </Sequence>
 */

import React from 'react';
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';
import { COLOR, FONT, AccentColor, ACCENT, ZONES } from '../tokens';

export interface DiagramNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color?: AccentColor;
}
export interface DiagramEdge {
  from: string;
  to: string;
}
export interface SystemDiagramProps {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  revealOrder: string[];          // node ids in reveal sequence
  staggerFrames?: number;          // frames between each node reveal
  side?: 'left' | 'right' | 'center';
}

export const SystemDiagram: React.FC<SystemDiagramProps> = ({
  nodes, edges, revealOrder, staggerFrames = 18, side = 'right',
}) => {
  const frame = useCurrentFrame();

  const zone =
    side === 'left'  ? ZONES.leftRail :
    side === 'right' ? ZONES.rightRail :
    { top: 250, left: 60, width: 960, height: 1240 };

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    top: zone.top,
    width: zone.width,
    height: zone.height,
    ...(side === 'left'   ? { left: zone.left } :
       side === 'right'  ? { right: zone.right } :
                            { left: zone.left }),
  };

  // Map node id -> reveal frame
  const revealAt: Record<string, number> = {};
  revealOrder.forEach((id, i) => { revealAt[id] = i * staggerFrames; });

  const nodeById: Record<string, DiagramNode> = {};
  nodes.forEach(n => { nodeById[n.id] = n; });

  // Pulse cycle (90 frames @ 30fps)
  const pulse = 0.75 + 0.25 * (0.5 + 0.5 * Math.sin((frame / 90) * Math.PI * 2));

  return (
    <AbsoluteFill>
      <div style={containerStyle}>
        {/* SVG layer for edges */}
        <svg
          width={zone.width}
          height={zone.height}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        >
          {edges.map((e, i) => {
            const a = nodeById[e.from];
            const b = nodeById[e.to];
            if (!a || !b) return null;

            // Edge reveals after both endpoints are visible
            const revealEdge = Math.max(revealAt[e.from], revealAt[e.to]) + 4;
            const t = interpolate(frame, [revealEdge, revealEdge + 10], [0, 1], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
              easing: Easing.bezier(0.7, 0, 0.3, 1),
            });

            const x1 = a.x + 12, y1 = a.y + 12;
            const x2 = b.x + 12, y2 = b.y + 12;
            const ix = x1 + (x2 - x1) * t;
            const iy = y1 + (y2 - y1) * t;

            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={ix} y2={iy}
                stroke="rgba(168,162,158,.45)"
                strokeWidth={1.5}
                strokeDasharray="6 6"
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map(n => {
          const enter = revealAt[n.id] ?? 0;
          const t = interpolate(frame, [enter, enter + 8], [0, 1], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          });
          const ty = interpolate(t, [0, 1], [8, 0]);
          const color = n.color ?? ACCENT.purple;

          return (
            <div key={n.id} style={{
              position: 'absolute',
              left: n.x, top: n.y,
              opacity: t,
              transform: `translateY(${ty}px)`,
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                background: color,
                boxShadow: `0 0 0 8px ${color}1F, 0 0 20px ${color}88`,
                opacity: pulse,
                flexShrink: 0,
              }} />
              <div style={{
                fontFamily: FONT.body,
                fontWeight: 700,
                fontSize: 38,
                color: COLOR.paper,
                whiteSpace: 'nowrap',
              }}>{n.label}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
