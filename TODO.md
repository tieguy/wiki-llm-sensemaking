# TODO

## Content/data ideas

### "legal" category?
Could hit some of the key legal decisions around fair use.

### Parallel data rail (sparklines)

See `CLAUDE.md` → "Open work: parallel data rail." Not yet started;
defer until enough content to know which series matter.

## Code tasks
### Font Awesome brands bump

Goal: let entries use org logos (Wikipedia-W, OpenAI, Mastodon, GitHub,
etc.) as their spine icon, not just semantic solid icons.

Current state:

- `src/_includes/head.ejs:16` loads Font Awesome `6.0.0-beta2` from
  cdnjs. That version predates the OpenAI brand icon (added in FA 6.5)
  and the Bluesky brand icon (added in FA 6.6).
- `src/index.ejs:45` hardcodes the icon style:
  `<i class="fas fa-<%= entry.faicon %>">`. `fas` is "Font Awesome
  Solid" — brand icons won't render even if passed.

Two scoped changes do it:

1. In `src/_includes/head.ejs`, bump the FA version to the latest 6.x
   release (check for openai + bluesky in the brands set).
2. In `src/index.ejs`, allow an optional `faiconStyle` field on an
   entry:

   ```ejs
   <i class="fa-<%= entry.faiconStyle || 'solid' %> fa-<%= entry.faicon %>">
   ```

Then in `content.js`, entries can opt into brands: e.g.
`{ faicon: 'wikipedia-w', faiconStyle: 'brands' }`.

Also: switch the footer's `<i class="fa-brands fa-mastodon">` to the
new style if the template is updated consistently (currently using
FA6 long-form class names, which work in beta2 and in 6.5+).

Non-goal: WMF has never had a Font Awesome icon. Getting that would
need a custom inline SVG, handled separately.

### Per-entry colors under the new palette

The palette in `src/css/_colors.sass` now offers `slate`, `brick`,
`moss`, `amber`, `grey`. Existing entries have no `color` set and fall
through to `grey`. Decide whether to assign colors by category:

- `training` → `slate` (research)?
- `editing and reverting` → `brick`?
- `strategy and futurism` → `moss`?
- `readership` → `amber`?
- `scraping` → `grey`?

Not done yet — defer until the palette has been eyeballed against real
entries.