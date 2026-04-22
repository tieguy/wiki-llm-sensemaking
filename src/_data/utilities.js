const moment = require('moment');

const sentenceCase = function (str) {
  if (typeof str !== 'string' || !str.length) {
    return str;
  }
  str = str.replace(/-/g, ' ');
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

const humanizeDate = function (datetime, date) {
  const m = moment(datetime || date);
  if (datetime) {
    return m.format('LLL');
  }
  return m.format('LL');
};

const isWrappedInParagraphTags = function (html) {
  if (typeof html !== 'string') {
    return false;
  }
  return html.substring(0, 3) === '<p>';
};

/**
 * Render a small inline SVG line chart of the monthly-pageviews series
 * attached to the `traffic` data module. Always draws a LOESS-smoothed
 * line across the whole window (2020→present); the segment of months
 * whose YYYY timestamp prefix matches `highlightYear` is overlaid with
 * a thicker, higher-contrast stroke. Returns '' when data is absent
 * so the template can safely concatenate.
 */
const renderTrafficSparkline = function (traffic, highlightYear, opts) {
  if (!traffic || !traffic.available || !traffic.items.length) return '';
  const options = opts || {};
  const width = options.width || 260;
  const height = options.height || 48;
  const padX = 2;
  const padY = 4;

  const items = traffic.items;
  const values = traffic.smoothed;
  const min = traffic.min;
  const max = traffic.max;
  const range = max - min || 1;
  const n = items.length;

  const xAt = function (i) {
    return padX + (i / (n - 1)) * (width - 2 * padX);
  };
  const yAt = function (v) {
    return height - padY - ((v - min) / range) * (height - 2 * padY);
  };

  let basePath = '';
  for (let i = 0; i < n; i++) {
    basePath += (i === 0 ? 'M' : 'L') + xAt(i).toFixed(2) + ',' + yAt(values[i]).toFixed(2) + ' ';
  }

  let first = -1;
  let last = -1;
  const hlStr = String(highlightYear);
  for (let i = 0; i < n; i++) {
    if (String(items[i].timestamp).slice(0, 4) === hlStr) {
      if (first < 0) first = i;
      last = i;
    }
  }

  let highlightPath = '';
  if (first >= 0) {
    const a = Math.max(0, first - 1);
    const b = Math.min(n - 1, last + 1);
    for (let i = a; i <= b; i++) {
      highlightPath +=
        (i === a ? 'M' : 'L') + xAt(i).toFixed(2) + ',' + yAt(values[i]).toFixed(2) + ' ';
    }
  }

  const ariaLabel =
    'English Wikipedia human pageviews, ' +
    traffic.firstYear +
    '–' +
    traffic.lastYear +
    (first >= 0 ? ', ' + hlStr + ' highlighted' : '');

  return (
    '<svg class="traffic-sparkline" viewBox="0 0 ' +
    width +
    ' ' +
    height +
    '" width="' +
    width +
    '" height="' +
    height +
    '" role="img" aria-label="' +
    ariaLabel +
    '" preserveAspectRatio="none">' +
    '<path class="traffic-sparkline-line" d="' +
    basePath.trim() +
    '" fill="none" />' +
    (highlightPath
      ? '<path class="traffic-sparkline-highlight" d="' +
        highlightPath.trim() +
        '" fill="none" />'
      : '') +
    '</svg>'
  );
};

module.exports = {
  sentenceCase,
  humanizeDate,
  isWrappedInParagraphTags,
  renderTrafficSparkline,
};
