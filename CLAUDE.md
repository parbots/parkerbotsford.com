# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website and portfolio built with Astro, React islands, MDX content, and Tailwind CSS.

## Commands

- `npm run dev` — Start dev server (localhost:4321)
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build

## Architecture

**Astro** static site with feature-folder organization. Three component tiers:

1. **Primitives** (`src/components/primitives/`) — Nav, Footer, Link, ThemeToggle
2. **Shared composites** (`src/components/shared/`) — components used across features
3. **Feature-specific** (`src/features/{home,blog,writings,projects}/`) — each feature owns its `components/` and `interactive/` subdirectories

**Content** lives in `src/data/{blog,writings,projects}/` as `.mdx` files. Schemas defined in `src/content.config.ts` using Zod via Astro content collections with glob loaders.

**Layouts** chain: `Base.astro` (HTML shell, fonts, theme script) → `Page.astro` (Nav + Footer) → `Post.astro` / `Writing.astro` / `Project.astro` (content-type headers).

**Pages** in `src/pages/` are thin routing layers — they query content collections and delegate to feature components and layouts.

## Key Files

- `src/config.ts` — site metadata, nav items (single source of truth)
- `src/content.config.ts` — content collection schemas
- `src/styles/global.css` — CSS reset, theme variables (light/dark), typography, prose styles
- `src/utils/` — date formatting, reading time

## Styling

Tailwind CSS utilities + CSS custom properties in `global.css`. Theme uses `.dark` class on `<html>` toggled by ThemeToggle React island. Colors: warm cream light mode (`--bg: #F5F0EB`, `--accent: #C4643A`), dark chocolate dark mode (`--bg: #1C1917`). Fonts: Lora (body), JetBrains Mono (code/UI).

## Conventions

- TypeScript strict mode
- Astro components: PascalCase `.astro` files with typed Props interfaces
- React islands: `.tsx` files, hydrated with `client:load`
- Commits: conventional commits (`feat:`, `fix:`, `chore:`, etc.)
- Content: all `.mdx` for interactive component support
- Drafts: filtered in production via `draft: true` frontmatter
