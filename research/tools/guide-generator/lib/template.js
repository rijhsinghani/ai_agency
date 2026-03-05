"use strict";

const { marked } = require("marked");

// Configure marked: replace thematic breaks (---) with page-break divs.
// This ensures each guide section renders on its own PDF page.
const renderer = new marked.Renderer();
renderer.hr = function () {
  return '<div class="page-break"></div>';
};
marked.use({ renderer });

/**
 * Return an inline SVG flow diagram for a given guide slug.
 * Diagrams use the brand visual language:
 *   - Dark transparent node backgrounds (#1E1E1E)
 *   - Purple-to-cyan gradient connectors
 *   - Cream (#EDE9E3) text labels
 *   - 688px wide (fits in 816px page with 64px padding each side)
 *
 * @param {string} slug
 * @returns {string} SVG markup string
 */
function getFlowDiagram(slug) {
  // Shared SVG pieces
  const defs = `
    <defs>
      <linearGradient id="fd-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#7B2FBE"/>
        <stop offset="100%" stop-color="#4DD9E8"/>
      </linearGradient>
      <marker id="fd-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="url(#fd-grad)"/>
      </marker>
    </defs>`;

  // Each flow has 4 nodes at fixed x positions within a 688-wide canvas.
  // Node width: 148px, height: 56px. Centers at x: 18, 188, 358, 528 (node x offset).
  // Arrows connect right edge of one node to left edge of next.
  // Canvas height: 100px (node 56px + label area below).

  function node(x, y, label, sublabel, isFirst, isLast) {
    const borderColor = isFirst
      ? "#7B2FBE"
      : isLast
        ? "#4DD9E8"
        : "rgba(237,233,227,0.15)";
    const lines = sublabel
      ? `<text x="${x + 74}" y="${y + 26}" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="600" fill="#EDE9E3">${label}</text>
         <text x="${x + 74}" y="${y + 41}" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" fill="rgba(237,233,227,0.55)">${sublabel}</text>`
      : `<text x="${x + 74}" y="${y + 32}" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="600" fill="#EDE9E3">${label}</text>`;
    return `<rect x="${x}" y="${y}" width="148" height="56" rx="8" fill="#1E1E1E" stroke="${borderColor}" stroke-width="1.5"/>
${lines}`;
  }

  function arrow(x1, x2, y) {
    const mx = (x1 + x2) / 2;
    return `<line x1="${x1}" y1="${y}" x2="${x2 - 4}" y2="${y}" stroke="url(#fd-grad)" stroke-width="1.5" marker-end="url(#fd-arrow)"/>`;
  }

  const nodeY = 22;
  const arrowY = nodeY + 28; // mid-height of nodes
  // x positions for 4 nodes with 20px gaps: 0, 168, 336, 504
  const xs = [0, 168, 336, 504];
  const svgW = 688;
  const svgH = 100;

  const flows = {
    "missed-call-textback": {
      nodes: [
        { label: "Phone rings", sublabel: null },
        { label: "Missed call", sublabel: "detected" },
        { label: "Auto-text sent", sublabel: "in 30 seconds" },
        { label: "Client books", sublabel: "appointment" },
      ],
    },
    "review-automation": {
      nodes: [
        { label: "Appointment", sublabel: "ends" },
        { label: "Auto review", sublabel: "request sent" },
        { label: "Client leaves", sublabel: "5-star review" },
        { label: "Google ranking", sublabel: "climbs" },
      ],
    },
    "monday-pipeline": {
      nodes: [
        { label: "Leads arrive", sublabel: "all week" },
        { label: "Auto-qualify", sublabel: "+ log" },
        { label: "Mon 7AM", sublabel: "digest sent" },
        { label: "Team works", sublabel: "priority list" },
      ],
    },
    "quote-writer": {
      nodes: [
        { label: "Voice memo", sublabel: "recorded" },
        { label: "AI drafts", sublabel: "proposal" },
        { label: "Auto follow-up", sublabel: "sequence" },
        { label: "Client signs", sublabel: null },
      ],
    },
    "no-show-killer": {
      nodes: [
        { label: "Appointment", sublabel: "booked" },
        { label: "24h reminder", sublabel: "sent" },
        { label: "1h reminder", sublabel: "sent" },
        { label: "Reschedule link", sublabel: "if no-show" },
      ],
    },
  };

  const flow = flows[slug];
  if (!flow) return "";

  const nodeCount = flow.nodes.length;
  const nodeSVGs = flow.nodes
    .map((n, i) =>
      node(xs[i], nodeY, n.label, n.sublabel, i === 0, i === nodeCount - 1),
    )
    .join("\n");

  const arrowSVGs = flow.nodes
    .slice(0, -1)
    .map((_, i) => arrow(xs[i] + 148, xs[i + 1], arrowY))
    .join("\n");

  return `<div class="flow-diagram">
  <p class="flow-label">How the automation fixes it</p>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}" role="img" aria-label="Automation flow diagram">
    ${defs}
    ${nodeCount === 4 ? arrowSVGs : ""}
    ${nodeSVGs}
  </svg>
</div>`;
}

