# TODO

## Content/data ideas

### "legal" category?
Could hit some of the key legal decisions around fair use.

### "research" category?
eg pulling from https://en.wikipedia.org/wiki/Wikipedia:Wikipedia_Signpost/2025-03-22/Recent_research#So_again%2C_what_has_the_impact_of_ChatGPT_really_been%3F and https://github.com/monperrus/wikipedia-decline-llm

### Parallel data rail (sparklines)

See `CLAUDE.md` → "Open work: parallel data rail." Not yet started;
defer until enough content to know which series matter.

## Code tasks
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
