"use client";

/**
 * Renders guide markdown content as HTML.
 * Uses a minimal hand-rolled renderer — no external markdown dep needed for
 * the subset of markdown the guides actually use (headings, paragraphs,
 * bold, inline code, code blocks, horizontal rules, unordered/ordered lists,
 * blockquotes, tables).
 */

interface Props {
  content: string;
}

function renderMarkdown(md: string): string {
  let html = md
    // Escape HTML in the source before we add our own tags
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Fenced code blocks  ```lang\n...\n```
  html = html.replace(
    /```[^\n]*\n([\s\S]*?)```/g,
    (_, code: string) =>
      `<pre class="sa-code-block"><code>${code.trimEnd()}</code></pre>`,
  );

  // Blockquotes
  html = html.replace(/^&gt; (.+)$/gm, "<blockquote>$1</blockquote>");

  // Tables — minimal: | col | col |
  html = html.replace(
    /(\|.+\|\n)(\|[-| :]+\|\n)((?:\|.+\|\n?)*)/g,
    (_, header: string, _sep: string, body: string) => {
      const headerCells = header
        .split("|")
        .slice(1, -1)
        .map((c: string) => `<th>${c.trim()}</th>`)
        .join("");
      const bodyRows = body
        .trim()
        .split("\n")
        .filter(Boolean)
        .map((row: string) => {
          const cells = row
            .split("|")
            .slice(1, -1)
            .map((c: string) => `<td>${c.trim()}</td>`)
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("");
      return `<div class="sa-table-wrap"><table class="sa-table"><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table></div>`;
    },
  );

  // Headings
  html = html.replace(/^###### (.+)$/gm, "<h6>$1</h6>");
  html = html.replace(/^##### (.+)$/gm, "<h5>$1</h5>");
  html = html.replace(/^#### (.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr />");

  // Unordered lists
  html = html.replace(/((?:^[-*] .+\n?)+)/gm, (block: string) => {
    const items = block
      .trim()
      .split("\n")
      .map((line: string) => `<li>${line.replace(/^[-*] /, "")}</li>`)
      .join("");
    return `<ul>${items}</ul>`;
  });

  // Ordered lists
  html = html.replace(/((?:^\d+\. .+\n?)+)/gm, (block: string) => {
    const items = block
      .trim()
      .split("\n")
      .map((line: string) => `<li>${line.replace(/^\d+\. /, "")}</li>`)
      .join("");
    return `<ol>${items}</ol>`;
  });

  // Inline: bold, italic, inline code
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Paragraphs — wrap lines that aren't already block-level tags
  const blockTags =
    /^(<h[1-6]|<ul|<ol|<li|<pre|<blockquote|<hr|<div|<table|<thead|<tbody|<tr|<th|<td)/;
  html = html
    .split("\n")
    .reduce((acc: string[], line: string) => {
      if (line.trim() === "") {
        acc.push("");
      } else if (blockTags.test(line.trim())) {
        acc.push(line);
      } else {
        acc.push(`<p>${line}</p>`);
      }
      return acc;
    }, [])
    .join("\n");

  return html;
}

export default function GuideContent({ content }: Props) {
  return (
    <div
      className="sa-guide-content"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
}
