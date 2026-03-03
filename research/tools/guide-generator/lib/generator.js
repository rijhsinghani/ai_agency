"use strict";

// Registry of all 5 automation guides.
// Each entry drives CLI validation, HTML meta tags, and content routing.
const GUIDES = [
  {
    slug: "missed-call-textback",
    title: "The 30-second save",
    industry: "Salon",
    opsPackage: "missed-call-text-back.md",
    roiAnchor: "5 missed calls/week x $80 = $400/week",
  },
  {
    slug: "review-automation",
    title: "The review machine",
    industry: "Dental practice",
    opsPackage: "review-reputation.md",
    roiAnchor: "30 to 90 reviews = 25-30% more clicks",
  },
  {
    slug: "monday-pipeline",
    title: "The Monday morning pipeline",
    industry: "Cleaning service",
    opsPackage: "lead-follow-up.md",
    roiAnchor: "No more Monday scramble",
  },
  {
    slug: "quote-writer",
    title: "The quote that writes itself",
    industry: "Law firm",
    opsPackage: "quote-follow-up.md",
    roiAnchor: "Sunday night = 2 hrs; automation = 10 min",
  },
  {
    slug: "no-show-killer",
    title: "The no-show killer",
    industry: "Gym",
    opsPackage: "appointment-reminders.md",
    roiAnchor: "3 no-shows/week x $80 = $12,480/year",
  },
];

/**
 * Look up a guide by slug.
 * Returns the guide object or undefined if not found.
 * @param {string} slug
 * @returns {object|undefined}
 */
function getGuide(slug) {
  return GUIDES.find((g) => g.slug === slug);
}

module.exports = { GUIDES, getGuide };
