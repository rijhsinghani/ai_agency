#!/usr/bin/env node
"use strict";

const { Command } = require("commander");
const { resolveRoot, loadSources } = require("./lib/loader");
const { parseTopicBank } = require("./lib/parser");
const { markDuplicates } = require("./lib/dedup");
const { scoreTopics } = require("./lib/scorer");
const { formatOutput } = require("./lib/formatter");

const program = new Command();

program
  .name("sameer-ideas")
  .description("Generate content topic suggestions from local research data")
  .version("1.0.0")
  .option("-c, --count <n>", "number of topics to return", "5")
  .option(
    "-f, --focus <vertical>",
    "filter by vertical or keyword (e.g. hvac, plumbing)",
  )
  .option(
    "-m, --format <platform>",
    "output format: youtube, twitter, carousel",
    "youtube",
  )
  .option(
    "--verbose",
    "show scores, penalties, and de-duplication reasons",
    false,
  );

program.action((options) => {
  const count = parseInt(options.count, 10);
  const focus = options.focus || null;
  const format = options.format;
  const verbose = options.verbose;

  // Validate format option
  const validFormats = ["youtube", "twitter", "carousel"];
  if (!validFormats.includes(format)) {
    process.stderr.write(
      `Unknown format '${format}'. Use: youtube, twitter, carousel\n`,
    );
    process.exit(1);
  }

  // Validate count
  if (isNaN(count) || count < 1) {
    process.stderr.write(
      `Invalid --count value. Must be a positive integer.\n`,
    );
    process.exit(1);
  }

  // Load data sources
  const root = resolveRoot();
  let sources;
  try {
    sources = loadSources(root);
  } catch (err) {
    process.stderr.write(`Error loading data sources: ${err.message}\n`);
    process.exit(1);
  }

  // Parse topic bank
  let topics;
  try {
    topics = parseTopicBank(sources.topicBank);
  } catch (err) {
    process.stderr.write(`Error parsing topic bank: ${err.message}\n`);
    process.exit(1);
  }

  const totalAvailable = topics.length;

  // Warn if count exceeds available topics
  if (count > totalAvailable) {
    process.stderr.write(
      `Returning ${totalAvailable} topics — topic bank only contains ${totalAvailable} entries.\n`,
    );
  }

  // Mark duplicates against content plan
  topics = markDuplicates(topics, sources.contentPlan);

  // Score, filter by focus, sort, slice
  const scored = scoreTopics(topics, { format, focus, count });

  // Handle --focus with no matches
  if (focus && scored.length === 0) {
    process.stdout.write(
      `No topics found matching '${focus}'. Try: hvac, plumbing, electrician, lawncare, photography, smallbusiness, realestate\n`,
    );
    process.exit(0);
  }

  // Format and output
  const output = formatOutput(scored, {
    verbose,
    format,
    count,
    focus,
    totalAvailable,
  });

  process.stdout.write(output);
});

program.parse(process.argv);
