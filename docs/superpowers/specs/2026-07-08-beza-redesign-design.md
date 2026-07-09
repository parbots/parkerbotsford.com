# parkerbotsford.com Redesign — Beza Design Language

**Date:** 2026-07-08
**Status:** Approved design, pending implementation plan

## Goal

Redesign parkerbotsford.com around the design language of the beza project
(`../beza/web`): warm bone/sandstone palette, serif display type with
italic accent words (Fraunces here, as this site's analogue to beza's
Instrument Serif), mono micro-labels, and crafted ornament details — while
keeping the site minimal and preserving every existing widget and
customization (ThemeToggle, FontSwitcher, animated nav bubble, DailyVerse
hover-card, code-block toolbar, staggered home cards).

Unlike beza (sharp chiseled corners, light-only), this site uses **rounded
corners everywhere** and keeps its **full light/dark theme**.

## Decisions Made

| Question      | Decision                                                                                                                                       |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope         | Full visual language adoption; site structure, pages, and widgets stay                                                                         |
| Display font  | Fraunces (headings, display text)                                                                                                              |
| Body font     | Atkinson Hyperlegible (unchanged); FontSwitcher keeps Lora + Inter alternates                                                                  |
| Dark mode     | Keep warm chocolate base (`#1c1917`), re-accented; not beza's near-black                                                                       |
| Cards         | Quiet surface cards; **revealed-corner** detail animated on hover/focus; edge-bar, tinted-chip, and soft-wash variants implemented but dormant |
| Corners       | Rounded everywhere (no chisel clip-paths)                                                                                                      |
| Ornaments     | All five adopted: italic accent words, eyebrow labels, mono micro-labels, hatch dividers, dashed hairlines                                     |
| Hero          | Left-aligned statement hero with corner status anchor                                                                                          |
| Status anchor | Dynamic, both lines: curated `now.ts` line + build-time latest-content line                                                                    |
| Execution     | Primitives-first migration (design system first, then feature-by-feature)                                                                      |

## 1. Design Tokens

Same CSS variable names as today (`src/styles/global.css`), new values —
widgets and shadcn components keep working untouched.

### Core palette

| Token          | Light                 | Dark                        |
| -------------- | --------------------- | --------------------------- |
| `--bg`         | `#faf7f2` (bone)      | `#1c1917`                   |
| `--bg-surface` | `#ffffff`             | `#262220`                   |
| `--fg`         | `#070606` (ink)       | `#ede5da`                   |
| `--fg-muted`   | `#6a5f50` (stone)     | `#9c8b7b`                   |
| `--accent`     | `#a8542b` (sandstone) | `#d98a4f` (AA-safe on dark) |
| `--border`     | `#e8e2d6`             | `#3d3530`                   |

### Per-type tone colors

Used only in card detailing (reveal layer, labels, dormant variants), not as
full card fills. Dark values are starting points; the verification step's AA
check may nudge them.

| Type         | Light base           | Dark base |
| ------------ | -------------------- | --------- |
| blog         | terracotta `#b0714a` | `#c98a5e` |
| writing/poem | sage `#7d9070`       | `#93a886` |
| project      | amber `#c08b52`      | `#d3a066` |
| verse        | sand `#b3a273`       | `#c2b188` |

### Derived token sets

- **shadcn semantic tokens** (`--background`, `--primary`, `--ring`, …):
  re-derived from the core palette in both modes.
- **Shiki code theme** (`--astro-code-*`): re-tuned to the new palette; all
  current code-block behaviors (toolbar, line numbers, line highlighting,
  focus dimming) unchanged.
- **Live dot:** `#4ade80` (from beza), used by MonoLabel.

### Typography

| Variable         | Font                       | Notes                                                                                                                                  |
| ---------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `--font-display` | Fraunces                   | Variable optical size; weights ~400–600; italic. All headings. One italic sandstone accent word allowed per display heading.           |
| `--font-body`    | Atkinson Hyperlegible Next | Unchanged default (exact loaded family name). FontSwitcher continues to offer Lora and Inter (`.font-lora` / `.font-inter` overrides). |
| `--font-mono`    | JetBrains Mono             | Code + new mono micro-labels.                                                                                                          |

Fraunces replaces Nunito. Font loading follows the site's existing font
strategy, adding Fraunces (regular + italic, subsetted) and dropping Nunito.

### Shape & ornament values

- Radius: cards `12px`, small elements `6–8px`, chips/pills fully rounded.
- Corner reveal: resting radius `12px` → `~30px` on hover/focus at the
  bottom-left corner, exposing the tone-colored under-layer.
- Dashed hairline: `repeating-linear-gradient(90deg, ink 0 4px, transparent 4px 12px)`
  at ~25% opacity.
- Hatch divider: six 3px vertical ticks, heights `30/60/100/75/45/20%`, one
  accent-colored.

## 2. New Primitives

All static `.astro` components in `src/components/primitives/`. No new React
islands — the reveal animation is pure CSS.

### RevealCard.astro

The single card primitive used across the site.

- **Props:** `tone: 'blog' | 'writing' | 'project' | 'verse' | 'neutral'`,
  `variant: 'reveal' | 'edge-bar' | 'chip' | 'wash'` (default `'reveal'`),
  plus `class` passthrough.
- **Structure:** tone-colored under-layer div + surface card on top
  (`--bg-surface`, 1px `--border`, 12px radius).
- **`reveal` variant (active):** on `:hover` / `:focus-within`, the card's
  bottom-left `border-radius` animates `12px → 30px`, opening a rounded
  sliver of the tone color. Under `prefers-reduced-motion: reduce`, the
  sliver renders statically (visible at rest, no animation).
