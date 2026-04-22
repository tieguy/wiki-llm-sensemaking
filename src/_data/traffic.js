/*
 * Loads monthly human pageview data from data/traffic.json (produced
 * by scripts/fetch-traffic.js) and attaches a LOESS-smoothed series
 * so templates can render a subtle trend line without re-smoothing on
 * every page build.
 *
 * The raw JSON lives outside src/ because Eleventy auto-loads any
 * .json file in src/_data/ as its own data variable; co-locating it
 * here would collide with this .js module.
 *
 * If data/traffic.json is absent, `available: false` is exported and
 * the template renders no chart.
 */

const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', '..', 'data', 'traffic.json');

function loadRaw() {
  if (!fs.existsSync(DATA_PATH)) return null;
  try {
    const parsed = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    if (!parsed.items || !parsed.items.length) return null;
    return parsed;
  } catch (e) {
    console.warn(`traffic.json exists but could not be parsed: ${e.message}`);
    return null;
  }
}

/**
 * Local regression (LOESS) with a tricube kernel and a linear fit at
 * each point. `xs` is an index vector (0..n-1 is fine), `ys` the
 * values. `span` is the fraction of the data used in each local fit.
 */
function loess(xs, ys, span) {
  const n = xs.length;
  const k = Math.max(3, Math.floor(span * n));
  const out = new Array(n);
  for (let i = 0; i < n; i++) {
    const dists = [];
    for (let j = 0; j < n; j++) {
      dists.push([j, Math.abs(xs[j] - xs[i])]);
    }
    dists.sort((a, b) => a[1] - b[1]);
    const neighbors = dists.slice(0, k);
    const maxD = neighbors[neighbors.length - 1][1] || 1;
    let sumW = 0;
    let sumWX = 0;
    let sumWY = 0;
    let sumWXX = 0;
    let sumWXY = 0;
    for (const [j, d] of neighbors) {
      const u = d / maxD;
      const w = Math.pow(1 - u * u * u, 3);
      sumW += w;
      sumWX += w * xs[j];
      sumWY += w * ys[j];
      sumWXX += w * xs[j] * xs[j];
      sumWXY += w * xs[j] * ys[j];
    }
    const meanX = sumWX / sumW;
    const meanY = sumWY / sumW;
    const varX = sumWXX / sumW - meanX * meanX;
    const covXY = sumWXY / sumW - meanX * meanY;
    const slope = varX > 0 ? covXY / varX : 0;
    const intercept = meanY - slope * meanX;
    out[i] = intercept + slope * xs[i];
  }
  return out;
}

const raw = loadRaw();

let payload;
if (!raw) {
  payload = {
    available: false,
    items: [],
    smoothed: [],
  };
} else {
  const items = raw.items;
  const xs = items.map((_, i) => i);
  const ys = items.map((it) => it.views);
  const smoothed = loess(xs, ys, 0.25);
  const min = Math.min(...smoothed, ...ys);
  const max = Math.max(...smoothed, ...ys);
  payload = {
    available: true,
    project: raw.project,
    agent: raw.agent,
    fetchedAt: raw.fetchedAt,
    items,
    smoothed,
    min,
    max,
    firstYear: String(items[0].timestamp).slice(0, 4),
    lastYear: String(items[items.length - 1].timestamp).slice(0, 4),
  };
}

module.exports = payload;
