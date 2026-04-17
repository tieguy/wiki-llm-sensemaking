const header =
  'A timeline of intersections between Wikimedia projects, including Wikipedia, and large language models.';
const footer =
  '<a href="https://github.com/tieguy/wiki-llm-sensemaking"><i class="fa-brands fa-github"></i> Source on GitHub</a> &middot; <a href="https://bsky.app/profile/lu.is" rel="me">Bluesky: @lu.is</a> &middot; <a href="https://social.coop/@luis_in_brief" rel="me"><i class="fa-brands fa-mastodon"></i> @luis_in_brief@social.coop</a>';
const entries = [
  {
    id: 'gpt3-paper-wikipedia-training',
    title: 'GPT-3 paper discloses Wikipedia as training data',
    datetime: '2020-05-28',
    categories: ['training'],
    faicon: 'robot',
    body: 'OpenAI researchers publish "Language Models are Few-Shot Learners" on arXiv, describing the training dataset for GPT-3. The paper explicitly lists English Wikipedia (approximately 3 billion tokens, ~3% of the training mix by token count) alongside Common Crawl, WebText2, and two book corpora. Wikipedia is weighted at 3x relative to its raw token share, reflecting OpenAI\'s view of it as higher-quality data.',
    links: [
      {
        href: 'https://arxiv.org/abs/2005.14165',
        linkText: 'Primary source: "Language Models are Few-Shot Learners" (arXiv:2005.14165)',
      },
    ],
  },

  {
    id: 'wikiproject-ai-cleanup-founded',
    title: 'WikiProject AI Cleanup founded on English Wikipedia',
    datetime: '2023-12-04',
    categories: ['editing and reverting'],
    faicon: 'broom',
    body: 'A group of English Wikipedia editors formally establishes WikiProject AI Cleanup, describing it as "a collaboration to combat the increasing problem of unsourced, poorly-written AI-generated content on Wikipedia."',
    links: [
      {
        href: 'https://en.wikipedia.org/w/index.php?title=Wikipedia:WikiProject_AI_Cleanup&oldid=1188248273',
        linkText: 'Primary source: WikiProject AI Cleanup (founding revision)',
      },
      {
        href: 'https://www.404media.co/the-editors-protecting-wikipedia-from-ai-hoaxes/',
        linkText: '404 Media: "The Editors Protecting Wikipedia from AI Hoaxes"',
      },
    ],
  },

  {
    id: 'wikimedia-futures-lab',
    title: 'Wikimedia Futures Lab convenes in Frankfurt',
    datetime: '2026-01-30',
    categories: ['strategy and futurism'],
    faicon: 'compass',
    body: 'Over 100 Wikimedians, affiliate representatives, and external experts gather in Frankfurt for the Wikimedia Futures Lab, co-organized by Wikimedia Deutschland and the Wikimedia Foundation. Participants heard from external experts and discussed trends including the rapid evolution of AI and changing audience behavior.',
    links: [
      {
        href: 'https://diff.wikimedia.org/2026/04/09/inside-the-wikimedia-futures-lab-how-the-wikimedia-movement-is-responding-to-a-changing-internet/',
        linkText: 'Primary source: Diff — "Inside the Wikimedia Futures Lab"',
      },
      {
        href: 'https://meta.wikimedia.org/wiki/Wikimedia_Futures_Lab',
        linkText: 'Meta-Wiki: Wikimedia Futures Lab (program, participant list, documentation)',
      },
    ],
  },
];

// Page details
const pageTitle = 'Wikimedia and LLM Timeline';
const pageDescription =
  'A timeline of intersections between Wikimedia projects, including Wikipedia, and large language models.';
const pageAuthor = 'Luis Villa';
const showMirrorLinks = true; // Whether to show links to the Wayback Machine and archive.is mirrors.

// DON'T EDIT BELOW THIS LINE! --------------------------------------------------------------------
const getFilters = (entries) => {
  const filters = new Set();
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    if (Object.prototype.hasOwnProperty.call(entry, 'categories')) {
      for (var j = 0; j < entry.categories.length; j++) {
        filters.add(entry.categories[j]);
      }
    }
  }
  var filtersArray = [...filters];
  filtersArray.sort();
  return filtersArray;
};

const addCategoriesStringsToEntries = (entries) => {
  for (const entry of entries) {
    if (Object.prototype.hasOwnProperty.call(entry, 'categories')) {
      entry.categoriesString = entry.categories.join(',');
    }
  }
  return entries;
};

module.exports = {
  header,
  footer,
  showMirrorLinks,
  entries: addCategoriesStringsToEntries(entries),
  filters: getFilters(entries),
  head: {
    title: pageTitle,
    description: pageDescription,
    author: pageAuthor,
  },
};
