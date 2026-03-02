"use strict";
const Anthropic = require("@anthropic-ai/sdk");
const { BANNED_PHRASES, buildPrompt } = require("./formatter");

async function generateDraft(transcript, platform) {
  const client = new Anthropic();
  const systemPrompt = `You are writing ${platform} content for Sameer Automations.
Voice rules: Direct, peer-level, confident, practical, transparent.
Never use these words or phrases: ${BANNED_PHRASES.join(", ")}.
No emojis. Use contractions. Numerals for metrics (3 jobs, $4,200, 40%). Sentence case headings.
Outcomes before technology. Audience = small business owners, not builders.
Reference specific numbers and scenarios from the transcript. Do not write generic automation advice.`;

  const message = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 1024,
    messages: [{ role: "user", content: buildPrompt(platform, transcript) }],
    system: systemPrompt,
  });
  return message.content[0].text;
}

module.exports = { generateDraft };