/**
 * Return an inline SVG problem flow diagram for a given guide slug.
 * Shows the broken manual process — distinct from the solution diagram:
 *   - Warm warning tones: #E84D4D (red) and #F5A623 (amber)
 *   - Node backgrounds: #1E1E1E with rgba(232,77,77,0.15) border
 *   - Final node RED-tinted showing the bad outcome
 *   - Dashed/broken arrow lines (stroke-dasharray) to show fragile process
 *   - Same 688px width, 4 nodes horizontal
 *
 * @param {string} slug
 * @returns {string} SVG markup string
 */
function getProblemDiagram(slug) {
  const defs = `
    <defs>
      <marker id="pd-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="#E84D4D"/>
      </marker>
    </defs>`;

  function problemNode(x, y, label, sublabel, isFirst, isLast) {
    const borderColor = isFirst
      ? "#F5A623"
      : isLast
        ? "#E84D4D"
        : "rgba(232,77,77,0.15)";
    const nodeFill = isLast ? "rgba(232,77,77,0.08)" : "#1E1E1E";
    const textColor = isLast ? "#E84D4D" : "#EDE9E3";
    const lines = sublabel
      ? `<text x="${x + 74}" y="${y + 26}" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="600" fill="${textColor}">${label}</text>
         <text x="${x + 74}" y="${y + 41}" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="10" fill="rgba(237,233,227,0.55)">${sublabel}</text>`
      : `<text x="${x + 74}" y="${y + 32}" text-anchor="middle" font-family="'DM Sans', system-ui, sans-serif" font-size="11" font-weight="600" fill="${textColor}">${label}</text>`;
    return `<rect x="${x}" y="${y}" width="148" height="56" rx="8" fill="${nodeFill}" stroke="${borderColor}" stroke-width="1.5"/>
${lines}`;
  }

  function brokenArrow(x1, x2, y) {
    return `<line x1="${x1}" y1="${y}" x2="${x2 - 4}" y2="${y}" stroke="#E84D4D" stroke-width="1.5" stroke-dasharray="6 4" marker-end="url(#pd-arrow)" opacity="0.7"/>`;
  }

  const nodeY = 22;
  const arrowY = nodeY + 28;
  const xs = [0, 168, 336, 504];
  const svgW = 688;
  const svgH = 100;

  const problemFlows = {
    "missed-call-textback": {
      nodes: [
        { label: "Phone rings", sublabel: null },
        { label: "You're busy", sublabel: "with client" },
        { label: "Voicemail", sublabel: "(maybe)" },
        { label: "Client calls", sublabel: "competitor ✕" },
      ],
    },
    "review-automation": {
      nodes: [
        { label: "Great service", sublabel: "delivered" },
        { label: "Hope client", sublabel: "remembers" },
        { label: "1 review in", sublabel: "3 months" },
        { label: "Competitor", sublabel: "outranks you ✕" },
      ],
    },
    "monday-pipeline": {
      nodes: [
        { label: "Leads come in", sublabel: "all week" },
        { label: "Scattered across", sublabel: "email/phone/DMs" },
        { label: "Mon morning", sublabel: "scramble" },
        { label: "Hot leads", sublabel: "gone cold ✕" },
      ],
    },
    "quote-writer": {
      nodes: [
        { label: "Client requests", sublabel: "quote" },
        { label: "Manual research", sublabel: "+ writing" },
        { label: "2 hours per", sublabel: "proposal" },
        { label: "Client ghosts", sublabel: "while waiting ✕" },
      ],
    },
    "no-show-killer": {
      nodes: [
        { label: "Appointment", sublabel: "booked" },
        { label: "Client forgets,", sublabel: "no reminder" },
        { label: "No-show,", sublabel: "empty slot" },
        { label: "$80 revenue", sublabel: "lost ✕" },
      ],
    },
  };

  const flow = problemFlows[slug];
  if (!flow) return "";

  const nodeCount = flow.nodes.length;
  const nodeSVGs = flow.nodes
    .map((n, i) =>
      problemNode(
        xs[i],
        nodeY,
        n.label,
        n.sublabel,
        i === 0,
        i === nodeCount - 1,
      ),
    )
    .join("\n");

  const arrowSVGs = flow.nodes
    .slice(0, -1)
    .map((_, i) => brokenArrow(xs[i] + 148, xs[i + 1], arrowY))
    .join("\n");

  return `<div class="flow-diagram">
  <p class="flow-label flow-label--problem">What's happening now</p>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}" role="img" aria-label="Current broken process diagram">
    ${defs}
    ${nodeCount === 4 ? arrowSVGs : ""}
    ${nodeSVGs}
  </svg>
</div>`;
}

