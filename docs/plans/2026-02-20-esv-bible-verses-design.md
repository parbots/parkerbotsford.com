# ESV Bible Verse Integration — Design

## Overview

Integrate Crossway ESV Bible verse references into the site with build-time data fetching, inline/block MDX components, a daily verse homepage widget, and a `/verses` aggregation page.

## Requirements

- Inline `<BibleVerse>` component (popover on hover, or block display)
- Daily/featured verse widget on homepage (deterministic rotation by day-of-year)
- `/verses` page listing all referenced verses across the site
- Frontmatter `verses` field on content collections for tagging
- All verse text fetched at build time from ESV API — zero runtime API calls
- Matches existing theming (CSS variables, Lora/JetBrains Mono fonts, light/dark mode)

## API

- **Endpoint**: `https://api.esv.org/v3/passage/text/` and `/v3/passage/html/`
- **Auth**: `Authorization: Token <ESV_API_KEY>` header
- **Key params**: `q` (passage ref), `include-short-copyright`, `include-verse-numbers`, `include-footnotes`
- **Rate limits**: 5,000/day, 1,000/hour, 60/minute
- **Env var**: `ESV_API_KEY` in `.env` (gitignored, build-time only)

## Architecture

### Data Layer

1. **`src/data/verses.ts`** — curated array of daily rotation verses (`DAILY_VERSES`)
2. **Frontmatter extension** — add `verses: z.array(z.string()).default([])` to blog, writings, projects schemas
3. **Astro integration** (`src/integrations/esv-verses.ts`):
   - Runs at `astro:build:start`
   - Scans content files for `verses` frontmatter + daily verses list
   - Deduplicates, fetches from ESV API (text + HTML endpoints)
   - Writes `src/data/generated/verse-cache.json` (gitignored)
   - Structure: `{ "Romans 8:28": { reference, text, html } }`

### Components

1. **`<BibleVerse>`** — React island (`src/features/bible/interactive/BibleVerse.tsx`)
   - Props: `ref: string`, `display?: "inline" | "block"`
   - Inline: accent-colored link, hover popover with verse text
   - Block: blockquote card with full verse, always visible
   - Verse text passed as prop (build-time resolved)
   - `client:load` hydration
   - Includes short copyright

2. **`<DailyVerse>`** — Astro component (`src/features/bible/DailyVerse.astro`)
   - Pure static, no client JS
   - Day-of-year mod `DAILY_VERSES.length` for deterministic selection
   - Card with verse text (Lora italic), reference (JetBrains Mono), accent border

3. **`<VerseList>`** — Astro component (`src/features/bible/VerseList.astro`)
   - Aggregates all verse references from content frontmatter
   - Groups by source page with links back

### Pages

- **`/verses`** (`src/pages/verses.astro`) — Page layout, renders `<VerseList>`

### Styling

- Popover: `bg-[var(--bg-surface)]`, `border-[var(--border)]`, rounded, shadow
- Block: left `border-l-2 border-[var(--accent)]`, `bg-[var(--bg-surface)]` padding
- Reference links: `text-[var(--accent)]` with hover transition
- Copyright: `text-[var(--fg-muted)]` small text
- Dark mode automatic via CSS variables

### MDX Usage

```mdx
---
verses: ["Romans 8:28", "John 3:16"]
---

Inline: <BibleVerse ref="Romans 8:28" />
Block: <BibleVerse ref="John 3:16" display="block" />
```

## Decisions

- Build-time only (no runtime API calls, no SSR needed)
- Verse cache is gitignored and regenerated each build
- API key stored in `.env`, never exposed to client
- Both text and HTML fetched for flexibility (text for popovers, HTML for rich block display)
- Popover uses React island for interactivity; DailyVerse is pure Astro (no JS)
