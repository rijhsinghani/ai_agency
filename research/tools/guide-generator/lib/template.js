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
  const bodyHTML = marked.parse(markdownContent);

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
      font-size: 15px;
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

    /* Logo in top-right corner */
    .logo {
      position: absolute;
      top: 24px;
      right: 32px;
      width: 32px;
      height: 32px;
      opacity: 0.85;
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
  </style>
</head>
<body>
  <div class="page">
    <!-- Logo icon in top-right -->
    <svg class="logo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="logoGrad" x1="80" y1="20" x2="20" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#7B2FBE"/>
          <stop offset="50%" stop-color="#9B4FDE"/>
          <stop offset="100%" stop-color="#4DD9E8"/>
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <!-- S-wave path -->
      <path d="M75 25 C75 40 50 45 50 50 C50 55 25 60 25 75" stroke="url(#logoGrad)" stroke-width="6" stroke-linecap="round" fill="none"/>
      <!-- Input node (top-right) -->
      <circle cx="75" cy="25" r="8" fill="#7B2FBE" filter="url(#glow)"/>
      <circle cx="75" cy="25" r="3" fill="white"/>
      <!-- Output node (bottom-left) -->
      <circle cx="25" cy="75" r="8" fill="#4DD9E8" filter="url(#glow)"/>
      <circle cx="25" cy="75" r="3" fill="white"/>
    </svg>

    <!-- Gradient accent line at top -->
    <div class="accent-line"></div>

    <!-- Guide content rendered from markdown -->
    ${bodyHTML}
  </div>
</body>
</html>`;
}

module.exports = { buildHTML };