/**
 * Convert markdown content to a full, brand-styled HTML document.
 *
 * Brand identity:
 *   Background: #1A1A1A, text: #EDE9E3
 *   Headings: Roc Grotesk (local) -> Outfit (Google Fonts) -> system-ui
 *   Body: Gilroy (local) -> DM Sans (Google Fonts) -> system-ui
 *   Accent: linear-gradient(90deg, #7B2FBE, #4DD9E8)
 *   Tables: background #1E1E1E, header color #4DD9E8
 *
 * @param {string} markdownContent - Raw markdown string
 * @param {{ title: string, slug: string, industry: string }} guideMeta
 * @returns {string} Complete HTML document
 */
function buildHTML(markdownContent, guideMeta) {
  // Inject the problem diagram before the first page-break (bottom of page 1),
  // and the solution diagram after the first page-break (top of page 2).
  const problemDiagram = getProblemDiagram(guideMeta.slug);
  const flowDiagram = getFlowDiagram(guideMeta.slug);
  const bodyHTML = marked
    .parse(markdownContent)
    .replace(
      /<div class="page-break"><\/div>/,
      `${problemDiagram}<div class="page-break"></div>${flowDiagram}`,
    )
    .replace(
      /<p><strong>Gotchas:<\/strong><\/p>\s*(<ul>[\s\S]*?<\/ul>)/g,
      '<div class="gotcha-callout"><p><strong>Gotchas:</strong></p>$1</div>',
    )
    .replace(
      /calendar\.app\.google\/psycao3CrXjGnmk48/g,
      '<a href="https://calendar.app.google/psycao3CrXjGnmk48" style="color: #4DD9E8; text-decoration: underline;">calendar.app.google/psycao3CrXjGnmk48</a>',
    );

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${guideMeta.title} — Sameer Automations guide for ${guideMeta.industry}" />
  <title>${guideMeta.title} | Sameer Automations</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    /* Print color enforcement — critical for dark PDFs */
    html, body, * {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    @page {
      size: Letter;
      margin: 0;
    }

    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&family=DM+Sans:wght@400;500&display=swap');

    body {
      background-color: #1A1A1A;
      color: #EDE9E3;
      font-family: 'Gilroy', 'DM Sans', system-ui, sans-serif;
      font-size: 16px;
      line-height: 1.65;
      margin: 0;
      padding: 0;
    }

    .page {
      width: 816px;
      min-height: 1056px;
      padding: 64px;
      box-sizing: border-box;
      position: relative;
      background-color: #1A1A1A;
      overflow: hidden;
    }

    /* Dot grid texture in background */
    .page::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle, rgba(237,233,227,0.06) 1px, transparent 1px);
      background-size: 24px 24px;
      pointer-events: none;
      z-index: 0;
    }

    /* All content sits above the dot grid */
    .page > * {
      position: relative;
      z-index: 1;
    }

    /* Full wordmark logo in top-right corner — 520x100 viewBox scaled to ~160x31 */
    .logo {
      position: absolute;
      top: 28px;
      right: 40px;
      width: 160px;
      height: 31px;
      opacity: 0.9;
      z-index: 2;
    }

    /* Gradient accent line — used as section divider */
    .accent-line {
      height: 2px;
      background: linear-gradient(90deg, #7B2FBE, #4DD9E8);
      border: none;
      margin: 0 0 40px 0;
      border-radius: 1px;
    }

    h1 {
      font-family: 'Roc Grotesk', 'Outfit', system-ui, sans-serif;
      font-weight: 700;
      font-size: 32px;
      line-height: 1.2;
      color: #EDE9E3;
      margin: 0 0 8px 0;
      letter-spacing: -0.5px;
    }

    h2 {
      font-family: 'Roc Grotesk', 'Outfit', system-ui, sans-serif;
      font-weight: 700;
      font-size: 22px;
      line-height: 1.3;
      color: #EDE9E3;
      margin: 32px 0 12px 0;
    }

    h3 {
      font-family: 'Roc Grotesk', 'Outfit', system-ui, sans-serif;
      font-weight: 700;
      font-size: 16px;
      color: #4DD9E8;
      margin: 24px 0 8px 0;
      text-transform: none;
      letter-spacing: 0;
    }

    p {
      margin: 0 0 16px 0;
      color: #EDE9E3;
    }

    ul, ol {
      margin: 0 0 16px 0;
      padding-left: 24px;
      color: #EDE9E3;
    }

    li {
      margin-bottom: 6px;
      line-height: 1.6;
    }

    /* Before/after tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0 24px 0;
      background: #1E1E1E;
      border-radius: 8px;
      overflow: hidden;
      break-inside: avoid;
      page-break-inside: avoid;
    }

    thead th {
      background: #1E1E1E;
      color: #4DD9E8;
      font-family: 'Roc Grotesk', 'Outfit', system-ui, sans-serif;
      font-weight: 700;
      font-size: 13px;
      text-align: left;
      padding: 12px 16px;
      border-bottom: 1px solid rgba(237,233,227,0.15);
    }

    tbody td {
      padding: 10px 16px;
      color: #EDE9E3;
      font-size: 14px;
      border-bottom: 1px solid rgba(237,233,227,0.08);
      vertical-align: top;
    }

    tbody tr:last-child td {
      border-bottom: none;
    }

    tbody tr td:first-child {
      font-weight: 500;
      color: rgba(237,233,227,0.7);
      white-space: nowrap;
    }

    /* Footer CTA */
    .guide-footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid rgba(237,233,227,0.15);
      font-size: 13px;
      color: rgba(237,233,227,0.6);
      line-height: 1.5;
    }

    .guide-footer em {
      font-style: normal;
      color: rgba(237,233,227,0.6);
    }

    /* Page break handling — triggered by --- in markdown (rendered as .page-break) */
    .page-break {
      page-break-after: always;
      break-after: page;
      height: 0;
      display: block;
      margin: 0;
      padding: 0;
    }

    /* Inline code */
    code {
      font-family: 'JetBrains Mono', 'Courier New', monospace;
      font-size: 13px;
      background: rgba(237,233,227,0.08);
      padding: 2px 6px;
      border-radius: 3px;
    }

    /* Strong / bold */
    strong {
      font-weight: 700;
      color: #EDE9E3;
    }

    /* Emphasis / italic */
    em {
      font-style: italic;
      color: rgba(237,233,227,0.85);
    }

    /* Blockquote — used for Reddit community quotes */
    blockquote {
      margin: 16px 0;
      padding: 14px 20px;
      background: rgba(123,47,190,0.12);
      border-left: 3px solid #7B2FBE;
      border-radius: 0 6px 6px 0;
      color: rgba(237,233,227,0.9);
      font-size: 14px;
      font-style: italic;
    }

    /* Gotcha warning callout — amber border, subtle amber background */
    .gotcha-callout {
      margin: 16px 0 20px 0;
      padding: 14px 20px;
      background: rgba(245, 166, 35, 0.08);
      border-left: 3px solid #f5a623;
      border-radius: 0 6px 6px 0;
    }

    .gotcha-callout p strong:first-child {
      color: #f5a623;
      font-size: 13px;
      letter-spacing: 0.5px;
    }

    .gotcha-callout ul {
      margin: 8px 0 0 0;
      color: rgba(237, 233, 227, 0.85);
    }

    /* Flow diagram — injected at top of page 2 */
    .flow-diagram {
      margin: 0 0 32px 0;
    }

    .flow-label {
      font-family: 'Roc Grotesk', 'Outfit', system-ui, sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #4DD9E8;
      margin: 0 0 12px 0;
    }

    .flow-label--problem {
      color: #F5A623;
    }
  </style>
