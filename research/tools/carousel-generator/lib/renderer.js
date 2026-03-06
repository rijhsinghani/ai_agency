"use strict";

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

/**
 * Launch a shared puppeteer browser instance.
 * Caller must call closeBrowser() when done.
 *
 * @returns {Promise<Browser>}
 */
async function launchBrowser() {
  return puppeteer.launch({ headless: true });
}

/**
 * Close the shared browser instance.
 *
 * @param {Browser} browser
 * @returns {Promise<void>}
 */
async function closeBrowser(browser) {
  await browser.close();
}

/**
 * Render HTML content to a PNG file using an existing puppeteer page.
 * Reuses the page object for efficiency when rendering multiple slides.
 *
 * Blocks Google Fonts CDN requests to prevent navigation timeout on repeated
 * setContent calls. DM Sans falls back to system-ui (San Francisco on macOS)
 * which renders with the same clean sans-serif aesthetic.
 *
 * @param {Page} page - Existing puppeteer page
 * @param {string} htmlContent - Complete HTML document string
 * @param {string} outputPath - Absolute path for the output .png file
 * @param {number} width - Viewport and clip width in pixels
 * @param {number} height - Viewport and clip height in pixels
 * @returns {Promise<void>}
 */
async function renderPNGWithPage(page, htmlContent, outputPath, width, height) {
  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Block external font requests to prevent CDN timeouts on repeated setContent calls.
  // Request interception is set once per page via a flag to avoid double-registration.
  if (!page._interceptingRequests) {
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const url = req.url();
      if (
        url.includes("fonts.googleapis.com") ||
        url.includes("fonts.gstatic.com")
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });
    page._interceptingRequests = true;
  }

  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  // domcontentloaded is sufficient since external fonts are blocked and system fonts render immediately
  await page.setContent(htmlContent, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.screenshot({
    path: outputPath,
    type: "png",
    clip: { x: 0, y: 0, width, height },
  });
}

/**
 * Render HTML content to a PNG file using puppeteer.
 * Creates and closes its own browser instance — use for one-off renders.
 * For batch rendering, prefer launchBrowser() + renderPNGWithPage() + closeBrowser().
 *
 * @param {string} htmlContent - Complete HTML document string
 * @param {string} outputPath - Absolute path for the output .png file
 * @param {number} width - Viewport and clip width in pixels
 * @param {number} height - Viewport and clip height in pixels
 * @returns {Promise<void>}
 */
async function renderPNG(htmlContent, outputPath, width, height) {
  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();
    await renderPNGWithPage(page, htmlContent, outputPath, width, height);
  } finally {
    await browser.close();
  }
}

module.exports = { launchBrowser, closeBrowser, renderPNG, renderPNGWithPage };
