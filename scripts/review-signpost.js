#!/usr/bin/env node
/*
 * Review fetched Signpost issues (from data/signpost/) for timeline candidates
 * using the Claude API, and write structured suggestions to stdout or a file.
 *
 * Prerequisites:
 *   npm install @anthropic-ai/sdk
 *   export ANTHROPIC_API_KEY=sk-ant-...
 *   node scripts/fetch-signpost.js   # populate data/signpost/ first
 *
 * Usage:
 *   node scripts/review-signpost.js                     # all unreviewed issues
 *   node scripts/review-signpost.js 2021-03-15          # single issue
 *   node scripts/review-signpost.js 2021-01-01 2021-12-31  # date range
 *
 * Output:
 *   Appends to data/signpost-candidates.md — one section per issue, with
 *   structured entry drafts in the same JS object format as content.js.
 *   Already-reviewed issues are skipped (tracked in data/signpost-reviewed.json).
 *
 * The review prompt focuses on the four anchor categories from CLAUDE.md:
 *   - editing and reverting
 *   - readership
 *   - scraping
 *   - training
 */

'use strict';

const fs = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

const SIGNPOST_DIR = path.join(__dirname, '../data/signpost');
const CONTENT_JS = path.join(__dirname, '../src/_data/content.js');
const CANDIDATES_FILE = path.join(__dirname, '../data/signpost-candidates.md');
const REVIEWED_FILE = path.join(__dirname, '../data/signpost-reviewed.json');

// Extract existing entry ids and datetimes from content.js so the prompt
// can tell Claude what's already covered. We eval the module in a sandbox
// rather than require()ing it because content.js uses module.exports.
function loadExistingEntries() {
  const src = fs.readFileSync(CONTENT_JS, 'utf8');
  // Quick regex extraction — we only need id, title, and datetime.
  const entries = [];
  for (const m of src.matchAll(/id:\s*'([^']+)'.*?title:\s*'([^']+)'.*?datetime:\s*'([^']+)'/gs)) {
    entries.push({ id: m[1], title: m[2], datetime: m[3] });
  }
  return entries;
}

function loadReviewed() {
  if (!fs.existsSync(REVIEWED_FILE)) return new Set();
  return new Set(JSON.parse(fs.readFileSync(REVIEWED_FILE, 'utf8')));
}

function markReviewed(date, reviewed) {
  reviewed.add(date);
  fs.writeFileSync(REVIEWED_FILE, JSON.stringify([...reviewed].sort(), null, 2));
}

function getFilesForRange(start, end) {
  if (!fs.existsSync(SIGNPOST_DIR)) {
    throw new Error(`data/signpost/ not found — run fetch-signpost.js first`);
  }
  return fs
    .readdirSync(SIGNPOST_DIR)
    .filter((f) => f.endsWith('.txt'))
    .map((f) => f.replace('.txt', ''))
    .filter((d) => d >= start && d <= end)
    .sort();
}

function buildSystemPrompt(existingEntries) {
  const covered = existingEntries
    .map((e) => `  ${e.datetime}  ${e.title}`)
    .join('\n');

  return `You are a research assistant helping maintain a timeline of events at the intersection of Wikimedia projects (Wikipedia, Wikidata, Commons, etc.) and large language models (LLMs).

The timeline lives in a JavaScript file (content.js) and covers four anchor topic areas:
- **editing and reverting**: LLM-created and LLM-involved edits; detection, monitoring, reverting, accepted AI edits.
- **readership**: Intermediation of readers — knowledge panels, LLM chat answers, impact on pageviews, referrals, donations.
- **scraping**: Bot traffic against WMF infrastructure; rate limiting, mitigation, policy responses.
- **training**: Use of Wikimedia content in LLM training corpora; licensing, attribution, dataset documentation.

Entries that don't fit these four buckets can still qualify if they're a specific, dated event or artifact touching both a Wikimedia project and LLMs.

Each entry in content.js has this shape:
  {
    id: 'short-kebab-case-id',
    title: 'Concise title',
    datetime: 'YYYY-MM-DD',
    categories: ['one or more of the four categories above'],
    body: 'One or two factual sentences. No editorializing. Quote primary sources when phrasing matters.',
    links: [
      { href: 'https://...', linkText: 'Source description' },
    ],
  }

Tone rules (from the project's CLAUDE.md):
- Describe, don't editorialize. Report what was said/done, who, when, where to verify.
- Avoid loaded verbs. Prefer "said," "wrote," "announced," "proposed."
- No hype, no doom. No scare quotes around "AI."
- Flag uncertainty with "as of [date]" or "reporting is preliminary."

The following entries are ALREADY in the timeline — do not suggest them again:
${covered}

When you find a candidate, output a complete entry object in the format above, ready to paste into content.js. If you find nothing relevant, say so briefly. Do not invent sources — only cite URLs mentioned in the Signpost text itself.`;
}

function buildUserPrompt(date, issueText) {
  return `Below is the text of the Wikipedia Signpost issue dated ${date}. Review it for events that qualify as timeline entries.

Only suggest entries if:
1. The event is specific and dated (not a general trend).
2. It touches both a Wikimedia project AND LLMs/AI.
3. It is NOT already in the existing entries listed in the system prompt.

For each candidate, output a complete JS entry object. If none qualify, say "No new candidates for ${date}."

--- SIGNPOST TEXT ---
${issueText.slice(0, 24000)}`;
}

async function reviewIssue(client, date, issueText, existingEntries) {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: buildSystemPrompt(existingEntries),
    messages: [{ role: 'user', content: buildUserPrompt(date, issueText) }],
  });
  return message.content[0].text;
}

async function main() {
  const args = process.argv.slice(2);
  let startDate = '2020-01-01';
  let endDate = '2099-12-31';

  if (args.length === 1) {
    // Single date or start-of-range
    startDate = args[0];
    endDate = args[0].length === 10 ? args[0] : endDate;
  } else if (args.length >= 2) {
    startDate = args[0];
    endDate = args[1];
  }

  const existingEntries = loadExistingEntries();
  const reviewed = loadReviewed();
  const dates = getFilesForRange(startDate, endDate);

  if (dates.length === 0) {
    console.error('No fetched issues found for the given range. Run fetch-signpost.js first.');
    process.exit(1);
  }

  const client = new Anthropic();

  console.log(`Reviewing ${dates.length} issue(s)...\n`);

  for (const date of dates) {
    if (reviewed.has(date)) {
      console.log(`${date}: already reviewed, skipping`);
      continue;
    }

    const filePath = path.join(SIGNPOST_DIR, `${date}.txt`);
    const issueText = fs.readFileSync(filePath, 'utf8');

    console.log(`${date}: calling Claude...`);
    let response;
    try {
      response = await reviewIssue(client, date, issueText, existingEntries);
    } catch (e) {
      console.error(`${date}: API error — ${e.message}`);
      continue;
    }

    // Append to candidates file
    const section =
      `\n\n## ${date}\n\n` +
      response.trim() +
      '\n';
    fs.appendFileSync(CANDIDATES_FILE, section);
    markReviewed(date, reviewed);
    console.log(`${date}: done — appended to ${path.basename(CANDIDATES_FILE)}`);
  }

  console.log(`\nAll done. Candidates written to ${CANDIDATES_FILE}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
