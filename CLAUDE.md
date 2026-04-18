# CLAUDE.md

Guidance for Claude Code (and other AI assistants) working in this repo.
Mirrors the structure of `README.md` but speaks to the working conventions,
not the public framing.

## Goal

This repo is a personal sensemaking tool: a timeline of events, artifacts,
and discussions at the intersection of Wikimedia projects and large language
models. Success looks like a durable, dated, source-linked record that helps
the maintainer (and readers) reason about how LLMs and the Wikimedia
ecosystem are affecting each other.

The README names four anchor topic areas — use them as the default
categorization when adding entries:

- **editing and reverting** — LLM-created and LLM-involved edits: how
  they've surfaced, been detected, monitored, reverted, or accepted.
- **readership** — intermediation of readers, from Google knowledge panels
  through LLM chat answers; impact on pageviews, referrals, donations.
- **scraping** — bot traffic against WMF infrastructure; rate limiting,
  mitigation, policy responses.
- **training** — use of Wikimedia content in LLM training corpora,
  academic and commercial; licensing, attribution, dataset documentation.

When in doubt about whether something belongs: is it a specific, dated
event or artifact touching both a Wikimedia project and LLMs? If yes, it's
a candidate. If it's general AI news with no Wikimedia hook, it's not.
Entries that don't cleanly fit one of the four buckets are still fine —
flag them for possible new categories rather than forcing a fit.

## Tone: Neutral-ish POV

Match the README: the maintainer is trying to build a "genuine sensemaking
instrument," not advocacy. Concretely, when drafting entry copy:

- Describe, don't editorialize. Report what was said/done, who said/did it,
  when, and where to verify. Leave interpretation to the reader.
- Quote primary sources when the phrasing matters. Paraphrase neutrally
  when it doesn't.
- Represent the range of positions on contested events. If the Wikimedia
  community is split, say so and link examples from multiple sides.
- Avoid loaded verbs ("slammed," "blasted," "admitted"). Prefer "said,"
  "wrote," "announced," "proposed."
- No hype, no doom. No scare quotes around "AI."
- Flag uncertainty explicitly ("as of [date]," "reporting is preliminary").

Before committing any entry text, re-read it with the question: *would a
reader from the opposite side of this debate find this characterization
fair?*

## Tools

- **Generator:** Fork of [`molly/static-timeline-generator`][stg], an 11ty
  static site. Vendored into this repo (not a submodule). Upstream may be
  rebased from occasionally; preserve that possibility by keeping local
  edits scoped and documented.
- **Build:** `npm install`, then `npm run build` (emits `_site/`) or
  `npm run serve` (local dev server). Node 18 (see `netlify.toml`).
- **Hosting:** Netlify. `netlify.toml` declares build command and publish
  dir. Site connection is done in the Netlify UI, not from this repo.
- **Content:** All timeline entries live in `src/_data/content.js`. Schema
  per upstream: `id`, `title`, `body`, `datetime` (moment-parseable),
  optional `categories`, `color`, `faicon`, `faiconStyle`, `image`, `links`.
- **Icons:** Font Awesome 6.7.2 loaded from cdnjs. Default icon style is
  `solid`; set `faiconStyle: 'brands'` on an entry to use a brand icon (e.g.
  `faicon: 'wikipedia-w'`, `faicon: 'google'`, `faicon: 'creative-commons'`).
  No OpenAI brand icon exists in FA 6.7.2.
- **Colors:** Assigned by primary category. Convention: `training` → `slate`,
  `editing and reverting` → `brick`, `strategy and futurism` → `moss`,
  `readership` → `amber`, `scraping` → `grey`. Colors defined in
  `src/css/_colors.sass`.
- **Mirror links:** Wayback Machine links are shown per entry. archive.is links
  were removed.

[stg]: https://github.com/molly/static-timeline-generator

### Working conventions

- **Branches:** content additions may be committed directly to `main` when
  the maintainer is working interactively. Feature branches named
  `claude/<topic>-<slug>` are used for larger changes; merges happen via PR.
- **Commits:** small, scoped, descriptive. Separate scaffolding/tooling
  commits from content commits.
- **Don't touch without asking:**
  - `README.md` — the maintainer drafts this by hand; wording is load-bearing.
  - `LICENSE` — pre-existing; don't replace with upstream's.
  - The project's editorial voice in entry `body` text — propose diffs,
    don't rewrite in bulk.
- **Safe to touch:** `src/_data/content.js` additions, generator templates,
  CSS, build config, new data files.
- **Build output (`_site/`) is gitignored.** Don't commit it.

## Open work: parallel data rail

Upstream plots discrete events on a time axis. A planned extension is to
render one or more **sparklines / small-multiples** alongside the event
spine, sharing the same time axis, so continuous data (pageviews, scraper
load, edit rates, etc.) can be read against the events. Rough shape:

1. A new `src/_data/metrics.js` (or JSON) holding named time series.
2. An EJS partial emitting an SVG rail against the timeline's datetime-to-y
   mapping.
3. Client-side positioning after layout (entry heights vary).

Not yet started. Don't build this speculatively — wait until there's enough
real content to know which series matter.

## Inspirations

- Molly White's [Wikimedia timeline (2014–2016)][wmt] — the reference
  implementation of this format, and the reason the generator exists.

[wmt]: https://www.mollywhite.net/timelines/wikimedia/
