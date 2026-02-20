# CLAUDE.md

Personal website and portfolio built with Astro, React islands, MDX content, and Tailwind CSS.

## Commands

- `pnpm dev` — Start dev server (localhost:4321)
- `pnpm build` — Production build to `dist/`
- `pnpm preview` — Preview production build
- `pnpm lint` / `pnpm lint:fix` — ESLint
- `pnpm format` / `pnpm format:check` — Prettier
- `pnpm typecheck` — `astro check` type diagnostics

## Development Rules

- **Never commit, merge, or push to `main`** — merges to main are done manually
- **Never push to any remote branch** — only commit locally
- **Atomic, conventional commits** — `feat:`, `fix:`, `refactor:`, `style:`, `chore:`, `docs:`, etc.
- **Verify after major changes** — run `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, and `pnpm build`
- **Fix all lint/format/type issues** — errors _and_ warnings
- **Keep CLAUDE.md current** — update as you work; consolidate if it grows too large
- **Use /docs for domain knowledge** — reference docs here to reduce context bloat

## Conventions

- **Package manager:** pnpm
- TypeScript strict mode
- Astro components: PascalCase `.astro` with typed Props interfaces
- React islands: `.tsx`, hydrated with `client:load`
- Content: `.mdx` files in `src/data/`; drafts filtered via `draft: true`
- **Linting:** ESLint v9 flat config (TS, Astro, React, jsx-a11y, Prettier)
- **Formatting:** Prettier with Astro parser + Tailwind class sorting

## Docs

- [Architecture](docs/architecture.md) — component tiers, content, layouts, pages, key files
- [Styling & Theming](docs/styling.md) — Tailwind, CSS variables, theme, fonts
