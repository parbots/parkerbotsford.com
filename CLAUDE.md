# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website and portfolio built with Next.js 13, React 18, and TypeScript.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — ESLint (next/core-web-vitals)

## Architecture

**Next.js Pages Router** with file-based routing in `src/pages/`. Four pages: index, about, projects, contact. Special files: `_app.tsx` (global styles, Roboto Mono font), `_document.tsx`.

**Components** in `src/components/` use barrel exports (`index.ts`) — import via `@/components/header`, not `@/components/header/Header`.

**Styling** uses CSS Modules (`.module.css` per page and component) plus global CSS variables in `src/styles/globals.css` for light/dark theming. Highlight color: `#d65d0e`.

## Path Aliases

- `@/components/*` → `src/components/*`
- `@/styles/*` → `src/styles/*`

## Conventions

- TypeScript strict mode
- Components: PascalCase files, typed props
- CSS class names: camelCase
- Commits: conventional commits (`feat:`, `fix:`, `chore:`, etc.)
