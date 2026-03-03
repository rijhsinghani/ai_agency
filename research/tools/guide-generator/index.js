#!/usr/bin/env node
"use strict";

const { Command } = require("commander");
const fs = require("fs");
const path = require("path");
const { buildHTML } = require("./lib/template");
const { renderPDF, renderPreview } = require("./lib/renderer");
const { GUIDES, getGuide } = require("./lib/generator");

const program = new Command();

program
  .name("sameer-guides")
  .description("Build branded PDF automation guides from markdown source files")
  .version("1.0.0")
  .option("--guide <slug>", "Build a single guide by slug")
  .option("--all", "Build all 5 guides")
  .option(
    "--output <dir>",
    "Output directory",
    path.resolve(__dirname, "../../..", "website", "guides"),
  )
  .option(
    "--preview",
    "Also generate a 816x400 PNG preview image for each guide",
  );

program.parse(process.argv);

const opts = program.opts();

// Validate: must specify --guide or --all
if (!opts.guide && !opts.all) {
  console.error("Error: specify --guide <slug> or --all");
  console.error("Valid slugs:", GUIDES.map((g) => g.slug).join(", "));
  process.exit(1);
}

// Resolve output directory to an absolute path
const outputDir = path.resolve(opts.output);

/**
 * Build a single guide: read markdown, render HTML, export PDF (and optionally PNG preview).
 * @param {object} guide - Guide metadata object from generator.js
 */
async function buildGuide(guide) {
  const guidesDir = path.join(__dirname, "guides");
  const mdPath = path.join(guidesDir, `${guide.slug}.md`);

  if (!fs.existsSync(mdPath)) {
    console.error(`Missing markdown file: ${mdPath}`);
    process.exit(1);
  }

  const markdownContent = fs.readFileSync(mdPath, "utf8");
  const htmlContent = buildHTML(markdownContent, {
    title: guide.title,
    slug: guide.slug,
    industry: guide.industry,
  });

  const pdfPath = path.join(outputDir, `${guide.slug}.pdf`);
  console.log(`Building: ${guide.title} (${guide.industry})`);
  await renderPDF(htmlContent, pdfPath);
  console.log(`  PDF: ${pdfPath}`);

  if (opts.preview) {
    const previewPath = path.join(outputDir, `${guide.slug}-preview.png`);
    await renderPreview(htmlContent, previewPath);
    console.log(`  Preview: ${previewPath}`);
  }
}

async function main() {
  const validSlugs = GUIDES.map((g) => g.slug);

  let guidesToBuild;

  if (opts.all) {
    guidesToBuild = GUIDES;
  } else {
    if (!validSlugs.includes(opts.guide)) {
      console.error(`Unknown slug: "${opts.guide}"`);
      console.error("Valid slugs:", validSlugs.join(", "));
      process.exit(1);
    }
    guidesToBuild = [getGuide(opts.guide)];
  }

  for (const guide of guidesToBuild) {
    await buildGuide(guide);
  }

  console.log(
    `\nDone. ${guidesToBuild.length} guide(s) built to: ${outputDir}`,
  );
}

main().catch((err) => {
  console.error("Build failed:", err.message);
  process.exit(1);
});
