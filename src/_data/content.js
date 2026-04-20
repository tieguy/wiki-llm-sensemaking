const header =
  'A timeline of intersections between Wikimedia projects and LLMs, to help make sense of them. <a href="https://github.com/tieguy/wiki-llm-sensemaking">Pull requests welcome.</a>';
const footer =
  '<a href="https://github.com/tieguy/wiki-llm-sensemaking"><i class="fa-brands fa-github"></i> Source on GitHub &middot; pull requests welcome</a> &middot; <a href="https://bsky.app/profile/lu.is" rel="me">Bluesky: @lu.is</a> &middot; <a href="https://social.coop/@luis_in_brief" rel="me"><i class="fa-brands fa-mastodon"></i> @luis_in_brief@social.coop</a>';

const entries = [
  {
    id: 'gpt3-paper-wikipedia-training',
    title: 'OpenAI GPT-3 whitepaper discloses Wikipedia as training data',
    datetime: '2020-05-28',
    categories: ['training'],

    faicon: 'robot',
    body: 'OpenAI researchers publish "Language Models are Few-Shot Learners" on arXiv, describing the training dataset for GPT-3. It lists English Wikipedia as ~3% of the training mix by token count, and says it is weighted at 3x relative to its raw token share.',
    links: [
      {
        href: 'https://arxiv.org/abs/2005.14165',
        linkText: '"Language Models are Few-Shot Learners" (arXiv:2005.14165)',
      },
    ],
  },

  {
    id: 'eleutherai-pile-release',
    title: 'EleutherAI releases The Pile, a source-available LLM training dataset including Wikipedia',
    datetime: '2020-12-31',
    categories: ['training'],

    faicon: 'database',
    body: 'EleutherAI publicly releases The Pile, an 825 GiB text-available training dataset for large language models composed of 22 component datasets. English Wikipedia is one of the named components.',
    links: [
      {
        href: 'https://arxiv.org/abs/2101.00027',
        linkText: '"The Pile: An 800GB Dataset of Diverse Text for Language Modeling" (arXiv:2101.00027)',
      },
      {
        href: 'https://arxiv.org/abs/2201.07311',
        linkText: '"Datasheet for the Pile" (arXiv:2201.07311, January 2022)',
      },
    ],
  },

  {
    id: 'doe-v-github-filing',
    title: 'Doe v. GitHub class action filed in part based on disclosures in OpenAI whitepapers',
    datetime: '2022-11-03',
    categories: ['training'],

    faicon: 'gavel',
    body: 'The first major class-action lawsuit against GitHub, Microsoft, and OpenAI uses OpenAI’s technical whitepapers as evidence that OpenAI trained on GitHub-hosted source code, and violated open-source licenses.',
    links: [
      {
        href: 'https://githubcopilotlitigation.com/2022/11/03/github-copilot-litigation/',
        linkText: '"GitHub Copilot litigation" (Matthew Butterick Blog)',
      },
      {
        href: 'https://arxiv.org/abs/2107.03374',
        linkText: '"Evaluating Large Language Models Trained on Code" (OpenAI Codex Whitepaper)',
      },
    ],
  },


  {
    id: 'wikimedia-enterprise-announced',
    title: 'Wikimedia Enterprise announced',
    datetime: '2021-03-16',
    categories: ['scraping', 'strategy and futurism'],

    faicon: 'wikipedia-w',
    faiconStyle: 'brands',
    body: 'WMF announces plans for Wikimedia Enterprise, a paid commercial product for large-scale reusers of Wikimedia project content. The initiative arises from the Wikimedia 2030 Movement Strategy, which called for sustainable revenue from enterprise users.',
    links: [
      {
        href: 'https://diff.wikimedia.org/2021/03/16/introducing-the-wikimedia-enterprise-api/',
        linkText: 'Diff — "Introducing the Wikimedia Enterprise API"',
      },
    ],
  },

  {
    id: 'wikimedia-enterprise-launched',
    title: 'Google announced as first paying Wikimedia Enterprise customer',
    datetime: '2022-06-21',
    categories: ['scraping'],

    faicon: 'google',
    faiconStyle: 'brands',
    body: 'Wikimedia Enterprise announces that Google is its first paying customer, with the Internet Archive receiving free access.',
    links: [
      {
        href: 'https://enterprise.wikimedia.com/blog/hello-world/',
        linkText: 'Wikimedia Enterprise blog: first customers announced (June 2022)',
      },
    ],
  },

  {
    id: 'gpt4-technical-report-no-training-data',
    title: 'OpenAI\'s GPT-4 whitepaper declines to disclose training data',
    datetime: '2023-03-15',
    categories: ['training'],

    faicon: 'fa-openai',
    faiconStyle: 'brands',
    body: 'OpenAI publishes the GPT-4 Technical Report, explicitly declining to disclose details about training data, a marked departure from the GPT-3 paper\'s disclosure of Wikipedia as a named training source.',
    links: [
      {
        href: 'https://arxiv.org/abs/2303.08774',
        linkText: 'GPT-4 Technical Report (arXiv:2303.08774)',
      },
    ],
  },

  {
    id: 'wikiproject-ai-cleanup-founded',
    title: 'WikiProject AI Cleanup founded on English Wikipedia',
    datetime: '2023-12-04',
    categories: ['editing and reverting'],

    faicon: 'wikipedia-w',
    faiconStyle: 'brands',
    body: 'A group of English Wikipedia editors formally establishes WikiProject AI Cleanup.',
    links: [
      {
        href: 'https://en.wikipedia.org/w/index.php?title=Wikipedia:WikiProject_AI_Cleanup&oldid=1188248273',
        linkText: 'WikiProject AI Cleanup (founding revision)',
      },
      {
        href: 'https://www.404media.co/the-editors-protecting-wikipedia-from-ai-hoaxes/',
        linkText: '404 Media: "The Editors Protecting Wikipedia from AI Hoaxes"',
      },
    ],
  },

  {
    id: 'ai2-dolma-olmo',
    title: 'AI2 releases OLMo and Dolma, acknowledging Wikipedia as training data',
    datetime: '2024-02-01',
    categories: ['training'],

    faicon: 'flask',
    body: 'The Allen Institute for AI (AI2) releases OLMo, a fully open language model, alongside Dolma, its 3-trillion-token pretraining corpus. Dolma explicitly includes English Wikipedia and Wikibooks as named components. Unlike most LLM releases, OLMo ships with full training data, code, training logs, and hundreds of intermediate checkpoints under Apache 2.0.',
    links: [
      {
        href: 'https://arxiv.org/abs/2402.00838',
        linkText: '"OLMo: Accelerating the Science of Language Models" (arXiv:2402.00838)',
      },
      {
        href: 'https://arxiv.org/abs/2402.00159',
        linkText: '"Dolma: An Open Corpus of Three Trillion Tokens" (arXiv:2402.00159)',
      },
      {
        href: 'https://allenai.org/blog/dolma-3-trillion-tokens-open-llm-corpus-9a0ff4b8da64',
        linkText: 'AI2 blog: Dolma announcement',
      },
    ],
  },

  {
    id: 'google-ai-overviews-launch',
    title: 'Google launches AI Overviews in Search',
    datetime: '2024-05-14',
    categories: ['readership'],

    faicon: 'google',
    faiconStyle: 'brands',
    body: 'Google announces and begins rolling out AI Overviews — AI-generated summaries appearing at the top of search results — to all US users, rebranded from the earlier Search Generative Experience (SGE). The feature is powered by Google\'s Gemini LLM.',
    links: [
      {
        href: 'https://blog.google/products/search/generative-ai-google-search-may-2024/',
        linkText: 'Google blog — "An update on AI Overviews"',
      },
    ],
  },

  {
    id: 'wmf-crawler-impact-post',
    title: 'Wikimedia Foundation reports 50% multimedia bandwidth increase from AI scraper bots',
    datetime: '2025-04-01',
    categories: ['scraping'],

    faicon: 'wikipedia-w',
    faiconStyle: 'brands',
    body: 'WMF site reliability engineers publish a Diff post reporting that since January 2024, bandwidth for downloading multimedia content has grown 50%, driven by bots scraping Wikimedia Commons images for AI model training.',
    links: [
      {
        href: 'https://diff.wikimedia.org/2025/04/01/how-crawlers-impact-the-operations-of-the-wikimedia-projects/',
        linkText: 'WMF Diff — "How crawlers impact the operations of the Wikimedia projects"',
      },
    ],
  },

  {
    id: 'wmf-ai-strategy-2025-editors',
    title: 'WMF publishes AI strategy for 2025–2028, centering editor human agency',
    datetime: '2025-04-29',
    categories: ['strategy and futurism'],

    faicon: 'wikipedia-w',
    faiconStyle: 'brands',
    body: 'Wikimedia Foundation staff Chris Albon (Director of Machine Learning) and Leila Zia (Head of Research) publish a strategy document on Meta-Wiki outlining WMF\'s intended approach to AI for 2025–2028. The document calls for AI uses that enhance the "human agency" of editors, including support for content creation, while framing WMF\'s role as ensuring AI tools serve rather than supplant volunteer contributors.',
    links: [
      {
        href: 'https://meta.wikimedia.org/wiki/Strategy/Multigenerational/Artificial_intelligence_for_editors',
        linkText: 'Meta-Wiki — "Artificial intelligence for editors"',
      },
    ],
  },

  {
    id: 'eleutherai-common-pile',
    title: 'EleutherAI releases Common Pile v0.1, restricting training data to openly licensed text',
    datetime: '2025-06-06',
    categories: ['training'],

    faicon: 'scale-balanced',
    body: 'EleutherAI and partners release the Common Pile v0.1, an 8 TB LLM training dataset comprising only public domain and openly licensed text from 30 sources — explicitly positioned as a successor to the original Pile, which had drawn criticism for including copyrighted material. Wikipedia content is among the openly licensed text sources included. The release is framed in part as a response to decreased transparency in industry training data practices following copyright litigation.',
    links: [
      {
        href: 'https://arxiv.org/abs/2506.05209',
        linkText: '"The Common Pile v0.1" (arXiv:2506.05209)',
      },
      {
        href: 'https://blog.eleuther.ai/common-pile/',
        linkText: 'EleutherAI blog post',
      },
      {
        href: 'https://techcrunch.com/2025/06/06/eleutherai-releases-massive-ai-training-dataset-of-licensed-and-open-domain-text/',
        linkText: 'TechCrunch coverage',
      },
    ],
  },

  {
    id: 'cc-signals-announced',
    title: 'Creative Commons announces CC Signals, a preference framework for AI training data use',
    datetime: '2025-06-25',
    categories: ['training', 'scraping'],

    faicon: 'creative-commons',
    faiconStyle: 'brands',
    body: 'Creative Commons announces the public kickoff of CC Signals, described as "a new preference signals framework designed to increase reciprocity and sustain a creative commons in the age of AI." CC frames it as a response to a fork in the road between "data extraction and the erosion of openness" and a "walled-off internet."',
    links: [
      {
        href: 'https://creativecommons.org/2025/06/25/introducing-cc-signals-a-new-social-contract-for-the-age-of-ai/',
        linkText: 'Creative Commons — "Introducing CC Signals"',
      },
      {
        href: 'https://techcrunch.com/2025/06/25/creative-commons-debuts-cc-signals-a-framework-for-an-open-ai-ecosystem/',
        linkText: 'TechCrunch coverage',
      },
    ],
  },

  {
    id: 'wmf-ai-responsible-use-post',
    title: 'Wikimedia Foundation calls on AI companies to stop scraping and use Wikimedia Enterprise',
    datetime: '2025-11-10',
    categories: ['scraping', 'readership'],

    faicon: 'wikipedia-w',
    faiconStyle: 'brands',
    body: 'The Wikimedia Foundation publishes a statement calling on AI developers to use Wikipedia content "responsibly" via two guidelines: provide attribution to human contributors, and access content through the paid Wikimedia Enterprise platform rather than scraping. The post reports an 8% year-over-year decline in human page views, and discloses that updated bot detection revealed that anomalously high traffic in May and June 2025 came from bots designed to evade detection.',
    links: [
      {
        href: 'https://wikimediafoundation.org/news/2025/11/10/in-the-ai-era-wikipedia-has-never-been-more-valuable/',
        linkText: 'Wikimedia Foundation — "In the AI era, Wikipedia has never been more valuable"',
      },
      {
        href: 'https://techcrunch.com/2025/11/10/wikipedia-urges-ai-companies-to-use-its-paid-api-and-stop-scraping/',
        linkText: 'TechCrunch coverage',
      },
    ],
  },

  {
    id: 'english-wikipedia-newllm-rfc',
    title: 'English Wikipedia RfC on LLM guideline closes without promotion',
    datetime: '2026-01-07',
    categories: ['editing and reverting'],

    faicon: 'wikipedia-w',
    faiconStyle: 'brands',
    body: 'An English Wikipedia RfC on promoting a draft LLM guideline (WP:NEWLLM) to official status closes with only weak consensus. The closer encouraged further revision before a future discussion, and noted a three-way split in opinions',
    links: [
      {
        href: 'https://en.wikipedia.org/wiki/Wikipedia:Village_pump_(policy)/Replace_NEWLLM',
        linkText: 'RfC: Replace text of Wikipedia:Writing articles with large language models',
      },
    ],
  },

  {
    id: 'henner-what-now-essay',
    title: 'Former WMF board chair Henner publishes "what-now" essay warning of Wikipedia\'s irrelevance',
    datetime: '2026-01-09',
    categories: ['readership', 'strategy and futurism'],

    faicon: 'circle-exclamation',
    body: 'Christophe Henner, former chair of the WMF Board, emails the Wikimedia-l mailing list sharing a structured essay on Wikipedia\'s trajectory. The email sparked a sustained debate on the list about the severity of the decline.',
    links: [
      {
        href: 'https://lists.wikimedia.org/hyperkitty/list/wikimedia-l@lists.wikimedia.org/thread/X3SQ2WA7QF2XS56XV2EOPDPUZ6UQPCR4/#PYUQBY6H53ZEIYH3WNIUKFC73TJZMZGV',
        linkText: 'Wikimedia-l email (January 9, 2026)',
      },
      {
        href: 'https://meta.wikimedia.org/wiki/User:Schiste/what-now',
        linkText: 'Full essay: User:Schiste/what-now on Meta-Wiki',
      },
    ],
  },

  {
    id: 'wikimedia-futures-lab',
    title: 'Wikimedia Futures Lab convenes in Frankfurt',
    datetime: '2026-01-30',
    categories: ['strategy and futurism'],

    faicon: 'wikipedia-w',
    faiconStyle: 'brands',
    body: 'Over 100 Wikimedians, affiliate representatives, and external experts gather in Frankfurt for the Wikimedia Futures Lab, co-organized by Wikimedia Deutschland and the Wikimedia Foundation. Participants heard from external experts and discussed trends including the rapid evolution of AI and changing audience behavior.',
    links: [
      {
        href: 'https://diff.wikimedia.org/2026/04/09/inside-the-wikimedia-futures-lab-how-the-wikimedia-movement-is-responding-to-a-changing-internet/',
        linkText: 'Diff — "Inside the Wikimedia Futures Lab"',
      },
      {
        href: 'https://meta.wikimedia.org/wiki/Wikimedia_Futures_Lab',
        linkText: 'Meta-Wiki: Wikimedia Futures Lab (program, participant list, documentation)',
      },
    ],
  },

  {
    id: 'german-wikipedia-ai-ban',
    title: 'German-language Wikipedia votes to ban LLM-generated content',
    datetime: '2026-02-15',
    categories: ['editing and reverting'],

    faicon: 'wikipedia-w',
    faiconStyle: 'brands',
    body: 'A community vote (Meinungsbild) on the German-language Wikipedia closes with 208 votes in favor and 108 against, adopting a near-comprehensive ban on LLM-generated or LLM-edited text in articles and discussion pages. Exceptions are made for machine translation, spelling and grammar correction, and research.',
    links: [
      {
        href: 'https://de.wikipedia.org/wiki/Wikipedia:Meinungsbilder/KI-Verbot',
        linkText: 'Wikipedia:Meinungsbilder/KI-Verbot (German)',
      },
      {
        href: 'https://de.wikipedia.org/wiki/Wikipedia:K%C3%BCnstliche_Intelligenz',
        linkText: 'Resulting policy: Wikipedia:Künstliche Intelligenz (German)',
      },
      {
        href: 'https://translate.google.com/translate?sl=de&tl=en&u=https://de.wikipedia.org/wiki/Wikipedia:K%C3%BCnstliche_Intelligenz',
        linkText: 'Resulting policy (Google Translate)',
      },
      {
        href: 'https://the-decoder.com/german-wikipedia-bans-ai-generated-content-while-other-language-editions-take-a-softer-approach/',
        linkText: 'The Decoder: "German Wikipedia bans AI-generated content"',
      },
    ],
  },

  {
    id: 'english-wikipedia-llm-policy',
    title: 'English Wikipedia adopts WP:LLM, prohibiting LLM-generated article content',
    datetime: '2026-03-20',
    categories: ['editing and reverting'],

    faicon: 'wikipedia-w',
    faiconStyle: 'brands',
    body: 'An RfC on the English Wikipedia closes 44 votes to 2 in favor of prohibiting the use of LLMs to generate or rewrite article content. Two narrow exceptions apply: basic copyediting of one\'s own writing (with human review), and translation from another language\'s Wikipedia."',
    links: [
      {
        href: 'https://en.wikipedia.org/wiki/Wikipedia:Writing_articles_with_large_language_models/RfC',
        linkText: 'WP:LLM RfC',
      },
      {
        href: 'https://en.wikipedia.org/wiki/Wikipedia:Writing_articles_with_large_language_models',
        linkText: 'Resulting policy: Wikipedia:Writing articles with large language models',
      },
      {
        href: 'https://www.404media.co/wikipedia-bans-ai-generated-content-voting-40-2/',
        linkText: '404 Media: "Wikipedia Bans AI-Generated Content"',
      },
    ],
  },

  {
    id: 'wmf-crawler-followup-post',
    title: 'Wikimedia Foundation publishes one-year crawler update, reports blocking 25% of automated requests',
    datetime: '2026-03-26',
    categories: ['scraping'],

    faicon: 'wikipedia-w',
    faiconStyle: 'brands',
    body: 'A follow-up to the April 2025 crawler post reports that the Foundation is now blocking or throttling approximately 25% of all automated crawler requests, up to billions per day.',
    links: [
      {
        href: 'https://diff.wikimedia.org/2026/03/26/quo-vadis-crawlers-progress-and-whats-next-on-safeguarding-our-infrastructure/',
        linkText: 'WMF Diff: "Quo Vadis, Crawlers?"',
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

const categoryColors = {
  'training': 'slate',
  'editing and reverting': 'brick',
  'strategy and futurism': 'moss',
  'readership': 'amber',
  'scraping': 'grey',
};

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
      if (!entry.color) {
        entry.color = categoryColors[entry.categories[0]] || 'grey';
      }
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
