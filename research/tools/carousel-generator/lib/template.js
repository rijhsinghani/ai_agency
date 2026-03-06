"use strict";

const path = require("path");

// Import getFlowDiagram from guide-generator — reuse, do not duplicate SVG definitions
const { getFlowDiagram } = require(
  path.resolve(__dirname, "../../guide-generator/lib/template"),
);

/**
 * Wrap dollar amounts and key numbers in accent span for gradient text effect.
 * Matches patterns like: $20,800, $12,480/year, 25-30%, 5-8 slides, etc.
 *
 * @param {string} text
 * @returns {string} HTML string with accent spans
 */
function wrapAccents(text) {
  // Match dollar amounts, percentages, and plain numbers that are part of pain anchors
  return text
    .replace(
      /(\$[\d,]+(?:\/year|\/month|\/week|\/hr)?)/g,
      '<span class="accent">$1</span>',
    )
    .replace(/([\d]+-[\d]+%|[\d]+%)/g, '<span class="accent">$1</span>');
}

/**
 * Build a complete HTML document for a single carousel slide.
 *
 * @param {{ type: string, headline: string, subtext: string }} slide - Slide data
 * @param {number} slideNum - 1-based slide number
 * @param {number} totalSlides - Total slides in this guide
 * @param {string} guideSlug - Guide slug for flow diagram lookup
 * @returns {string} Complete HTML document string
 */
function buildSlideHTML(slide, slideNum, totalSlides, guideSlug) {
  const slideNumStr = String(slideNum).padStart(2, "0");
  const totalStr = String(totalSlides).padStart(2, "0");
  const bodyClass = `slide-${slide.type}`;

  // For flow slides, embed the SVG from guide-generator
  let flowContent = "";
  if (slide.type === "flow") {
    const svgHTML = getFlowDiagram(guideSlug);
    // Extract just the SVG element from the wrapper div for embedding in carousel context
    // The getFlowDiagram returns a div.flow-diagram with a label and SVG
    // We render it directly but with carousel-specific scaling
    flowContent = `
    <div class="flow-embed">
      <div class="flow-wrapper">
        ${svgHTML}
      </div>
    </div>`;
  }

  const headlineHTML = wrapAccents(slide.headline);
  const subtextHTML = wrapAccents(slide.subtext);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Slide ${slideNumStr}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&display=swap" rel="stylesheet" />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 1080px;
      height: 1080px;
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
      align-items: flex-start;
      padding: 96px;
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

    /* All slide content above dot grid */
    .slide-content {
      position: relative;
      z-index: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    /* Slide number indicator */
    .slide-number {
      font-size: 20px;
      font-weight: 500;
      color: rgba(237,233,227,0.4);
      letter-spacing: 2px;
      margin-bottom: 40px;
    }

    /* Main headline */
    .headline {
      font-size: 64px;
      font-weight: 900;
      line-height: 1.08;
      color: #EDE9E3;
      max-width: 880px;
      margin: 0 0 32px 0;
      letter-spacing: -1.5px;
    }

    /* CTA slides get slightly larger headline */
    body.slide-cta .headline {
      font-size: 72px;
      letter-spacing: -2px;
    }

    /* Accent gradient text for dollar amounts and key numbers */
    .accent {
      background: linear-gradient(90deg, #7B2FBE, #4DD9E8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 900;
    }

    /* Subtext */
    .subtext {
      font-size: 28px;
      font-weight: 400;
      line-height: 1.5;
      color: rgba(237,233,227,0.65);
      max-width: 820px;
      margin: 0;
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

    /* Flow slide: embed SVG with scale transform */
    .flow-embed {
      width: 100%;
      margin-bottom: 32px;
    }

    .flow-wrapper {
      transform: scale(1.3);
      transform-origin: left center;
    }

    /* Override flow-label styles for carousel dark context */
    .flow-wrapper .flow-diagram {
      margin: 0;
    }

    .flow-wrapper .flow-label {
      font-family: 'DM Sans', system-ui, sans-serif;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #4DD9E8;
      margin: 0 0 12px 0;
    }

    /* Flow slides: shift content higher to make room for diagram */
    body.slide-flow .headline {
      font-size: 52px;
      margin-bottom: 24px;
    }

    body.slide-flow .subtext {
      font-size: 24px;
    }
  </style>
</head>
<body class="${bodyClass}">
  <div class="slide-content">
    <div class="slide-number">${slideNumStr} / ${totalStr}</div>
    ${slide.type === "flow" ? flowContent : ""}
    <h1 class="headline">${headlineHTML}</h1>
    <p class="subtext">${subtextHTML}</p>
  </div>
  <div class="brand-bar"></div>
</body>
</html>`;
}

module.exports = { buildSlideHTML };
