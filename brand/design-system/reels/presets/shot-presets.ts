/**
 * shot-presets.ts — reusable shot configs.
 *
 * Each preset defines: which overlay component(s), duration,
 * accent, and the props payload. Claude Code can copy these into
 * a Remotion <Composition> when scaffolding a new Reel.
 */

import { ACCENT } from '../tokens';

export const SHOT_PRESETS = {

  /** Open: name + topic. Use as shot 1 of every Reel. */
  intro_lower_third: {
    component: 'LowerThird',
    durationFrames: 120,
    props: {
      eyebrow: '·  SAMEER · AUTOMATIONS',
      title:    'Lead-response in 60s.',
      subtitle: 'Even at 2am.',
      accent:   ACCENT.purple,
    },
  },

  /** Mid-shot: cite a stat that the speaker is saying out loud. */
  stat_callout: {
    component: 'LowerThird',
    durationFrames: 90,
    props: {
      eyebrow: '·  CASE · CLIENT 047',
      title:    '+42% revenue.',
      subtitle: '90 days · same team · same spend.',
      accent:   ACCENT.orange,
    },
  },

  /** "Here are the 5 plays I run for every client" */
  five_plays_list: {
    component: 'NumberedList',
    durationFrames: 240,
    props: {
      eyebrow: '·  THE STACK',
      title:    '5 plays I run for every client.',
      items: [
        'Lead-response · 60s',
        'Quote-builder · half a day',
        'Review-engine · auto',
        'Invoice + chase · zero touch',
        'Pipeline dashboard · live',
      ],
      staggerFrames: 22,
      accent: ACCENT.purple,
    },
  },

  /** Pull-quote off the right side. */
  belief_quote: {
    component: 'QuotePull',
    durationFrames: 150,
    props: {
      body:   `You don't need 10 people. You need {one good system}.`,
      byline: '— SAMEER',
      accent: ACCENT.purple,
      side:   'right',
    },
  },

  /** "Here's how the lead-response automation actually works." */
  lead_response_diagram: {
    component: 'SystemDiagram',
    durationFrames: 300,
    props: {
      nodes: [
        { id: 'lead',  label: 'New lead',       x: 0, y: 0,   color: ACCENT.cyan },
        { id: 'reply', label: 'Auto-reply 60s', x: 0, y: 200, color: ACCENT.purple },
        { id: 'qual',  label: 'Qualify',        x: 0, y: 400, color: ACCENT.yellow },
        { id: 'book',  label: 'Booking',        x: 0, y: 600, color: ACCENT.lime },
      ],
      edges: [
        { from: 'lead',  to: 'reply' },
        { from: 'reply', to: 'qual'  },
        { from: 'qual',  to: 'book'  },
      ],
      revealOrder: ['lead', 'reply', 'qual', 'book'],
      staggerFrames: 22,
      side: 'right',
    },
  },

} as const;
