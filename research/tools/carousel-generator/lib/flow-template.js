"use strict";

const path = require("path");

// Import getFlowDiagram from guide-generator — reuse, do not duplicate SVG definitions
const { getFlowDiagram } = require(
  path.resolve(__dirname, "../../guide-generator/lib/template"),
);

// Guide title lookup for the flow template label
const GUIDE_TITLES = {
  "missed-call-textback": "The 30-Second Save",
  "review-automation": "The Review Machine",
  "monday-pipeline": "The Monday Morning Pipeline",
  "quote-writer": "The Quote That Writes Itself",
  "no-show-killer": "The No-Show Killer",
};

/**
 * Build a complete HTML document for a standalone flow diagram social asset.
 *
 * @param {string} slug - Guide slug
 * @param {"square"|"landscape"} format - "square" (1080x1080) or "landscape" (1200x675)
 * @returns {string} Complete HTML document string
 */
function buildFlowHTML(slug, format) {
  const isSquare = format === "square";
  const width = isSquare ? 1080 : 1200;
  const height = isSquare ? 1080 : 675;
  const svgScale = isSquare ? 1.3 : 1.5;
  const guideTitle = GUIDE_TITLES[slug] || slug;

  // Get the SVG flow diagram from guide-generator (returns a div.flow-diagram with SVG)
  const flowDiagramHTML = getFlowDiagram(slug);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Flow Diagram — ${guideTitle}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&display=swap" rel="stylesheet" />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: ${width}px;
      height: ${height}px;
      overflow: hidden;
      background: #1A1A1A;
    }

    body {
      font-family: 'DM Sans', system-ui, sans-serif;
      background: #1A1A1A;
      color: #EDE9E3;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 80px;
      box-sizing: border-box;
      position: relative;
    }

    /* Dot grid texture */
    body::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle, rgba(237,233,227,0.05) 1px, transparent 1px);
      background-size: 28px 28px;
      pointer-events: none;
      z-index: 0;
    }

    .content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    /* "How the automation works" label above diagram */
    .section-label {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: rgba(237,233,227,0.45);
      margin-bottom: 32px;
      text-align: center;
    }

    /* SVG wrapper with scale transform */
    .flow-wrapper {
      transform: scale(${svgScale});
      transform-origin: center center;
    }

    /* Override flow-label from guide-generator to match carousel brand voice */
    .flow-wrapper .flow-diagram {
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .flow-wrapper .flow-label {
      font-family: 'DM Sans', system-ui, sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #4DD9E8;
      margin: 0 0 12px 0;
      text-align: center;
    }

    /* Guide title below diagram */
    .guide-title {
      font-size: ${isSquare ? "32px" : "28px"};
      font-weight: 700;
      color: #EDE9E3;
      margin-top: ${isSquare ? "80px" : "60px"};
      text-align: center;
      letter-spacing: -0.5px;
    }

    /* Brand gradient bar at bottom */
    .brand-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #7B2FBE, #4DD9E8);
      z-index: 2;
    }
  </style>
</head>
<body>
  <div class="content">
    <div class="section-label">How the automation works</div>
    <div class="flow-wrapper">
      ${flowDiagramHTML}
    </div>
    <div class="guide-title">${guideTitle}</div>
  </div>
  <div class="brand-bar"></div>
</body>
</html>`;
}

module.exports = { buildFlowHTML };