</head>
<body>
  <div class="page">
    <!-- Full wordmark logo in top-right (dark-bg adapted: cream wordmark, no tagline) -->
    <svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 100" role="img" aria-label="Sameer Automations">
      <title>Sameer Automations</title>
      <defs>
        <style>
          .pdf-wordmark {
            font-family: 'Roc Grotesk', 'Outfit', 'Helvetica Neue', Arial, sans-serif;
            font-weight: 900;
            font-size: 28px;
            letter-spacing: 1px;
            fill: #EDE9E3;
          }
        </style>
        <linearGradient id="pdf-flowGrad" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#7B2FBE"/>
          <stop offset="50%" stop-color="#9B4FDE"/>
          <stop offset="100%" stop-color="#4DD9E8"/>
        </linearGradient>
        <radialGradient id="pdf-haloInput" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#7B2FBE" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#7B2FBE" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="pdf-haloOutput" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#4DD9E8" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#4DD9E8" stop-opacity="0"/>
        </radialGradient>
        <filter id="pdf-coreGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur"/>
          <feColorMatrix in="blur" type="matrix"
            values="0 0 0 0 0.302  0 0 0 0 0.851  0 0 0 0 0.910  0 0 0 0.8 0" result="cyan"/>
          <feMerge>
            <feMergeNode in="cyan"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <!-- S-wave icon in 100x100 space -->
      <circle cx="80" cy="20" r="20" fill="url(#pdf-haloInput)"/>
      <circle cx="20" cy="80" r="20" fill="url(#pdf-haloOutput)"/>
      <path
        d="M 80 20
           C 40 20, 20 20, 20 40
           C 20 60, 80 40, 80 60
           C 80 80, 60 80, 20 80"
        stroke="url(#pdf-flowGrad)"
        stroke-width="8"
        stroke-linecap="round"
        fill="none"
      />
      <circle cx="80" cy="20" r="6" fill="#7B2FBE" filter="url(#pdf-coreGlow)"/>
      <circle cx="80" cy="20" r="2" fill="#FFFFFF" opacity="0.85"/>
      <circle cx="20" cy="80" r="6" fill="#4DD9E8" filter="url(#pdf-coreGlow)"/>
      <circle cx="20" cy="80" r="2" fill="#FFFFFF" opacity="0.85"/>
      <!-- Wordmark only (no tagline) — cream fill for dark background -->
      <text x="124" y="57" class="pdf-wordmark">SAMEER AUTOMATIONS</text>
    </svg>

    <!-- Gradient accent line at top -->
    <div class="accent-line"></div>

    <!-- Guide content rendered from markdown (flow diagram injected after first page-break) -->
    ${bodyHTML}
  </div>
</body>
</html>`;
}

module.exports = { buildHTML, getFlowDiagram, getProblemDiagram };
