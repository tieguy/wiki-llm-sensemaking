#!/usr/bin/env node
/*
 * Fetch Wikipedia Signpost issues via the MediaWiki action API and save
 * them to data/signpost/YYYY-MM-DD.txt for later review by review-signpost.js.
 *
 * Unlike the regular Wikipedia web pages, /w/api.php is not rate-limited
 * for reasonable read traffic — it's the endpoint intended for bots and tools.
 * We still use a polite User-Agent and a 1-second inter-request delay.
 *
 * Usage:
 *   node scripts/fetch-signpost.js [startYear [endYear]]
 *   node scripts/fetch-signpost.js 2022          # 2022 only
 *   node scripts/fetch-signpost.js 2020 2023     # 2020–2023 inclusive
 *
 * Default range: 2020 through the current year.
 *
 * Output: data/signpost/YYYY-MM-DD.txt — one file per issue, containing
 * the wikitext of each available section, separated by headers.
 * Already-fetched files are skipped so the script is safe to re-run.
 *
 * WMF User-Agent policy:
 *   https://meta.wikimedia.org/wiki/User-Agent_policy
 */

'use strict';

const fs = require('fs');
const path = require('path');

const API_URL = 'https://en.wikipedia.org/w/api.php';
const USER_AGENT =
  'wiki-llm-sensemaking/1.0 (https://github.com/tieguy/wiki-llm-sensemaking; signpost-archiver)';
const DELAY_MS = 1000;
const OUT_DIR = path.join(__dirname, '../data/signpost');

// Sections to fetch for each issue, in priority order.
// Not every issue has all sections; missing ones are silently skipped.
const SECTIONS = [
  'News_and_notes',
  'In_the_media',
  'Recent_research',
  'Technology_report',
  'Special_report',
  'Op-ed',
  'Disinformation_report',
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function apiFetch(params) {
  const url = new URL(API_URL);
  url.searchParams.set('format', 'json');
  url.searchParams.set('formatversion', '2');
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  const res = await fetch(url.toString(), {
    headers: { 'User-Agent': USER_AGENT },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

// Returns the wikitext of a Wikipedia page, or null if the page doesn't exist.
async function fetchWikitext(title) {
  const data = await apiFetch({
    action: 'query',
    titles: title,
    prop: 'revisions',
    rvprop: 'content',
    rvslots: 'main',
    redirects: '1',
  });
  const pages = data.query?.pages;
  if (!pages || !pages.length) return null;
  const page = pages[0];
  if (page.missing) return null;
  return page.revisions?.[0]?.slots?.main?.content ?? null;
}

// Returns a sorted list of unique issue dates (YYYY-MM-DD) for a given year,
// discovered by scraping links from the year's archives page.
async function getIssueDates(year) {
  const data = await apiFetch({
    action: 'parse',
    page: `Wikipedia:Wikipedia_Signpost/Archives/${year}`,
    prop: 'links',
  });
  if (data.error) {
    console.warn(`  No archives page for ${year}: ${data.error.info}`);
    return [];
  }
  const links = data.parse?.links ?? [];
  const seen = new Set();
  for (const link of links) {
    const title = link.title ?? link['*'] ?? '';
    const m = title.match(/Wikipedia_Signpost\/(\d{4}-\d{2}-\d{2})\//);
    if (m) seen.add(m[1]);
  }
  return [...seen].sort();
}

async function fetchIssue(date) {
  const parts = [];
  for (const section of SECTIONS) {
    const title = `Wikipedia:Wikipedia_Signpost/${date}/${section}`;
    const wikitext = await fetchWikitext(title);
    await sleep(DELAY_MS);
    if (wikitext) {
      const heading = section.replace(/_/g, ' ');
      parts.push(`== ${heading} ==\n\n${wikitext.trim()}`);
    }
  }
  return parts.join('\n\n\n');
}

async function main() {
  const startYear = parseInt(process.argv[2] ?? String(new Date().getFullYear()), 10);
  const endYear = parseInt(process.argv[3] ?? String(startYear), 10);

  // If only one arg given, treat it as startYear with endYear = current year.
  const effectiveEnd =
    process.argv[3] ? endYear : new Date().getFullYear();

  fs.mkdirSync(OUT_DIR, { recursive: true });

  for (let year = startYear; year <= effectiveEnd; year++) {
    console.log(`\nDiscovering ${year} issues...`);
    const dates = await getIssueDates(year);
    await sleep(DELAY_MS);

    if (dates.length === 0) {
      console.log('  None found.');
      continue;
    }
    console.log(`  Found ${dates.length}: ${dates.join(', ')}`);

    for (const date of dates) {
      const outPath = path.join(OUT_DIR, `${date}.txt`);
      if (fs.existsSync(outPath)) {
        console.log(`  ${date}: already fetched, skipping`);
        continue;
      }
      console.log(`  ${date}: fetching sections...`);
      try {
        const text = await fetchIssue(date);
        if (!text.trim()) {
          console.log(`  ${date}: no content found`);
          continue;
        }
        const header = `Signpost issue: ${date}\nFetched: ${new Date().toISOString()}\n${'='.repeat(60)}\n\n`;
        fs.writeFileSync(outPath, header + text, 'utf8');
        console.log(`  ${date}: saved (${text.length} chars)`);
      } catch (e) {
        console.error(`  ${date}: ERROR — ${e.message}`);
      }
    }
  }

  console.log('\nDone.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
