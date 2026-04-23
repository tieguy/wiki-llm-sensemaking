#!/usr/bin/env node
/*
 * Fetch monthly human pageviews for English Wikipedia from the
 * Wikimedia REST "pageviews" API and write them to
 * data/traffic.json, which src/_data/traffic.js then loads at build
 * time. (Kept outside src/ so 11ty doesn't pick the raw JSON up as a
 * separate data variable and collide with traffic.js.) Filtered to
 * agent=user so bot traffic is excluded.
 *
 * Run:   node scripts/fetch-traffic.js
 * Or:    npm run fetch-traffic
 *
 * The range is 2020-01 through the most recently completed month.
 * traffic.json is checked in; regenerate and commit (roughly monthly)
 * to refresh the sparkline on the deployed site.
 *
 * API docs:
 *   https://wikimedia.org/api/rest_v1/#/Pageviews%20data
 *
 * Per WMF policy, requests must carry an identifiable User-Agent:
 *   https://meta.wikimedia.org/wiki/User-Agent_policy
 *
 * If you want all Wikipedias (not just enwiki) or all Wikimedia
 * projects (incl. Commons/Wikidata), change PROJECT below. The
 * supported values for the pageviews API include any specific wiki
 * domain (e.g. 'en.wikipedia.org') or 'all-projects'; there is no
 * built-in "all Wikipedias" aggregate, so all-projects is the nearest
 * rollup.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const PROJECT = 'en.wikipedia.org';
const ACCESS = 'all-access';
const AGENT = 'user';
const GRANULARITY = 'monthly';
const START = '2020010100';

const USER_AGENT =
  'wiki-llm-sensemaking/0.1 (+https://github.com/tieguy/wiki-llm-sensemaking)';

const OUT_PATH = path.join(__dirname, '..', 'data', 'traffic.json');

function latestCompletedMonthStamp() {
  // The pageviews API's `end` is inclusive of the timestamp given, and
  // only completed months return data. Using the first day of the
  // current month as `end` yields the last completed month as the
  // final item.
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  return `${y}${m}0100`;
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      { headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' } },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            reject(new Error(`HTTP ${res.statusCode}: ${body.slice(0, 500)}`));
            return;
          }
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(new Error(`Failed to parse JSON: ${e.message}`));
          }
        });
      }
    );
    req.on('error', reject);
    req.setTimeout(30000, () => {
      req.destroy(new Error('Request timed out after 30s'));
    });
  });
}

async function main() {
  const end = latestCompletedMonthStamp();
  const url =
    `https://wikimedia.org/api/rest_v1/metrics/pageviews/aggregate/` +
    `${encodeURIComponent(PROJECT)}/${ACCESS}/${AGENT}/${GRANULARITY}/${START}/${end}`;

  console.log(`Fetching ${url}`);
  const json = await fetchJson(url);
  if (!json.items || !json.items.length) {
    throw new Error(`No items in response: ${JSON.stringify(json).slice(0, 500)}`);
  }

  const items = json.items.map((i) => ({
    timestamp: i.timestamp,
    views: i.views,
  }));

  const out = {
    project: PROJECT,
    access: ACCESS,
    agent: AGENT,
    granularity: GRANULARITY,
    fetchedAt: new Date().toISOString(),
    items,
  };

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + '\n');
  console.log(
    `Wrote ${items.length} months (${items[0].timestamp} → ${
      items[items.length - 1].timestamp
    }) to ${path.relative(process.cwd(), OUT_PATH)}`
  );
}

main().catch((err) => {
  console.error('fetch-traffic failed:', err.message);
  process.exit(1);
});