- **Dormant variants (implemented, unused — deliberate user request, not
  speculative):** `edge-bar` = 3px tone-colored left edge; `chip` =
  tone-tinted pill label styling hook; `wash` = faint tone tint over the
  card surface.
- Existing `card-hover` lift/shadow behavior is folded into this primitive.

### Supporting primitives

| Component             | Purpose                                                                                                         |
| --------------------- | --------------------------------------------------------------------------------------------------------------- |
| `Eyebrow.astro`       | 16px dash + letterspaced small-caps label in accent color; introduces sections and headers                      |
| `MonoLabel.astro`     | Tiny uppercase JetBrains Mono metadata; optional live-dot prop; dates, reading time, footer text, hero anchor   |
| `HatchDivider.astro`  | Six-tick divider, one accent tick; decorative (`aria-hidden`)                                                   |
| `DashedRule.astro`    | Dashed hairline for section boundaries; decorative                                                              |
| `AccentHeading.astro` | Renders heading text with `[[word]]` marking the italic sandstone accent word (accent word is data, not markup) |

## 3. Restyled Components (logic untouched)

These keep their exact interaction code and only receive new tokens/markup:

- **Nav** (`Nav.astro`, `NavIndicator.astro`, `MobileNav.tsx`): pill +
  animated bubble geometry and behavior unchanged.
- **ThemeToggle.tsx**, **FontSwitcher.tsx**: unchanged logic; restyled.
- **DailyVerse / BibleVerse hover-card:** re-skinned with verse tone;
  hover-card animations kept.
- **Code-block toolbar** (`CodeBlockToolbar.astro`) and all
  line-number/highlight CSS: behavior identical under new palette.
- **Card components** (`PostCard`, `WritingCard`, `ProjectCard`,
  `ContentCard`, `ContentHeaderCard`, `StaggeredCards`, `VerseList` cards):
  rebuilt on `RevealCard` with the appropriate `tone`.

## 4. Hero

`src/features/home/Hero.astro` becomes a left-aligned statement hero:

- Dashed hairline across the top of the section.
- `Eyebrow`: "Parker Botsford" (name moves out of the headline).
- Oversized Fraunces headline stating what he does, one italic accent word
  (e.g. "Engineer, writer, and maker of _things_").
- Short muted lede.
- **Status anchor** (bottom-right, two `MonoLabel` lines with live dot):
  1. Curated line from new `src/data/now.ts` (hand-edited; exports a single
     string, e.g. `export const now = "Reading Wendell Berry"`).
  2. Build-time "Latest: _title_ · _Mon YYYY_" from the newest entry across
     blog/writings/projects collections, **excluding `draft: true` entries**
     (existing site convention). If no published entries exist, this line
     is omitted and the curated line stands alone.

## 5. Page Application

- **Home:** hero; sections introduced by `Eyebrow` labels with
  `HatchDivider` between; staggered `RevealCard` grid; DailyVerse in its
  current slot (verse tone).
- **List pages** (blog, writings, projects, verses): Fraunces title with
  accent word, `MonoLabel` metadata (date · reading time), `RevealCard`
  lists in the type's tone.
- **Content layouts** (`Post`/`Writing`/`Project`): header restyled
  (type eyebrow, Fraunces title, mono metadata); prose retuned — Fraunces
  `h2`/`h3`, dashed `hr`, sandstone blockquote rule. PoemLayout and
  TechStack re-tokened.
- **About / 404 / footer:** same vocabulary; footer gets a top `DashedRule`
  and mono micro-labels.

## 6. Migration Plan

Primitives-first, on the `dev` branch, atomic conventional commits, **no
pushes and no merges to main** (repo rules). Each step leaves the site
deployable:

1. `feat(theme):` tokens + Fraunces loading in `global.css`; drop Nunito.
2. `feat(ui):` new primitives (RevealCard + variants, Eyebrow, MonoLabel,
   HatchDivider, DashedRule, AccentHeading).
3. `feat(home):` statement hero + `now.ts` + home sections/cards.
4. `feat(nav):` nav + footer restyle.
5. `feat(lists):` blog/writings/projects/verses list pages.
6. `feat(content):` Post/Writing/Project layouts + prose + code theme.
7. `chore:` widget polish pass, dead-style cleanup, update
   `docs/styling.md` + `CLAUDE.md`.

## 7. Verification & Edge Cases

- After each step: `pnpm lint`, `pnpm format:check`, `pnpm typecheck`,
  `pnpm build` — all errors _and_ warnings fixed (repo rule).
- Visual pass in dev server in **both themes** at each step.
- **Contrast:** accent/text pairs AA-checked in both modes (dark accent is
  `#d98a4f` for this reason); per-type tone labels checked against their
  backgrounds.
- **Reduced motion:** corner reveal, card lift, and theme transitions all
  gated behind `prefers-reduced-motion` (existing pattern).
- **Theme switch flash:** the 500ms global color transition is verified
  against the reveal under-layer so tone colors don't flash mid-switch.
- **Empty collections:** hero "Latest:" line degrades gracefully (omitted).
- **Font fallback:** Fraunces falls back to Georgia/serif; body/mono stacks
  unchanged.

## Out of Scope

- No new pages, routes, or content types; no nav structure changes.
- No changes to content schemas, RSS, or build tooling.
- Beza's dark "workshop island" sections, sharp chisel clip-paths, and
  Instrument Serif are explicitly **not** adopted.
