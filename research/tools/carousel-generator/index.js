#!/usr/bin/env node
"use strict";

const { Command } = require("commander");
const path = require("path");
const fs = require("fs");

const { SLIDE_DATA } = require("./lib/slides");
const { buildSlideHTML } = require("./lib/template");
const { buildFlowHTML } = require("./lib/flow-template");
const {
  launchBrowser,
  closeBrowser,
  renderPNGWithPage,
} = require("./lib/renderer");

const GUIDE_SLUGS = [
  "missed-call-textback",
  "review-automation",
  "monday-pipeline",
  "quote-writer",
  "no-show-killer",
];

/**
 * Render all carousel slides and flow diagrams for a single guide.
 * Shares one browser instance across all renders for efficiency.
 *
 * @param {string} slug - Guide slug
 * @param {string} outputDir - Base output directory
 * @returns {Promise<{ slides: number, flows: number }>}
 */
async function renderGuide(slug, outputDir) {
  const guideData = SLIDE_DATA[slug];
  if (!guideData) {
    console.error(`  No slide data found for slug: ${slug}`);
    return { slides: 0, flows: 0 };
  }

  const guideOutputDir = path.resolve(outputDir, slug);
  if (!fs.existsSync(guideOutputDir)) {
    fs.mkdirSync(guideOutputDir, { recursive: true });
  }

  const slides = guideData.slides;
  const totalSlides = slides.length;
  let slidesRendered = 0;
  let flowsRendered = 0;

  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();

    // Render carousel slides
    for (let i = 0; i < totalSlides; i++) {
      const slide = slides[i];
      const slideNum = i + 1;
      const slideNumStr = String(slideNum).padStart(2, "0");
      const outputPath = path.join(guideOutputDir, `slide-${slideNumStr}.png`);

      console.log(
        `  Rendering ${slug} slide ${slideNum}/${totalSlides} (${slide.type})...`,
      );

      const html = buildSlideHTML(slide, slideNum, totalSlides, slug);
      await renderPNGWithPage(page, html, outputPath, 1080, 1080);
      slidesRendered++;
    }

    // Render flow-square.png (1080x1080)
    console.log(`  Rendering ${slug} flow-square.png...`);
    const flowSquareHTML = buildFlowHTML(slug, "square");
    const flowSquarePath = path.join(guideOutputDir, "flow-square.png");
    await renderPNGWithPage(page, flowSquareHTML, flowSquarePath, 1080, 1080);
    flowsRendered++;

    // Render flow-landscape.png (1200x675)
    console.log(`  Rendering ${slug} flow-landscape.png...`);
    const flowLandscapeHTML = buildFlowHTML(slug, "landscape");
    const flowLandscapePath = path.join(guideOutputDir, "flow-landscape.png");
    await renderPNGWithPage(
      page,
      flowLandscapeHTML,
      flowLandscapePath,
      1200,
      675,
    );
    flowsRendered++;
  } finally {
    await closeBrowser(browser);
  }

  return { slides: slidesRendered, flows: flowsRendered };
}

async function main() {
  const program = new Command();

  program
    .name("sameer-carousels")
    .description(
      "Generate branded Instagram carousel slides and flow diagram social assets",
    )
    .option("--guide <slug>", "Generate slides for a single guide by slug")
    .option("--all", "Generate slides for all 5 guides")
    .option("--output <dir>", "Output directory", "./output")
    .parse(process.argv);

  const opts = program.opts();

  if (!opts.guide && !opts.all) {
    console.error("Error: specify --guide <slug> or --all");
    process.exit(1);
  }

  const outputDir = path.resolve(opts.output);

  const slugsToRender = opts.all ? GUIDE_SLUGS : [opts.guide];

  // Validate slug if single guide
  if (opts.guide && !GUIDE_SLUGS.includes(opts.guide)) {
    console.error(`Error: unknown guide slug "${opts.guide}"`);
    console.error(`Valid slugs: ${GUIDE_SLUGS.join(", ")}`);
    process.exit(1);
  }

  let totalSlides = 0;
  let totalFlows = 0;
  let guidesRendered = 0;

  for (const slug of slugsToRender) {
    console.log(`\nGenerating ${slug}...`);
    const { slides, flows } = await renderGuide(slug, outputDir);
    totalSlides += slides;
    totalFlows += flows;
    if (slides > 0 || flows > 0) guidesRendered++;
  }

  console.log(
    `\nGenerated ${totalSlides} slides + ${totalFlows} flow diagrams for ${guidesRendered} guides`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
