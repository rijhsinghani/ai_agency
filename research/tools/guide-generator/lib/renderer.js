"use strict";

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

/**
 * Render HTML content to a PDF file using puppeteer.
 *
 * Uses printBackground: true to preserve the dark theme.
 * Letter format (8.5" x 11") with zero margins — the HTML template
 * handles all internal padding and page dimensions.
 *
 * @param {string} htmlContent - Complete HTML document string
 * @param {string} outputPath - Absolute path for the output .pdf file
 * @returns {Promise<void>}
 */
async function renderPDF(htmlContent, outputPath) {
  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    // waitUntil: networkidle0 ensures Google Fonts are loaded before render
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    await page.pdf({
      path: outputPath,
      format: "Letter",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: true,
    });
  } finally {
    await browser.close();
  }
}

/**
 * Render a 816x400 PNG screenshot of the first page (the hook section).
 * Used to generate preview images for the guide landing pages.
 *
 * @param {string} htmlContent - Complete HTML document string
 * @param {string} outputPath - Absolute path for the output .png file
 * @returns {Promise<void>}
 */
async function renderPreview(htmlContent, outputPath) {
  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    // Set viewport to match Letter width at 96dpi
    await page.setViewport({ width: 816, height: 1056 });
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    await page.screenshot({
      path: outputPath,
      clip: { x: 0, y: 0, width: 816, height: 580 },
      type: "png",
    });
  } finally {
    await browser.close();
  }
}

module.exports = { renderPDF, renderPreview };
