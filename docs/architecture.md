# Architecture

**Astro** static site with feature-folder organization.

## Component Tiers

1. **Primitives** (`src/components/primitives/`) — Nav, Footer, Link, ThemeToggle
2. **Shared composites** (`src/components/shared/`) — components used across features
3. **Feature-specific** (`src/features/{home,blog,writings,projects}/`) — each feature owns its `components/` and `interactive/` subdirectories

## Content

Lives in `src/data/{blog,writings,projects}/` as `.mdx` files. Schemas defined in `src/content.config.ts` using Zod via Astro content collections with glob loaders.

## Layouts

Chain: `Base.astro` (HTML shell, fonts, theme script) → `Page.astro` (Nav + Footer) → `Post.astro` / `Writing.astro` / `Project.astro` (content-type headers).

## Pages

`src/pages/` are thin routing layers — they query content collections and delegate to feature components and layouts.

## Key Files

- `src/config.ts` — site metadata, nav items (single source of truth)
- `src/content.config.ts` — content collection schemas
- `src/styles/global.css` — CSS reset, theme variables, typography, prose styles
- `src/utils/` — date formatting, reading time
- `eslint.config.js` — ESLint v9 flat config (JS/TS/Astro/React/jsx-a11y)
- `.prettierrc` — Prettier config with Astro + Tailwind plugins
