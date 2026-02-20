# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website and portfolio built with Astro, React islands, MDX content, and Tailwind CSS.

## Commands

- `pnpm dev` — Start dev server (localhost:4321)
- `pnpm build` — Production build to `dist/`
- `pnpm preview` — Preview production build
- `pnpm lint` — Run ESLint
- `pnpm lint:fix` — Run ESLint with auto-fix
- `pnpm format` — Format all files with Prettier
- `pnpm format:check` — Check formatting without writing
- `pnpm typecheck` — Run `astro check` for type diagnostics

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
- `eslint.config.js` — ESLint v9 flat config (JS/TS/Astro/React/jsx-a11y)
- `.prettierrc` — Prettier config with Astro + Tailwind plugins

## Styling

Tailwind CSS utilities + CSS custom properties in `global.css`. Theme uses `.dark` class on `<html>` toggled by ThemeToggle React island. Colors: warm cream light mode (`--bg: #F5F0EB`, `--accent: #C4643A`), dark chocolate dark mode (`--bg: #1C1917`). Fonts: Lora (body), JetBrains Mono (code/UI).

## Conventions

- **Package manager:** pnpm (not npm/yarn)
- TypeScript strict mode
- Astro components: PascalCase `.astro` files with typed Props interfaces
- React islands: `.tsx` files, hydrated with `client:load`
- Commits: conventional commits (`feat:`, `fix:`, `chore:`, etc.)
- Content: all `.mdx` for interactive component support
- Drafts: filtered in production via `draft: true` frontmatter
- **Linting:** ESLint v9 flat config with TypeScript, Astro, React, jsx-a11y, and Prettier integration
- **Formatting:** Prettier with Astro parser and Tailwind class sorting
